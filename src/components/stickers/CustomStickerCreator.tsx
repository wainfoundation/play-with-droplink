
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';

const CustomStickerCreator = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // TODO: Implement custom sticker creation when custom_stickers table is available
      toast({
        title: "Feature Coming Soon",
        description: "Custom sticker creation will be available soon!",
      });
    } catch (error) {
      console.error('Error creating sticker:', error);
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
    <Card>
      <CardHeader>
        <CardTitle>Create Custom Sticker</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Sticker Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter sticker name"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your sticker"
            />
          </div>
          
          <div>
            <Label htmlFor="image">Sticker Image</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              required
            />
          </div>
          
          <Button type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create Sticker'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CustomStickerCreator;
