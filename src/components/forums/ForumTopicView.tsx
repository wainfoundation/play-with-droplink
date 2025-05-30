
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MessageSquare, Eye, Pin, Lock, Send } from 'lucide-react';
import { useForumReplies } from '@/hooks/useForumReplies';
import { supabase } from '@/integrations/supabase/client';
import { formatDistanceToNow } from 'date-fns';
import { useAuth } from '@/hooks/useAuth';

interface ForumTopicViewProps {
  topicId: string;
  topicTitle: string;
  onBack: () => void;
}

interface TopicDetails {
  id: string;
  title: string;
  content: string;
  is_pinned: boolean;
  is_locked: boolean;
  view_count: number;
  reply_count: number;
  created_at: string;
  user_profiles?: {
    username: string;
    avatar_url?: string;
  };
}

const ForumTopicView = ({ topicId, topicTitle, onBack }: ForumTopicViewProps) => {
  const { user } = useAuth();
  const { replies, loading, createReply } = useForumReplies(topicId);
  const [topic, setTopic] = useState<TopicDetails | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchTopicDetails();
    incrementViewCount();
  }, [topicId]);

  const fetchTopicDetails = async () => {
    try {
      const { data, error } = await supabase
        .from('forum_topics')
        .select(`
          *,
          user_profiles!inner(username, avatar_url)
        `)
        .eq('id', topicId)
        .single();

      if (error) throw error;
      setTopic(data);
    } catch (err) {
      console.error('Error fetching topic:', err);
    }
  };

  const incrementViewCount = async () => {
    try {
      await supabase
        .from('forum_topics')
        .update({ view_count: supabase.sql`view_count + 1` })
        .eq('id', topicId);
    } catch (err) {
      console.error('Error incrementing view count:', err);
    }
  };

  const handleSubmitReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyContent.trim() || !user) return;

    setSubmitting(true);
    try {
      await createReply(replyContent.trim());
      setReplyContent('');
    } catch (err) {
      console.error('Error submitting reply:', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (!topic) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 rounded w-1/4"></div>
        <div className="h-32 bg-gray-200 rounded"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Topics
        </Button>
      </div>

      {/* Topic Header */}
      <Card>
        <CardHeader>
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
          <CardTitle className="text-2xl">{topic.title}</CardTitle>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src={topic.user_profiles?.avatar_url} />
                <AvatarFallback>
                  {topic.user_profiles?.username?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">@{topic.user_profiles?.username}</p>
                <p className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(topic.created_at), { addSuffix: true })}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <MessageSquare size={14} />
                {topic.reply_count} replies
              </span>
              <span className="flex items-center gap-1">
                <Eye size={14} />
                {topic.view_count} views
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none">
            <p className="whitespace-pre-wrap">{topic.content}</p>
          </div>
        </CardContent>
      </Card>

      {/* Replies */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">
          Replies ({replies.length})
        </h3>
        
        {replies.map((reply) => (
          <Card key={reply.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Avatar className="w-6 h-6">
                  <AvatarImage src={reply.user_profiles?.avatar_url} />
                  <AvatarFallback>
                    {reply.user_profiles?.username?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">@{reply.user_profiles?.username}</span>
                <span className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(reply.created_at), { addSuffix: true })}
                </span>
                {reply.is_solution && (
                  <Badge variant="default" className="text-xs ml-auto">
                    Solution
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <p className="whitespace-pre-wrap">{reply.content}</p>
              </div>
            </CardContent>
          </Card>
        ))}

        {replies.length === 0 && (
          <div className="text-center py-8">
            <MessageSquare className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No replies yet</h3>
            <p className="text-muted-foreground">
              Be the first to reply to this topic!
            </p>
          </div>
        )}
      </div>

      {/* Reply Form */}
      {user && !topic.is_locked ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Add a Reply</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitReply} className="space-y-4">
              <Textarea
                placeholder="Write your reply here..."
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                rows={4}
                required
              />
              <div className="flex justify-end">
                <Button type="submit" disabled={submitting || !replyContent.trim()}>
                  <Send className="w-4 h-4 mr-2" />
                  {submitting ? 'Posting...' : 'Post Reply'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : !user ? (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground mb-4">
              You need to be logged in to reply to this topic.
            </p>
            <Button variant="outline">Sign In to Reply</Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="text-center py-8">
            <Lock className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
            <p className="text-muted-foreground">
              This topic is locked and no longer accepting replies.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ForumTopicView;
