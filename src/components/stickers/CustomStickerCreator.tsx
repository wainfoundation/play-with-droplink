
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useUser } from "@/context/UserContext";
import { toast } from "@/hooks/use-toast";
import { Upload, Palette, Type, Sparkles, Link } from "lucide-react";
import AnimatedSticker from "./AnimatedSticker";

interface CustomStickerCreatorProps {
  onClose: () => void;
  onStickerCreated: () => void;
}

const CustomStickerCreator = ({ onClose, onStickerCreated }: CustomStickerCreatorProps) => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [lottieUrl, setLottieUrl] = useState<string>("");
  const [creationType, setCreationType] = useState<"upload" | "lottie">("upload");
  
  const [stickerData, setStickerData] = useState({
    name: "",
    description: "",
    overlayText: "",
    textColor: "#ffffff",
    textSize: 24,
    textPosition: "center",
    backgroundEffect: "none",
    animationType: "pulse",
    isPublic: false,
    pricePi: 0
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please choose an image under 5MB",
          variant: "destructive",
        });
        return;
      }
      
      setImageFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setLottieUrl("");
    }
  };

  const handleLottieUrlChange = (url: string) => {
    setLottieUrl(url);
    setPreviewUrl(url);
    setImageFile(null);
  };

  const handleCreateSticker = async () => {
    if (!user || (!imageFile && !lottieUrl)) {
      toast({
        title: "Missing information",
        description: "Please select an image or provide a Lottie URL",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      let finalUrl = "";

      if (creationType === "upload" && imageFile) {
        // Upload image to storage
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${user.id}/${Date.now()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('custom-stickers')
          .upload(fileName, imageFile);

        if (uploadError) throw uploadError;

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('custom-stickers')
          .getPublicUrl(fileName);

        finalUrl = publicUrl;
      } else if (creationType === "lottie" && lottieUrl) {
        finalUrl = lottieUrl;
      }

      // Save custom sticker to database
      const { error: insertError } = await supabase
        .from('custom_stickers')
        .insert({
          user_id: user.id,
          name: stickerData.name,
          description: stickerData.description,
          base_image_url: finalUrl,
          overlay_text: stickerData.overlayText,
          text_color: stickerData.textColor,
          text_size: stickerData.textSize,
          text_position: stickerData.textPosition,
          background_effect: stickerData.backgroundEffect,
          animation_type: stickerData.animationType,
          is_public: stickerData.isPublic,
          price_pi: stickerData.pricePi
        });

      if (insertError) throw insertError;

      toast({
        title: "Success!",
        description: "Your custom sticker has been created",
      });

      onStickerCreated();
      onClose();
    } catch (error) {
      console.error('Error creating custom sticker:', error);
      toast({
        title: "Error",
        description: "Failed to create custom sticker",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          Create Custom Sticker
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Creation Type Tabs */}
        <Tabs value={creationType} onValueChange={(value: "upload" | "lottie") => setCreationType(value)}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Upload Image
            </TabsTrigger>
            <TabsTrigger value="lottie" className="flex items-center gap-2">
              <Link className="h-4 w-4" />
              Lottie Animation
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="image">Base Image</Label>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  onClick={() => document.getElementById('image-input')?.click()}
                  className="flex items-center gap-2"
                >
                  <Upload className="h-4 w-4" />
                  Choose Image
                </Button>
                <input
                  id="image-input"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                {imageFile && <span className="text-sm text-gray-600">{imageFile.name}</span>}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="lottie" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="lottie-url">LottieFiles URL or JSON URL</Label>
              <Input
                id="lottie-url"
                value={lottieUrl}
                onChange={(e) => handleLottieUrlChange(e.target.value)}
                placeholder="https://lottiefiles.com/animations/... or https://..."
              />
              <p className="text-xs text-gray-500">
                Paste a LottieFiles animation URL or direct JSON URL
              </p>
            </div>
          </TabsContent>
        </Tabs>

        {/* Preview */}
        {previewUrl && (
          <div className="text-center">
            <Label>Preview</Label>
            <div className="relative inline-block mt-2">
              <div className="relative w-32 h-32">
                <AnimatedSticker
                  src={previewUrl}
                  alt="Preview"
                  isLottie={creationType === "lottie"}
                  className={`w-32 h-32 object-cover rounded-lg ${
                    stickerData.animationType === 'pulse' ? 'animate-pulse' :
                    stickerData.animationType === 'bounce' ? 'animate-bounce' :
                    stickerData.animationType === 'spin' ? 'animate-spin' : ''
                  }`}
                  style={{
                    filter: stickerData.backgroundEffect !== 'none' ? 
                      `${stickerData.backgroundEffect}(1)` : 'none'
                  }}
                />
                {stickerData.overlayText && (
                  <div
                    className={`absolute inset-0 flex items-center justify-center text-white font-bold pointer-events-none ${
                      stickerData.textPosition === 'top' ? 'items-start pt-2' :
                      stickerData.textPosition === 'bottom' ? 'items-end pb-2' :
                      'items-center'
                    }`}
                    style={{
                      color: stickerData.textColor,
                      fontSize: `${stickerData.textSize}px`,
                      textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
                    }}
                  >
                    {stickerData.overlayText}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Sticker Name *</Label>
            <Input
              id="name"
              value={stickerData.name}
              onChange={(e) => setStickerData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="My awesome sticker"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Price (π)</Label>
            <Input
              id="price"
              type="number"
              min="0"
              step="0.1"
              value={stickerData.pricePi}
              onChange={(e) => setStickerData(prev => ({ ...prev, pricePi: parseFloat(e.target.value) || 0 }))}
              placeholder="0"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={stickerData.description}
            onChange={(e) => setStickerData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Describe your sticker..."
          />
        </div>

        {/* Text Overlay */}
        <div className="space-y-4">
          <Label className="flex items-center gap-2">
            <Type className="h-4 w-4" />
            Text Overlay
          </Label>
          
          <Input
            value={stickerData.overlayText}
            onChange={(e) => setStickerData(prev => ({ ...prev, overlayText: e.target.value }))}
            placeholder="Add text to your sticker"
          />

          {stickerData.overlayText && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Text Color</Label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={stickerData.textColor}
                      onChange={(e) => setStickerData(prev => ({ ...prev, textColor: e.target.value }))}
                      className="w-8 h-8 border rounded"
                    />
                    <Input
                      value={stickerData.textColor}
                      onChange={(e) => setStickerData(prev => ({ ...prev, textColor: e.target.value }))}
                      placeholder="#ffffff"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Text Position</Label>
                  <Select
                    value={stickerData.textPosition}
                    onValueChange={(value) => setStickerData(prev => ({ ...prev, textPosition: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="top">Top</SelectItem>
                      <SelectItem value="center">Center</SelectItem>
                      <SelectItem value="bottom">Bottom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Text Size: {stickerData.textSize}px</Label>
                <Slider
                  value={[stickerData.textSize]}
                  onValueChange={([value]) => setStickerData(prev => ({ ...prev, textSize: value }))}
                  min={12}
                  max={48}
                  step={2}
                  className="w-full"
                />
              </div>
            </>
          )}
        </div>

        {/* Effects */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Animation</Label>
            <Select
              value={stickerData.animationType}
              onValueChange={(value) => setStickerData(prev => ({ ...prev, animationType: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="pulse">Pulse</SelectItem>
                <SelectItem value="bounce">Bounce</SelectItem>
                <SelectItem value="spin">Spin</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Background Effect</Label>
            <Select
              value={stickerData.backgroundEffect}
              onValueChange={(value) => setStickerData(prev => ({ ...prev, backgroundEffect: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="blur">Blur</SelectItem>
                <SelectItem value="brightness">Brightness</SelectItem>
                <SelectItem value="contrast">Contrast</SelectItem>
                <SelectItem value="sepia">Sepia</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Public Settings */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label>Make Public</Label>
            <p className="text-sm text-gray-600">Allow others to purchase this sticker</p>
          </div>
          <Switch
            checked={stickerData.isPublic}
            onCheckedChange={(checked) => setStickerData(prev => ({ ...prev, isPublic: checked }))}
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleCreateSticker}
            disabled={loading || (!imageFile && !lottieUrl) || !stickerData.name}
          >
            {loading ? "Creating..." : "Create Sticker"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomStickerCreator;
