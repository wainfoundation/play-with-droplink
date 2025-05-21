
import { Link } from "react-router-dom";

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
            <div key={index} className="bg-card rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-start mb-4">
                <span className="text-3xl mr-3">{category.icon}</span>
                <h3 className="text-xl font-bold">{category.name}</h3>
              </div>
              <ul className="space-y-2">
                {category.articles.slice(0, 3).map((article, i) => (
                  <li key={i}>
                    <Link to={`/help/${article.slug}`} className="text-primary hover:underline">
                      {article.title}
                    </Link>
                  </li>
                ))}
              </ul>
              {category.articles.length > 3 && (
                <Link to={`/help/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`} className="inline-block mt-3 text-sm font-medium hover:underline">
                  View all {category.articles.length} articles →
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
