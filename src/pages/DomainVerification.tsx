import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Copy, CheckCircle, XCircle, Globe } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GoToTop from '@/components/GoToTop';

const DomainVerification = () => {
  const [domain, setDomain] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'success' | 'failed'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const validationKey = "26ec4458680b98edc16b18ed68c2fb7841ee2c9d3b9cfdcfa82de36bea71f64074a2ee5d1fbea04762df431edb1458b44a2ff50679b16d93935b0b645e98174a";

  const copyValidationKey = () => {
    navigator.clipboard.writeText(validationKey);
    toast({
      title: "Copied",
      description: "Validation key copied to clipboard",
    });
  };

  const verifyDomain = async () => {
    if (!domain.trim()) {
      toast({
        title: "Domain Required",
        description: "Please enter your domain name",
        variant: "destructive",
      });
      return;
    }

    setIsVerifying(true);
    setErrorMessage('');

    try {
      // Check if the validation file exists at the domain
      const cleanDomain = domain.replace(/^https?:\/\//, '').replace(/\/$/, '');
      const validationUrl = `https://${cleanDomain}/validation-key.txt`;
      
      console.log('Verifying domain:', cleanDomain);
      console.log('Checking URL:', validationUrl);

      // Try to fetch the validation file
      const response = await fetch(validationUrl, {
        method: 'GET',
        mode: 'cors'
      }).catch(() => {
        throw new Error('Failed to access validation file');
      });

      if (!response.ok) {
        throw new Error('Validation file not found or not accessible');
      }

      const content = await response.text();
      const trimmedContent = content.trim();

      if (trimmedContent === validationKey) {
        setVerificationStatus('success');
        toast({
          title: "Domain Verified",
          description: `${cleanDomain} has been successfully verified`,
        });
      } else {
        throw new Error('Validation key does not match');
      }

    } catch (error) {
      console.error('Domain verification error:', error);
      setVerificationStatus('failed');
      setErrorMessage(error instanceof Error ? error.message : 'Verification failed');
      
      toast({
        title: "Verification Failed",
        description: "Please check the troubleshooting steps below",
        variant: "destructive",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Droplink</h1>
                <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm">Testnet</span>
              </div>
            </div>
            <h2 className="text-3xl font-bold mb-2">Verify App Domain</h2>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>How to verify?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="mb-2">1. Include the following key in a .txt file named <strong>validation-key.txt</strong>, and place this file on your hosting domain accessible at</p>
                <p className="font-mono text-sm bg-muted p-2 rounded">
                  https://www.droplink.space/validation-key.txt
                </p>
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <div className="flex items-center justify-between gap-2">
                  <code className="font-mono text-sm flex-1 break-all">
                    {validationKey}
                  </code>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyValidationKey}
                    className="flex-shrink-0"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Alert>
                <AlertDescription>
                  <strong>NOTE:</strong> If utilizing the Demo App setup to begin copy the validation-key above and paste it into your .env file. Developers using the Demo App setup should copy the validation and paste it into their .env file. Tap here for assistance.
                </AlertDescription>
              </Alert>

              <div>
                <p>2. Once the file is uploaded to your host, or your demo app instance is being served at your domain, click the verify button below.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="domain" className="block text-sm font-medium mb-2">
                    Enter your domain:
                  </label>
                  <Input
                    id="domain"
                    type="text"
                    placeholder="www.yourdomain.com"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    disabled={isVerifying}
                  />
                </div>

                <Button
                  onClick={verifyDomain}
                  disabled={isVerifying || !domain.trim()}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  {isVerifying ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Verifying...
                    </div>
                  ) : (
                    'Verify Domain'
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Status Display */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="font-medium">Status:</span>
                {verificationStatus === 'success' && (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="h-5 w-5" />
                    <span>Domain ownership is validated.</span>
                  </div>
                )}
                {verificationStatus === 'failed' && (
                  <div className="flex items-center gap-2 text-red-600">
                    <XCircle className="h-5 w-5" />
                    <span>Domain ownership is not validated.</span>
                  </div>
                )}
                {verificationStatus === 'idle' && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <XCircle className="h-5 w-5" />
                    <span>Domain ownership is not validated.</span>
                  </div>
                )}
              </div>

              {verificationStatus === 'failed' && (
                <Alert variant="destructive">
                  <AlertDescription>
                    <div className="space-y-2">
                      <p><strong>Failed to validate the Validation Key.</strong> We either failed to find the file or Validation Key is not correct. Please make sure to check the followings:</p>
                      <ol className="list-decimal list-inside space-y-1 text-sm">
                        <li>You've placed your validation key file at <br/>
                          <code className="bg-muted px-1 rounded">https://www.droplink.space/validation-key.txt</code>
                        </li>
                        <li>Your Validation Key is correctly saved in validation-key.txt file</li>
                        <li>If you're using any alias, e.g. www., make sure they work correctly.</li>
                      </ol>
                    </div>
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <GoToTop />
      <Footer />
    </div>
  );
};

export default DomainVerification;
