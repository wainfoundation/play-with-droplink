
export interface FAQ {
  question: string;
  answer: string;
}

export interface FAQCategory {
  category: string;
  questions: FAQ[];
}

export const faqData: FAQCategory[] = [
  {
    category: "Getting Started",
    questions: [
      {
        question: "What is Droplink?",
        answer: "Droplink is a link-in-bio platform built specifically for the Pi Network ecosystem. It allows creators to share all their content in one place, sell products or services, and collect Pi cryptocurrency payments or tips from their audience."
      },
      {
        question: "How do I create my Droplink profile?",
        answer: "Simply visit droplink.space and click 'Get Started'. You can sign up with your email or use Pi Network authentication. Choose a unique username, add your profile information, and start adding your links."
      },
      {
        question: "Is Droplink free to use?",
        answer: "Yes! Droplink offers a free plan that includes 1 active link and 1 social profile. For more features like unlimited links, analytics, and Pi payments, you can upgrade to our paid plans starting at 6π per month."
      },
      {
        question: "Can I change my username later?",
        answer: "Yes, you can change your username in Account Settings. However, keep in mind that changing your username will also change your profile URL, which could affect existing links you've shared."
      }
    ]
  },
  {
    category: "Pi Network Integration",
    questions: [
      {
        question: "How do I connect my Pi Network account?",
        answer: "Go to your dashboard, click on 'Pi Settings', then 'Connect Pi Network'. You'll be redirected to Pi Network's secure authentication where you can log in and grant permissions."
      },
      {
        question: "Can I receive Pi tips on my profile?",
        answer: "Yes! Once you've connected your Pi Network account, visitors can tip you in Pi cryptocurrency directly through your Droplink profile. This feature is available on all paid plans."
      },
      {
        question: "How do Pi payments work?",
        answer: "Pi payments are processed through Pi Network's secure payment system. When someone makes a purchase or tips you, the Pi is transferred directly to your connected Pi wallet."
      },
      {
        question: "What are the fees for Pi transactions?",
        answer: "Droplink doesn't charge additional fees for Pi transactions. You'll only pay the standard Pi Network transaction fees, which are typically very low."
      }
    ]
  },
  {
    category: "Subscription & Billing",
    questions: [
      {
        question: "What subscription plans are available?",
        answer: "We offer three paid plans: Starter (6π/month), Pro (10π/month), and Premium (15π/month). Each plan includes different features like unlimited links, analytics, custom themes, and more. All plans are billed annually."
      },
      {
        question: "Can I upgrade or downgrade my plan?",
        answer: "Yes, you can change your subscription plan at any time from your account settings. Upgrades take effect immediately, while downgrades take effect at the next billing cycle."
      },
      {
        question: "Do you offer refunds?",
        answer: "We offer a 7-day free trial for new Pro users. After that, refunds are handled on a case-by-case basis. Please contact our support team if you have any issues with your subscription."
      },
      {
        question: "Can I pay with traditional currency instead of Pi?",
        answer: "Currently, all subscription payments are processed in Pi cryptocurrency to support the Pi Network ecosystem. This helps keep our platform aligned with Pi Network's vision."
      }
    ]
  },
  {
    category: "Features & Functionality",
    questions: [
      {
        question: "How many links can I add to my profile?",
        answer: "Free users can add 1 active link. Starter, Pro, and Premium plan users get unlimited links. You can organize your links, schedule them, and customize their appearance based on your plan."
      },
      {
        question: "Can I sell products through Droplink?",
        answer: "Yes! Premium users can create a digital store and sell products directly through their Droplink profile, with payments processed in Pi cryptocurrency."
      },
      {
        question: "Do you provide analytics?",
        answer: "Yes, all paid plans include analytics. You can track profile views, link clicks, traffic sources, and more. Pro and Premium plans include advanced analytics with geographic data and detailed insights."
      },
      {
        question: "Can I use my own domain?",
        answer: "Yes, paid plan users can connect a custom domain to their Droplink profile. You can also use a .pi domain if you have one, which works seamlessly in the Pi Browser."
      },
      {
        question: "What is the Pi Ad Network?",
        answer: "The Pi Ad Network is available for Free and Starter plan users. It shows occasional Pi Network-related advertisements on your profile, helping support the platform while keeping costs low."
      }
    ]
  },
  {
    category: "Customization & Design",
    questions: [
      {
        question: "Can I customize how my profile looks?",
        answer: "Yes! Free users get access to 1 theme, while paid plans unlock multiple professional themes. Higher tier plans include custom colors, fonts, and even custom CSS for complete control."
      },
      {
        question: "Can I preview themes before applying them?",
        answer: "Absolutely! All users can preview any theme to see how it looks with their content before making it live. This helps you find the perfect design for your brand."
      },
      {
        question: "Do you support custom branding?",
        answer: "Premium users can remove the Droplink badge and add their own branding. This is perfect for businesses and professionals who want a completely branded experience."
      },
      {
        question: "Can I add animations to my links?",
        answer: "Yes, Pro and Premium users can add eye-catching animations to their links to make them more engaging and increase click-through rates."
      }
    ]
  },
  {
    category: "Technical Support",
    questions: [
      {
        question: "How do I get help if I have issues?",
        answer: "All users have access to our community support forum. Paid plan users also get email support, and Premium users receive priority support with faster response times."
      },
      {
        question: "Is my data secure on Droplink?",
        answer: "Yes, we take security seriously. All data is encrypted, we use secure Pi Network authentication, and we never store your Pi wallet private keys. Your privacy and security are our top priorities."
      },
      {
        question: "Can I export my data?",
        answer: "Premium users can export their analytics data and profile information. This is useful for reporting, backup purposes, or if you need to migrate to another platform."
      },
      {
        question: "Do you have an API for developers?",
        answer: "Yes, Premium users have access to our API for integrating Droplink data with other applications and services. Check our developer documentation for more details."
      }
    ]
  }
];

export const getAllFAQs = (): FAQ[] => {
  return faqData.reduce((allFAQs, category) => {
    return [...allFAQs, ...category.questions];
  }, [] as FAQ[]);
};

export const searchFAQs = (query: string): FAQCategory[] => {
  if (!query.trim()) return faqData;
  
  const lowercaseQuery = query.toLowerCase();
  return faqData.map(category => ({
    ...category,
    questions: category.questions.filter(faq =>
      faq.question.toLowerCase().includes(lowercaseQuery) ||
      faq.answer.toLowerCase().includes(lowercaseQuery)
    )
  })).filter(category => category.questions.length > 0);
};
