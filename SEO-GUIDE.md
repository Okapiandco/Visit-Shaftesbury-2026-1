# SEO Implementation Guide - Visit Shaftesbury

This document outlines the comprehensive SEO strategy implemented for the Visit Shaftesbury website.

## 📊 SEO Features Implemented

### 1. Enhanced SEO Component
Location: `components/SEO.tsx`

The SEO component now includes:
- **Meta Title** - Unique, descriptive titles for each page (50-60 characters)
- **Meta Description** - Compelling descriptions (150-160 characters)
- **Meta Keywords** - Relevant keywords for each page
- **Open Graph Tags** - For social media sharing (Facebook, LinkedIn)
- **Twitter Card Tags** - For enhanced Twitter/X sharing
- **Canonical URLs** - Prevent duplicate content issues
- **Geo Tags** - Location-specific metadata for local SEO
- **Robots Meta** - Control search engine crawling and indexing
- **Schema.org JSON-LD** - Structured data for rich snippets

### 2. Page-Specific SEO

#### Home Page (`pages/Home.tsx`)
- **Title**: "Welcome to Shaftesbury | Visit Shaftesbury | The Hilltop Saxon Town"
- **Focus Keywords**: Shaftesbury Dorset, Gold Hill, Hovis Advert, Saxon Town
- **Schema**: Website schema with organization details
- **Featured**: Events carousel showcasing upcoming events

#### Events Page (`pages/Events.tsx`)
- **Title**: "Events & Festivals in Shaftesbury | Visit Shaftesbury"
- **Focus Keywords**: Shaftesbury events, Dorset festivals, live music
- **Schema**: ItemList schema for events
- **Image Alt Tags**: Descriptive alt text with event details

#### Eat & Drink Page (`pages/EatDrink.tsx`)
- **Title**: "Eat & Drink in Shaftesbury | Visit Shaftesbury"
- **Focus Keywords**: Shaftesbury restaurants, Dorset dining, fine dining
- **Schema**: Restaurant ItemList schema
- **Structured Data**: Restaurant details with addresses

#### Stay Page (`pages/Stay.tsx`)
- **Title**: "Places to Stay in Shaftesbury | Visit Shaftesbury"
- **Focus Keywords**: Shaftesbury hotels, Dorset accommodation, B&B
- **Schema**: LodgingBusiness ItemList schema

#### History Page (`pages/History.tsx`)
- **Title**: "Saxon History of Shaftesbury | Visit Shaftesbury"
- **Focus Keywords**: King Alfred Great, Saxon town, Shaftesbury Abbey
- **Focus**: Educational content about 1000+ years of history

#### Plan Your Visit (`pages/Transport.tsx`)
- **Title**: "Plan Your Visit to Shaftesbury | Visit Shaftesbury"
- **Focus Keywords**: visit Shaftesbury, getting to Shaftesbury, parking
- **Schema**: TouristAttraction with transport information

### 3. Image Optimization

All images now include:
- **Descriptive Alt Text** - Context-rich descriptions for accessibility and SEO
- **Lazy Loading** - `loading="lazy"` attribute for performance
- **Responsive Images** - Appropriate sizing for different devices
- **Image Schema** - Included in sitemap.xml for image search

Example:
```tsx
<img
  src={event.image_url}
  alt={`${event.title} - Event in Shaftesbury on ${date} at ${location}`}
  loading="lazy"
/>
```

### 4. Sitemap & Robots.txt

#### Sitemap (`public/sitemap.xml`)
- XML format compliant with sitemap protocol
- Includes all main pages with priority and change frequency
- Image sitemap for Gold Hill and key landmarks
- Last modified dates for freshness signals
- Submit to Google Search Console at: https://search.google.com/search-console

#### Robots.txt (`public/robots.txt`)
- Allows all search engine crawlers
- Blocks admin and authentication pages
- Points to sitemap location

### 5. Structured Data (Schema.org)

