
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@/context/UserContext";
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
  const { user, profile } = useUser();
  const { links, isLoading, fetchLinks, handleReorderLink } = useLinks(user?.id);

  useEffect(() => {
    if (profile?.username) {
      const baseUrl = window.location.origin;
      setProfileUrl(`${baseUrl}/@${profile.username}`);
    }
  }, [profile]);

  const renderContent = () => {
    if (isLoading) {
      return <LinksLoadingState />;
    }
    
    if (!isAddingLink && links.length === 0) {
      return <EmptyLinksState onAddClick={() => setIsAddingLink(true)} />;
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
          <AddLinkButton onClick={() => setIsAddingLink(true)} />
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
