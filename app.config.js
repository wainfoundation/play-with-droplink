
export default {
  name: 'Droplink',
  slug: 'droplink',
  version: '1.0.0',
  platforms: ['web'],
  web: {
    bundler: 'vite',
    favicon: '/lovable-uploads/fd8498db-0cee-4181-93de-ba692558b37a.png'
  },
  extra: {
    piNetwork: {
      apiKey: process.env.PI_API_KEY,
      sandbox: process.env.NODE_ENV === 'development',
      supportedFeatures: [
        'authentication',
        'payments',
        'wallet_address'
      ]
    }
  },
  security: {
    https: true,
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin'
    }
  }
};
