
import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  schema?: object;
  canonical?: string;
  image?: string;
  type?: 'website' | 'article';
  keywords?: string;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  schema,
  canonical,
  image = 'https://i.postimg.cc/SKvjQ0th/gold_hill_shaftesbury_2.jpg',
  type = 'website',
  keywords = 'Shaftesbury, Dorset, Gold Hill, Hovis Advert, Saxon Town, UK Tourism, Blackmore Vale, Visit Dorset'
}) => {
  const fullTitle = `${title} | Visit Shaftesbury | The Hilltop Saxon Town`;
  const siteUrl = 'https://visitshaftesbury.co.uk';
  const currentUrl = canonical || (typeof window !== 'undefined' ? window.location.href : siteUrl);

  useEffect(() => {
    // Update Document Title
    document.title = fullTitle;

    // Helper function to update or create meta tags
    const updateMetaTag = (selector: string, attribute: string, content: string) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        const [attr, value] = selector.match(/\[(.+)="(.+)"\]/)?.slice(1) || [];
        if (attr && value) element.setAttribute(attr, value);
        document.head.appendChild(element);
      }
      element.setAttribute(attribute, content);
    };

    // Basic Meta Tags
    updateMetaTag('meta[name="description"]', 'content', description);
    updateMetaTag('meta[name="keywords"]', 'content', keywords);
    updateMetaTag('meta[name="author"]', 'content', 'Visit Shaftesbury');
    updateMetaTag('meta[name="robots"]', 'content', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

    // Open Graph Tags
    updateMetaTag('meta[property="og:title"]', 'content', fullTitle);
    updateMetaTag('meta[property="og:description"]', 'content', description);
    updateMetaTag('meta[property="og:image"]', 'content', image);
    updateMetaTag('meta[property="og:url"]', 'content', currentUrl);
    updateMetaTag('meta[property="og:type"]', 'content', type);
    updateMetaTag('meta[property="og:site_name"]', 'content', 'Visit Shaftesbury');
    updateMetaTag('meta[property="og:locale"]', 'content', 'en_GB');

    // Twitter Card Tags
    updateMetaTag('meta[name="twitter:card"]', 'content', 'summary_large_image');
    updateMetaTag('meta[name="twitter:title"]', 'content', fullTitle);
    updateMetaTag('meta[name="twitter:description"]', 'content', description);
    updateMetaTag('meta[name="twitter:image"]', 'content', image);

    // Additional SEO Meta Tags
    updateMetaTag('meta[name="geo.region"]', 'content', 'GB-DOR');
    updateMetaTag('meta[name="geo.placename"]', 'content', 'Shaftesbury');
    updateMetaTag('meta[name="geo.position"]', 'content', '51.0041;-2.1989');
    updateMetaTag('meta[name="ICBM"]', 'content', '51.0041, -2.1989');

    // Update Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', currentUrl);

    // Handle Schema.org JSON-LD
    const existingSchema = document.getElementById('json-ld-schema');
    if (existingSchema) {
      existingSchema.remove();
    }

    if (schema) {
      const script = document.createElement('script');
      script.id = 'json-ld-schema';
      script.type = 'application/ld+json';
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
    }
  }, [title, description, schema, canonical, image, type, keywords, fullTitle, currentUrl]);

  return null;
};

export default SEO;
