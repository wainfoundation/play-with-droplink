
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@/context/UserContext";
import { toast } from "@/hooks/use-toast";
import { playSound, sounds } from '@/utils/sounds';
import { useUpgradeModal } from "@/hooks/useUpgradeModal";
import { useUserPlan } from "@/hooks/use-user-plan";
import ProfileUrlDisplay from "./ProfileUrlDisplay";
import EmptyLinksState from "./EmptyLinksState";
import LinksLoadingState from "./LinksLoadingState";
import LinkForm from "./LinkForm";
import LinkItem from "./LinkItem";
import AddLinkButton from "./AddLinkButton";
import { useLinks } from "@/hooks/useLinks";

const LinksSection = () => {
  const [isAddingLink, setIsAddingLink] = useState(false);
  const [isEditingLink, setIsEditingLink] = useState<string | null>(null);
  const [profileUrl, setProfileUrl] = useState<string>("");
  const [previousLinkCount, setPreviousLinkCount] = useState(0);
  const { user, profile } = useUser();
  const { links, isLoading, fetchLinks, handleReorderLink } = useLinks(user?.id);
  const { plan, limits } = useUserPlan();
  const { openUpgradeModal } = useUpgradeModal();

  useEffect(() => {
    if (profile?.username) {
      setProfileUrl(`https://droplink.space/@${profile.username}`);
    }
  }, [profile]);

  // Check if user has completed initial link setup
  useEffect(() => {
    // Only run this effect if links are loaded and not currently adding/editing
    if (!isLoading && links && previousLinkCount !== links.length) {
      // If user went from 0 to at least 1 link, consider setup complete
      if (previousLinkCount === 0 && links.length > 0) {
        playSound(sounds.setupComplete, 0.5);
        toast({
          title: "Setup Complete!",
          description: "Great job! You've added your first link.",
        });
      }
      
      // Update the previous count
      setPreviousLinkCount(links.length);
    }
  }, [links, isLoading, previousLinkCount]);

  const handleAddLinkClick = () => {
    // Check if user has reached their link limit (free plan = 1 link only)
    if (plan === 'free' && links.length >= limits.maxLinks) {
      openUpgradeModal("Additional Links");
      return;
    }
    
    setIsAddingLink(true);
  };

  const renderContent = () => {
    if (isLoading) {
      return <LinksLoadingState />;
    }
    
    if (!isAddingLink && links.length === 0) {
      return <EmptyLinksState onAddClick={handleAddLinkClick} />;
    }
    
    return (
      <div className="space-y-4">
        {isAddingLink && (
          <LinkForm 
            userId={user!.id} 
            onCancel={() => setIsAddingLink(false)}
            onSuccess={() => {
              setIsAddingLink(false);
              fetchLinks();
            }}
          />
        )}
        
        {isEditingLink && (
          <LinkForm 
            linkId={isEditingLink}
            userId={user!.id} 
            onCancel={() => setIsEditingLink(null)}
            onSuccess={() => {
              setIsEditingLink(null);
              fetchLinks();
            }}
            initialData={links.find(link => link.id === isEditingLink)}
          />
        )}
        
        {links.map((link, index) => (
          <LinkItem
            key={link.id}
            link={link}
            onEdit={(linkId) => setIsEditingLink(linkId)}
            onDeleted={fetchLinks}
            onReorder={handleReorderLink}
            isFirst={index === 0}
            isLast={index === links.length - 1}
          />
        ))}
        
        {!isAddingLink && !isEditingLink && (
          <AddLinkButton onClick={handleAddLinkClick} />
        )}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Links</CardTitle>
        <CardDescription>
          Manage and organize all your links in one place
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ProfileUrlDisplay 
          profileUrl={profileUrl} 
          username={profile?.username} 
        />
        
        {renderContent()}
      </CardContent>
    </Card>
  );
};

export default LinksSection;
