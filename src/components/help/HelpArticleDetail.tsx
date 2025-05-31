
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { helpArticles } from '@/data/helpArticles';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Clock, Tag, Gamepad2 } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const HelpArticleDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const article = helpArticles.find(a => 
    a.title.toLowerCase().replace(/\s+/g, '-').includes(slug || '') ||
    a.id === slug
  );

  if (!article) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Article Not Found</h2>
        <p className="text-gray-600 mb-6">The help article you're looking for doesn't exist.</p>
        <div className="flex gap-4 justify-center">
          <Link to="/help">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Help
            </Button>
          </Link>
          <Link to="/play">
            <Button variant="outline">
              <Gamepad2 className="w-4 h-4 mr-2" />
              Back to Game
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{article.title} - Play with Droplink Gaming Help</title>
        <meta name="description" content={article.excerpt} />
      </Helmet>
      
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <div className="flex gap-4 mb-4">
            <Link to="/help">
              <Button variant="ghost">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Help
              </Button>
            </Link>
            <Link to="/play">
              <Button variant="outline">
                <Gamepad2 className="w-4 h-4 mr-2" />
                Back to Game
              </Button>
            </Link>
          </div>
        </div>

        <Card>
          <CardContent className="p-8">
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{article.readTime} read</span>
                </div>
                <div className="flex items-center gap-1">
                  <Tag className="w-4 h-4" />
                  <span>{article.category}</span>
                </div>
                <span>Published {new Date(article.publishedAt).toLocaleDateString()}</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {article.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <div dangerouslySetInnerHTML={{ __html: article.content }} />
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <h3 className="text-xl font-semibold mb-4">Was this article helpful?</h3>
          <div className="flex justify-center gap-4">
            <Button variant="outline">👍 Yes</Button>
            <Button variant="outline">👎 No</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HelpArticleDetail;
