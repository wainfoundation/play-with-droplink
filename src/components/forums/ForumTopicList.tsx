
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageSquare, Eye, Pin, Lock, Plus, ArrowLeft } from 'lucide-react';
import { useForumTopics } from '@/hooks/useForumTopics';
import { formatDistanceToNow } from 'date-fns';
import CreateTopicDialog from './CreateTopicDialog';

interface ForumTopicListProps {
  categoryId: string;
  categoryName: string;
  onTopicSelect: (topicId: string, topicTitle: string) => void;
  onBack: () => void;
}

const ForumTopicList = ({ categoryId, categoryName, onTopicSelect, onBack }: ForumTopicListProps) => {
  const { topics, loading, error, createTopic } = useForumTopics(categoryId);
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-full"></div>
            </CardHeader>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Error loading topics: {error}</p>
      </div>
    );
  }

  const handleCreateTopic = async (data: { title: string; content: string }) => {
    try {
      await createTopic({
        category_id: categoryId,
        title: data.title,
        content: data.content
      });
      setShowCreateDialog(false);
    } catch (err) {
      console.error('Error creating topic:', err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Categories
          </Button>
          <div>
            <h2 className="text-2xl font-bold">{categoryName}</h2>
            <p className="text-muted-foreground">{topics.length} topics</p>
          </div>
        </div>
        <Button onClick={() => setShowCreateDialog(true)}>
          <Plus className="w-4 h-4 mr-2" />
          New Topic
        </Button>
      </div>

      <div className="space-y-4">
        {topics.map((topic) => (
          <Card 
            key={topic.id} 
            className="hover:shadow-md transition-shadow duration-200 cursor-pointer"
            onClick={() => onTopicSelect(topic.id, topic.title)}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {topic.is_pinned && (
                      <Badge variant="secondary" className="text-xs">
                        <Pin className="w-3 h-3 mr-1" />
                        Pinned
                      </Badge>
                    )}
                    {topic.is_locked && (
                      <Badge variant="outline" className="text-xs">
                        <Lock className="w-3 h-3 mr-1" />
                        Locked
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg hover:text-primary transition-colors">
                    {topic.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2 mt-2">
                    {topic.content.substring(0, 150)}...
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src={topic.user_profiles?.avatar_url} />
                    <AvatarFallback>
                      {topic.user_profiles?.username?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-muted-foreground">
                    by @{topic.user_profiles?.username}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(topic.created_at), { addSuffix: true })}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MessageSquare size={14} />
                    {topic.reply_count}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye size={14} />
                    {topic.view_count}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {topics.length === 0 && (
        <div className="text-center py-12">
          <MessageSquare className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No topics yet</h3>
          <p className="text-muted-foreground mb-4">
            Be the first to start a discussion in this category!
          </p>
          <Button onClick={() => setShowCreateDialog(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create First Topic
          </Button>
        </div>
      )}

      <CreateTopicDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        onSubmit={handleCreateTopic}
        categoryName={categoryName}
      />
    </div>
  );
};

export default ForumTopicList;
