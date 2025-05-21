
import { ExternalLink } from "lucide-react";

interface Link {
  id: string;
  title: string;
  url: string;
  icon: string;
  clicks: number;
}

interface LinksListProps {
  links: Link[];
  onLinkClick: (link: Link) => void;
  processingTip: boolean;
}

const LinksList = ({ links, onLinkClick, processingTip }: LinksListProps) => {
  return (
    <div className="w-full space-y-3">
      {links.map((link, index) => (
        <button 
          key={link.id || index} 
          onClick={() => onLinkClick(link)}
          disabled={link.url === "#tip-in-pi" && processingTip}
          className={`block w-full text-left px-4 py-3 rounded-lg transition-all hover:scale-[1.02] shadow-md
            ${index < 2 
              ? "bg-primary text-white font-medium hover:bg-secondary" 
              : "bg-white text-primary border border-primary font-medium hover:bg-muted"
            }`}
        >
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <span>{link.icon}</span> 
              {link.url === "#tip-in-pi" && processingTip ? "Processing..." : link.title}
            </span>
            <ExternalLink className="h-4 w-4" />
          </div>
        </button>
      ))}
    </div>
  );
};

export default LinksList;
