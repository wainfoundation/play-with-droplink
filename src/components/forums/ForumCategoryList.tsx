
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MessageSquare, Clock } from 'lucide-react';
import { useForumCategories } from '@/hooks/useForumCategories';

interface ForumCategoryListProps {
  onCategorySelect: (categoryId: string, categoryName: string) => void;
}

const ForumCategoryList = ({ onCategorySelect }: ForumCategoryListProps) => {
  const { categories, loading, error } = useForumCategories();

  if (loading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-full"></div>
            </CardHeader>
            <CardContent>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Error loading categories: {error}</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => (
        <Card key={category.id} className="hover:shadow-lg transition-shadow duration-300 group cursor-pointer">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-lg ${category.color}`}>
                <span className="text-2xl">{category.icon}</span>
              </div>
              <div className="flex-1">
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  {category.name}
                </CardTitle>
              </div>
            </div>
            <CardDescription className="mt-2">{category.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MessageSquare size={14} />
                  {category.topic_count} topics
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={14} />
                  {category.latest_activity}
                </span>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full group-hover:bg-primary group-hover:text-white transition-colors"
              onClick={() => onCategorySelect(category.id, category.name)}
            >
              Browse Topics
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ForumCategoryList;
