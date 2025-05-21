
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProfileUrlDisplayProps {
  profileUrl: string;
  username: string | null;
}

const ProfileUrlDisplay = ({ profileUrl, username }: ProfileUrlDisplayProps) => {
  const { toast } = useToast();

  const handleCopyProfileUrl = () => {
    navigator.clipboard.writeText(profileUrl);
    toast({
      title: "Link Copied",
      description: "Your profile URL has been copied to clipboard",
    });
  };

  const handleViewProfile = () => {
    if (username) {
      window.open(`/@${username}`, '_blank');
    }
  };

  if (!username) return null;

  return (
    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
      <p className="text-sm font-medium mb-2">Your public profile URL</p>
      <div className="flex gap-2">
        <Input 
          value={profileUrl} 
          readOnly 
          className="bg-white"
        />
        <Button size="icon" variant="outline" onClick={handleCopyProfileUrl}>
          <Copy className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="outline" onClick={handleViewProfile}>
          <ExternalLink className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ProfileUrlDisplay;
