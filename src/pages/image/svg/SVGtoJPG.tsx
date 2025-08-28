
import React, { useState, useRef } from "react";
import { FileImage, Download, Trash2, Plus, Eye } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";
import { GuidanceSection } from "@/components/GuidanceSection";

export const SVGtoJPG = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [images, setImages] = useState<Array<{ file: File; preview: string; blobUrl: string }>>([]);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const { toast } = useToast();

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files;
		if (!files) return;

		const validImages = Array.from(files).filter(file =>
			file.type === "image/svg+xml" || file.name.toLowerCase().endsWith(".svg")
		);

		if (validImages.length === 0) {
			toast({ title: "Only SVG files are supported", variant: "destructive" });
			return;
		}

		setIsLoading(true);
		const newImages: any[] = [];
		let processedCount = 0;

		validImages.forEach(file => {
			const reader = new FileReader();
			reader.onload = () => {
				const svgText = reader.result as string;
				const img = new window.Image();
				img.onload = () => {
					const canvas = document.createElement("canvas");
					canvas.width = img.width;
					canvas.height = img.height;
					const ctx = canvas.getContext("2d");
					if (ctx) {
						ctx.fillStyle = "#fff";
						ctx.fillRect(0, 0, canvas.width, canvas.height);
						ctx.drawImage(img, 0, 0);
					}
					canvas.toBlob(blob => {
						if (blob) {
							const blobUrl = URL.createObjectURL(blob);
							newImages.push({
								file,
								preview: URL.createObjectURL(file),
								blobUrl
							});
							processedCount++;
							if (processedCount === validImages.length) {
								setImages(prev => [...prev, ...newImages]);
								toast({
									title: `${newImages.length} SVG image(s) converted`,
									description: "You can now download them as JPG",
								});
								setIsLoading(false);
							}
						}
					}, "image/jpeg");
				};
				// Inline SVG as data URL
				const svg64 = btoa(unescape(encodeURIComponent(svgText)));
				img.src = `data:image/svg+xml;base64,${svg64}`;
			};
			reader.readAsText(file);
		});

		if (fileInputRef.current) fileInputRef.current.value = "";
	};

	const removeImage = (index: number) => {
		URL.revokeObjectURL(images[index].preview);
		URL.revokeObjectURL(images[index].blobUrl);
		setImages(images.filter((_, i) => i !== index));
		toast({ title: "Image removed" });
	};

	const clearAll = () => {
		images.forEach(img => {
			URL.revokeObjectURL(img.preview);
			URL.revokeObjectURL(img.blobUrl);
		});
		setImages([]);
		toast({ title: "All images cleared" });
	};

	const viewImage = (index: number) => {
		window.open(images[index].blobUrl, "_blank");
	};

	const downloadImage = (index: number) => {
		const a = document.createElement("a");
		a.href = images[index].blobUrl;
		a.download = images[index].file.name.replace(/\.svg$/i, ".jpg");
		a.click();
	};

	return (
		<>
			<Breadcrumb className="mb-4">
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink asChild>
							<Link to="/">Home</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>SVG to JPG Converter</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			<div className="max-w-4xl mx-auto">
				<Card className="shadow-md">
					<CardHeader className="bg-primary/5">
						<div className="flex items-center">
							<FileImage className="mr-2 text-primary" size={24} />
							<CardTitle>SVG to JPG Converter</CardTitle>
						</div>
						<CardDescription>Convert SVG images to JPG format</CardDescription>
					</CardHeader>

					<CardContent className="pt-6 pb-4 space-y-4">
						<div
							className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-muted/50 transition-colors"
							onClick={() => fileInputRef.current?.click()}
						>
							<FileImage size={48} className="mx-auto mb-4 text-muted-foreground/50" />
							<h3 className="text-lg font-medium mb-2">Add SVG Images</h3>
							<p className="text-sm text-muted-foreground mb-4">Click to select SVG files</p>
							<Button>
								<Plus size={16} className="mr-1" /> Select SVG Files
							</Button>
							<input
								type="file"
								accept=".svg"
								multiple
								onChange={handleFileChange}
								ref={fileInputRef}
								className="hidden"
							/>
						</div>

						{images.length > 0 && (
							<>
								<div className="flex items-center justify-between">
									<h3 className="text-lg font-medium">{images.length} Converted Image{images.length > 1 ? "s" : ""}</h3>
									<Button variant="outline" size="sm" onClick={clearAll}>
										<Trash2 size={16} className="mr-1" /> Clear All
									</Button>
								</div>

								<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
									{images.map((img, index) => (
										<div key={index} className="relative group border rounded-md overflow-hidden">
											<img src={img.blobUrl} alt={`Converted ${index + 1}`} className="w-full h-32 object-cover" />
											<div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
												<Button
													size="icon"
													variant="ghost"
													onClick={(e) => { e.stopPropagation(); viewImage(index); }}
													className="h-8 w-8 text-white hover:bg-white/20"
												>
													<Eye size={16} />
												</Button>
												<Button
													size="icon"
													variant="ghost"
													onClick={(e) => { e.stopPropagation(); downloadImage(index); }}
													className="h-8 w-8 text-white hover:bg-white/20"
												>
													<Download size={16} />
												</Button>
												<Button
													size="icon"
													variant="ghost"
													onClick={(e) => { e.stopPropagation(); removeImage(index); }}
													className="h-8 w-8 text-white hover:bg-white/20"
												>
													<Trash2 size={16} />
												</Button>
											</div>
											<div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-1 truncate">
												{img.file.name.replace(/\.svg$/i, ".jpg")}
											</div>
										</div>
									))}
								</div>
							</>
						)}

						<p className="text-sm text-muted-foreground">
							Tip: This tool converts SVG images to JPG format right in your browser. White background is used for JPG.
						</p>
					</CardContent>

					{isLoading && (
						<div className="flex items-center justify-center py-6">
							<span className="animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent"></span>
							<span className="ml-4 text-sm text-muted-foreground">Processing images...</span>
						</div>
					)}
				</Card>

				<GuidanceSection title="How to Use the SVG to JPG Converter">
					<div className="space-y-4">
						<div>
							<h4 className="font-medium mb-1">Step-by-step Instructions</h4>
							<ol className="list-decimal pl-5">
								<li>Click "Select SVG Files" or drag and drop SVG images.</li>
								<li>Files will be automatically converted to JPG format.</li>
								<li>Use the eye icon to preview or download the images.</li>
								<li>Click "Clear All" to reset and upload new files.</li>
							</ol>
						</div>
						<div>
							<h4 className="font-medium mb-1">Features</h4>
							<ul className="list-disc pl-5">
								<li>Fully client-side — no upload, safe and fast</li>
								<li>Supports multiple files and instant preview</li>
								<li>Clean, responsive user interface</li>
							</ul>
						</div>
					</div>
				</GuidanceSection>
			</div>
		</>
	);
};
