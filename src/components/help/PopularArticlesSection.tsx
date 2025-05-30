
import { Link } from "react-router-dom";
import { Clock, User, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
}

interface PopularArticlesSectionProps {
  popularArticles: Article[];
}

const PopularArticlesSection = ({ popularArticles }: PopularArticlesSectionProps) => {
  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Popular Articles</h2>
          <p className="text-muted-foreground text-lg">Most helpful guides for Droplink users</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {popularArticles.map((article) => (
            <Card key={article.id} className="hover:shadow-lg transition-all duration-300 group">
              <CardHeader>
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="outline">{article.category}</Badge>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{article.readTime}</span>
                  </div>
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  <Link to={`/help/article/${article.id}`}>
                    {article.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6 leading-relaxed">{article.excerpt}</p>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span>Droplink Team</span>
                  </div>
                  <Button variant="ghost" size="sm" asChild className="group-hover:translate-x-1 transition-transform">
                    <Link to={`/help/article/${article.id}`}>
                      Read More
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Button variant="outline" size="lg" asChild>
            <Link to="/help">Browse All Articles</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PopularArticlesSection;
