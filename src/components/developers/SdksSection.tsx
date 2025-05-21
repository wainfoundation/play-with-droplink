
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import { Book, Code } from "lucide-react";

const SdksSection = () => {
  return (
    <TabsContent value="sdks" className="border rounded-lg p-6">
      <h3 className="text-2xl font-semibold mb-4">Software Development Kits</h3>
      <p className="mb-6">
        We provide official SDKs for several popular programming languages to make integration easier.
      </p>
      
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-primary/10 text-primary p-2.5 rounded-lg">
              <Code size={24} />
            </div>
            <h4 className="text-lg font-semibold">JavaScript</h4>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            JavaScript SDK for browser and Node.js applications.
          </p>
          <div className="bg-muted p-2 rounded text-sm font-mono mb-4">
            npm install @droplink/js-sdk
          </div>
          <Button variant="outline" size="sm" className="w-full" asChild>
            <a href="#" className="flex items-center justify-center gap-1">
              <Book size={14} /> Documentation
            </a>
          </Button>
        </Card>
        
        <Card className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-primary/10 text-primary p-2.5 rounded-lg">
              <Code size={24} />
            </div>
            <h4 className="text-lg font-semibold">Python</h4>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Python SDK for backend applications and scripts.
          </p>
          <div className="bg-muted p-2 rounded text-sm font-mono mb-4">
            pip install droplink-python
          </div>
          <Button variant="outline" size="sm" className="w-full" asChild>
            <a href="#" className="flex items-center justify-center gap-1">
              <Book size={14} /> Documentation
            </a>
          </Button>
        </Card>
        
        <Card className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-primary/10 text-primary p-2.5 rounded-lg">
              <Code size={24} />
            </div>
            <h4 className="text-lg font-semibold">PHP</h4>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            PHP SDK for web applications and CMS plugins.
          </p>
          <div className="bg-muted p-2 rounded text-sm font-mono mb-4">
            composer require droplink/php-sdk
          </div>
          <Button variant="outline" size="sm" className="w-full" asChild>
            <a href="#" className="flex items-center justify-center gap-1">
              <Book size={14} /> Documentation
            </a>
          </Button>
        </Card>
      </div>
      
      <div className="text-center mt-8">
        <p className="mb-4">Looking for another language? Check our GitHub repositories.</p>
        <Button asChild>
          <a href="https://github.com/droplink" target="_blank" rel="noopener noreferrer">
            View on GitHub
          </a>
        </Button>
      </div>
    </TabsContent>
  );
};

export default SdksSection;
