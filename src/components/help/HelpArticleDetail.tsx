
import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, Clock, User, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { helpArticles, getFeaturedArticles } from "@/data/helpArticles";

const HelpArticleDetail = () => {
  const { slug } = useParams();
  
  const article = helpArticles.find(a => a.id === slug);
  const relatedArticles = getFeaturedArticles().filter(a => a.id !== slug).slice(0, 3);
  
  if (!article) {
    return <Navigate to="/help" replace />;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Button variant="ghost" asChild className="mb-6">
        <Link to="/help" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Help Center
        </Link>
      </Button>

      <Card>
        <CardHeader>
          <div className="flex flex-wrap gap-2 mb-4">
            {article.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                <Tag className="h-3 w-3 mr-1" />
                {tag}
              </Badge>
            ))}
          </div>
          
          <CardTitle className="text-3xl mb-4">{article.title}</CardTitle>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              Droplink Team
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {article.readTime} read
            </div>
            <span>{article.publishedAt}</span>
          </div>
        </CardHeader>
        
        <CardContent>
          <div 
            className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-ul:text-muted-foreground prose-ol:text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </CardContent>
      </Card>

      {/* Feedback Section */}
      <Card className="mt-8">
        <CardContent className="pt-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4">Was this article helpful?</h3>
            <div className="flex justify-center gap-4 mb-6">
              <Button variant="outline" className="flex items-center gap-2">
                👍 Yes, it was helpful
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                👎 No, I need more help
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Have suggestions for improving this article? 
            </p>
            <Button variant="ghost" asChild>
              <Link to="/contact">Contact Support</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Related Articles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedArticles.map((relatedArticle) => (
                <div key={relatedArticle.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                  <h4 className="font-medium mb-2">
                    <Link to={`/help/article/${relatedArticle.id}`} className="hover:text-primary">
                      {relatedArticle.title}
                    </Link>
                  </h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    {relatedArticle.excerpt}
                  </p>
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <span>{relatedArticle.category}</span>
                    <span>{relatedArticle.readTime}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default HelpArticleDetail;
