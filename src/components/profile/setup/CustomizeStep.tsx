
import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import TemplateSelector from "./TemplateSelector";

interface CustomizeStepProps {
  selectedTemplate: string;
  onTemplateSelect: (templateId: string) => void;
}

const CustomizeStep = ({ selectedTemplate, onTemplateSelect }: CustomizeStepProps) => {
  return (
    <div className="space-y-6">
      <div>
        <Label className="text-sm font-medium mb-4 block">Choose Your Template</Label>
        <TemplateSelector 
          selectedTemplate={selectedTemplate}
          onTemplateSelect={onTemplateSelect}
        />
      </div>
      
      <div className="bg-blue-50 rounded-lg p-4">
        <h4 className="font-medium text-sm mb-2">Upload Profile Picture</h4>
        <Button variant="outline" size="sm" className="w-full">
          <Upload className="w-4 h-4 mr-2" />
          Choose Image
        </Button>
        <p className="text-xs text-gray-500 mt-2">Recommended: 400x400px, PNG or JPG</p>
      </div>
    </div>
  );
};

export default CustomizeStep;
