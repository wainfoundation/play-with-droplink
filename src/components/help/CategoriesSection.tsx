
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CategoryArticle {
  title: string;
  slug: string;
}

interface Category {
  name: string;
  icon: string;
  articles: CategoryArticle[];
}

interface CategoriesSectionProps {
  categories: Category[];
}

const CategoriesSection = ({ categories }: CategoriesSectionProps) => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold mb-10 text-center">Browse Help Topics</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-start gap-3">
                  <span className="text-3xl">{category.icon}</span>
                  <span className="text-xl">{category.name}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {category.articles.slice(0, 4).map((article, i) => (
                    <li key={i}>
                      <Link 
                        to={`/help/article/${article.slug}`} 
                        className="text-sm text-muted-foreground hover:text-primary transition-colors block p-2 rounded hover:bg-muted/50"
                      >
                        {article.title}
                      </Link>
                    </li>
                  ))}
                </ul>
                {category.articles.length > 4 && (
                  <div className="mt-4 pt-3 border-t">
                    <Link 
                      to={`/help?category=${category.name.toLowerCase().replace(/\s+/g, '-')}`} 
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      View all {category.articles.length} articles →
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
