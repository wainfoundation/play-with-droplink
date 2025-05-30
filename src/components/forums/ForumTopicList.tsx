
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageSquare, Eye, Pin, Lock, Plus } from 'lucide-react';
import { useForumTopics } from '@/hooks/useForumTopics';
import { formatDistanceToNow } from 'date-fns';

interface ForumTopicListProps {
  categoryId?: string;
  onTopicSelect: (topicId: string, title: string) => void;
  onCreateTopic: () => void;
}

const ForumTopicList = ({ categoryId, onTopicSelect, onCreateTopic }: ForumTopicListProps) => {
  const { topics, loading, error } = useForumTopics(categoryId);

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-20 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Error loading topics: {error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Forum Topics</h2>
        <Button onClick={onCreateTopic}>
          <Plus className="w-4 h-4 mr-2" />
          New Topic
        </Button>
      </div>

      <div className="space-y-4">
        {topics.length === 0 ? (
          <div className="text-center py-8">
            <MessageSquare className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No topics yet</h3>
            <p className="text-muted-foreground mb-4">
              Be the first to start a discussion in this category!
            </p>
            <Button onClick={onCreateTopic}>
              <Plus className="w-4 h-4 mr-2" />
              Create First Topic
            </Button>
          </div>
        ) : (
          topics.map((topic) => (
            <Card
              key={topic.id}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onTopicSelect(topic.id, topic.title)}
            >
              <CardHeader className="pb-3">
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
                    <CardTitle className="text-lg mb-2">{topic.title}</CardTitle>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {topic.content}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2 ml-4">
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
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback>
                        U
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">User</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(topic.created_at), { addSuffix: true })}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default ForumTopicList;
