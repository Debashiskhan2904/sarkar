import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../lib/LanguageContext';

interface RouteSEO {
  title: string;
  description: string;
  keywords: string;
  image?: string;
}

const seoMap: Record<string, RouteSEO> = {
  '/': {
    title: 'The Sarkar Enterprise | Premium Brand & Business Promotion',
    description: 'Premier multi-sector enterprise in West Bengal specializing in FMCG distribution, 22K jewellery schemes, luxury modular interiors, brand promotion, and business growth facilitation.',
    keywords: 'The Sarkar Enterprise, FMCG Distributorship, Brand Promotion, Kishore Sarkar, West Bengal Business, Durgapur, Priti-Ji Chanachur, Munmun Soan Papdi, Angry Frog',
    image: 'https://i.pinimg.com/736x/d9/4f/27/d94f27adb01975c919f11aa8a998eb87.jpg'
  },
  '/about': {
    title: 'About Us | The Sarkar Enterprise — Heritage, Leadership & Growth',
    description: 'Learn about The Sarkar Enterprise, founded by MD Kishore Sarkar. Discover our corporate leadership, multi-sector operations, and commitment to sustainable enterprise growth across Eastern India.',
    keywords: 'About Sarkar Enterprise, Kishore Sarkar, Company Leadership, Durgapur Corporate Office, Business History, FMCG West Bengal',
    image: 'https://i.pinimg.com/736x/d9/4f/27/d94f27adb01975c919f11aa8a998eb87.jpg'
  },
  '/credentials': {
    title: 'Corporate Credentials & Authorized Brands | The Sarkar Enterprise',
    description: 'Official corporate credentials, statutory FSSAI authorizations, MSME industrial compliance, and authorized commercial brand entities: Munmun Soanpapdi, Pritiji Chanachur, Maxwel, and Angry Frog.',
    keywords: 'Sarkar Enterprise Credentials, Munmun Soanpapdi, Pritiji Chanachur, Maxwel, Angry Frog Mosquito, FSSAI License, MSME Registration, West Bengal Trade',
    image: 'https://i.pinimg.com/736x/d9/4f/27/d94f27adb01975c919f11aa8a998eb87.jpg'
  },
  '/products': {
    title: 'Products & Multi-Sector Hub | The Sarkar Enterprise',
    description: 'Explore our multi-sector operations: FMCG manufacturing & distribution (Chanachur, Agarbatti, Mosquito Repellents, Soan Papdi), 22K Jewellery monopoly schemes, Turnkey Modular Interiors, and Corporate Finance.',
    keywords: 'FMCG Products, Jewellery Monopoly, Interior Design Showroom, Corporate Loan Facilitation, Sarkar Enterprise Sectors, Priti-Ji, Munmun',
    image: 'https://i.pinimg.com/736x/d9/4f/27/d94f27adb01975c919f11aa8a998eb87.jpg'
  },
  '/products/fmcg': {
    title: 'FMCG Products & Packaged Foods | The Sarkar Enterprise',
    description: 'Explore top FMCG lines: Priti-Ji Ayurvedic Chanachur, Munmun Pure Desi Ghee Soan Papdi, Angry Frog Liquid Mosquito Vaporizers & Coils, and Maxwel Agarbatti.',
    keywords: 'FMCG Distributorship, Priti-Ji Chanachur, Munmun Soan Papdi, Angry Frog Mosquito Repellent, Maxwel Agarbatti, West Bengal Wholesale',
    image: 'https://i.pinimg.com/736x/d9/4f/27/d94f27adb01975c919f11aa8a998eb87.jpg'
  },
  '/products/jewellery': {
    title: '22K Hallmarked Jewellery Monopoly Scheme | The Sarkar Enterprise',
    description: 'Exclusive 22K/916 hallmarked gold & certified diamond jewellery monopoly business schemes with 6-year bank safety structures and high-yield retailer margins.',
    keywords: 'Jewellery Monopoly, 22K Hallmarked Gold, BIS 916 Diamond Jewellery, Stylo Jewellery Scheme, Gold Business West Bengal',
    image: 'https://i.pinimg.com/736x/d9/4f/27/d94f27adb01975c919f11aa8a998eb87.jpg'
  },
  '/products/interior': {
    title: 'Turnkey Modular Interiors & Infrastructure | The Sarkar Enterprise',
    description: 'Bespoke corporate office architecture, luxury residential fit-outs, modular kitchens, IFRPPI Plywood infrastructure, and Chinar Park commercial showroom projects.',
    keywords: 'Turnkey Interiors, Modular Kitchen, IFRPPI Plywood, Corporate Fit-Out, Chinar Park Kolkata, Interior Infrastructure',
    image: 'https://i.pinimg.com/736x/d9/4f/27/d94f27adb01975c919f11aa8a998eb87.jpg'
  },
  '/careers': {
    title: 'Careers & Distributorship Network | The Sarkar Enterprise',
    description: 'Join The Sarkar Enterprise network. Explore career openings, territory sales distributorships, hawker schemes, and franchisee partnerships with attractive margins.',
    keywords: 'Sarkar Enterprise Careers, Distributorship Registration, FMCG Dealership, Hawker Scheme, Job Openings Durgapur, Sales Officer',
    image: 'https://i.pinimg.com/736x/d9/4f/27/d94f27adb01975c919f11aa8a998eb87.jpg'
  },
  '/training': {
    title: 'Professional Training Program & Field Kits | The Sarkar Enterprise',
    description: 'Comprehensive corporate induction masterclasses, 12 essential field starter kit materials, Sunday training batch schedules, and career growth certifications.',
    keywords: 'Corporate Training Program, Field Starter Kit, Sunday Training Batch, Sales Mastery, The Sarkar Enterprise Training',
    image: 'https://i.pinimg.com/736x/d9/4f/27/d94f27adb01975c919f11aa8a998eb87.jpg'
  },
  '/media': {
    title: 'Media Gallery & Digital Campaigns | The Sarkar Enterprise',
    description: 'View the official visual gallery, video showcases, and multimedia ad campaigns highlighting Sarkar Enterprise products, factory facilities, and retail presence.',
    keywords: 'Sarkar Enterprise Media, Brand Video Commercials, Product Gallery, Promotional Audio Jingles, Press Kit',
    image: 'https://i.pinimg.com/736x/d9/4f/27/d94f27adb01975c919f11aa8a998eb87.jpg'
  },
  '/faq': {
    title: 'FAQ & Business Knowledgebase | The Sarkar Enterprise',
    description: 'Get verified answers to frequently asked questions regarding distributorship margins, advance payment verification, monopoly agreements, and GST compliance.',
    keywords: 'Sarkar Enterprise FAQ, Distributorship Query, Payment Verification, Business Agreement Help, Support Durgapur',
    image: 'https://i.pinimg.com/736x/d9/4f/27/d94f27adb01975c919f11aa8a998eb87.jpg'
  },
  '/contact': {
    title: 'Contact Us & Head Office Coordinates | The Sarkar Enterprise',
    description: 'Connect directly with The Sarkar Enterprise head office in Bhiringi More, Benachity, Durgapur. Direct phones, WhatsApp helpline, official email, and appointment booking.',
    keywords: 'Contact Sarkar Enterprise, Durgapur Office Address, Phone Number, WhatsApp Query, Kishore Sarkar Contact, Bhiringi More',
    image: 'https://i.pinimg.com/736x/d9/4f/27/d94f27adb01975c919f11aa8a998eb87.jpg'
  },
  '/legal': {
    title: 'Corporate Governance & Legal Documentation | The Sarkar Enterprise',
    description: 'Official 5-Year Business Growth Agreement, Escrow GST billing, Privacy Policy, Terms of Service, and compliance frameworks governing commercial partnerships.',
    keywords: 'Legal Contract Agreement, Corporate Governance, Sarkar Enterprise GST, Privacy Policy, Escrow Payment Terms',
    image: 'https://i.pinimg.com/736x/d9/4f/27/d94f27adb01975c919f11aa8a998eb87.jpg'
  },
  '/conclusion': {
    title: 'Strategic Vision & 2030 Roadmap | The Sarkar Enterprise',
    description: 'Explore the 5-year and 10-year strategic roadmap for The Sarkar Enterprise expanding regional retail penetration, automated manufacturing, and nationwide distribution.',
    keywords: 'Strategic Vision, Business Roadmap 2030, Sarkar Enterprise Future, Market Expansion West Bengal',
    image: 'https://i.pinimg.com/736x/d9/4f/27/d94f27adb01975c919f11aa8a998eb87.jpg'
  }
};

