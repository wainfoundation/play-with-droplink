import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "@/hooks/use-toast";
import GoToTop from '@/components/GoToTop';

const Cookies = () => {
  const [cookiePreferences, setCookiePreferences] = useState({
    necessary: true,
    analytics: true,
    marketing: false,
    preferences: true
  });
  
  const handleCheckboxChange = (key: string, checked: boolean) => {
    setCookiePreferences(prev => ({
      ...prev,
      [key]: checked
    }));
  };
  
  const handleSavePreferences = () => {
    console.log("Saved cookie preferences:", cookiePreferences);
    toast({
      title: "Cookie Preferences Saved",
      description: "Your cookie preferences have been updated successfully."
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <GoToTop />
      <main className="flex-grow">
        <div className="container mx-auto py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-8">Cookie Policy</h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground">Last updated: May 20, 2025</p>
              
              <div className="my-8 p-4 bg-muted rounded-lg text-sm">
                <p className="font-medium">Summary:</p>
                <p>
                  This Cookie Policy explains how Droplink uses cookies and similar technologies to recognize 
                  you when you visit our website. It explains what these technologies are and why we use them, 
                  as well as your rights to control our use of them. We use necessary cookies for essential functions, 
                  analytics cookies to understand usage, marketing cookies for advertising, and preferences cookies for 
                  customization. You can manage your cookie settings at any time.
                </p>
              </div>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">1. What Are Cookies?</h2>
              <p>
                Cookies are small data files that are placed on your computer or mobile device when you visit a website. 
                Cookies are widely used by website owners to make their websites work, or to work more efficiently, as well 
                as to provide reporting information.
              </p>
              <p>
                Cookies set by the website owner (in this case, Droplink) are called "first-party cookies." Cookies set by 
                parties other than the website owner are called "third-party cookies." Third-party cookies enable third-party 
                features or functionality to be provided on or through the website (e.g., advertising, interactive content, and 
                analytics). The parties that set these third-party cookies can recognize your device both when it visits the 
                website in question and also when it visits certain other websites.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">2. Why Do We Use Cookies?</h2>
              <p>
                We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons 
                for our website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies 
                enable us to track and target the interests of our users to enhance the experience on our website. Third parties 
                serve cookies through our website for advertising, analytics, and other purposes.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">3. Types of Cookies We Use</h2>
              <div className="space-y-6 mt-6">
                <div className="p-4 border border-muted rounded-lg">
                  <h3 className="text-xl font-bold mb-2">Essential Cookies</h3>
                  <p>
                    These cookies are necessary for the website to function and cannot be switched off in our systems. They are 
                    usually only set in response to actions made by you which amount to a request for services, such as setting 
                    your privacy preferences, logging in, or filling in forms. These cookies do not store any personally identifiable 
                    information.
                  </p>
                </div>
                
                <div className="p-4 border border-muted rounded-lg">
                  <h3 className="text-xl font-bold mb-2">Analytics Cookies</h3>
                  <p>
                    These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our 
                    site. They help us to know which pages are the most and least popular and see how visitors move around the site. 
                    All information these cookies collect is aggregated and therefore anonymous.
                  </p>
                </div>
                
                <div className="p-4 border border-muted rounded-lg">
                  <h3 className="text-xl font-bold mb-2">Marketing Cookies</h3>
                  <p>
                    These cookies may be set through our site by our advertising partners. They may be used by those companies to 
                    build a profile of your interests and show you relevant advertisements on other sites. They do not store directly 
                    personal information, but are based on uniquely identifying your browser and internet device.
                  </p>
                </div>
                
                <div className="p-4 border border-muted rounded-lg">
                  <h3 className="text-xl font-bold mb-2">Preferences Cookies</h3>
                  <p>
                    These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or 
                    by third-party providers whose services we have added to our pages. If you do not allow these cookies, then some 
                    or all of these services may not function properly.
                  </p>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">4. Specific Cookies We Use</h2>
              <table className="w-full border-collapse mb-6">
                <thead>
                  <tr className="bg-muted">
                    <th className="border p-2 text-left">Name</th>
                    <th className="border p-2 text-left">Provider</th>
                    <th className="border p-2 text-left">Purpose</th>
                    <th className="border p-2 text-left">Expiry</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">session_id</td>
                    <td className="border p-2">Droplink</td>
                    <td className="border p-2">Maintains user session</td>
                    <td className="border p-2">Session</td>
                  </tr>
                  <tr>
                    <td className="border p-2">auth_token</td>
                    <td className="border p-2">Droplink</td>
                    <td className="border p-2">Remembers if you're logged in</td>
                    <td className="border p-2">30 days</td>
                  </tr>
                  <tr>
                    <td className="border p-2">preferences</td>
                    <td className="border p-2">Droplink</td>
                    <td className="border p-2">Stores your site preferences</td>
                    <td className="border p-2">1 year</td>
                  </tr>
                  <tr>
                    <td className="border p-2">_ga</td>
                    <td className="border p-2">Google Analytics</td>
                    <td className="border p-2">Statistical purposes</td>
                    <td className="border p-2">2 years</td>
                  </tr>
                  <tr>
                    <td className="border p-2">_gid</td>
                    <td className="border p-2">Google Analytics</td>
                    <td className="border p-2">Statistical purposes</td>
                    <td className="border p-2">24 hours</td>
                  </tr>
                </tbody>
              </table>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">5. How to Control Cookies</h2>
              <h3 className="text-xl font-bold mt-6 mb-3">5.1 Browser Settings</h3>
              <p>
                You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, 
                you may still use our website though your access to some functionality and areas of our website may be restricted.
              </p>
              <p>
                Each browser works differently, so check your browser's "Help" menu to learn the correct way to modify your cookies.
              </p>
              
              <h3 className="text-xl font-bold mt-6 mb-3">5.2 Our Cookie Management Tool</h3>
              <p>
                In addition to browser settings, you can use our Cookie Management Tool below to customize your cookie preferences.
              </p>
              
              <div className="p-6 mt-6 bg-muted rounded-lg">
                <h4 className="text-lg font-semibold mb-4">Cookie Preferences</h4>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox 
                      id="necessary" 
                      checked={cookiePreferences.necessary} 
                      onCheckedChange={(checked) => handleCheckboxChange("necessary", checked as boolean)}
                      disabled
                    />
                    <div className="space-y-1 leading-none">
                      <label 
                        htmlFor="necessary" 
                        className="font-medium text-sm cursor-not-allowed flex gap-2 items-center"
                      >
                        Essential Cookies
                        <span className="bg-primary text-white text-xs py-0.5 px-1 rounded">Required</span>
                      </label>
                      <p className="text-sm text-muted-foreground">
                        These cookies are necessary for the website to function properly.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Checkbox 
                      id="analytics" 
                      checked={cookiePreferences.analytics} 
                      onCheckedChange={(checked) => handleCheckboxChange("analytics", checked as boolean)}
                    />
                    <div className="space-y-1 leading-none">
                      <label 
                        htmlFor="analytics" 
                        className="font-medium text-sm cursor-pointer"
                      >
                        Analytics Cookies
                      </label>
                      <p className="text-sm text-muted-foreground">
                        Help us understand how visitors interact with our website.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Checkbox 
                      id="marketing" 
                      checked={cookiePreferences.marketing} 
                      onCheckedChange={(checked) => handleCheckboxChange("marketing", checked as boolean)}
                    />
                    <div className="space-y-1 leading-none">
                      <label 
                        htmlFor="marketing" 
                        className="font-medium text-sm cursor-pointer"
                      >
                        Marketing Cookies
                      </label>
                      <p className="text-sm text-muted-foreground">
                        Used to track visitors across websites to display relevant advertisements.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Checkbox 
                      id="preferences" 
                      checked={cookiePreferences.preferences} 
                      onCheckedChange={(checked) => handleCheckboxChange("preferences", checked as boolean)}
                    />
                    <div className="space-y-1 leading-none">
                      <label 
                        htmlFor="preferences" 
                        className="font-medium text-sm cursor-pointer"
                      >
                        Preferences Cookies
                      </label>
                      <p className="text-sm text-muted-foreground">
                        Allow the website to remember choices you make and provide enhanced features.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex gap-3">
                  <Button onClick={handleSavePreferences}>Save Preferences</Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setCookiePreferences({
                        necessary: true,
                        analytics: false,
                        marketing: false,
                        preferences: false
                      });
                    }}
                  >
                    Reject All
                  </Button>
                  <Button 
                    variant="secondary" 
                    onClick={() => {
                      setCookiePreferences({
                        necessary: true,
                        analytics: true,
                        marketing: true,
                        preferences: true
                      });
                    }}
                  >
                    Accept All
                  </Button>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">6. Changes to This Cookie Policy</h2>
              <p>
                We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use 
                or for other operational, legal, or regulatory reasons. Please therefore re-visit this Cookie Policy regularly to 
                stay informed about our use of cookies and related technologies.
              </p>
              <p>
                The date at the top of this Cookie Policy indicates when it was last updated.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">7. Contact Information</h2>
              <p>
                If you have any questions about our use of cookies or this Cookie Policy, please contact us at:
              </p>
              <p>
                <a href="mailto:support@droplink.space" className="text-primary hover:underline">support@droplink.space</a><br />
                Droplink Inc.<br />
                1234 Privacy Lane<br />
                San Francisco, CA 94105<br />
                USA
              </p>
              
              <div className="mt-12 p-4 border border-muted rounded-lg">
                <p className="font-medium mb-2">For more information about how we protect your data, please see our:</p>
                <ul className="list-disc ml-6">
                  <li>
                    <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                  </li>
                  <li>
                    <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cookies;
