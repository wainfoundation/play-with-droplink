
import { Helmet } from 'react-helmet-async';

interface MetaTagsProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  siteName?: string;
}

export function MetaTags({
  title = "Droplink - Pi Network Profile Builder",
  description = "Create your professional Pi Network profile with Droplink. Build your digital presence, showcase your content, and connect with the Pi community.",
  keywords = "Pi Network, profile builder, digital presence, blockchain, cryptocurrency, web3",
  image = "/og-image.png",
  url = "https://droplink.space",
  type = "website",
  siteName = "Droplink"
}: MetaTagsProps) {
  const fullTitle = title.includes("Droplink") ? title : `${title} | Droplink`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Droplink Team" />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteName} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Additional SEO */}
      <meta name="theme-color" content="#3B82F6" />
      <link rel="canonical" href={url} />
    </Helmet>
  );
}
