
import { AlertCircle, Shield, ShieldCheck } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface PasswordSecurityInfoProps {
  isCompromised?: boolean;
  showInfo?: boolean;
  isChecking?: boolean;
}

export function PasswordSecurityInfo({ isCompromised, showInfo = true, isChecking = false }: PasswordSecurityInfoProps) {
  if (isChecking) {
    return (
      <Alert className="mt-4 bg-slate-50">
        <Shield className="h-4 w-4 text-primary" />
        <AlertTitle>Checking Password</AlertTitle>
        <AlertDescription>
          Checking if this password has appeared in known data breaches...
        </AlertDescription>
      </Alert>
    );
  }
  
  if (isCompromised) {
    return (
      <Alert variant="destructive" className="mt-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Security Risk</AlertTitle>
        <AlertDescription>
          This password has appeared in data breaches and isn't safe to use. 
          Please choose a different password to protect your account.
        </AlertDescription>
      </Alert>
    );
  }
  
  if (showInfo) {
    return (
      <Alert className="mt-4 bg-slate-50">
        <Shield className="h-4 w-4 text-primary" />
        <AlertTitle>Password Protection</AlertTitle>
        <AlertDescription>
          We check passwords against known data breaches to help keep your account secure.
          This check happens securely and anonymously.
        </AlertDescription>
      </Alert>
    );
  }
  
  return null;
}

export function PasswordSecuritySuccess() {
  return (
    <Alert className="mt-4 bg-emerald-50">
      <ShieldCheck className="h-4 w-4 text-emerald-600" />
      <AlertTitle>Strong Password</AlertTitle>
      <AlertDescription>
        Your password passed our security check and hasn't been found in known data breaches.
      </AlertDescription>
    </Alert>
  );
}
