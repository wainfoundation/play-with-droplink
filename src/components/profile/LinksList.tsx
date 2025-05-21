
import { ExternalLink, Pi, Instagram, Twitter, Facebook, Linkedin, Youtube, Link, Star } from "lucide-react";

interface Link {
  id: string;
  title: string;
  url: string;
  icon: string;
  clicks: number;
  type?: "featured" | "social" | "regular";
}

interface LinksListProps {
  links: Link[];
  onLinkClick: (link: Link) => void;
  processingTip: boolean;
  onTipClick: () => void;
}

const LinksList = ({ links, onLinkClick, processingTip, onTipClick }: LinksListProps) => {
  // Group links by type
  const featuredLinks = links.filter(link => link.type === "featured" || (!link.type && links.indexOf(link) < 2));
  const socialLinks = links.filter(link => link.type === "social");
  const regularLinks = links.filter(link => link.type === "regular" || (!link.type && links.indexOf(link) >= 2 && link.url !== "#tip-in-pi"));
  const tipLink = links.find(link => link.url === "#tip-in-pi");
  
  // Helper function to render the appropriate icon
  const renderIcon = (link: Link) => {
    if (link.url === "#tip-in-pi") {
      return <Pi className="h-4 w-4" />;
    }
    
    // Handle social icons
    if (link.type === "social") {
      switch (link.icon.toLowerCase()) {
        case "instagram": return <Instagram className="h-4 w-4" />;
        case "twitter": return <Twitter className="h-4 w-4" />;
        case "facebook": return <Facebook className="h-4 w-4" />;
        case "linkedin": return <Linkedin className="h-4 w-4" />;
        case "youtube": return <Youtube className="h-4 w-4" />;
        default: return <Link className="h-4 w-4" />;
      }
    }
    
    // For featured links
    if (link.type === "featured") {
      return <Star className="h-4 w-4" />;
    }
    
    // For regular links or emoji icons
    return <span role="img" aria-label={link.title}>{link.icon}</span>;
  };

  return (
    <div className="w-full space-y-5">
      {/* Featured Links */}
      {featuredLinks.length > 0 && (
        <div className="space-y-3">
          {featuredLinks.map((link, index) => (
            <button 
              key={link.id || index} 
              onClick={() => onLinkClick(link)}
              className="block w-full text-left px-4 py-3 rounded-lg transition-all hover:scale-[1.02] shadow-md
                bg-primary text-white font-medium hover:bg-secondary"
            >
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  {renderIcon(link)}
                  {link.title}
                </span>
                <ExternalLink className="h-4 w-4" />
              </div>
            </button>
          ))}
        </div>
      )}
      
      {/* Social Links - Displayed in a horizontal row */}
      {socialLinks.length > 0 && (
        <div className="flex justify-center gap-3 py-2">
          {socialLinks.map((link, index) => (
            <button 
              key={link.id || index} 
              onClick={() => onLinkClick(link)}
              className="p-3 rounded-full transition-all hover:scale-110 shadow-md bg-white text-primary border border-primary hover:bg-muted"
            >
              {renderIcon(link)}
            </button>
          ))}
        </div>
      )}
      
      {/* Regular Links */}
      {regularLinks.length > 0 && (
        <div className="space-y-3">
          {regularLinks.map((link, index) => (
            <button 
              key={link.id || index} 
              onClick={() => onLinkClick(link)}
              className="block w-full text-left px-4 py-3 rounded-lg transition-all hover:scale-[1.02] shadow-md
                bg-white text-primary border border-primary font-medium hover:bg-muted"
            >
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  {renderIcon(link)}
                  {link.title}
                </span>
                <ExternalLink className="h-4 w-4" />
              </div>
            </button>
          ))}
        </div>
      )}
      
      {/* Tip Button */}
      {tipLink && (
        <button 
          onClick={onTipClick}
          disabled={processingTip}
          className="block w-full text-left px-4 py-3 rounded-lg transition-all hover:scale-[1.02] shadow-md
            bg-white text-primary border border-primary font-medium hover:bg-muted"
        >
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Pi className="h-4 w-4" />
              {processingTip ? "Processing..." : tipLink.title}
            </span>
            <ExternalLink className="h-4 w-4" />
          </div>
        </button>
      )}
      
      {/* Recent Tips section will be added here by the RecentTips component */}
    </div>
  );
};

export default LinksList;
