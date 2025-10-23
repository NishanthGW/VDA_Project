import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  siteName?: string;
}

// Define the canonical base URL to use consistently
const CANONICAL_BASE_URL = "https://www.vibedanceacademy.in";

const SEO: React.FC<SEOProps> = ({
  title = "Vibe Dance Academy - Premier Dance Classes in Coimbatore, Palladam & Tiruppur",
  description = "Join Vibe Dance Academy for professional dance training in Coimbatore, Palladam, and Tiruppur. Expert instructors, modern facilities, and multiple dance styles. Book your trial class today!",
  keywords = "dance academy, dance classes, Coimbatore dance, Palladam dance, Tiruppur dance, hip hop, contemporary, classical dance, dance training, dance studio",
  image = `${CANONICAL_BASE_URL}/logo2.png`, 
  url = typeof window !== 'undefined' 
      ? `${CANONICAL_BASE_URL}${window.location.pathname}` 
      : CANONICAL_BASE_URL,
  type = "website",
  siteName = "Vibe Dance Academy"
}) => {

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <link rel="icon" href="/logo2.png" type="image/png" />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />

      {/* Open Graph Tags (Ensure correct URL is used via the 'url' prop) */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} /> 
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Vibe Dance Academy Logo" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:secure_url" content={image} />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content="Vibe Dance Academy Logo" />
      <meta property="twitter:url" content={url} /> 
      
      {/* Additional SEO Tags */}
      <meta name="theme-color" content="#fbbf24" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      
      {/* Favicon and Icons */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="16x16" href="/logo2.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/logo2.png" />
      <link rel="icon" type="image/png" sizes="48x48" href="/logo2.png" />
      <link rel="icon" type="image/png" sizes="192x192" href="/logo2.png" />
      <link rel="icon" type="image/png" sizes="512x512" href="/logo2.png" />
      <link rel="manifest" href="/manifest.json" />
      <link rel="shortcut icon" href="/favicon.ico" />
      
    </Helmet>
  );
};

export default SEO;