
import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, Clock, User, Tag, ThumbsUp, ThumbsDown, Share2, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { helpArticles, getFeaturedArticles } from "@/data/helpArticles";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const HelpArticleDetail = () => {
  const { articleId } = useParams();
  const [helpfulVote, setHelpfulVote] = useState<'yes' | 'no' | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  
  const article = helpArticles.find(a => a.id === articleId);
  const relatedArticles = getFeaturedArticles().filter(a => a.id !== articleId).slice(0, 3);
  
  if (!article) {
    return <Navigate to="/help" replace />;
  }

  const handleHelpfulVote = (vote: 'yes' | 'no') => {
    setHelpfulVote(vote);
    toast({
      title: "Thank you for your feedback!",
      description: vote === 'yes' ? "Glad this article was helpful." : "We'll work on improving this content.",
    });
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href,
      });
    } catch (error) {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "Article URL has been copied to your clipboard.",
      });
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "Bookmark removed" : "Article bookmarked!",
      description: isBookmarked ? "Removed from your bookmarks" : "Added to your bookmarks",
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Button variant="ghost" asChild className="mb-6">
        <Link to="/help" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Help Center
        </Link>
      </Button>

      {/* Article Header */}
      <Card>
        <CardHeader>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="outline">{article.category}</Badge>
            {article.featured && <Badge>Featured</Badge>}
            {article.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                <Tag className="h-3 w-3 mr-1" />
                {tag}
              </Badge>
            ))}
          </div>
          
          <CardTitle className="text-3xl mb-4">{article.title}</CardTitle>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                Droplink Team
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {article.readTime} read
              </div>
              <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleBookmark}
                className={isBookmarked ? "bg-primary text-primary-foreground" : ""}
              >
                <Bookmark className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div 
            className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-ul:text-muted-foreground prose-ol:text-muted-foreground prose-li:text-muted-foreground prose-a:text-primary hover:prose-a:text-primary/80"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </CardContent>
      </Card>

      <Separator className="my-8" />

      {/* Feedback Section */}
      <Card>
        <CardContent className="pt-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4">Was this article helpful?</h3>
            <div className="flex justify-center gap-4 mb-6">
              <Button 
                variant={helpfulVote === 'yes' ? "default" : "outline"}
                onClick={() => handleHelpfulVote('yes')}
                className="flex items-center gap-2"
                disabled={helpfulVote !== null}
              >
                <ThumbsUp className="h-4 w-4" />
                Yes, it was helpful
              </Button>
              <Button 
                variant={helpfulVote === 'no' ? "default" : "outline"}
                onClick={() => handleHelpfulVote('no')}
                className="flex items-center gap-2"
                disabled={helpfulVote !== null}
              >
                <ThumbsDown className="h-4 w-4" />
                No, I need more help
              </Button>
            </div>
            
            {helpfulVote && (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {helpfulVote === 'yes' 
                    ? "Great! We're glad this article helped you."
                    : "We're sorry this wasn't helpful. Please let us know how we can improve."
                  }
                </p>
                <div className="flex flex-col sm:flex-row gap-2 justify-center">
                  <Button variant="outline" asChild>
                    <Link to="/contact">Contact Support</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/community">Join Community</Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <>
          <Separator className="my-8" />
          <Card>
            <CardHeader>
              <CardTitle>Related Articles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {relatedArticles.map((relatedArticle) => (
                  <div key={relatedArticle.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                    <div className="mb-2">
                      <Badge variant="outline" className="text-xs">{relatedArticle.category}</Badge>
                    </div>
                    <h4 className="font-medium mb-2">
                      <Link 
                        to={`/help/article/${relatedArticle.id}`} 
                        className="hover:text-primary transition-colors"
                      >
                        {relatedArticle.title}
                      </Link>
                    </h4>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {relatedArticle.excerpt}
                    </p>
                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                      <span>{relatedArticle.readTime}</span>
                      <Link 
                        to={`/help/article/${relatedArticle.id}`}
                        className="text-primary hover:underline font-medium"
                      >
                        Read more →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default HelpArticleDetail;