export const SEOManager = () => {
  const { pathname } = useLocation();
  const { lang } = useLanguage();

  useEffect(() => {
    // Normalize path (handle trailing slashes or subpaths)
    let cleanPath = pathname;
    if (cleanPath.length > 1 && cleanPath.endsWith('/')) {
      cleanPath = cleanPath.slice(0, -1);
    }

    const currentSEO = seoMap[cleanPath] || (cleanPath.startsWith('/products/') ? seoMap['/products'] : seoMap['/']);

    // 1. Update Document Title
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

    // 2. Standard SEO Meta Tags
    setMetaTag('description', currentSEO.description);
    setMetaTag('keywords', currentSEO.keywords);
    setMetaTag('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

    // 3. Open Graph Tags
    const canonicalUrl = `https://www.businesspromoter2001.com${cleanPath === '/' ? '' : cleanPath}`;
    const ogImage = currentSEO.image || 'https://i.pinimg.com/736x/d9/4f/27/d94f27adb01975c919f11aa8a998eb87.jpg';

    setMetaTag('og:type', 'website', true);
    setMetaTag('og:title', currentSEO.title, true);
    setMetaTag('og:description', currentSEO.description, true);
    setMetaTag('og:url', canonicalUrl, true);
    setMetaTag('og:image', ogImage, true);
    setMetaTag('og:site_name', 'The Sarkar Enterprise', true);

    // 4. Twitter Card Tags
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', currentSEO.title);
    setMetaTag('twitter:description', currentSEO.description);
    setMetaTag('twitter:image', ogImage);

    // 5. Canonical Link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    // 6. Update HTML lang attribute
    document.documentElement.lang = lang === 'hi' ? 'hi' : lang === 'bn' ? 'bn' : 'en';

    // 7. Route-specific JSON-LD Breadcrumb Schema
    let breadcrumbScript = document.getElementById('route-breadcrumb-jsonld') as HTMLScriptElement;
    if (!breadcrumbScript) {
      breadcrumbScript = document.createElement('script');
      breadcrumbScript.id = 'route-breadcrumb-jsonld';
      breadcrumbScript.type = 'application/ld+json';
      document.head.appendChild(breadcrumbScript);
    }

    const pathSegments = cleanPath.split('/').filter(Boolean);
    const itemListElement = [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': 'https://www.businesspromoter2001.com/'
      }
    ];

    let currentUrlAcc = 'https://www.businesspromoter2001.com';
    pathSegments.forEach((seg, idx) => {
      currentUrlAcc += `/${seg}`;
      const name = seg.charAt(0).toUpperCase() + seg.slice(1);
      itemListElement.push({
        '@type': 'ListItem',
        'position': idx + 2,
        'name': name,
        'item': currentUrlAcc
      });
    });

    breadcrumbScript.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': itemListElement
    });

  }, [pathname, lang]);

  return null;
};