Implemented schemas:
- **Website Schema** - Home page
- **Organization Schema** - Business information
- **Restaurant Schema** - Dining establishments
- **LodgingBusiness Schema** - Accommodations
- **Event Schema** - Upcoming events
- **TouristAttraction Schema** - Landmarks and attractions

Test structured data: https://search.google.com/test/rich-results

## 🎯 SEO Best Practices Checklist

- ✅ Unique title tags for each page
- ✅ Meta descriptions under 160 characters
- ✅ H1 headings on every page
- ✅ Semantic HTML structure (header, nav, main, section, article)
- ✅ Image alt attributes with descriptive text
- ✅ Internal linking between related pages
- ✅ Mobile-responsive design
- ✅ Fast page load times (Vite optimization)
- ✅ HTTPS enabled
- ✅ Canonical URLs to prevent duplication
- ✅ Schema.org structured data
- ✅ Open Graph for social sharing
- ✅ XML sitemap
- ✅ Robots.txt file
- ✅ Geo-location metadata for local SEO

## 📈 Google Search Console Setup

1. **Verify Ownership**
   - Add your site: https://search.google.com/search-console
   - Use HTML file upload or meta tag verification

2. **Submit Sitemap**
   - Navigate to: Sitemaps → Add new sitemap
   - Enter: `https://visitshaftesbury.co.uk/sitemap.xml`

3. **Monitor Performance**
   - Check Search Console regularly for:
     - Indexing issues
     - Mobile usability
     - Core Web Vitals
     - Search performance metrics

## 🔍 Keyword Strategy

### Primary Keywords
- Shaftesbury Dorset
- Gold Hill Shaftesbury
- Visit Shaftesbury
- Shaftesbury tourism

### Secondary Keywords
- Hovis advert location
- Saxon town England
- Dorset attractions
- Blackmore Vale views
- Shaftesbury Abbey

### Long-tail Keywords
- "Things to do in Shaftesbury Dorset"
- "Where was the Hovis advert filmed"
- "Best restaurants in Shaftesbury"
- "Hotels near Gold Hill Shaftesbury"
- "Shaftesbury events and festivals"

## 🎨 Events Carousel Feature

Added to Home page:
- Displays next 6 upcoming published events
- Auto-fetches from Supabase database
- Responsive grid layout (1/2/3 columns)
- Direct links to events page
- Enhanced with proper semantic HTML and ARIA labels

## 📱 Social Media Optimization

Open Graph tags ensure:
- Proper image previews (1200x630px recommended)
- Compelling titles and descriptions
- Site name and locale information
- Type specification (website/article)

Twitter Card tags provide:
- Large image cards
- Proper attribution
- Rich media previews

## 🚀 Performance Optimization

SEO-friendly performance features:
- Lazy loading images
- Minimal render-blocking resources
- Optimized images via CDN
- Fast server response (Vite HMR)
- Efficient CSS (Tailwind v4)

## 📊 Analytics Recommendations

Consider adding:
- Google Analytics 4 for traffic analysis
- Google Tag Manager for event tracking
- Hotjar or similar for user behavior insights

## 🔧 Maintenance

Regular SEO tasks:
1. Update sitemap.xml when adding new pages
2. Refresh meta descriptions seasonally
3. Monitor Google Search Console for errors
4. Update event schema as events change
5. Check broken links monthly
6. Review Core Web Vitals quarterly

## 📞 Local SEO

Already implemented:
- Geo-location meta tags (51.0041, -2.1989)
- Local business schema
- Location-specific keywords
- Dorset and Shaftesbury in titles/descriptions

Consider adding:
- Google Business Profile listing
- Local directory submissions
- Customer reviews integration

## ✅ Testing Tools

Validate your SEO:
- **Google Rich Results Test**: https://search.google.com/test/rich-results
- **PageSpeed Insights**: https://pagespeed.web.dev/
- **Mobile-Friendly Test**: https://search.google.com/test/mobile-friendly
- **Schema Validator**: https://validator.schema.org/

---

Last Updated: 2026-01-21
