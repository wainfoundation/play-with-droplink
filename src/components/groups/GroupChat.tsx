
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Send, Edit2, Trash2, Reply } from "lucide-react";
import { useGroupChat, GroupMessage } from "@/hooks/useGroupChat";
import { formatDistanceToNow } from "date-fns";

interface GroupChatProps {
  groupId: string;
  groupName: string;
}

const GroupChat = ({ groupId, groupName }: GroupChatProps) => {
  const [message, setMessage] = useState("");
  const [replyTo, setReplyTo] = useState<GroupMessage | null>(null);
  const [editingMessage, setEditingMessage] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { messages, loading, sending, sendMessage, editMessage, deleteMessage } = useGroupChat(groupId);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    await sendMessage(message, replyTo?.id);
    setMessage("");
    setReplyTo(null);
  };

  const handleEditMessage = async (messageId: string) => {
    if (!editContent.trim()) return;
    
    await editMessage(messageId, editContent);
    setEditingMessage(null);
    setEditContent("");
  };

  const startEdit = (msg: GroupMessage) => {
    setEditingMessage(msg.id);
    setEditContent(msg.content);
  };

  const cancelEdit = () => {
    setEditingMessage(null);
    setEditContent("");
  };

  if (loading) {
    return (
      <Card className="h-[600px] flex items-center justify-center">
        <div>Loading chat...</div>
      </Card>
    );
  }

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">{groupName} Chat</CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        {/* Messages area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className="group">
              {msg.reply_to_id && (
                <div className="ml-12 mb-1 text-xs text-muted-foreground border-l-2 border-muted pl-2">
                  Replying to previous message
                </div>
              )}
              
              <div className="flex gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={msg.user_profiles?.avatar_url} />
                  <AvatarFallback>
                    {msg.user_profiles?.username?.[0]?.toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">
                      {msg.user_profiles?.display_name || msg.user_profiles?.username || 'Unknown User'}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(msg.created_at), { addSuffix: true })}
                    </span>
                    {msg.is_edited && (
                      <Badge variant="outline" className="text-xs">
                        edited
                      </Badge>
                    )}
                  </div>
                  
                  {editingMessage === msg.id ? (
                    <div className="flex gap-2">
                      <Input
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleEditMessage(msg.id)}
                        className="text-sm"
                      />
                      <Button
                        size="sm"
                        onClick={() => handleEditMessage(msg.id)}
                      >
                        Save
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={cancelEdit}
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <div className="text-sm bg-muted/30 rounded-lg p-2">
                      {msg.content}
                    </div>
                  )}
                  
                  <div className="flex gap-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 px-2 text-xs"
                      onClick={() => setReplyTo(msg)}
                    >
                      <Reply className="h-3 w-3 mr-1" />
                      Reply
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 px-2 text-xs"
                      onClick={() => startEdit(msg)}
                    >
                      <Edit2 className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 px-2 text-xs text-destructive"
                      onClick={() => deleteMessage(msg.id)}
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Reply indicator */}
        {replyTo && (
          <div className="px-4 py-2 bg-muted/50 border-t border-b flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Replying to {replyTo.user_profiles?.username}
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setReplyTo(null)}
            >
              Cancel
            </Button>
          </div>
        )}
        
        {/* Message input */}
        <form onSubmit={handleSendMessage} className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              disabled={sending}
              className="flex-1"
            />
            <Button type="submit" disabled={sending || !message.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default GroupChat;
