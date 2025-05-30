
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
      <p>Welcome to Droplink! This comprehensive guide will walk you through creating your account and setting up your first profile on the Pi Network's premier link-in-bio platform.</p>
      
      <h3>Step 1: Pi Network Authentication</h3>
      <p>To create your Droplink account, you'll need:</p>
      <ul>
        <li>An active Pi Network account</li>
        <li>Pi Browser installed on your device</li>
        <li>Verified identity on Pi Network</li>
      </ul>
      
      <h3>Step 2: Sign Up Process</h3>
      <p>Visit droplink.space in your Pi Browser and click "Get Started". You'll be redirected to Pi Network's secure authentication system.</p>
      
      <h3>Step 3: Choose Your Username</h3>
      <p>Select a unique username that will become part of your profile URL (droplink.space/@username). This represents your brand, so choose carefully! You can change it later in your settings.</p>
      
      <h3>Step 4: Complete Your Profile</h3>
      <p>Add essential information:</p>
      <ul>
        <li>Profile picture (upload or use Pi avatar)</li>
        <li>Bio (up to 80 characters)</li>
        <li>Contact information</li>
        <li>Social media links</li>
      </ul>
      
      <h3>Step 5: Connect Your Pi Wallet</h3>
      <p>Enable Pi payments by connecting your Pi wallet. This allows you to:</p>
      <ul>
        <li>Receive tips from your audience</li>
        <li>Sell digital products</li>
        <li>Accept Pi payments for services</li>
      </ul>
      
      <h3>Best Practices</h3>
      <p>To maximize your Droplink profile's effectiveness:</p>
      <ul>
        <li>Use a clear, professional profile picture</li>
        <li>Write a compelling bio that describes who you are</li>
        <li>Add your most important links first</li>
        <li>Keep your profile updated regularly</li>
      </ul>
    `,
    category: "Getting Started",
    readTime: "5 min",
    publishedAt: "2024-01-15",
    tags: ["signup", "account", "getting-started", "pi-network"],
    featured: true
  },
  {
    id: "connecting-pi-wallet",
    title: "How to Connect Your Pi Wallet",
    excerpt: "Learn how to securely connect your Pi Network wallet to your Droplink account.",
    content: `
      <h2>Pi Network Integration</h2>
      <p>Connecting your Pi wallet is essential for monetizing your Droplink profile. This guide covers everything you need to know about secure wallet integration.</p>
      
      <h3>Prerequisites</h3>
      <ul>
        <li>Active Pi Network account with verified identity</li>
        <li>Pi Browser installed and up-to-date</li>
        <li>Pi wallet with available balance</li>
        <li>Completed KYC verification on Pi Network</li>
      </ul>
      
      <h3>Connection Process</h3>
      <ol>
        <li>Navigate to your Droplink dashboard</li>
        <li>Click "Settings" in the sidebar</li>
        <li>Select "Pi Network Settings"</li>
        <li>Click "Connect Pi Wallet"</li>
        <li>Authenticate through Pi Network's secure system</li>
        <li>Grant necessary permissions for payments</li>
        <li>Confirm wallet connection</li>
      </ol>
      
      <h3>Security Features</h3>
      <p>Your Pi wallet connection is protected by:</p>
      <ul>
        <li>Pi Network's official authentication system</li>
        <li>End-to-end encryption</li>
        <li>No private key storage on Droplink servers</li>
        <li>Transaction confirmation requirements</li>
      </ul>
      
      <h3>Troubleshooting</h3>
      <p>If you encounter issues:</p>
      <ul>
        <li>Ensure you're using Pi Browser (not regular browsers)</li>
        <li>Check your Pi Network app is updated</li>
        <li>Verify your identity is confirmed on Pi Network</li>
        <li>Contact support if problems persist</li>
      </ul>
      
      <h3>Managing Your Connection</h3>
      <p>Once connected, you can:</p>
      <ul>
        <li>View transaction history</li>
        <li>Set default tip amounts</li>
        <li>Configure payment notifications</li>
        <li>Disconnect wallet if needed</li>
      </ul>
    `,
    category: "Pi Network Integration",
    readTime: "6 min",
    publishedAt: "2024-01-20",
    tags: ["pi-network", "wallet", "payments", "security"],
    featured: true
  },
  {
    id: "custom-themes-guide",
    title: "Setting Up Custom Themes",
    excerpt: "A comprehensive guide to personalizing your Droplink profile with custom themes and styling.",
    content: `
      <h2>Customizing Your Profile Theme</h2>
      <p>Make your Droplink profile stand out with our extensive collection of professional themes and customization options.</p>
      
      <h3>Theme Categories</h3>
      <p>Choose from various theme styles:</p>
      <ul>
        <li><strong>Minimalist:</strong> Clean, simple designs focusing on content</li>
        <li><strong>Creative:</strong> Colorful, artistic themes for creators</li>
        <li><strong>Professional:</strong> Business-oriented layouts</li>
        <li><strong>Pi Network:</strong> Official Pi-inspired designs</li>
        <li><strong>Gradient:</strong> Modern gradient backgrounds</li>
        <li><strong>Dark Mode:</strong> Eye-friendly dark themes</li>
      </ul>
      
      <h3>Free vs. Premium Themes</h3>
      <p>Plan features:</p>
      <ul>
        <li><strong>Free Plan:</strong> 1 basic theme</li>
        <li><strong>Basic Plan:</strong> 10 premium themes</li>
        <li><strong>Pro Plan:</strong> 50+ themes + custom colors</li>
        <li><strong>Premium Plan:</strong> All themes + custom CSS</li>
      </ul>
      
      <h3>Customization Options</h3>
      <p>Advanced styling features (Pro/Premium):</p>
      <ul>
        <li>Custom color schemes</li>
        <li>Font selection (Google Fonts)</li>
        <li>Background images and patterns</li>
        <li>Button styles and animations</li>
        <li>Custom CSS for ultimate control</li>
      </ul>
      
      <h3>Theme Installation</h3>
      <ol>
        <li>Go to Dashboard > Appearance</li>
        <li>Browse available themes</li>
        <li>Click "Preview" to see how it looks</li>
        <li>Click "Apply" to activate</li>
        <li>Customize colors and fonts if available</li>
      </ol>
      
      <h3>Mobile Optimization</h3>
      <p>All themes are automatically optimized for:</p>
      <ul>
        <li>Mobile devices and tablets</li>
        <li>Pi Browser compatibility</li>
        <li>Fast loading times</li>
        <li>Touch-friendly interfaces</li>
      </ul>
      
      <h3>Custom CSS (Premium)</h3>
      <p>Premium users can add custom CSS for:</p>
      <ul>
        <li>Unique animations</li>
        <li>Custom layouts</li>
        <li>Brand-specific styling</li>
        <li>Advanced hover effects</li>
      </ul>
    `,
    category: "Customization",
    readTime: "7 min",
    publishedAt: "2024-01-25",
    tags: ["themes", "customization", "design", "premium"],
    featured: true
  },
  {
    id: "analytics-guide",
    title: "Understanding Analytics Dashboard",
    excerpt: "Make data-driven decisions by learning how to use our comprehensive analytics tools.",
    content: `
      <h2>Analytics Overview</h2>
      <p>Droplink's analytics dashboard provides deep insights into your profile performance, helping you understand your audience and optimize your content strategy.</p>
      
      <h3>Key Metrics Explained</h3>
      <ul>
        <li><strong>Profile Views:</strong> Total visitors to your Droplink page</li>
        <li><strong>Link Clicks:</strong> Individual clicks on each link</li>
        <li><strong>Click-Through Rate (CTR):</strong> Percentage of visitors who click links</li>
        <li><strong>Top Performing Links:</strong> Your most popular content</li>
        <li><strong>Traffic Sources:</strong> Where your visitors come from</li>
        <li><strong>Geographic Data:</strong> Visitor locations (Pro/Premium)</li>
        <li><strong>Device Breakdown:</strong> Mobile vs. desktop usage</li>
      </ul>
      
      <h3>Advanced Analytics (Pro/Premium)</h3>
      <ul>
        <li>Hourly and daily traffic patterns</li>
        <li>Conversion tracking for sales</li>
        <li>A/B testing for link performance</li>
        <li>Audience demographics</li>
        <li>Retention and return visitor data</li>
      </ul>
      
      <h3>Using Data for Growth</h3>
      <p>Optimize your strategy by:</p>
      <ul>
        <li><strong>Timing:</strong> Post when your audience is most active</li>
        <li><strong>Content:</strong> Focus on link types that perform best</li>
        <li><strong>Geography:</strong> Tailor content for your main regions</li>
        <li><strong>Devices:</strong> Optimize for your audience's preferred devices</li>
      </ul>
      
      <h3>Analytics Reports</h3>
      <p>Generate reports for:</p>
      <ul>
        <li>Weekly performance summaries</li>
        <li>Monthly growth tracking</li>
        <li>Campaign-specific analytics</li>
        <li>Custom date range analysis</li>
      </ul>
      
      <h3>Exporting Data</h3>
      <p>Premium users can export:</p>
      <ul>
        <li>CSV files for spreadsheet analysis</li>
        <li>PDF reports for presentations</li>
        <li>API access for custom integrations</li>
      </ul>
      
      <h3>Privacy and GDPR</h3>
      <p>Our analytics respect user privacy:</p>
      <ul>
        <li>No personal data collection</li>
        <li>GDPR compliant tracking</li>
        <li>Opt-out options for visitors</li>
        <li>Anonymized data processing</li>
      </ul>
    `,
    category: "Analytics & Insights",
    readTime: "8 min",
    publishedAt: "2024-02-01",
    tags: ["analytics", "data", "insights", "optimization"],
    featured: true
  },
  {
    id: "pi-payments-setup",
    title: "Setting Up Pi Payments",
    excerpt: "Complete guide to enabling Pi cryptocurrency payments on your Droplink profile.",
    content: `
      <h2>Pi Payment Integration</h2>
      <p>Enable seamless Pi cryptocurrency transactions on your Droplink profile to monetize your content and services.</p>
      
      <h3>Payment Types Available</h3>
      <ul>
        <li><strong>Tips:</strong> One-click donations from your audience</li>
        <li><strong>Digital Products:</strong> Sell files, courses, or services</li>
        <li><strong>Subscriptions:</strong> Recurring Pi payments</li>
        <li><strong>Custom Amounts:</strong> Set your own pricing</li>
      </ul>
      
      <h3>Setup Process</h3>
      <ol>
        <li>Connect your Pi wallet (see wallet connection guide)</li>
        <li>Verify your identity on Pi Network</li>
        <li>Enable payments in Droplink settings</li>
        <li>Set default tip amounts</li>
        <li>Configure payment notifications</li>
      </ol>
      
      <h3>Transaction Fees</h3>
      <p>Understanding Pi payment costs:</p>
      <ul>
        <li>Pi Network fees: Standard network rates</li>
        <li>Droplink fees: 2.9% for Pro, 1.9% for Premium</li>
        <li>Free plan: Tips only, 5% platform fee</li>
      </ul>
      
      <h3>Security Measures</h3>
      <ul>
        <li>All transactions verified on Pi blockchain</li>
        <li>Automatic fraud detection</li>
        <li>Secure payment confirmation process</li>
        <li>Transaction history and receipts</li>
      </ul>
      
      <h3>Payment Widgets</h3>
      <p>Customize payment buttons:</p>
      <ul>
        <li>Tip button styling and placement</li>
        <li>Custom payment amounts</li>
        <li>Payment success messages</li>
        <li>Integration with products and services</li>
      </ul>
    `,
    category: "Pi Network Integration",
    readTime: "6 min",
    publishedAt: "2024-02-05",
    tags: ["pi-payments", "monetization", "cryptocurrency"],
    featured: false
  },
  {
    id: "subscription-plans",
    title: "Understanding Subscription Plans",
    excerpt: "Compare Droplink's subscription tiers and choose the best plan for your needs.",
    content: `
      <h2>Droplink Subscription Plans</h2>
      <p>Choose the perfect plan to match your goals and unlock powerful features for your online presence.</p>
      
      <h3>Free Plan</h3>
      <p>Perfect for getting started:</p>
      <ul>
        <li>Unlimited links</li>
        <li>Basic analytics</li>
        <li>1 theme</li>
        <li>Pi tips (5% platform fee)</li>
        <li>Mobile optimized</li>
      </ul>
      
      <h3>Basic Plan - 10π/month</h3>
      <p>Great for creators:</p>
      <ul>
        <li>Everything in Free</li>
        <li>10 premium themes</li>
        <li>Link scheduling</li>
        <li>Custom colors</li>
        <li>Priority support</li>
      </ul>
      
      <h3>Pro Plan - 15π/month</h3>
      <p>Best for businesses:</p>
      <ul>
        <li>Everything in Basic</li>
        <li>50+ premium themes</li>
        <li>Advanced analytics</li>
        <li>Digital product sales</li>
        <li>Custom domain support</li>
        <li>A/B testing</li>
        <li>Remove Droplink branding</li>
      </ul>
      
      <h3>Premium Plan - 22π/month</h3>
      <p>For power users:</p>
      <ul>
        <li>Everything in Pro</li>
        <li>All themes + custom CSS</li>
        <li>Team collaboration (up to 3 users)</li>
        <li>White-label options</li>
        <li>API access</li>
        <li>Premium support</li>
        <li>Data export capabilities</li>
      </ul>
      
      <h3>Payment and Billing</h3>
      <ul>
        <li>All payments in Pi cryptocurrency</li>
        <li>Monthly or annual billing</li>
        <li>Automatic renewals</li>
        <li>Cancel anytime</li>
        <li>Prorated upgrades/downgrades</li>
      </ul>
      
      <h3>Switching Plans</h3>
      <p>Easily upgrade or downgrade:</p>
      <ul>
        <li>Instant plan changes</li>
        <li>Prorated billing adjustments</li>
        <li>Feature access updates immediately</li>
        <li>No long-term contracts</li>
      </ul>
    `,
    category: "Billing & Subscription",
    readTime: "5 min",
    publishedAt: "2024-02-10",
    tags: ["subscription", "plans", "pricing", "billing"],
    featured: false
  },
  {
    id: "profile-setup",
    title: "Setting Up Your Profile",
    excerpt: "Complete guide to creating an attractive and effective Droplink profile.",
    content: `
      <h2>Profile Setup Guide</h2>
      <p>Your Droplink profile is your digital business card. Learn how to make it shine and attract your target audience.</p>
      
      <h3>Profile Picture Best Practices</h3>
      <ul>
        <li>Use a high-quality image (at least 400x400 pixels)</li>
        <li>Choose a clear, recognizable photo of yourself or logo</li>
        <li>Ensure good lighting and contrast</li>
        <li>Keep it professional but authentic</li>
        <li>Square aspect ratio works best</li>
      </ul>
      
      <h3>Writing Your Bio</h3>
      <p>Your bio has 80 characters to make an impact:</p>
      <ul>
        <li>Start with who you are or what you do</li>
        <li>Include your main value proposition</li>
        <li>Use emojis sparingly but effectively</li>
        <li>Include a call-to-action if space permits</li>
        <li>Keep it updated with current projects</li>
      </ul>
      
      <h3>Contact Information</h3>
      <p>Make it easy for people to reach you:</p>
      <ul>
        <li>Add your primary email address</li>
        <li>Include business phone if applicable</li>
        <li>Add location if relevant to your business</li>
        <li>Link to your main social media accounts</li>
      </ul>
      
      <h3>Social Media Integration</h3>
      <p>Connect your social platforms:</p>
      <ul>
        <li>Instagram for visual content</li>
        <li>Twitter for updates and engagement</li>
        <li>LinkedIn for professional networking</li>
        <li>YouTube for video content</li>
        <li>TikTok for short-form videos</li>
      </ul>
      
      <h3>Privacy Settings</h3>
      <p>Control your profile visibility:</p>
      <ul>
        <li>Public profile (recommended for businesses)</li>
        <li>Private profile (invite-only access)</li>
        <li>Search engine indexing preferences</li>
        <li>Analytics sharing settings</li>
      </ul>
    `,
    category: "Getting Started",
    readTime: "4 min",
    publishedAt: "2024-02-15",
    tags: ["profile", "setup", "bio", "social-media"],
    featured: false
  },
  {
    id: "link-management",
    title: "Managing Your Links",
    excerpt: "Learn how to add, organize, and optimize your links for maximum engagement.",
    content: `
      <h2>Link Management</h2>
      <p>Effective link management is crucial for driving traffic and achieving your goals. Here's how to master it.</p>
      
      <h3>Adding Links</h3>
      <p>Steps to add a new link:</p>
      <ol>
        <li>Click "Add Link" in your dashboard</li>
        <li>Enter the destination URL</li>
        <li>Create an engaging title</li>
        <li>Write a compelling description</li>
        <li>Choose or upload a thumbnail image</li>
        <li>Set link priority (order on your profile)</li>
      </ol>
      
      <h3>Link Types</h3>
      <ul>
        <li><strong>Standard Links:</strong> Direct to external websites</li>
        <li><strong>Social Media:</strong> Links to your social profiles</li>
        <li><strong>Contact:</strong> Email, phone, or messaging apps</li>
        <li><strong>Digital Products:</strong> Sell items directly</li>
        <li><strong>Calendly/Booking:</strong> Schedule appointments</li>
        <li><strong>Payment Links:</strong> Accept payments</li>
      </ul>
      
      <h3>Link Optimization</h3>
      <p>Make your links more clickable:</p>
      <ul>
        <li>Use action-oriented titles</li>
        <li>Include benefits in descriptions</li>
        <li>Choose eye-catching thumbnails</li>
        <li>Add urgency when appropriate</li>
        <li>Test different versions</li>
      </ul>
      
      <h3>Link Organization</h3>
      <p>Structure your links strategically:</p>
      <ul>
        <li>Most important links at the top</li>
        <li>Group similar links together</li>
        <li>Use consistent naming conventions</li>
        <li>Remove outdated links regularly</li>
        <li>Consider seasonal reorganization</li>
      </ul>
      
      <h3>Link Analytics</h3>
      <p>Track your link performance:</p>
      <ul>
        <li>Click-through rates</li>
        <li>Traffic sources</li>
        <li>Peak activity times</li>
        <li>Geographic data</li>
        <li>Device preferences</li>
      </ul>
    `,
    category: "Getting Started",
    readTime: "6 min",
    publishedAt: "2024-02-20",
    tags: ["links", "management", "optimization", "analytics"],
    featured: false
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
    article.content.toLowerCase().includes(lowercaseQuery) ||
    article.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
    article.category.toLowerCase().includes(lowercaseQuery)
  );
};
