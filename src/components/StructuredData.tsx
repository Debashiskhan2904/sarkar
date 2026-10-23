import React, { useEffect } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQJsonLdProps {
  faqs: FAQItem[];
  id?: string;
}

export const FAQJsonLd: React.FC<FAQJsonLdProps> = ({ faqs, id = 'faq-structured-data' }) => {
  useEffect(() => {
    if (!faqs || faqs.length === 0) return;

    const schemaData = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': 'https://www.businesspromoter2001.com/faq#faqpage',
      'mainEntity': faqs.map((f) => ({
        '@type': 'Question',
        'name': f.question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': f.answer
        }
      }))
    };

    let script = document.getElementById(id) as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script');
      script.id = id;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schemaData, null, 2);

    return () => {
      const existingScript = document.getElementById(id);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [faqs, id]);

  return null;
};

export interface ProductSchemaItem {
  name: string;
  description: string;
  image?: string;
  category?: string;
  sku?: string;
  brand?: string;
  price?: string | number;
  priceCurrency?: string;
  availability?: 'InStock' | 'PreOrder' | 'OutOfStock';
  ratingValue?: string | number;
  reviewCount?: string | number;
}

interface ProductJsonLdProps {
  products: ProductSchemaItem[];
  id?: string;
}

export const ProductJsonLd: React.FC<ProductJsonLdProps> = ({ products, id = 'products-structured-data' }) => {
  useEffect(() => {
    if (!products || products.length === 0) return;

    const schemaData = {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      '@id': 'https://www.businesspromoter2001.com/products#itemlist',
      'name': 'The Sarkar Enterprise Commercial Product & Franchise Catalog',
      'description': 'Official commercial products, packaged food items, mosquito protection systems, and monopoly franchises by The Sarkar Enterprise.',
      'itemListElement': products.map((prod, index) => ({
        '@type': 'ListItem',
        'position': index + 1,
        'item': {
          '@type': 'Product',
          'name': prod.name,
          'description': prod.description,
          'image': prod.image || 'https://i.pinimg.com/736x/d9/4f/27/d94f27adb01975c919f11aa8a998eb87.jpg',
          'category': prod.category || 'Consumer Goods',
          'sku': prod.sku || `SKU-SE-${index + 101}`,
          'brand': {
            '@type': 'Brand',
            'name': prod.brand || 'The Sarkar Enterprise'
          },
          'offers': {
            '@type': 'Offer',
            'url': 'https://www.businesspromoter2001.com/products',
            'priceCurrency': prod.priceCurrency || 'INR',
            'price': prod.price || '100',
            'availability': prod.availability ? `https://schema.org/${prod.availability}` : 'https://schema.org/InStock',
            'seller': {
              '@type': 'Organization',
              'name': 'The Sarkar Enterprise',
              'url': 'https://www.businesspromoter2001.com'
            }
          },
          'aggregateRating': {
            '@type': 'AggregateRating',
            'ratingValue': prod.ratingValue || '4.9',
            'reviewCount': prod.reviewCount || '128'
          }
        }
      }))
    };

    let script = document.getElementById(id) as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script');
      script.id = id;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schemaData, null, 2);

    return () => {
      const existingScript = document.getElementById(id);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [products, id]);

  return null;
};
