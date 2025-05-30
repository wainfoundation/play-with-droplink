
export interface FAQ {
  question: string;
  answer: string;
}

export interface FAQCategory {
  name: string;
  icon: string;
  questions: FAQ[];
}

export const faqData: FAQCategory[] = [
  {
    name: "Getting Started",
    icon: "🚀",
    questions: [
      {
        question: "What is Droplink and how does it work?",
        answer: "Droplink is a link-in-bio platform specifically built for the Pi Network ecosystem. It allows you to create a custom profile page where you can showcase all your important links, accept Pi payments, and engage with your audience. Think of it as your digital business card that's optimized for Pi Network users."
      },
      {
        question: "Do I need a Pi Network account to use Droplink?",
        answer: "Yes, Droplink is built exclusively for the Pi Network ecosystem. You'll need an active Pi Network account and should use Pi Browser for the best experience. This integration allows you to accept Pi payments and tips seamlessly."
      },
      {
        question: "Is Droplink free to use?",
        answer: "Yes! Droplink offers a free plan that includes unlimited links, basic analytics, and one theme. You can upgrade to paid plans (Basic: 10π, Pro: 15π, Premium: 22π) for additional features like premium themes, advanced analytics, and custom domains."
      },
      {
        question: "How do I choose my Droplink username?",
        answer: "During signup, you'll be prompted to choose a unique username. This becomes part of your profile URL (droplink.space/@username). Choose something that represents you or your brand well. You can change it later in your account settings."
      },
      {
        question: "Can I use Droplink outside of Pi Browser?",
        answer: "While Droplink profiles can be viewed in any browser, for the full experience including Pi payments and authentication, we recommend using Pi Browser. Some features like wallet connection and Pi transactions require Pi Browser."
      }
    ]
  },
  {
    name: "Pi Network Integration",
    icon: "π",
    questions: [
      {
        question: "How do I connect my Pi wallet to Droplink?",
        answer: "Go to your dashboard, click Settings > Pi Network Settings, then click 'Connect Pi Wallet'. You'll be redirected to Pi Network's secure authentication system. Once connected, you can receive tips and payments directly through your Droplink profile."
      },
      {
        question: "What are the fees for Pi transactions on Droplink?",
        answer: "Pi Network charges standard network fees for transactions. Droplink charges 2.9% for Pro plans and 1.9% for Premium plans. Free plan users pay a 5% platform fee on tips only."
      },
      {
        question: "Can I receive Pi tips from my audience?",
        answer: "Absolutely! Once your Pi wallet is connected, visitors can tip you directly from your Droplink profile. You can set suggested tip amounts and customize the tip button appearance."
      },
      {
        question: "Is it safe to connect my Pi wallet?",
        answer: "Yes, wallet connection is completely secure. Droplink uses Pi Network's official authentication system and never stores your private keys. All transactions are verified on the Pi blockchain."
      },
      {
        question: "What happens if a Pi payment fails?",
        answer: "Failed payments are automatically handled by Pi Network's system. The transaction will either be retried or canceled, and both you and the sender will be notified. No Pi will be lost in failed transactions."
      }
    ]
  },
  {
    name: "Account Management",
    icon: "👤",
    questions: [
      {
        question: "How do I change my username?",
        answer: "You can change your username in Settings > Account > Username. Keep in mind that changing your username will update your profile URL, so make sure to update any shared links."
      },
      {
        question: "Can I delete my Droplink account?",
        answer: "Yes, you can delete your account in Settings > Account > Delete Account. This action is permanent and will remove all your data, links, and analytics. Make sure to backup any important information first."
      },
      {
        question: "How do I update my profile information?",
        answer: "Go to your dashboard and click on your profile section. You can update your bio, profile picture, contact information, and social links. Changes are saved automatically."
      },
      {
        question: "Can I have multiple Droplink profiles?",
        answer: "Currently, each Pi Network account can have one Droplink profile. However, Premium plan users can create team accounts with multiple collaborators."
      },
      {
        question: "How do I reset my password?",
        answer: "Droplink uses Pi Network authentication, so password resets are handled through Pi Network. If you're having trouble accessing your account, contact Pi Network support or our customer service team."
      }
    ]
  },
  {
    name: "Customization & Themes",
    icon: "🎨",
    questions: [
      {
        question: "How many themes are available?",
        answer: "Droplink offers over 100 professional themes. Free users get 1 basic theme, Basic plan users get 10 premium themes, Pro users get 50+ themes, and Premium users get access to all themes plus custom CSS."
      },
      {
        question: "Can I customize colors and fonts?",
        answer: "Yes! Pro and Premium plan users can customize colors and choose from Google Fonts. Premium users also get access to custom CSS for unlimited styling possibilities."
      },
      {
        question: "Are themes mobile-friendly?",
        answer: "All Droplink themes are fully responsive and optimized for mobile devices, tablets, and desktop. They're also specifically tested for compatibility with Pi Browser."
      },
      {
        question: "Can I preview themes before applying them?",
        answer: "Absolutely! You can preview any theme with your actual content before applying it. This helps you see exactly how your profile will look."
      },
      {
        question: "What is custom CSS and how do I use it?",
        answer: "Custom CSS (available on Premium plans) allows you to add your own styling code for unlimited customization. You can create unique animations, layouts, and designs that match your brand perfectly."
      }
    ]
  },
  {
    name: "Analytics & Performance",
    icon: "📊",
    questions: [
      {
        question: "What analytics data can I see?",
        answer: "You can track profile views, link clicks, click-through rates, top performing links, and traffic sources. Pro and Premium users get additional data like geographic information, device breakdown, and conversion tracking."
      },
      {
        question: "How often is analytics data updated?",
        answer: "Analytics data is updated in real-time for most metrics. Some advanced reports may have a slight delay of a few minutes to ensure accuracy."
      },
      {
        question: "Can I export my analytics data?",
        answer: "Premium users can export analytics data in CSV and PDF formats. You can also access raw data through our API for custom analysis."
      },
      {
        question: "What is click-through rate (CTR)?",
        answer: "CTR is the percentage of profile visitors who click on your links. It's calculated by dividing total link clicks by total profile views. A higher CTR indicates more engaging content."
      },
      {
        question: "How can I improve my profile performance?",
        answer: "Use analytics to identify your best-performing content, optimize posting times based on when your audience is active, and A/B test different link titles and descriptions."
      }
    ]
  },
  {
    name: "Technical Support",
    icon: "🛠️",
    questions: [
      {
        question: "Why can't I access certain features?",
        answer: "Feature access depends on your subscription plan. Check your current plan in Settings > Subscription to see which features are available. You can upgrade anytime to unlock additional capabilities."
      },
      {
        question: "My profile isn't loading properly. What should I do?",
        answer: "First, try refreshing the page and clearing your browser cache. If you're using Pi Browser, make sure it's updated to the latest version. If problems persist, contact our support team."
      },
      {
        question: "How do I report a bug or technical issue?",
        answer: "You can report bugs through our contact form, email support@droplink.space, or join our community forum. Please include details about your device, browser, and what you were trying to do when the issue occurred."
      },
      {
        question: "Is there a mobile app for Droplink?",
        answer: "Droplink is optimized for Pi Browser and works perfectly on mobile devices. We're considering a dedicated mobile app for the future based on user feedback."
      },
      {
        question: "What browsers are supported?",
        answer: "While Droplink profiles work in all modern browsers, we recommend Pi Browser for the complete experience including Pi payments and wallet integration."
      }
    ]
  }
];

export const getAllFAQs = (): FAQ[] => {
  return faqData.reduce((acc, category) => [...acc, ...category.questions], [] as FAQ[]);
};

export const searchFAQs = (query: string): FAQ[] => {
  if (!query.trim()) return getAllFAQs();
  
  const lowercaseQuery = query.toLowerCase();
  return getAllFAQs().filter(faq =>
    faq.question.toLowerCase().includes(lowercaseQuery) ||
    faq.answer.toLowerCase().includes(lowercaseQuery)
  );
};
