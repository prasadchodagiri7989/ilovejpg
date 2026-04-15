import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, Search, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SEO } from '@/components/SEO';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <SEO 
        title="Page Not Found - 404 Error"
        description="The page you're looking for doesn't exist. Browse our collection of free online file converters and utility tools."
        noindex={true}
      />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 p-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 text-6xl font-bold text-primary">404</div>
            <CardTitle className="text-2xl">Page Not Found</CardTitle>
            <CardDescription>
              Oops! The page you're looking for doesn't exist or has been moved.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-center text-sm text-muted-foreground">
              The URL <code className="bg-muted px-2 py-1 rounded">{location.pathname}</code> could not be found.
            </p>
            <div className="flex flex-col gap-2">
              <Button asChild className="w-full">
                <Link to="/">
                  <Home className="mr-2 h-4 w-4" />
                  Go to Homepage
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link to="/" onClick={() => window.history.back()}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Go Back
                </Link>
              </Button>
            </div>
            <div className="pt-4 border-t">
              <p className="text-sm text-center text-muted-foreground mb-3">
                Popular tools:
              </p>
              <div className="grid grid-cols-2 gap-2">
                <Button asChild variant="secondary" size="sm">
                  <Link to="/jpg-to-png">JPG to PNG</Link>
                </Button>
                <Button asChild variant="secondary" size="sm">
                  <Link to="/pdf-to-jpg">PDF to JPG</Link>
                </Button>
                <Button asChild variant="secondary" size="sm">
                  <Link to="/png-to-jpg">PNG to JPG</Link>
                </Button>
                <Button asChild variant="secondary" size="sm">
                  <Link to="/password-generator">Password Gen</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default NotFound;
