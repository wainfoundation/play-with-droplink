
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Globe, Lock, ExternalLink, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface DomainSettingsSectionProps {
  profile: any;
  hasFeatureAccess: (feature: string) => boolean;
  onFeatureClick: (feature: string, requiredFeatures: string[]) => boolean;
}

const DomainSettingsSection = ({ profile, hasFeatureAccess, onFeatureClick }: DomainSettingsSectionProps) => {
  const [piDomain, setPiDomain] = useState(profile?.pi_domain || "");
  const [customDomain, setCustomDomain] = useState(profile?.custom_domain || "");
  const [isUpdating, setIsUpdating] = useState(false);
  const { toast } = useToast();

  const hasPiDomainAccess = hasFeatureAccess('pi_domain');
  const hasCustomDomainAccess = hasFeatureAccess('custom_css'); // Premium feature

  const handlePiDomainUpdate = async () => {
    if (!hasPiDomainAccess) {
      onFeatureClick('pi_domain', ['pi_domain']);
      return;
    }

    if (!piDomain.trim()) {
      toast({
        title: "Domain Required",
        description: "Please enter a .pi domain name",
        variant: "destructive",
      });
      return;
    }

    // Validate .pi domain format
    if (!piDomain.endsWith('.pi') && !piDomain.match(/^[a-zA-Z0-9-]+$/)) {
      toast({
        title: "Invalid Format",
        description: "Enter just the name (e.g., 'genius' for genius.pi)",
        variant: "destructive",
      });
      return;
    }

    setIsUpdating(true);
    
    try {
      const domainValue = piDomain.endsWith('.pi') ? piDomain : `${piDomain}.pi`;
      
      const { error } = await supabase
        .from('user_profiles')
        .update({ pi_domain: domainValue })
        .eq('id', profile.id);
        
      if (error) throw error;
      
      toast({
        title: "Pi Domain Reserved!",
        description: `${domainValue} has been reserved for your profile`,
      });
      
      setPiDomain(domainValue);
    } catch (error) {
      console.error("Error updating Pi domain:", error);
      toast({
        title: "Reservation Failed",
        description: "Unable to reserve Pi domain. It may already be taken.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCustomDomainUpdate = async () => {
    if (!hasCustomDomainAccess) {
      onFeatureClick('custom_css', ['custom_css']);
      return;
    }

    setIsUpdating(true);
    
    try {
      const { error } = await supabase
        .from('user_profiles')
        .update({ custom_domain: customDomain })
        .eq('id', profile.id);
        
      if (error) throw error;
      
      toast({
        title: "Custom Domain Updated!",
        description: customDomain ? `${customDomain} has been saved` : "Custom domain removed",
      });
    } catch (error) {
      console.error("Error updating custom domain:", error);
      toast({
        title: "Update Failed",
        description: "Unable to update custom domain",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Globe className="w-6 h-6" />
            Domain Settings
          </h2>
          <p className="text-gray-600">Manage your custom domains and Pi domain</p>
        </div>
      </div>

      {/* Current Profile URL */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            Your Profile URL
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="flex-1">
              <p className="font-medium text-green-800">
                droplink.space/@{profile?.username}
              </p>
              <p className="text-sm text-green-600">This is your permanent profile link</p>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.open(`/@${profile?.username}`, '_blank')}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Visit
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Pi Domain Section */}
      <Card className={!hasPiDomainAccess ? "opacity-60" : ""}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center">
              <span className="text-white text-xs font-bold">π</span>
            </div>
            .pi Domain
            {!hasPiDomainAccess && <Lock className="w-4 h-4 text-gray-400" />}
          </CardTitle>
          {!hasPiDomainAccess && (
            <p className="text-sm text-orange-600">
              Upgrade to Starter plan or higher to reserve your .pi domain
            </p>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          {hasPiDomainAccess ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="pi-domain">Reserve your .pi domain</Label>
                <div className="flex gap-2">
                  <Input
                    id="pi-domain"
                    value={piDomain.replace('.pi', '')}
                    onChange={(e) => setPiDomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                    placeholder="genius"
                    className="flex-1"
                  />
                  <span className="flex items-center px-3 bg-gray-100 border rounded-md text-gray-600">
                    .pi
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  Your Pi domain will be: {piDomain.replace('.pi', '') || 'yourname'}.pi
                </p>
              </div>
              
              <Button 
                onClick={handlePiDomainUpdate}
                disabled={isUpdating}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
              >
                {isUpdating ? "Reserving..." : profile?.pi_domain ? "Update Pi Domain" : "Reserve Pi Domain"}
              </Button>
              
              {profile?.pi_domain && (
                <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="text-sm text-yellow-800">
                    <strong>Reserved:</strong> {profile.pi_domain}
                  </p>
                  <p className="text-xs text-yellow-600 mt-1">
                    Pi domains will redirect to your Droplink profile once Pi Network enables .pi domains
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-8">
              <Lock className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <h3 className="font-medium mb-2">Pi Domain Reserved for Paid Plans</h3>
              <p className="text-sm text-gray-500 mb-4">
                Reserve your custom .pi domain name with a Starter plan or higher
              </p>
              <Button 
                onClick={() => onFeatureClick('pi_domain', ['pi_domain'])}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
              >
                Upgrade to Reserve .pi Domain
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Custom Domain Section */}
      <Card className={!hasCustomDomainAccess ? "opacity-60" : ""}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Custom Domain
            {!hasCustomDomainAccess && <Lock className="w-4 h-4 text-gray-400" />}
          </CardTitle>
          {!hasCustomDomainAccess && (
            <p className="text-sm text-purple-600">
              Upgrade to Premium to use your own custom domain
            </p>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          {hasCustomDomainAccess ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="custom-domain">Your custom domain</Label>
                <Input
                  id="custom-domain"
                  value={customDomain}
                  onChange={(e) => setCustomDomain(e.target.value.toLowerCase())}
                  placeholder="yourname.com"
                />
                <p className="text-sm text-gray-500">
                  Enter your custom domain (requires DNS configuration)
                </p>
              </div>
              
              <Button 
                onClick={handleCustomDomainUpdate}
                disabled={isUpdating}
                variant="outline"
                className="w-full"
              >
                {isUpdating ? "Updating..." : "Save Custom Domain"}
              </Button>
              
              {profile?.custom_domain && (
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-800">
                    <strong>Custom Domain:</strong> {profile.custom_domain}
                  </p>
                  <p className="text-xs text-blue-600 mt-1">
                    Make sure to configure your DNS settings to point to Droplink
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-8">
              <Lock className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <h3 className="font-medium mb-2">Custom Domain for Premium Users</h3>
              <p className="text-sm text-gray-500 mb-4">
                Use your own domain name with Premium plan
              </p>
              <Button 
                onClick={() => onFeatureClick('custom_css', ['custom_css'])}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                Upgrade to Premium
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Domain Help */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-blue-500" />
            Domain Help
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-gray-600">
            <div>
              <strong>Pi Domain (.pi):</strong> Once Pi Network enables .pi domains, your reserved domain will automatically redirect to your Droplink profile.
            </div>
            <div>
              <strong>Custom Domain:</strong> Point your domain's DNS to Droplink to use your own domain name for your profile.
            </div>
            <div>
              <strong>Profile URL:</strong> Your droplink.space/@username link is always available and shareable.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DomainSettingsSection;
