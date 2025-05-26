
import { Link } from "react-router-dom";
import { Clock, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
    <section className="py-16 px-4 bg-muted">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold mb-10 text-center">Popular Articles</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {popularArticles.map((article) => (
            <div key={article.id} className="bg-card rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
              <div className="mb-3">
                <Badge variant="outline">{article.category}</Badge>
              </div>
              <h3 className="text-xl font-bold mb-3">
                <Link to={`/help/article/${article.id}`} className="hover:text-primary transition-colors">
                  {article.title}
                </Link>
              </h3>
              <p className="mb-4 text-muted-foreground">{article.excerpt}</p>
              <div className="flex justify-between items-center">
                <Link to={`/help/article/${article.id}`} className="text-primary hover:underline font-medium">
                  Read More →
                </Link>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{article.readTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularArticlesSection;
