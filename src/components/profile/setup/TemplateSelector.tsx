
import React from "react";
import { CheckCircle } from "lucide-react";

interface TemplateSelectorProps {
  selectedTemplate: string;
  onTemplateSelect: (templateId: string) => void;
}

const TemplateSelector = ({ selectedTemplate, onTemplateSelect }: TemplateSelectorProps) => {
  const templates = [
    { id: "blue-gradient", name: "Ocean Blue", colors: ["#00aaff", "#00d4ff"] },
    { id: "purple-gradient", name: "Purple Dreams", colors: ["#5433ff", "#20bdff"] },
    { id: "orange-gradient", name: "Sunset", colors: ["#ff7e5f", "#feb47b"] },
    { id: "green-gradient", name: "Forest", colors: ["#48c6ef", "#6f86d6"] }
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {templates.map((template) => (
        <div
          key={template.id}
          className={`relative cursor-pointer rounded-lg border-2 transition-all ${
            selectedTemplate === template.id 
              ? 'border-primary ring-2 ring-primary/20' 
              : 'border-gray-200 hover:border-gray-300'
          }`}
          onClick={() => onTemplateSelect(template.id)}
        >
          <div 
            className="h-24 rounded-t-lg"
            style={{
              background: `linear-gradient(45deg, ${template.colors[0]}, ${template.colors[1]})`
            }}
          />
          <div className="p-3 text-center">
            <p className="text-sm font-medium">{template.name}</p>
          </div>
          {selectedTemplate === template.id && (
            <div className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-white" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TemplateSelector;
