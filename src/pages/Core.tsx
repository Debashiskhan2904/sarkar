import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageWrapper } from '../components/PageWrapper';
import { useStore } from '../store';
import { MapPin, Phone, Mail } from 'lucide-react';

export const Home = () => {
  const navigate = useNavigate();
  const { showToast } = useStore();

  return (
    <PageWrapper>
      <section className="hero">
        <video className="hero-video" autoPlay muted loop playsInline>
          <source src="https://videos.pexels.com/video-files/3129957/3129957-uhd_2560_1440_25fps.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-badge">Premium Brand & Business Promotion</div>
          <h1>Elevating Brands Across<br/><span>FMCG • Jewellery • Interiors</span></h1>
          <p>Sarkar Enterprise crafts powerful brand experiences that resonate globally. From consumer goods to luxury craftsmanship and architectural excellence — we promote excellence.</p>
          <div className="hero-btns">
            <button className="btn btn-primary" onClick={() => navigate('/products')}>Explore Sectors →</button>
            <button className="btn btn-outline" onClick={() => navigate('/about')}>Our Story</button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="label">Our Verticals</div>
            <h2>Three Sectors. One Vision.</h2>
            <p>Navigate into our specialized catalogs — each crafted for excellence in its domain.</p>
          </div>
          <div className="sectors-grid">
            <div className="sector-card" onClick={() => navigate('/products/fmcg')}>
              <img src="https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=900" alt="FMCG Consumer Goods" />
              <div className="sector-overlay">
                <h3>FMCG Sector</h3>
                <p>Consumer goods that define everyday excellence</p>
                <span className="sector-link">View Catalog →</span>
              </div>
            </div>
            <div className="sector-card" onClick={() => navigate('/products/jewellery')}>
              <img src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=900" alt="Luxury Jewellery" />
              <div className="sector-overlay">
                <h3>Jewellery Sector</h3>
                <p>Luxury craftsmanship & timeless elegance</p>
                <span className="sector-link">Explore Collection →</span>
              </div>
            </div>
            <div className="sector-card" onClick={() => navigate('/products/interior')}>
              <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=900" alt="Interior Design" />
              <div className="sector-overlay">
                <h3>Interior Sector</h3>
                <p>Architectural portfolios & design excellence</p>
                <span className="sector-link">View Portfolio →</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div className="section-header">
            <div className="label">Resources</div>
            <h2>Featured Brochures</h2>
            <p>Download our latest sector catalogs and brand presentations.</p>
          </div>
          <div className="brochures-grid">
            <div className="brochure-card">
              <div className="brochure-img"><img src="https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=600" alt="FMCG Brochure" /></div>
              <div className="brochure-body">
                <h4>FMCG Product Catalog 2026</h4>
                <p>Complete range of consumer goods with technical specs and market insights.</p>
                <div className="brochure-meta">
                  <span>PDF • 12.4 MB</span>
                  <button className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.85rem' }} onClick={() => showToast('Downloading FMCG Catalog...', 'success')}>Download</button>
                </div>
              </div>
            </div>
            <div className="brochure-card">
              <div className="brochure-img"><img src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600" alt="Jewellery Brochure" /></div>
              <div className="brochure-body">
                <h4>Luxury Jewellery Collection</h4>
                <p>High-resolution showcase of handcrafted pieces and craftsmanship stories.</p>
                <div className="brochure-meta">
                  <span>PDF • 18.7 MB</span>
                  <button className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.85rem' }} onClick={() => showToast('Downloading Jewellery Catalog...', 'success')}>Download</button>
                </div>
              </div>
            </div>
            <div className="brochure-card">
              <div className="brochure-img"><img src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600" alt="Interior Brochure" /></div>
              <div className="brochure-body">
                <h4>Architectural Design Portfolio</h4>
                <p>Signature projects, material libraries, and design philosophy overview.</p>
                <div className="brochure-meta">
                  <span>PDF • 24.1 MB</span>
                  <button className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.85rem' }} onClick={() => showToast('Downloading Interior Portfolio...', 'success')}>Download</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="career-teaser">
            <div>
              <h2>Build Your Career With Us</h2>
              <p>Join a team that shapes global brands. We offer growth, purpose, and a culture of excellence across three dynamic sectors.</p>
            </div>
            <button className="btn btn-primary" onClick={() => navigate('/careers')}>View Open Roles →</button>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--white)', paddingBottom: '100px' }}>
        <div className="container">
          <div className="section-header">
            <div className="label">Connect</div>
            <h2>Quick Connect</h2>
          </div>
          <div className="quick-contact">
            <a href="tel:+911123456789" className="quick-card" style={{ display: 'block' }}>
              <div className="quick-icon">📞</div>
              <h4>Call Us</h4>
              <p>+91 11 2345 6789</p>
            </a>
            <a href="mailto:hello@sarkarenterprise.com" className="quick-card" style={{ display: 'block' }}>
              <div className="quick-icon">✉️</div>
              <h4>Email Us</h4>
              <p>hello@sarkarenterprise.com</p>
            </a>
            <div className="quick-card" onClick={() => navigate('/contact')}>
              <div className="quick-icon">📍</div>
              <h4>Visit Us</h4>
              <p>Connaught Place, New Delhi</p>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export const About = () => {
  return (
    <PageWrapper>
      <section className="section" style={{ paddingTop: '60px' }}>
        <div className="container">
          <div className="section-header">
            <div className="label">Who We Are</div>
            <h2>About Sarkar Enterprise</h2>
            <p>Building brands that endure. Promoting excellence that inspires.</p>
          </div>

          <div className="about-grid" style={{ marginBottom: '80px' }}>
            <div className="about-img">
              <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800" alt="Office" />
            </div>
            <div className="about-content">
              <h2>Our Journey Since 2008</h2>
              <p>Founded in New Delhi in 2008, Sarkar Enterprise began as a boutique brand consultancy focused on elevating Indian consumer brands. Over 16 years, we have grown into a multi-sector powerhouse spanning FMCG promotion, luxury jewellery branding, and high-end interior design representation.</p>
              <p>Today we partner with over 140 brands across India, the Middle East, and Southeast Asia — crafting narratives, catalogs, and experiences that convert attention into loyalty.</p>
              <p>Our philosophy is simple: every brand has a story worth telling exceptionally well. We provide the strategy, design, and reach to make that story unforgettable.</p>
            </div>
          </div>

          <div className="section-header">
            <div className="label">Foundation</div>
            <h2>Corporate Values</h2>
          </div>
          <div className="values-grid" style={{ marginBottom: '80px' }}>
            <div className="value-item">
              <h4>Integrity First</h4>
              <p>Transparent partnerships and honest brand storytelling guide every engagement.</p>
            </div>
            <div className="value-item">
              <h4>Craft Excellence</h4>
              <p>From catalog design to campaign strategy, we pursue meticulous quality.</p>
            </div>
            <div className="value-item">
              <h4>Client Partnership</h4>
              <p>We succeed only when our clients' brands grow and thrive in the market.</p>
            </div>
            <div className="value-item">
              <h4>Global Ambition</h4>
              <p>Rooted in India, we think and execute with international standards and reach.</p>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export const Contact = () => {
  const { showToast, addInquiry } = useStore();
  
  const submitContact = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const fd = new FormData(form);
    const newInq = {
      name: fd.get('name'),
      email: fd.get('email'),
      phone: fd.get('phone'),
      company: fd.get('company'),
      type: fd.get('type'),
      message: fd.get('message'),
      date: new Date().toISOString()
    };
    await addInquiry(newInq);
    showToast('Thank you! Your inquiry has been received. We will respond within 24 hours.', 'success');
    form.reset();
  };

  return (
    <PageWrapper>
      <section className="section" style={{ paddingTop: '60px' }}>
        <div className="container">
          <div className="section-header">
            <div className="label">Connect</div>
            <h2>Contact Us</h2>
            <p>Inquiry routing, interactive map, and direct contact triggers.</p>
          </div>

          <div className="contact-grid">
            <div className="contact-info">
              <h3>Let's Start a Conversation</h3>
              <div className="contact-item">
                <div className="contact-icon"><MapPin size={24} /></div>
                <div>
                  <h5>Head Office</h5>
                  <p>12th Floor, Tower B, Connaught Place<br/>New Delhi 110001, India</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon"><Phone size={24} /></div>
                <div>
                  <h5>Phone</h5>
                  <p><a href="tel:+911123456789">+91 11 2345 6789</a><br/><a href="tel:+919876543210">+91 98765 43210</a></p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon"><Mail size={24} /></div>
                <div>
                  <h5>Email</h5>
                  <p><a href="mailto:hello@sarkarenterprise.com">hello@sarkarenterprise.com</a><br/><a href="mailto:careers@sarkarenterprise.com">careers@sarkarenterprise.com</a></p>
                </div>
              </div>
              <div className="map-container">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.987654321!2d77.2090!3d28.6315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM3JzUzLjQiTiA3N8KwMTInMzIuNCJF!5e0!3m2!1sen!2sin!4v1620000000000" allowFullScreen loading="lazy"></iframe>
              </div>
            </div>

            <div className="apply-form" style={{ maxWidth: 'none' }}>
              <h3 style={{ marginBottom: '24px', fontSize: '1.3rem' }}>Send an Inquiry</h3>
              <form onSubmit={submitContact}>
                <div className="form-group">
                  <label>Full Name *</label>
                  <input type="text" name="name" required />
                </div>
                <div className="form-group">
                  <label>Email *</label>
                  <input type="email" name="email" required />
                </div>
                <div className="form-group">
                  <label>Phone Number *</label>
                  <input type="tel" name="phone" required />
                </div>
                <div className="form-group">
                  <label>Company / Brand</label>
                  <input type="text" name="company" />
                </div>
                <div className="form-group">
                  <label>Inquiry Type *</label>
                  <select name="type" required>
                    <option value="">Select</option>
                    <option>FMCG Partnership</option>
                    <option>Jewellery Branding</option>
                    <option>Interior Design Project</option>
                    <option>General Inquiry</option>
                    <option>Media / Press</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Message *</label>
                  <textarea name="message" rows={5} required></textarea>
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export const Legal = () => {
  return (
    <PageWrapper>
      <section className="section" style={{ paddingTop: '60px' }}>
        <div className="container">
          <div className="legal-content">
            <h2>Privacy Policy & Terms of Service</h2>
            <p style={{ color: 'var(--gray)', marginBottom: '32px' }}>Last updated: August 2026 • Applicable to applicant data collection and website use.</p>

            <h3>1. Information We Collect</h3>
            <p>When you apply for a role or submit an inquiry, we collect: full name, email address, phone number, resume/CV file, cover note, and any additional information you voluntarily provide.</p>

            <h3>2. How We Use Your Data</h3>
            <ul>
              <li>To evaluate job applications and contact shortlisted candidates.</li>
              <li>To respond to business inquiries and partnership requests.</li>
              <li>To improve our recruitment and client engagement processes.</li>
              <li>We do not sell or share applicant data with third parties for marketing.</li>
            </ul>

            <h3>3. Data Storage & Security</h3>
            <p>Resumes and personal data are stored securely. Access is restricted to authorized HR and hiring managers only. Files are retained for a maximum of 24 months after the application cycle ends, after which they are permanently deleted.</p>

            <h3>4. Your Rights</h3>
            <ul>
              <li>Request access to the personal data we hold about you.</li>
              <li>Request correction or deletion of your data.</li>
              <li>Withdraw consent for processing at any time by emailing careers@sarkarenterprise.com.</li>
            </ul>

            <h3>5. Terms of Service</h3>
            <p>By using this website and submitting forms, you agree that the information provided is accurate. Sarkar Enterprise reserves the right to reject applications that contain false or misleading information. All content on this site (text, images, brand assets) is protected by copyright and may not be reproduced without written permission.</p>

            <h3>6. Contact for Privacy Matters</h3>
            <p>For any privacy-related requests, write to: <strong>privacy@sarkarenterprise.com</strong></p>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};
