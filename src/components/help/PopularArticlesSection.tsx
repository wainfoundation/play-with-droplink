
import { Link } from "react-router-dom";

interface Article {
  title: string;
  excerpt: string;
  slug: string;
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
          {popularArticles.map((article, index) => (
            <div key={index} className="bg-card rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
              <h3 className="text-xl font-bold mb-3">
                <Link to={`/help/${article.slug}`} className="hover:text-primary transition-colors">
                  {article.title}
                </Link>
              </h3>
              <p className="mb-4 text-muted-foreground">{article.excerpt}</p>
              <div className="flex justify-between items-center">
                <Link to={`/help/${article.slug}`} className="text-primary hover:underline font-medium">
                  Read More →
                </Link>
                <span className="text-sm text-muted-foreground">{article.readTime} read</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularArticlesSection;
