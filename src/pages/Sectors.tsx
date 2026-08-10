import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageWrapper } from '../components/PageWrapper';
import { FMCG_PRODUCTS, JEWELLERY_PRODUCTS, JEWELLERY_GALLERY, INTERIOR_PROJECTS } from '../data';
import { useStore } from '../store';

export const ProductsHub = () => {
  const navigate = useNavigate();
  return (
    <PageWrapper>
      <section className="section" style={{ paddingTop: '60px' }}>
        <div className="container">
          <div className="section-header">
            <div className="label">Central Catalog</div>
            <h2>Products Hub</h2>
            <p>Master routing into our three specialized sector catalogs. Choose your domain of interest.</p>
          </div>
          <div className="sectors-grid">
            <div className="sector-card" onClick={() => navigate('/products/fmcg')}>
              <img src="https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=900" alt="FMCG Consumer Goods" />
              <div className="sector-overlay">
                <h3>FMCG Sector</h3>
                <p>Consumer goods • Snacks • Beverages • Personal Care</p>
                <span className="sector-link">Enter Catalog →</span>
              </div>
            </div>
            <div className="sector-card" onClick={() => navigate('/products/jewellery')}>
              <img src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=900" alt="Luxury Jewellery" />
              <div className="sector-overlay">
                <h3>Jewellery Sector</h3>
                <p>Gold • Diamond • Heritage • Contemporary Luxury</p>
                <span className="sector-link">Enter Collection →</span>
              </div>
            </div>
            <div className="sector-card" onClick={() => navigate('/products/interior')}>
              <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=900" alt="Interior Design" />
              <div className="sector-overlay">
                <h3>Interior Sector</h3>
                <p>Residential • Commercial • Hospitality Design</p>
                <span className="sector-link">Enter Portfolio →</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export const Fmcg = () => {
  const { showToast, openZoomGallery } = useStore();
  return (
    <PageWrapper>
      <section className="section" style={{ paddingTop: '60px' }}>
        <div className="container">
          <div className="section-header">
            <div className="label">FMCG Sector</div>
            <h2>Consumer Goods Showcase</h2>
            <p>Premium product categories with full technical specifications and instant catalog access.</p>
          </div>

          <div className="catalog-banner">
            <div>
              <h3>📥 Complete FMCG Catalog 2026</h3>
              <p>142 products • Specs • Pricing tiers • Market positioning data</p>
            </div>
            <button className="btn btn-primary" onClick={() => showToast('Downloading FMCG Catalog...', 'success')}>Download PDF Catalog</button>
          </div>

          <div className="product-grid">
            {FMCG_PRODUCTS.map((p, i) => (
              <div className="product-card" key={i}>
                <div className="product-img" style={{ cursor: 'pointer' }} onClick={() => openZoomGallery(p.images, 0, p.name)}>
                  {p.badge && <span className="product-badge">{p.badge}</span>}
                  <img className="main-img" src={p.images[0]} alt={p.name} loading="lazy" />
                  <div className="product-img-overlay"><span>View Catalog · {p.images.length} photos</span></div>
                </div>
                <div className="product-body">
                  <h4>{p.name}</h4>
                  <p>{p.desc}</p>
                  <div className="product-specs">{p.specs.map((s, idx) => <span key={idx} className="spec-tag">{s}</span>)}</div>
                  <div className="product-actions">
                    <button className="btn btn-primary" onClick={(e) => { e.stopPropagation(); showToast(`Downloading ${p.name} Spec Sheet`, 'success'); }}>Download Spec</button>
                    <button className="btn btn-dark" onClick={(e) => { e.stopPropagation(); openZoomGallery(p.images, 0, p.name); }}>Open Brochure</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export const Jewellery = () => {
  const { showToast, openZoomGallery, playVideo } = useStore();
  return (
    <PageWrapper>
      <section className="section" style={{ paddingTop: '60px' }}>
        <div className="container">
          <div className="section-header">
            <div className="label">Jewellery Sector</div>
            <h2>Luxury Craftsmanship</h2>
            <p>High-resolution zoomable galleries, craftsmanship showcases, and exclusive brochures.</p>
          </div>

          <div className="catalog-banner">
            <div>
              <h3>📥 Luxury Jewellery Brochure</h3>
              <p>Heritage collections • Contemporary lines • Custom commission guide</p>
            </div>
            <button className="btn btn-primary" onClick={() => showToast('Downloading Jewellery Brochure...', 'success')}>Download Brochure</button>
          </div>

          <div style={{ marginBottom: '56px' }}>
            <h3 style={{ textAlign: 'center', marginBottom: '24px', fontSize: '1.5rem' }}>Craftsmanship Showcase</h3>
            <div className="video-showcase">
              <video controls playsInline poster="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200" style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
                <source src="https://videos.pexels.com/video-files/5532760/5532760-hd_1920_1080_25fps.mp4" type="video/mp4" />
              </video>
            </div>
            <p style={{ textAlign: 'center', color: 'var(--gray)', marginTop: '12px', fontSize: '0.9rem' }}>Live craftsmanship showcase — luxury jewellery process film</p>
          </div>

          <h3 style={{ textAlign: 'center', marginBottom: '28px', fontSize: '1.5rem' }}>Zoomable Product Gallery</h3>
          <div className="gallery-zoom">
            {JEWELLERY_GALLERY.map((url, i) => (
              <div className="gallery-item" key={i} onClick={() => openZoomGallery(JEWELLERY_GALLERY, i, 'Luxury Jewellery Collection')}>
                <img src={url} alt="Jewellery" loading="lazy" />
                <span className="zoom-label">View</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '56px' }}>
            <h3 style={{ textAlign: 'center', marginBottom: '28px', fontSize: '1.5rem' }}>Featured Pieces</h3>
            <div className="product-grid">
              {JEWELLERY_PRODUCTS.map((p, i) => (
                <div className="product-card" key={i}>
                  <div className="product-img" style={{ cursor: 'pointer' }} onClick={() => openZoomGallery(p.images, 0, p.name)}>
                    {p.badge && <span className="product-badge">{p.badge}</span>}
                    <img className="main-img" src={p.images[0]} alt={p.name} loading="lazy" />
                    <div className="product-img-overlay"><span>View Catalog · {p.images.length} photos</span></div>
                  </div>
                  <div className="product-body">
                    <h4>{p.name}</h4>
                    <p>{p.desc}</p>
                    <div className="product-specs">{p.specs.map((s, idx) => <span key={idx} className="spec-tag">{s}</span>)}</div>
                    <div className="product-actions">
                      <button className="btn btn-dark" onClick={(e) => { e.stopPropagation(); openZoomGallery(p.images, 0, p.name); }}>Open Brochure</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export const Interior = () => {
  const { showToast, openZoomGallery } = useStore();
  return (
    <PageWrapper>
      <section className="section" style={{ paddingTop: '60px' }}>
        <div className="container">
          <div className="section-header">
            <div className="label">Interior Sector</div>
            <h2>Architectural Portfolio</h2>
            <p>Project showcases, material specifications, walkthroughs, and design brochures.</p>
          </div>

          <div className="catalog-banner">
            <div>
              <h3>📥 Design Portfolio Brochure</h3>
              <p>Signature projects • Material library • Process overview</p>
            </div>
            <button className="btn btn-primary" onClick={() => showToast('Downloading Interior Portfolio...', 'success')}>Download PDF</button>
          </div>

          <div style={{ marginBottom: '56px' }}>
            <h3 style={{ textAlign: 'center', marginBottom: '24px', fontSize: '1.5rem' }}>Project Walkthrough</h3>
            <div className="video-showcase">
              <video controls playsInline poster="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200" style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
                <source src="https://videos.pexels.com/video-files/3773486/3773486-hd_1920_1080_30fps.mp4" type="video/mp4" />
              </video>
            </div>
            <p style={{ textAlign: 'center', color: 'var(--gray)', marginTop: '12px', fontSize: '0.9rem' }}>Live architectural walkthrough — luxury interior spaces</p>
          </div>

          <div className="portfolio-grid">
            {INTERIOR_PROJECTS.map((p, i) => (
              <div className="portfolio-card" key={i}>
                <div className="portfolio-img" style={{ cursor: 'pointer' }} onClick={() => openZoomGallery(p.images, 0, p.name)}>
                  <img className="main-img" src={p.images[0]} alt={p.name} loading="lazy" />
                  <div className="product-img-overlay"><span>View Portfolio · {p.images.length} photos</span></div>
                </div>
                <div className="portfolio-body">
                  <h4>{p.name}</h4>
                  <p>{p.desc}</p>
                  <div className="materials">{p.materials.map((m, idx) => <span key={idx} className="mat-tag">{m}</span>)}</div>
                  <div className="product-actions">
                    <button className="btn btn-dark" onClick={(e) => { e.stopPropagation(); showToast(`Downloading ${p.name} Project Sheet`, 'success'); }}>Project PDF</button>
                    <button className="btn btn-primary" onClick={(e) => { e.stopPropagation(); openZoomGallery(p.images, 0, p.name); }}>Open Brochure</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};
