
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Loader2, Download, Check, ExternalLink } from 'lucide-react';
import { usePiProfileImport } from '@/hooks/usePiProfileImport';
import { useUser } from '@/context/UserContext';

const PiProfileImport = () => {
  const [piUsername, setPiUsername] = useState('');
  const { user } = useUser();
  const { isImporting, importedData, importPiProfile, savePiProfileData, setImportedData } = usePiProfileImport();

  const handleImport = async () => {
    if (!piUsername.trim()) return;
    
    const username = piUsername.startsWith('@') ? piUsername.slice(1) : piUsername;
    await importPiProfile(username);
  };

  const handleSave = async () => {
    if (!importedData || !user) return;
    
    const success = await savePiProfileData(importedData, user.id);
    if (success) {
      setImportedData(null);
      setPiUsername('');
    }
  };

  const handleCancel = () => {
    setImportedData(null);
    setPiUsername('');
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="w-5 h-5" />
          Import from Pi Network Profile
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Import your avatar, bio, and links from your public Pi Network profile
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {!importedData ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="pi-username">Pi Network Username</Label>
              <div className="flex gap-2">
                <Input
                  id="pi-username"
                  placeholder="Enter your Pi username (without @)"
                  value={piUsername}
                  onChange={(e) => setPiUsername(e.target.value)}
                  disabled={isImporting}
                />
                <Button 
                  onClick={handleImport} 
                  disabled={!piUsername.trim() || isImporting}
                >
                  {isImporting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Importing...
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 mr-2" />
                      Import
                    </>
                  )}
                </Button>
              </div>
            </div>
            
            <div className="text-xs text-muted-foreground">
              <p>• Your Pi Network profile must be public</p>
              <p>• We'll import your avatar, bio, and external links</p>
              <p>• Your existing Droplink data won't be overwritten</p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-green-600">
              <Check className="w-4 h-4" />
              <span className="font-medium">Profile data imported successfully!</span>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold">Preview:</h3>
              
              {/* Avatar Preview */}
              {importedData.avatar && (
                <div className="flex items-center gap-3">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={importedData.avatar} alt="Pi profile avatar" />
                    <AvatarFallback>{importedData.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Profile Avatar</p>
                    <p className="text-sm text-muted-foreground">From Pi Network profile</p>
                  </div>
                </div>
              )}

              {/* Bio Preview */}
              {importedData.bio && (
                <div>
                  <p className="font-medium mb-2">Bio:</p>
                  <p className="text-sm bg-muted p-3 rounded-md">{importedData.bio}</p>
                </div>
              )}

              {/* Links Preview */}
              {importedData.links.length > 0 && (
                <div>
                  <p className="font-medium mb-2">Links ({importedData.links.length}):</p>
                  <div className="space-y-2">
                    {importedData.links.map((link, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded-md">
                        <ExternalLink className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">{link.title}</span>
                        <span className="text-sm text-muted-foreground">→</span>
                        <span className="text-sm text-muted-foreground truncate">{link.url}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <Badge variant="secondary" className="w-fit">
                Pi Network Verified
              </Badge>
            </div>

            <div className="flex gap-2 pt-4">
              <Button onClick={handleSave} className="flex-1">
                <Check className="w-4 h-4 mr-2" />
                Save to Profile
              </Button>
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PiProfileImport;
