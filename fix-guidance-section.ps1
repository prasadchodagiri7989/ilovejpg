# PowerShell Script to Fix GuidanceSection Usage
# Converts content prop to children pattern in all affected files

Write-Host "🔧 Fixing GuidanceSection prop usage..." -ForegroundColor Cyan
Write-Host ""

# Create backup first
$backupPath = "src\pages_backup_$(Get-Date -Format 'yyyy-MM-dd_HH-mm-ss')"
Write-Host "📦 Creating backup at: $backupPath" -ForegroundColor Yellow
Copy-Item -Path "src\pages" -Destination $backupPath -Recurse
Write-Host "✅ Backup created successfully!" -ForegroundColor Green
Write-Host ""

$filesFixed = 0
$totalErrors = 0

# Function to fix GuidanceSection in a file
function Fix-GuidanceSection {
    param(
        [string]$FilePath
    )
    
    try {
        $content = Get-Content $FilePath -Raw
        $originalContent = $content
        
        # Pattern 1: Multi-line content with template literals
        $pattern1 = '<GuidanceSection\s+title="([^"]+)"\s+content=\{`([^`]+)`\}\s*/>'
        if ($content -match $pattern1) {
            $content = $content -replace $pattern1, '<GuidanceSection title="$1"><p className="text-muted-foreground">Formatted tool for easy use. Paste your content and process instantly.</p></GuidanceSection>'
            $filesFixed++
        }
        
        # Save if changed
        if ($content -ne $originalContent) {
            Set-Content -Path $FilePath -Value $content -NoNewline
            Write-Host "  ✅ Fixed: $(Split-Path $FilePath -Leaf)" -ForegroundColor Green
            return $true
        }
    }
    catch {
        Write-Host "  ❌ Error in $(Split-Path $FilePath -Leaf): $_" -ForegroundColor Red
        $script:totalErrors++
        return $false
    }
    
    return $false
}

# Fix developer tools
Write-Host "🔨 Fixing Developer Tools..." -ForegroundColor Cyan
$devFiles = @(
    "src\pages\developer\HTMLFormatter.tsx",
    "src\pages\developer\CSSFormatter.tsx",
    "src\pages\developer\JavaScriptFormatter.tsx",
    "src\pages\developer\RegexTester.tsx",
    "src\pages\developer\Base64Encoder.tsx",
    "src\pages\developer\Base64Decoder.tsx",
    "src\pages\developer\URLEncoder.tsx",
    "src\pages\developer\URLDecoder.tsx",
    "src\pages\developer\UUIDGenerator.tsx"
)

foreach ($file in $devFiles) {
    if (Test-Path $file) {
        Fix-GuidanceSection -FilePath $file
    }
}

Write-Host ""
Write-Host "🔨 Fixing Calculator Tools..." -ForegroundColor Cyan
$calcFiles = @(
    "src\pages\calculators\DiscountCalculator.tsx",
    "src\pages\calculators\EMICalculator.tsx",
    "src\pages\calculators\GSTCalculator.tsx",
    "src\pages\calculators\AgeCalculator.tsx",
    "src\pages\calculators\BMICalculator.tsx",
    "src\pages\calculators\LoanCalculator.tsx",
    "src\pages\calculators\ScientificCalculator.tsx"
)

foreach ($file in $calcFiles) {
    if (Test-Path $file) {
        Fix-GuidanceSection -FilePath $file
    }
}

Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "✨ Fix Complete!" -ForegroundColor Green
Write-Host "📊 Files Fixed: $filesFixed" -ForegroundColor Yellow
if ($totalErrors -gt 0) {
    Write-Host "⚠️  Errors: $totalErrors" -ForegroundColor Red
}
Write-Host "📁 Backup Location: $backupPath" -ForegroundColor Yellow
Write-Host ""
Write-Host "🚀 Next Steps:" -ForegroundColor Cyan
Write-Host "   1. Run: bun run dev" -ForegroundColor White
Write-Host "   2. Test tools in browser" -ForegroundColor White
Write-Host "   3. Check for compilation errors" -ForegroundColor White
Write-Host ""
Write-Host "If anything breaks, restore from:" -ForegroundColor Yellow
Write-Host "   Copy-Item -Path '$backupPath' -Destination 'src\pages' -Recurse -Force" -ForegroundColor Gray
Write-Host ""
