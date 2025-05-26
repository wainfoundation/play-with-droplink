
export interface FeatureItem {
  name: string;
  starter: boolean;
  pro: boolean;
  premium: boolean;
  description: string;
}

export const featuresList: FeatureItem[] = [
  {
    name: "Unlimited Links",
    starter: true,
    pro: true,
    premium: true,
    description: "Add as many links as you need to your profile"
  },
  {
    name: "Connect All Social Profiles",
    starter: true,
    pro: true,
    premium: true,
    description: "Link to all your social media accounts"
  },
  {
    name: "Sell Products with Pi Payments",
    starter: false,
    pro: false,
    premium: true,
    description: "Accept Pi payments for your products"
  },
  {
    name: "Basic Analytics",
    starter: true,
    pro: true,
    premium: true,
    description: "See how many people visit your profile"
  },
  {
    name: "Email Support",
    starter: true,
    pro: true,
    premium: true,
    description: "Get help via email"
  },
  {
    name: "Community Forums Access",
    starter: true,
    pro: true,
    premium: true,
    description: "Join our community discussion forums"
  },
  {
    name: "Multi-Factor Authentication",
    starter: false,
    pro: true,
    premium: true,
    description: "Enhanced security for your account"
  },
  {
    name: "QR Codes for Offline Traffic",
    starter: false,
    pro: true,
    premium: true,
    description: "Generate QR codes for your profile"
  },
  {
    name: "Schedule Links",
    starter: false,
    pro: true,
    premium: true,
    description: "Schedule when links appear or disappear"
  },
  {
    name: "Link Animations",
    starter: false,
    pro: true,
    premium: true,
    description: "Add animations to your links"
  },
  {
    name: "Custom Button Styles",
    starter: false,
    pro: true,
    premium: true,
    description: "Customize the look of your buttons"
  },
  {
    name: "Spotlight Links",
    starter: false,
    pro: true,
    premium: true,
    description: "Highlight important links"
  },
  {
    name: "Performance Analytics",
    starter: false,
    pro: true,
    premium: true,
    description: "Track clicks and conversions"
  },
  {
    name: "Custom Themes",
    starter: false,
    pro: true,
    premium: true,
    description: "Access premium themes"
  },
  {
    name: "Location Analytics",
    starter: false,
    pro: true,
    premium: true,
    description: "See where your visitors are from"
  },
  {
    name: "Email/Phone Collection",
    starter: false,
    pro: true,
    premium: true,
    description: "Collect contact information from visitors"
  },
  {
    name: "SEO & Pi Integrations",
    starter: false,
    pro: true,
    premium: true,
    description: "Optimize for search engines"
  },
  {
    name: "Community Rewards",
    starter: false,
    pro: true,
    premium: true,
    description: "Earn rewards for contributing to the community"
  },
  {
    name: "Tailored Onboarding",
    starter: false,
    pro: false,
    premium: true,
    description: "Get personalized setup assistance"
  },
  {
    name: "Priority Support (4-Hour)",
    starter: false,
    pro: false,
    premium: true,
    description: "Get faster support response"
  },
  {
    name: "Historical Insights",
    starter: false,
    pro: false,
    premium: true,
    description: "Access long-term analytics data"
  },
  {
    name: "Data Export",
    starter: false,
    pro: false,
    premium: true,
    description: "Export your analytics data"
  },
  {
    name: "Whitelabel Option",
    starter: false,
    pro: false,
    premium: true,
    description: "Remove Droplink branding"
  },
  {
    name: "Advanced Pi Payments",
    starter: false,
    pro: false,
    premium: true,
    description: "Advanced payment features and analytics"
  },
  {
    name: "Community Contributor Status",
    starter: false,
    pro: false,
    premium: true,
    description: "Get recognized in the community"
  }
];
