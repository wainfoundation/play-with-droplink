
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Code2, Download, Github, BookOpen } from "lucide-react";

const SdksSection = () => {
  return (
    <section className="py-16 px-4 bg-muted">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
            <Code2 className="h-8 w-8" />
            SDKs & Libraries
          </h2>
          <p className="text-lg max-w-2xl mx-auto">
            Official SDKs and community libraries to accelerate your Droplink integration.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-yellow-500 text-white p-2 rounded">
                <Code2 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">JavaScript SDK</h3>
                <Badge variant="secondary">Official</Badge>
              </div>
            </div>
            <p className="text-muted-foreground mb-4">
              Official JavaScript SDK for browser and Node.js environments with TypeScript support.
            </p>
            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span className="text-sm">Version</span>
                <Badge variant="outline">v2.1.0</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Bundle Size</span>
                <span className="text-sm text-muted-foreground">~45KB gzipped</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">TypeScript</span>
                <Badge variant="secondary">✓ Included</Badge>
              </div>
            </div>
            <div className="bg-zinc-950 text-zinc-100 p-3 rounded text-sm font-mono mb-4">
              <code>npm install @droplink/sdk</code>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" asChild>
                <a href="#" className="flex items-center gap-1">
                  <Download className="h-4 w-4" />
                  Install
                </a>
              </Button>
              <Button size="sm" variant="outline" asChild>
                <a href="#" className="flex items-center gap-1">
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              </Button>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-500 text-white p-2 rounded">
                <Code2 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Python SDK</h3>
                <Badge variant="secondary">Official</Badge>
              </div>
            </div>
            <p className="text-muted-foreground mb-4">
              Official Python SDK for server-side integrations with async support.
            </p>
            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span className="text-sm">Version</span>
                <Badge variant="outline">v1.8.2</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Python Support</span>
                <span className="text-sm text-muted-foreground">3.7+</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Async Support</span>
                <Badge variant="secondary">✓ Included</Badge>
              </div>
            </div>
            <div className="bg-zinc-950 text-zinc-100 p-3 rounded text-sm font-mono mb-4">
              <code>pip install droplink-python</code>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" asChild>
                <a href="#" className="flex items-center gap-1">
                  <Download className="h-4 w-4" />
                  Install
                </a>
              </Button>
              <Button size="sm" variant="outline" asChild>
                <a href="#" className="flex items-center gap-1">
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              </Button>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-green-500 text-white p-2 rounded">
                <Code2 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Go SDK</h3>
                <Badge variant="outline">Community</Badge>
              </div>
            </div>
            <p className="text-muted-foreground mb-4">
              Community-maintained Go SDK for high-performance server applications.
            </p>
            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span className="text-sm">Version</span>
                <Badge variant="outline">v0.5.1</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Go Version</span>
                <span className="text-sm text-muted-foreground">1.18+</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Maintainer</span>
                <Badge variant="outline">@gopiminer</Badge>
              </div>
            </div>
            <div className="bg-zinc-950 text-zinc-100 p-3 rounded text-sm font-mono mb-4">
              <code>go get github.com/droplink/go-sdk</code>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" asChild>
                <a href="#" className="flex items-center gap-1">
                  <Download className="h-4 w-4" />
                  Install
                </a>
              </Button>
              <Button size="sm" variant="outline" asChild>
                <a href="#" className="flex items-center gap-1">
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              </Button>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-purple-500 text-white p-2 rounded">
                <Code2 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">PHP SDK</h3>
                <Badge variant="outline">Community</Badge>
              </div>
            </div>
            <p className="text-muted-foreground mb-4">
              Community PHP SDK with Composer support for traditional web applications.
            </p>
            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span className="text-sm">Version</span>
                <Badge variant="outline">v2.0.3</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">PHP Version</span>
                <span className="text-sm text-muted-foreground">7.4+</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Maintainer</span>
                <Badge variant="outline">@phpi-dev</Badge>
              </div>
            </div>
            <div className="bg-zinc-950 text-zinc-100 p-3 rounded text-sm font-mono mb-4">
              <code>composer require droplink/php-sdk</code>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" asChild>
                <a href="#" className="flex items-center gap-1">
                  <Download className="h-4 w-4" />
                  Install
                </a>
              </Button>
              <Button size="sm" variant="outline" asChild>
                <a href="#" className="flex items-center gap-1">
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              </Button>
            </div>
          </Card>
        </div>
        
        <div className="mt-12 text-center">
          <Card className="p-8 max-w-2xl mx-auto">
            <BookOpen className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h3 className="text-2xl font-semibold mb-4">Want to contribute?</h3>
            <p className="text-muted-foreground mb-6">
              Help us build SDKs for more languages and frameworks. Check out our contribution guidelines and join our developer community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <a href="#" className="flex items-center gap-2">
                  <Github className="h-4 w-4" />
                  Contribution Guide
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="#">Join Discord</a>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SdksSection;
