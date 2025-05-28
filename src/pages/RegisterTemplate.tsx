
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useOnboarding } from '@/hooks/useOnboarding';
import { supabase } from '@/integrations/supabase/client';
import { Check, Crown } from 'lucide-react';

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  preview_image_url: string;
  is_premium: boolean;
}

const RegisterTemplate = () => {
  const navigate = useNavigate();
  const { data, updateStep } = useOnboarding();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState(data.templateId);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const { data: templatesData, error } = await supabase
        .from('templates')
        .select('*')
        .eq('is_active', true)
        .order('created_at');

      if (error) throw error;
      setTemplates(templatesData || []);
      
      // Auto-select first template if none selected
      if (!selectedTemplate && templatesData?.length > 0) {
        setSelectedTemplate(templatesData[0].id);
      }
    } catch (error) {
      console.error('Error fetching templates:', error);
    }
  };

  const handleContinue = async () => {
    setIsLoading(true);
    try {
      await updateStep('platforms', { templateId: selectedTemplate });
      navigate('/register/create/select-platforms');
    } catch (error) {
      console.error('Error updating template:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const canUseTemplate = (template: Template) => {
    return !template.is_premium || data.plan !== 'free';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-6xl shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Choose Your Template</CardTitle>
          <p className="text-gray-600">Select a design that matches your style</p>
        </CardHeader>
        
        <CardContent>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
            {templates.map((template) => {
              const canUse = canUseTemplate(template);
              
              return (
                <Card
                  key={template.id}
                  className={`cursor-pointer transition-all relative ${
                    selectedTemplate === template.id
                      ? 'ring-2 ring-primary border-primary'
                      : canUse ? 'hover:shadow-md' : 'opacity-50'
                  }`}
                  onClick={() => canUse && setSelectedTemplate(template.id)}
                >
                  {template.is_premium && (
                    <div className="absolute top-2 right-2 z-10">
                      <Badge className="bg-yellow-500 text-white text-xs">
                        <Crown className="w-3 h-3 mr-1" />
                        Pro
                      </Badge>
                    </div>
                  )}
                  
                  <CardContent className="p-3">
                    <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-3 flex items-center justify-center">
                      <div className="text-gray-500 text-xs text-center">
                        <div className="w-16 h-16 bg-white rounded-lg mb-2 mx-auto"></div>
                        <div className="space-y-1">
                          <div className="h-2 bg-gray-300 rounded w-full"></div>
                          <div className="h-2 bg-gray-300 rounded w-3/4 mx-auto"></div>
                          <div className="h-6 bg-blue-200 rounded w-full mt-2"></div>
                          <div className="h-6 bg-green-200 rounded w-full"></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <h3 className="font-semibold text-sm">{template.name}</h3>
                      <p className="text-xs text-gray-500 mt-1">{template.category}</p>
                    </div>
                    
                    {selectedTemplate === template.id && (
                      <div className="absolute top-2 left-2">
                        <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    )}
                    
                    {!canUse && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                        <Badge variant="secondary">Upgrade Required</Badge>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <Button
              onClick={handleContinue}
              disabled={isLoading || !selectedTemplate}
              size="lg"
              className="px-8"
            >
              {isLoading ? "Saving..." : "Continue"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterTemplate;
