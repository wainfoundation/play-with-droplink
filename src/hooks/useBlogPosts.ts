
import { useQuery } from "@tanstack/react-query";

// Temporary implementation until blog_posts table is created
export const useBlogPosts = () => {
  return useQuery({
    queryKey: ['blog-posts'],
    queryFn: async () => {
      // Return empty array for now
      console.log('Blog posts feature not yet implemented');
      return [];
    },
  });
};

export const useFeaturedBlogPost = () => {
  return useQuery({
    queryKey: ['featured-blog-post'],
    queryFn: async () => {
      // Return null for now
      console.log('Featured blog post feature not yet implemented');
      return null;
    },
  });
};
