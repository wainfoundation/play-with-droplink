
export interface FAQ {
  question: string;
  answer: string;
}

export interface FAQCategory {
  name: string;
  icon: string;
  questions: FAQ[];
}

export const completeFaqData: FAQCategory[] = [
  {
    name: "Getting Started",
    icon: "🚀",
    questions: [
      {
        question: "How do I start playing games on Droplink?",
        answer: "Simply click on any game from the main gaming page. Some games are free to play, while others require Pi payments or watching ads. Your progress is automatically saved to your account."
      },
      {
        question: "Do I need a Pi Network account to play?",
        answer: "Yes, you need a Pi Network account to access all features. You can play some basic games without an account, but to save progress, earn rewards, and access premium features, Pi authentication is required."
      },
      {
        question: "How do I connect my Pi Wallet?",
        answer: "Go to your profile settings and click 'Connect Pi Wallet'. You'll be redirected to the Pi Network authentication flow. Once connected, you can make in-game purchases and receive Pi tips."
      },
      {
        question: "What games are available for free?",
        answer: "We offer many free games including Block Connect, Memory Match, Color Merge, Speed Tap, and more. Free games may show ads between levels or require watching ads to continue after game over."
      },
      {
        question: "How do I unlock premium games?",
        answer: "Premium games can be unlocked by paying Pi directly or upgrading to a premium subscription. Each game shows its Pi cost on the game selection screen."
      }
    ]
  },
  {
    name: "Pi Network & Payments",
    icon: "💰",
    questions: [
      {
        question: "How do Pi payments work in games?",
        answer: "Pi payments are processed through the official Pi Network SDK. When you make a purchase, you'll be redirected to your Pi Wallet to complete the transaction securely."
      },
      {
        question: "What can I buy with Pi?",
        answer: "You can purchase game hints, unlock premium games, buy extra lives, skip ads, unlock new characters, and access exclusive game modes. Prices range from 0.5π to 10π depending on the item."
      },
      {
        question: "Are Pi transactions secure?",
        answer: "Yes, all Pi transactions use the official Pi Network payment system with end-to-end encryption. We never store your Pi wallet information on our servers."
      },
      {
        question: "Can I get refunds for Pi purchases?",
        answer: "Pi transactions are processed by Pi Network and follow their refund policy. For technical issues with purchases, contact our support team within 24 hours."
      },
      {
        question: "How do I earn Pi through gaming?",
        answer: "You can earn Pi by participating in tournaments, achieving high scores on leaderboards, completing daily challenges, and through our referral program."
      }
    ]
  },
  {
    name: "Gameplay & Features",
    icon: "🎮",
    questions: [
      {
        question: "How does the lives system work?",
        answer: "Most games give you 3-5 lives. When you lose a life, you can either wait for it to regenerate (usually 30 minutes), watch an ad for instant refill, or pay Pi for immediate restoration."
      },
      {
        question: "What are hints and how do I use them?",
        answer: "Hints help you solve puzzles or overcome difficult levels. Free players get limited hints per day, while premium players get unlimited hints. You can also buy individual hints with Pi."
      },
      {
        question: "How do leaderboards work?",
        answer: "Leaderboards track high scores, completion times, and other achievements. Rankings reset weekly or monthly depending on the game. Top players can earn Pi rewards and exclusive badges."
      },
      {
        question: "Can I play games offline?",
        answer: "Some single-player games can be played offline, but features like leaderboards, Pi purchases, and progress sync require an internet connection."
      },
      {
        question: "How do I customize my character?",
        answer: "Go to your profile and select 'Character Customization'. You can change colors, outfits, and accessories. Some customizations are free, while premium options require Pi or subscription."
      }
    ]
  },
  {
    name: "Technical Support",
    icon: "🔧",
    questions: [
      {
        question: "Games are loading slowly or not at all",
        answer: "Try refreshing the Pi Browser, clearing your browser cache, or checking your internet connection. If problems persist, try switching to a different network or contact support."
      },
      {
        question: "My game progress wasn't saved",
        answer: "Make sure you're logged in with your Pi account and have a stable internet connection. Game progress is auto-saved every few seconds when connected."
      },
      {
        question: "Pi payment failed but money was deducted",
        answer: "Pi transactions can take a few minutes to process. If your purchase doesn't appear after 10 minutes, contact support with your transaction ID from your Pi wallet history."
      },
      {
        question: "Audio or sound effects aren't working",
        answer: "Check your device volume and the in-game audio settings. Some games allow you to toggle sound effects and background music independently."
      },
      {
        question: "Game controls aren't responding properly",
        answer: "Try refreshing the page or restarting the Pi Browser. Make sure you're using the latest version of Pi Browser for optimal performance."
      }
    ]
  },
  {
    name: "Account & Profile",
    icon: "👤",
    questions: [
      {
        question: "How do I change my gaming username?",
        answer: "Go to Profile Settings > Account Information. You can change your display name once every 30 days. Your Pi Network username remains the same for authentication."
      },
      {
        question: "Can I link multiple devices to my account?",
        answer: "Yes, you can access your account from any device with Pi Browser. Your game progress, purchases, and settings sync automatically across devices."
      },
      {
        question: "How do I delete my gaming account?",
        answer: "Contact our support team to request account deletion. Note that this will permanently remove all game progress, purchases, and earned Pi. This action cannot be undone."
      },
      {
        question: "My account was suspended, what do I do?",
        answer: "Account suspensions usually occur due to violation of our terms of service. Contact support with your Pi username to appeal the suspension or get more information."
      },
      {
        question: "How do I update my profile picture?",
        answer: "Go to Profile Settings and click on your current avatar. You can upload a new image or choose from our collection of gaming avatars."
      }
    ]
  },
  {
    name: "Subscriptions & Premium",
    icon: "⭐",
    questions: [
      {
        question: "What's included in premium subscriptions?",
        answer: "Premium subscriptions include ad-free gaming, unlimited hints, exclusive games, priority customer support, bonus Pi rewards, and early access to new features."
      },
      {
        question: "How much do subscriptions cost?",
        answer: "We offer monthly and annual plans starting from 5π/month. Annual subscribers get 20% discount and additional perks like exclusive tournaments."
      },
      {
        question: "Can I cancel my subscription anytime?",
        answer: "Yes, you can cancel anytime from your account settings. You'll continue to have premium access until the end of your billing period."
      },
      {
        question: "Do I get refunds if I cancel early?",
        answer: "We offer prorated refunds for annual subscriptions cancelled within the first 30 days. Monthly subscriptions are not refundable but you keep access until the period ends."
      },
      {
        question: "What happens to my premium purchases if I cancel?",
        answer: "Items purchased with Pi (like character customizations) remain in your account permanently. Subscription-only features will become unavailable after cancellation."
      }
    ]
  }
];

export function searchCompleteFAQs(query: string): FAQ[] {
  const lowercaseQuery = query.toLowerCase();
  const results: FAQ[] = [];
  
  completeFaqData.forEach(category => {
    category.questions.forEach(faq => {
      if (
        faq.question.toLowerCase().includes(lowercaseQuery) ||
        faq.answer.toLowerCase().includes(lowercaseQuery)
      ) {
        results.push(faq);
      }
    });
  });
  
  return results;
}
