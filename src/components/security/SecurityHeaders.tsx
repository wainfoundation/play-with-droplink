
import { Helmet } from 'react-helmet-async';

export function SecurityHeaders() {
  return (
    <Helmet>
      {/* Enhanced Security Headers */}
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="X-Frame-Options" content="DENY" />
      <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
      <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
      <meta httpEquiv="Permissions-Policy" content="camera=(), microphone=(), geolocation=(), payment=(), usb=()" />
      <meta httpEquiv="Strict-Transport-Security" content="max-age=31536000; includeSubDomains; preload" />
      <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' *.minepi.com *.supabase.co; connect-src 'self' *.minepi.com *.supabase.co; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'; font-src 'self' data:; object-src 'none'; base-uri 'self'; form-action 'self'" />
    </Helmet>
  );
}
