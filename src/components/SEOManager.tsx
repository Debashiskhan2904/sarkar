import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../lib/LanguageContext';

interface RouteSEO {
  title: string;
  description: string;
  keywords: string;
}

const seoMap: Record<string, RouteSEO> = {
  '/': {
    title: 'The Sarkar Enterprise | Premium Brand & Business Promotion',
    description: 'Premier multi-sector enterprise in West Bengal offering FMCG distributorship, Jewellery monopoly franchise, luxury interior design, corporate partnerships, and business finance facilitation.',
    keywords: 'The Sarkar Enterprise, FMCG Distributorship, Brand Promotion, Kishore Sarkar, West Bengal Business, Durgapur'
  },
  '/about': {
    title: 'About Us | The Sarkar Enterprise — Heritage, Leadership & Growth',
    description: 'Learn about The Sarkar Enterprise, founded by Kishore Sarkar. Discover our corporate leadership, strategic vision, and commitment to sustainable business growth across West Bengal.',
    keywords: 'About Sarkar Enterprise, Kishore Sarkar, Company Leadership, Durgapur Corporate Office, Business History'
  },
  '/products': {
    title: 'Business Sectors & Products Hub | The Sarkar Enterprise',
    description: 'Explore our multi-sector operations: FMCG manufacturing & distribution (Chanachur, Agarbatti, Mosquito Repellent, Soan Papdi), Jewellery schemes, Turnkey Interior, and Corporate Finance.',
    keywords: 'FMCG Products, Jewellery Monopoly, Interior Design Showroom, Corporate Loan Facilitation, Sarkar Enterprise Sectors'
  },
  '/careers': {
    title: 'Careers & Distributorship Opportunities | The Sarkar Enterprise',
    description: 'Join The Sarkar Enterprise network. Explore career openings, territory sales distributorships, hawker schemes, and franchisee partnerships with attractive margins.',
    keywords: 'Sarkar Enterprise Careers, Distributorship Registration, FMCG Dealership, Hawker Scheme, Job Openings Durgapur'
  },
  '/media': {
    title: 'Media Gallery & Digital Campaigns | The Sarkar Enterprise',
    description: 'View the official visual gallery, video showcases, and multimedia ad campaigns highlighting Sarkar Enterprise products, factory facilities, and retail presence.',
    keywords: 'Sarkar Enterprise Media, Brand Video Commercials, Product Gallery, Promotional Audio Jingles, Press Kit'
  },
  '/faq': {
    title: 'FAQ & Business Knowledgebase | The Sarkar Enterprise',
    description: 'Get answers to frequently asked questions about distributorship margins, advance payment verification, monopoly agreements, and GST compliance.',
    keywords: 'Sarkar Enterprise FAQ, Distributorship Query, Payment Verification, Business Agreement Help, Support'
  },
  '/contact': {
    title: 'Contact Us & Quick Connect | The Sarkar Enterprise (Durgapur)',
    description: 'Connect directly with The Sarkar Enterprise head office in Bhiringi More, Benachity, Durgapur. Phone, WhatsApp, official email, and advance payment registration.',
    keywords: 'Contact Sarkar Enterprise, Durgapur Office Address, Phone Number, WhatsApp Query, Kishore Sarkar Contact'
  },
  '/legal': {
    title: 'Corporate Governance & Legal Agreements | The Sarkar Enterprise',
    description: 'Official 5-Year Business Growth Agreement, Escrow GST billing, Privacy Policy, Terms of Service, and compliance frameworks governing client partnerships.',
    keywords: 'Legal Contract Agreement, Corporate Governance, Sarkar Enterprise GST, Privacy Policy, Escrow Payment Terms'
  },
  '/conclusion': {
    title: 'Strategic Vision & 2030 Roadmap | The Sarkar Enterprise',
    description: 'Explore the 5-year and 10-year strategic roadmap for The Sarkar Enterprise expanding regional retail penetration, automated manufacturing, and national distribution.',
    keywords: 'Strategic Vision, Business Roadmap 2030, Sarkar Enterprise Future, Market Expansion West Bengal'
  }
};

export const SEOManager = () => {
  const { pathname } = useLocation();
  const { language } = useLanguage();

  useEffect(() => {
    const currentSEO = seoMap[pathname] || seoMap['/'];

    // Update Document Title
    document.title = currentSEO.title;

    // Helper to safely set or create meta tags
    const setMetaTag = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let tag = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement;
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attr, name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    // Update standard SEO meta tags
    setMetaTag('description', currentSEO.description);
    setMetaTag('keywords', currentSEO.keywords);

    // Update Open Graph tags
    setMetaTag('og:title', currentSEO.title, true);
    setMetaTag('og:description', currentSEO.description, true);
    setMetaTag('og:url', `https://sarkarenterprise.in${pathname === '/' ? '' : pathname}`, true);

    // Update Twitter tags
    setMetaTag('twitter:title', currentSEO.title);
    setMetaTag('twitter:description', currentSEO.description);

    // Update canonical link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `https://sarkarenterprise.in${pathname === '/' ? '' : pathname}`);

    // Update HTML lang attribute
    document.documentElement.lang = language === 'hi' ? 'hi' : language === 'bn' ? 'bn' : 'en';

  }, [pathname, language]);

  return null;
};
