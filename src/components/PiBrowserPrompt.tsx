
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Smartphone } from "lucide-react";
import { isRunningInPiBrowser } from "@/utils/pi-sdk";

interface PiBrowserPromptProps {
  title?: string;
  description?: string;
  showDownloadButton?: boolean;
  children?: React.ReactNode;
}

const PiBrowserPrompt = ({
  title = "For the Best Experience",
  description = "Some features of this app work best in Pi Browser. For full functionality including payments and rewards, please open this app in Pi Browser.",
  showDownloadButton = true,
  children
}: PiBrowserPromptProps) => {
  const isPiBrowser = isRunningInPiBrowser();
  
  // Don't show if already in Pi Browser
  if (isPiBrowser) {
    return null;
  }
  
  return (
    <Card className="border-2 border-primary/20 my-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Smartphone className="h-5 w-5" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      
      {children && <CardContent>{children}</CardContent>}
      
      {showDownloadButton && (
        <CardFooter>
          <Button 
            variant="outline" 
            onClick={() => window.open('https://minepi.com/download', '_blank')}
            className="w-full"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Download Pi Browser
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default PiBrowserPrompt;
