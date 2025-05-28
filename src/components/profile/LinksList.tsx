
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Pi } from "lucide-react";
import TipButton from "@/components/tipping/TipButton";

interface LinkProps {
  id: string;
  title: string;
  url: string;
  icon: string;
  clicks: number;
  type?: "featured" | "social" | "regular";
}

interface LinksListProps {
  links: LinkProps[];
  onLinkClick: (link: LinkProps) => void;
  processingTip: boolean;
  onTipClick: () => void;
}

const LinksList = ({ 
  links, 
  onLinkClick, 
  processingTip, 
  onTipClick 
}: LinksListProps) => {
  return (
    <div className="space-y-3">
      {links.map((link) => {
        // Special handling for tip links
        if (link.url === "#tip-in-pi" || link.title.toLowerCase().includes("tip")) {
          return (
            <TipButton
              key={link.id}
              recipientId="demo-user-id"
              recipientUsername="demo"
              className="w-full py-4 text-center"
              variant="default"
              size="lg"
            />
          );
        }

        return (
          <Button
            key={link.id}
            variant="outline"
            className="w-full py-4 flex items-center justify-start gap-4 hover:bg-secondary/50 transition-colors"
            onClick={() => onLinkClick(link)}
            disabled={processingTip}
          >
            <span className="text-xl">{link.icon}</span>
            <span className="text-left">{link.title}</span>
            {link.type === 'featured' && (
              <Pi className="ml-auto text-gray-400" size={16} />
            )}
          </Button>
        );
      })}
    </div>
  );
};

export default LinksList;
