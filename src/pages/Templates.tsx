
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import { Button } from "@/components/ui/button";
import { useTemplates } from "@/hooks/useTemplates";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";

const Templates = () => {
  const { templates, loading } = useTemplates();
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);

  const handlePreview = (template: any) => {
    setSelectedTemplate(template);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-20 py-12 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center">
              <div className="animate-pulse">Loading templates...</div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20 py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-6 text-primary">Beautiful Templates</h1>
            <p className="text-xl text-muted-foreground">
              Choose from our collection of professionally designed templates
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {templates.map((template) => (
              <div key={template.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-64 bg-gradient-to-br from-primary to-secondary flex items-center justify-center relative">
                  {template.preview_image_url ? (
                    <img 
                      src={template.preview_image_url} 
                      alt={template.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-white font-bold text-lg">{template.name}</span>
                  )}
                  <Button
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => handlePreview(template)}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Preview
                  </Button>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold">{template.name}</h3>
                    {template.category && (
                      <Badge variant="secondary">{template.category}</Badge>
                    )}
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">
                    {template.description || "Professional template design"}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      {template.is_free ? "Free" : "Premium"}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePreview(template)}
                    >
                      Use Template
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Preview Modal */}
          {selectedTemplate && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
              <div className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-auto">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">{selectedTemplate.name}</h2>
                    <Button
                      variant="ghost"
                      onClick={() => setSelectedTemplate(null)}
                    >
                      ×
                    </Button>
                  </div>
                  <div className="bg-gray-100 p-8 rounded-lg text-center">
                    <p className="text-gray-600 mb-4">Template Preview</p>
                    <div className="bg-white p-6 rounded shadow-sm max-w-sm mx-auto">
                      <h3 className="font-bold mb-2">{selectedTemplate.name}</h3>
                      <p className="text-sm text-gray-600 mb-4">{selectedTemplate.description}</p>
                      <div className="space-y-2">
                        <div className="bg-primary/10 p-2 rounded">Sample Link 1</div>
                        <div className="bg-primary/10 p-2 rounded">Sample Link 2</div>
                        <div className="bg-primary/10 p-2 rounded">Sample Link 3</div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 text-center">
                    <Button>Apply This Template</Button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className="text-center">
            <p className="text-muted-foreground mb-6">
              More templates added regularly. Have a design request?
            </p>
          </div>
        </div>
      </main>
      <CTA />
      <Footer />
    </div>
  );
};

export default Templates;
