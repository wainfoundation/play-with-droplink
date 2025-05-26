
export interface HelpArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  publishedAt: string;
  tags: string[];
  featured: boolean;
}

export const helpArticles: HelpArticle[] = [
  {
    id: "creating-account",
    title: "Creating Your Droplink Account",
    excerpt: "Step-by-step guide to setting up your Droplink account and getting started.",
    content: `
      <h2>Getting Started with Droplink</h2>
      <p>Welcome to Droplink! This guide will walk you through creating your account and setting up your first profile.</p>
      
      <h3>Step 1: Sign Up</h3>
      <p>Visit droplink.space and click "Get Started" to begin the signup process. You can sign up using:</p>
      <ul>
        <li>Your email address and password</li>
        <li>Pi Network authentication (recommended)</li>
      </ul>
      
      <h3>Step 2: Choose Your Username</h3>
      <p>Select a unique username that will become part of your profile URL (droplink.space/username). Choose wisely as this represents your brand!</p>
      
      <h3>Step 3: Complete Your Profile</h3>
      <p>Add your profile picture, bio, and contact information to make your page more engaging for visitors.</p>
      
      <h3>Step 4: Add Your First Links</h3>
      <p>Start adding links to your social media, website, or any content you want to share with your audience.</p>
    `,
    category: "Getting Started",
    readTime: "3 min",
    publishedAt: "2024-01-15",
    tags: ["signup", "account", "getting-started"],
    featured: true
  },
  {
    id: "connecting-pi-wallet",
    title: "How to Connect Your Pi Wallet",
    excerpt: "Learn how to securely connect your Pi Network wallet to your Droplink account.",
    content: `
      <h2>Pi Network Integration</h2>
      <p>Connecting your Pi wallet enables you to receive tips and payments directly through your Droplink profile.</p>
      
      <h3>Prerequisites</h3>
      <ul>
        <li>Active Pi Network account</li>
        <li>Pi Browser installed on your device</li>
        <li>Verified Pi Network identity</li>
      </ul>
      
      <h3>Connection Process</h3>
      <p>1. Navigate to your dashboard and click "Pi Settings"</p>
      <p>2. Click "Connect Pi Wallet" button</p>
      <p>3. Authenticate through Pi Network's secure login</p>
      <p>4. Grant necessary permissions for payments</p>
      
      <h3>Security Notes</h3>
      <p>Your Pi wallet connection is secured by Pi Network's authentication system. Droplink never stores your private keys.</p>
    `,
    category: "Pi Network Integration",
    readTime: "4 min",
    publishedAt: "2024-01-20",
    tags: ["pi-network", "wallet", "payments"],
    featured: true
  },
  {
    id: "custom-themes-guide",
    title: "Setting Up Custom Themes",
    excerpt: "A step-by-step guide to personalizing your Droplink profile with custom themes.",
    content: `
      <h2>Customizing Your Profile Theme</h2>
      <p>Make your Droplink profile stand out with our collection of professional themes.</p>
      
      <h3>Available Themes</h3>
      <p>Choose from various theme categories:</p>
      <ul>
        <li>Minimalist designs</li>
        <li>Creative and colorful</li>
        <li>Professional business themes</li>
        <li>Pi Network inspired themes</li>
      </ul>
      
      <h3>Customization Options</h3>
      <p>Paid plans unlock additional customization features:</p>
      <ul>
        <li>Custom color schemes</li>
        <li>Font selection</li>
        <li>Background images</li>
        <li>Custom CSS (Premium plan)</li>
      </ul>
      
      <h3>Preview Before You Choose</h3>
      <p>All users can preview any theme before applying it to see how it looks with their content.</p>
    `,
    category: "Customization",
    readTime: "5 min",
    publishedAt: "2024-01-25",
    tags: ["themes", "customization", "design"],
    featured: true
  },
  {
    id: "analytics-guide",
    title: "Understanding Analytics Dashboard",
    excerpt: "Make data-driven decisions by learning how to use our comprehensive analytics.",
    content: `
      <h2>Analytics Overview</h2>
      <p>Track your profile performance and understand your audience with detailed analytics.</p>
      
      <h3>Key Metrics</h3>
      <ul>
        <li>Total profile views</li>
        <li>Link click-through rates</li>
        <li>Geographic data (Pro/Premium)</li>
        <li>Traffic sources</li>
        <li>Peak activity times</li>
      </ul>
      
      <h3>Using the Data</h3>
      <p>Learn how to interpret your analytics to:</p>
      <ul>
        <li>Optimize posting times</li>
        <li>Understand your audience</li>
        <li>Improve link performance</li>
        <li>Track growth over time</li>
      </ul>
      
      <h3>Exporting Data</h3>
      <p>Premium users can export analytics data for further analysis or reporting.</p>
    `,
    category: "Analytics & Insights",
    readTime: "6 min",
    publishedAt: "2024-02-01",
    tags: ["analytics", "data", "insights"],
    featured: true
  }
];

export const getArticlesByCategory = (category: string) => {
  return helpArticles.filter(article => 
    article.category.toLowerCase().replace(/\s+/g, '-') === category.toLowerCase()
  );
};

export const getFeaturedArticles = () => {
  return helpArticles.filter(article => article.featured);
};

export const searchArticles = (query: string) => {
  if (!query.trim()) return helpArticles;
  
  const lowercaseQuery = query.toLowerCase();
  return helpArticles.filter(article =>
    article.title.toLowerCase().includes(lowercaseQuery) ||
    article.excerpt.toLowerCase().includes(lowercaseQuery) ||
    article.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};
