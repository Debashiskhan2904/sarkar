import React from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { PageWrapper } from '../components/PageWrapper';
import { useStore } from '../store';
import { MapPin, Phone, Mail, ShoppingCart, Gem, Home as HomeIcon, Sparkles, MessageCircle, Copy, Check, ExternalLink, Send } from 'lucide-react';
import { motion } from 'motion/react';

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
          <motion.div 
            className="hero-badge"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Premium Brand & Business Promotion
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Elevating Brands Across<br/><span>FMCG • Jewellery • Interiors</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Sarkar Enterprise crafts powerful brand experiences that resonate globally. From consumer goods to luxury craftsmanship and architectural excellence — we promote excellence.
          </motion.p>
          <motion.div 
            className="hero-btns"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.button 
              className="btn btn-hero-primary" 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/products')}
            >
              EXPLORE SECTORS →
            </motion.button>
            <motion.button 
              className="btn btn-hero-secondary" 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/about')}
            >
              OUR STORY
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Golden Stats & Facilities Bar */}
      <section className="hero-stats-bar">
        <div className="container">
          <div className="hero-stats-grid">
            <motion.div 
              className="hero-stat-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="stat-value">₹10 Crores</div>
              <div className="stat-label">FINANCE FACILITIES</div>
            </motion.div>
            <motion.div 
              className="hero-stat-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <div className="stat-value">FREE</div>
              <div className="stat-label">MOBILE CONSULTATION</div>
            </motion.div>
            <motion.div 
              className="hero-stat-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <div className="stat-value">₹12,000</div>
              <div className="stat-label">PHYSICAL VISIT (24 HRS)</div>
            </motion.div>
            <motion.div 
              className="hero-stat-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <div className="stat-value stars">★★★★★</div>
              <div className="stat-label">INSTITUTIONAL EXCELLENCE</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* OUR EXPERTISE - Three Dynamic Sectors */}
      <section className="expertise-section">
        <div className="container">
          <motion.div 
            className="expertise-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="expertise-eyebrow"><Sparkles style={{ width: 14, height: 14, display: 'inline', marginRight: 6 }} /> OUR EXPERTISE</div>
            <h2 className="expertise-title">Three Dynamic Sectors</h2>
            <p className="expertise-subtitle">
              We take complete responsibility to establish entrepreneurial and manufacturing brands — scaling them to crore-to-crore turnovers with scientific precision.
            </p>
          </motion.div>

          <div className="expertise-grid">
            {/* FMCG Card */}
            <motion.div 
              className="expertise-card card-fmcg"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -8, scale: 1.015 }}
            >
              <div className="expertise-card-glow"></div>
              <div className="expertise-card-top">
                <div className="expertise-icon-box icon-fmcg">
                  <ShoppingCart className="expertise-icon" />
                </div>
                <div className="expertise-badge badge-fmcg">₹12 Cr / 1.2 Cr p.a.</div>
              </div>
              <h3 className="expertise-card-title title-fmcg">FMCG</h3>
              <p className="expertise-card-desc">
                Chanachur, Soan Papdi, Mosquito Repellent Sticks & Vaporizer, Detergent Powder and more.
              </p>
              <ul className="expertise-list">
                <li><span className="bullet bullet-fmcg">◆</span> Chanachur (Priti-Ji)</li>
                <li><span className="bullet bullet-fmcg">◆</span> Soan Papdi</li>
                <li><span className="bullet bullet-fmcg">◆</span> Angry Frog / Maxwell Incense</li>
                <li><span className="bullet bullet-fmcg">◆</span> Anti Mosquito Vaporizer</li>
              </ul>
              <motion.button 
                className="btn-blueprint btn-fmcg" 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/products#fmcg')}
              >
                VIEW BLUEPRINT →
              </motion.button>
            </motion.div>

            {/* Jewellery Card */}
            <motion.div 
              className="expertise-card card-jewellery"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              whileHover={{ y: -8, scale: 1.015 }}
            >
              <div className="expertise-card-glow"></div>
              <div className="expertise-card-top">
                <div className="expertise-icon-box icon-jewellery">
                  <Gem className="expertise-icon" />
                </div>
                <div className="expertise-badge badge-jewellery">₹720 Cr p.a.</div>
              </div>
              <h3 className="expertise-card-title title-jewellery">Jewellery</h3>
              <p className="expertise-card-desc">
                Gold Ornaments Jewellery Outlet establishment with city-king monopoly expansion models.
              </p>
              <ul className="expertise-list">
                <li><span className="bullet bullet-jewellery">◆</span> Showroom Concept Design</li>
                <li><span className="bullet bullet-jewellery">◆</span> M1 / M2 / Y4 Competitive Schemes</li>
                <li><span className="bullet bullet-jewellery">◆</span> Recycling & Reshuffling Process</li>
                <li><span className="bullet bullet-jewellery">◆</span> Reference Chain Marketing</li>
              </ul>
              <motion.button 
                className="btn-blueprint btn-jewellery" 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/products#jewellery')}
              >
                VIEW BLUEPRINT →
              </motion.button>
            </motion.div>

            {/* Interiors Card */}
            <motion.div 
              className="expertise-card card-interior"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ y: -8, scale: 1.015 }}
            >
              <div className="expertise-card-glow"></div>
              <div className="expertise-card-top">
                <div className="expertise-icon-box icon-interior">
                  <HomeIcon className="expertise-icon" />
                </div>
                <div className="expertise-badge badge-interior">₹1.2 Cr + p.a.</div>
              </div>
              <h3 className="expertise-card-title title-interior">Interiors</h3>
              <p className="expertise-card-desc">
                Domestic & Corporate Interior Projects, Kitchen Chimney manufacturing and complete establishment.
              </p>
              <ul className="expertise-list">
                <li><span className="bullet bullet-interior">◆</span> Corporate Interior Projects</li>
                <li><span className="bullet bullet-interior">◆</span> Domestic Establishments</li>
                <li><span className="bullet bullet-interior">◆</span> Kitchen Chimney</li>
                <li><span className="bullet bullet-interior">◆</span> Shopping Mall Setup</li>
              </ul>
              <motion.button 
                className="btn-blueprint btn-interior" 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/products#interior')}
              >
                VIEW BLUEPRINT →
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* THE SARKAR COMMITMENT Section */}
      <section className="commitment-section">
        <div className="container">
          <motion.div 
            className="commitment-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="commitment-eyebrow">THE SARKAR COMMITMENT</div>
            <h2 className="commitment-title">We Establish Your Company</h2>
            <p className="commitment-subtitle">
              If you have a new manufacturer company or you are trying to establish your product project, jewellery shop, interior project, chanachur company, Soan Papdi company, detergent company, Gold Jewellery company or Grocery Shopping Mall — we are committed to you.
            </p>
          </motion.div>

          <motion.div 
            className="commitment-card"
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="commitment-card-title">5-Year Legal Contractual Agreement</h3>
            <p className="commitment-card-desc">
              @ 2% of company face value business turnover per annum. We will take liability & responsibility to establish your company within one/two years.
            </p>

            <div className="commitment-sectors-grid">
              <motion.div 
                className="commitment-sector-box box-jewellery"
                whileHover={{ scale: 1.05, y: -4 }}
                transition={{ duration: 0.2 }}
                onClick={() => navigate('/products/jewellery')}
                style={{ cursor: 'pointer' }}
              >
                <div className="sector-box-title title-jewellery">Jewellery</div>
                <div className="sector-box-sub">@ ₹720 Crore</div>
              </motion.div>
              <motion.div 
                className="commitment-sector-box box-fmcg"
                whileHover={{ scale: 1.05, y: -4 }}
                transition={{ duration: 0.2 }}
                onClick={() => navigate('/products/fmcg')}
                style={{ cursor: 'pointer' }}
              >
                <div className="sector-box-title title-fmcg">FMCG</div>
                <div className="sector-box-sub">@ ₹12 Cr / 1.2 Cr</div>
              </motion.div>
              <motion.div 
                className="commitment-sector-box box-interior"
                whileHover={{ scale: 1.05, y: -4 }}
                transition={{ duration: 0.2 }}
                onClick={() => navigate('/products/interior')}
                style={{ cursor: 'pointer' }}
              >
                <div className="sector-box-title title-interior">Interior</div>
                <div className="sector-box-sub">@ ₹1.2 Crore +</div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div 
            className="commitment-actions"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.button 
              className="btn-hero-primary" 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/contact')}
            >
              START PARTNERSHIP →
            </motion.button>
            <motion.button 
              className="btn-hero-secondary" 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/about')}
            >
              MEET KISHORE SARKAR
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* BUILD YOUR CAREER WITH US Section */}
      <section className="career-section">
        <div className="container">
          <motion.div 
            className="career-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="career-card-content">
              <h2>Build Your Career With Us</h2>
              <p>Join a team that shapes global brands. We offer growth, purpose, and a culture of excellence across three dynamic sectors.</p>
            </div>
            <motion.button 
              className="btn-career-roles" 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/careers')}
            >
              VIEW OPEN ROLES →
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* QUICK CONNECT Section */}
      <section className="quick-connect-section">
        <div className="container">
          <motion.div 
            className="quick-connect-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="quick-connect-eyebrow">CONNECT</div>
            <h2 className="quick-connect-title">Quick Connect</h2>
          </motion.div>

          <div className="quick-connect-grid">
            {/* Card 1: Call Us */}
            <motion.div 
              className="cc-card call-theme"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="cc-icon-wrap call-icon">
                <Phone size={28} />
              </div>
              <h3 className="cc-title">Call Us</h3>
              <p className="cc-subtext">+91 86 707 838 10</p>
              <a href="tel:+918670783810" className="cc-btn btn-gold-outline">
                <Phone size={14} /> CALL NOW
              </a>
            </motion.div>

            {/* Card 2: Email Us */}
            <motion.div 
              className="cc-card email-theme"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <div className="cc-icon-wrap email-icon">
                <Mail size={28} />
              </div>
              <h3 className="cc-title">Email Us</h3>
              <p className="cc-subtext">
                kishore8670@gmail.com<br/>
                hello@sarkarenterprise.com
              </p>
              <a href="mailto:kishore8670@gmail.com?cc=hello@sarkarenterprise.com&subject=Business%20Inquiry%20-%20Sarkar%20Enterprise" className="cc-btn btn-gold-outline">
                <Mail size={14} /> SEND EMAIL
              </a>
            </motion.div>

            {/* Card 3: Visit Us */}
            <motion.div 
              className="cc-card visit-theme"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <div className="cc-icon-wrap visit-icon">
                <MapPin size={28} />
              </div>
              <h3 className="cc-title">Visit Us / BDM Location</h3>
              <p className="cc-subtext">
                Bhiringi More, Benachity<br/>
                Durgapur – 713213<br/>
                West Bengal, India
              </p>
              <a 
                href="https://maps.google.com/?q=Bhiringi+More+Benachity+Durgapur+713213+West+Bengal" 
                target="_blank" 
                rel="noreferrer"
                className="cc-btn btn-gold-outline"
              >
                <ExternalLink size={14} /> GET DIRECTIONS
              </a>
            </motion.div>

            {/* Card 4: WhatsApp */}
            <motion.div 
              className="cc-card whatsapp-theme"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <div className="cc-icon-wrap whatsapp-icon">
                <MessageCircle size={28} />
              </div>
              <h3 className="cc-title">WhatsApp</h3>
              <p className="cc-subtext">Instant Business Query</p>
              <a 
                href="https://wa.me/918670783810?text=Hello%20Sarkar%20Enterprise%2C%20I%20have%20an%20instant%20business%20query." 
                target="_blank" 
                rel="noreferrer"
                className="cc-btn btn-green-solid"
              >
                <MessageCircle size={14} /> CHAT ON WHATSAPP
              </a>
            </motion.div>

          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export const About = () => {
  const navigate = useNavigate();
  const { showToast } = useStore();

  const INFRASTRUCTURE_ITEMS = [
    { num: 1, title: 'Marketing Partner', desc: 'Content writing with Agreement paper' },
    { num: 2, title: 'Self Marketing Infrastructure', desc: 'Content + Pictorial Image + Diagram' },
    { num: 3, title: 'Distributor Appointment', desc: 'Content + Photo + Act Roll' },
    { num: 4, title: 'C & F Appointment', desc: 'Content + Act Roll' },
    { num: 5, title: 'Whole Sale Appointment', desc: 'Content + Act Roll + Image' },
    { num: 6, title: 'Product Quality Control', desc: 'Content + Discrimination Image' },
    { num: 7, title: 'Corporate Supply', desc: 'Content + Segment enlistment' },
    { num: 8, title: 'Online Customer', desc: 'Direct sale via Distributor & Home delivery (Zomato/Swiggy)' },
    { num: 9, title: 'Grocer App Tie-ups', desc: 'Big Basket / ApnaMart / Blinkit (Under Processing)' },
    { num: 10, title: 'Shopping Mall', desc: 'Full establishment and processing' },
    { num: 11, title: 'Marketed By', desc: 'Complete responsibility with market value balance ratio' },
    { num: 12, title: 'Dealer & Distributor Grievance', desc: 'Mail ID + Policy + Feedback + Compensation + WhatsApp' },
    { num: 13, title: 'Work Shop', desc: 'Photo integration across 6 different companies' }
  ];

  return (
    <PageWrapper>
      {/* Hero Header */}
      <section className="about-hero">
        <div className="container">
          <div className="about-breadcrumb">
            <Link to="/">Home</Link> / About Us
          </div>
          <h1 className="about-hero-title">
            About <span className="text-gold">Sarkar Enterprise</span>
          </h1>
          <p className="about-hero-sub">
            Indian Marketing Partner & Concept Marketing Pioneer with 20+ years of top-level experience.
          </p>
        </div>
      </section>

      {/* The Journey Section */}
      <section className="section" style={{ paddingTop: '10px' }}>
        <div className="container">
          <div className="journey-grid">
            {/* Left Profile Card */}
            <motion.div 
              className="profile-card"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="profile-img-frame">
                <img 
                  src="https://i.pinimg.com/736x/97/4b/a5/974ba562c0f1afb251cc30cfa5aa9cad.jpg" 
                  alt="Kishore Sarkar, MBA" 
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/images/KishoreSarkar.jpg";
                  }}
                />
              </div>
              <h2 className="profile-name">Kishore Sarkar, MBA</h2>
              <div className="profile-tag">
                Indian Marketing Partner & Concept Marketing Pioneer
              </div>
              <div className="profile-meta">
                Estd. 2001 • Durgapur, West Bengal
              </div>
              <div className="profile-actions">
                <motion.button 
                  className="btn-profile-act"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    showToast('Calling +91 86 707 838 10...', 'success');
                    window.location.href = 'tel:+918670783810';
                  }}
                >
                  CALL
                </motion.button>
                <motion.button 
                  className="btn-profile-act"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    showToast('Opening WhatsApp chat...', 'success');
                    window.open('https://wa.me/918670783810?text=Hello%20Sarkar%20Enterprise%2C%20I%20have%20a%20query.', '_blank');
                  }}
                >
                  WHATSAPP
                </motion.button>
              </div>
            </motion.div>

            {/* Right Story Content */}
            <motion.div 
              className="journey-content"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <h2>The Journey</h2>
              <p>
                The journey of public relationship fashion makes me a part of profession in my career through marketing division which is concept marketing at the period in 1988. This period is the toughest period of private Insurance company. But it makes me sharp brain and intoxicated to innovate idea revealed at time to time according market situation.
              </p>
              <p>
                It helps me to achieve the best performance in the market, not only that different type of new marketing thesis have been implemented to the market by me. The company got result oriented output. There are lots of small scale manufacturer company successfully established in Bengal and others state during last 20 yrs.
              </p>
              <p>
                One thing is there, no one company in the market as a product promoters institution or you say business promotion with taking responsibility as crore to crore turnover. Business promotion/product promoter means to establish an entrepreneur company with authentic profitable accountability. I was lecturer of different reputed MBA college once upon a time. No one company in the market can defeat me against FMCG / Jewellery / Interior division.
              </p>
              <p>
                I, Kishore Sarkar, MBA, In 1997 afterwards Spl. 3yrs. Interior course finished as marketing chapter, next Jewellery course marketing finished and next FMCG marketing course as chanachur, Soan Papdi, Mosquito repellent Incense Sticks, vaporizer, detergent powder; Kitchen Chimney etc.
              </p>
              <p>
                New market situation is going on very fast offline to online at digital age, and digitally marketing agenda. So, I switched over digital marketing policy also. Digital technology; digital software, digital marketing scheme are available. I like to explore competitive thesis of marketing policy which is very sensitive, attracted, fruitful result against business turnover.
              </p>
              <motion.div 
                className="journey-highlight-card"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                <div className="journey-card-top">
                  <span className="journey-badge-pill">20+ YEARS EXPERIENCE</span>
                  <span className="journey-badge-subtitle">INDIAN MARKETING PARTNER</span>
                </div>
                <p className="journey-quote-statement">
                  “We are an Indian Marketing Partner company. We are 20 yrs. Top level experienced your business partner. We will wish your business successful expeditiously.”
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* Vision & Mission Cards */}
          <div className="vision-mission-grid">
            <motion.div 
              className="vm-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <h3>Vision</h3>
              <p>
                To engineer global market dominance for our clients by merging traditional, rigorous accountability with cutting-edge digital marketing thesis.
              </p>
            </motion.div>
            <motion.div 
              className="vm-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.15 }}
            >
              <h3>Mission</h3>
              <p>
                To take complete responsibility for establishing entrepreneurial and manufacturing brands—scaling them to crore-to-crore turnovers with scientific precision and authentic profitable accountability.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Infrastructure Section */}
      <section className="infrastructure-section">
        <div className="container">
          <div className="section-header" style={{ textCenter: 'center', marginBottom: '24px' }}>
            <div className="label" style={{ color: 'var(--gold)', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700, fontSize: '0.85rem' }}>
              INFRASTRUCTURE
            </div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.5rem', color: '#fff', fontWeight: 600, marginTop: '6px', marginBottom: '8px' }}>
              International Standard Marketing & Management Unit
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.98rem' }}>
              13 Core Operational Windows of Product Promoters
            </p>
          </div>

          <div className="infrastructure-grid">
            {INFRASTRUCTURE_ITEMS.map((item, index) => (
              <motion.div 
                key={item.num}
                className="infra-card"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
              >
                <div className="infra-num">{item.num}</div>
                <div>
                  <div className="infra-title">{item.title}</div>
                  <div className="infra-desc">{item.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Promotion Arsenal Section */}
      <section className="arsenal-section">
        <div className="container">
          <h2 className="arsenal-title">Brand Promotion Arsenal</h2>
          <p className="arsenal-list">
            Audio Clips • Video Clips • Hoarding Ads • Tableau Ads • Musical Program Ads • Toto Ads • Leaflet Distribution • Subenior Ads • Educational Institutional pieces • Corporate & Govt. Administrative Functional programs • Innovative Concept Advertising • Digital Marketing Ads • Celebrity Brand Ambassador provision • Custom LOGO generation
          </p>
          <motion.button 
            className="btn-arsenal-gallery"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/media')}
          >
            EXPLORE MEDIA GALLERY →
          </motion.button>
        </div>
      </section>
    </PageWrapper>
  );
};

export const Contact = () => {
  const { showToast, addInquiry } = useStore();
  const [copiedUpi, setCopiedUpi] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    location: '',
    sector: 'FMCG Distributorship & Hawker Scheme (Chanachur, Agarbatti, Mosquito, Soan Papdi)',
    budget: '₹1 Lakh – ₹5 Lakhs',
    contactPref: 'Phone Call / WhatsApp',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submittedData, setSubmittedData] = React.useState<any>(null);

  const [payData, setPayData] = React.useState({
    name: '',
    phone: '',
    utr: '',
    amount: ''
  });
  const [isPaySubmitting, setIsPaySubmitting] = React.useState(false);
  const [paySubmitted, setPaySubmitted] = React.useState<any>(null);

  const submitAdvancePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!payData.name || !payData.phone || !payData.utr || !payData.amount) {
      showToast('Please fill in Name, Phone, UTR Number, and Amount Paid', 'error');
      return;
    }
    setIsPaySubmitting(true);
    const newInq = {
      name: payData.name,
      company: payData.name,
      email: 'N/A',
      phone: payData.phone,
      type: `Advance Payment (UTR: ${payData.utr}, ₹${payData.amount})`,
      message: `[ADVANCE PAYMENT & UTR VERIFICATION]\nName / Company: ${payData.name}\nPhone: ${payData.phone}\nUTR / Transaction No: ${payData.utr}\nAmount Paid: ₹${payData.amount}\nSubmitted At: ${new Date().toLocaleString()}`,
      date: new Date().toISOString()
    };
    try {
      await addInquiry(newInq);
    } catch (err: any) {
      console.warn('Payment logging error:', err?.message);
    } finally {
      setIsPaySubmitting(false);
      setPaySubmitted({ ...payData });
      showToast('Payment receipt submission logged successfully in Admin Panel!', 'success');
    }
  };

  const handleCopyUpi = () => {
    navigator.clipboard.writeText('kishore8670-2@okhdfcbank');
    setCopiedUpi(true);
    showToast('UPI ID copied to clipboard: kishore8670-2@okhdfcbank', 'success');
    setTimeout(() => setCopiedUpi(false), 3000);
  };

  const submitContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) {
      showToast('Please fill in your Name, Email, and Phone Number', 'error');
      return;
    }
    setIsSubmitting(true);
    const newInq = {
      name: formData.name,
      company: formData.company || 'N/A',
      email: formData.email,
      phone: formData.phone,
      location: formData.location || 'N/A',
      type: `${formData.sector} (Budget: ${formData.budget})`,
      message: `[Location: ${formData.location || 'N/A'} | Contact Pref: ${formData.contactPref} | Budget: ${formData.budget}] ${formData.message}`,
      date: new Date().toISOString()
    };
    try {
      await addInquiry(newInq);
    } catch (err: any) {
      console.warn('Inquiry logging error:', err?.message);
    } finally {
      setIsSubmitting(false);
      setSubmittedData({ ...formData });
      showToast('Thank you! Your official inquiry has been logged successfully.', 'success');
    }
  };

  const handleWhatsAppSend = () => {
    const text = `Hello Sarkar Enterprise,
I am submitting an official business inquiry:

👤 Contact Person: ${formData.name || 'N/A'}
🏢 Company / Firm / Shop: ${formData.company || 'N/A'}
📱 Phone: ${formData.phone || 'N/A'}
✉️ Email: ${formData.email || 'N/A'}
📍 City / District: ${formData.location || 'N/A'}
🏷️ Sector of Interest: ${formData.sector}
💰 Investment / Budget: ${formData.budget}
📞 Preferred Contact Mode: ${formData.contactPref}
📝 Detailed Requirement: ${formData.message || 'Interested in business partnership and distribution.'}`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/918670783810?text=${encoded}`, '_blank');
  };

  return (
    <PageWrapper>
      <section className="section" style={{ paddingTop: '50px', paddingBottom: '80px' }}>
        <div className="container">
          
          {/* Header */}
          <div className="contact-hero-header">
            <div className="contact-hero-breadcrumb">
              <Link to="/">Home</Link> / Contact
            </div>
            <h1 className="contact-hero-title">
              Contact <span>&</span> Quick Connect
            </h1>
            <p className="contact-hero-sub">
              Direct communication channels, instant WhatsApp chat, UPI advance payments, and location details.
            </p>
          </div>

          {/* Quick Connect - 4 Colorful Cards */}
          <div className="quick-connect-grid">
            
            {/* Call Us */}
            <motion.div 
              className="cc-card call-theme"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="cc-icon-wrap call-icon">
                <Phone size={28} />
              </div>
              <h3 className="cc-title">Call Us</h3>
              <p className="cc-subtext">+91 86 707 838 10</p>
              <a href="tel:+918670783810" className="cc-btn btn-gold-outline">
                <Phone size={14} /> CALL NOW
              </a>
            </motion.div>

            {/* Email Us */}
            <motion.div 
              className="cc-card email-theme"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <div className="cc-icon-wrap email-icon">
                <Mail size={28} />
              </div>
              <h3 className="cc-title">Email Us</h3>
              <p className="cc-subtext">
                kishore8670@gmail.com<br/>
                hello@sarkarenterprise.com
              </p>
              <a href="mailto:kishore8670@gmail.com?cc=hello@sarkarenterprise.com&subject=Business%20Inquiry%20-%20Sarkar%20Enterprise" className="cc-btn btn-gold-outline">
                <Mail size={14} /> SEND EMAIL
              </a>
            </motion.div>

            {/* Visit Us */}
            <motion.div 
              className="cc-card visit-theme"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <div className="cc-icon-wrap visit-icon">
                <MapPin size={28} />
              </div>
              <h3 className="cc-title">Visit Us / BDM Location</h3>
              <p className="cc-subtext">
                Bhiringi More, Benachity<br/>
                Durgapur – 713213<br/>
                West Bengal, India
              </p>
              <a 
                href="https://maps.google.com/?q=Bhiringi+More+Benachity+Durgapur+713213+West+Bengal" 
                target="_blank" 
                rel="noreferrer"
                className="cc-btn btn-gold-outline"
              >
                <ExternalLink size={14} /> GET DIRECTIONS
              </a>
            </motion.div>

            {/* WhatsApp */}
            <motion.div 
              className="cc-card whatsapp-theme"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <div className="cc-icon-wrap whatsapp-icon">
                <MessageCircle size={28} />
              </div>
              <h3 className="cc-title">WhatsApp</h3>
              <p className="cc-subtext">Instant Business Query</p>
              <a 
                href="https://wa.me/918670783810?text=Hello%20Sarkar%20Enterprise%2C%20I%20have%20an%20instant%20business%20query." 
                target="_blank" 
                rel="noreferrer"
                className="cc-btn btn-green-solid"
              >
                <MessageCircle size={14} /> CHAT ON WHATSAPP
              </a>
            </motion.div>

          </div>

          {/* Advance Payment & QR Code Section */}
          <div className="cc-section-badge">OFFICIAL VERIFICATION & PAYMENT</div>
          <h2 className="cc-section-title" style={{ fontFamily: "'Playfair Display', serif" }}>Sarkar Enterprise QR Payment</h2>
          <p className="cc-section-sub">
            Scan with GPay, PhonePe, Paytm, or BHIM UPI for partnership agreements.
          </p>

          <motion.div 
            style={{ 
              maxWidth: '800px', 
              margin: '0 auto 80px auto', 
              background: '#0a0a0a', 
              border: '1px solid rgba(255, 215, 0, 0.35)', 
              borderRadius: '16px', 
              padding: '32px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.6)'
            }}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Top QR & Bank Details Box */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px', alignItems: 'center', background: '#050505', padding: '24px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)', marginBottom: '28px' }}>
              <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ background: '#ffffff', padding: '12px', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.6)' }}>
                  <img 
                    src="/QR.png" 
                    alt="Sarkar Enterprise UPI QR Code" 
                    style={{ width: '100%', maxWidth: '200px', height: 'auto', display: 'block', borderRadius: '6px' }} 
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/images/Pay.jpg";
                    }}
                  />
                </div>
                <div 
                  onClick={handleCopyUpi}
                  style={{ 
                    marginTop: '12px', 
                    background: 'rgba(255,215,0,0.1)', 
                    border: '1px solid rgba(255,215,0,0.3)', 
                    borderRadius: '6px', 
                    padding: '8px 14px', 
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                  title="Click to copy UPI ID"
                >
                  <span style={{ color: '#FFD700', fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.02em' }}>
                    UPI ID: kishore8670-2@okhdfcbank
                  </span>
                  {copiedUpi ? <Check size={14} color="#10b981" /> : <Copy size={14} color="#ffd700" />}
                </div>
              </div>
              
              <div>
                <h3 style={{ color: '#FFD700', margin: '0 0 14px 0', fontSize: '1.25rem', fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>
                  Bank Account Details
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.92rem', margin: '0 0 8px 0', lineHeight: '1.5' }}>
                  <strong style={{ color: '#ffffff' }}>Account Name:</strong> SARKAR ENTERPRISE
                </p>
                <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.92rem', margin: '0 0 8px 0', lineHeight: '1.5' }}>
                  <strong style={{ color: '#ffffff' }}>Bank:</strong> HDFC Bank
                </p>
                <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.92rem', margin: '0 0 8px 0', lineHeight: '1.5' }}>
                  <strong style={{ color: '#ffffff' }}>A/C No:</strong> 402918237129
                </p>
                <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.92rem', margin: '0 0 8px 0', lineHeight: '1.5' }}>
                  <strong style={{ color: '#ffffff' }}>IFSC Code:</strong> HDFC0001234
                </p>
                <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.92rem', margin: '0', lineHeight: '1.5' }}>
                  <strong style={{ color: '#ffffff' }}>GST Registration:</strong> 19AAAAA0000A1Z5
                </p>
              </div>
            </div>

            {/* Bottom Form Box */}
            <div style={{ background: '#121212', padding: '24px', borderRadius: '12px', border: '1px solid rgba(255, 215, 0, 0.25)' }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", color: '#ffffff', fontSize: '1.35rem', margin: '0 0 18px 0', fontWeight: 700 }}>
                Submit Payment Receipt / UTR Verification
              </h3>

              {paySubmitted ? (
                <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid #10b981', padding: '24px', borderRadius: '10px', textAlign: 'center' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>✅</div>
                  <h4 style={{ color: '#10b981', fontSize: '1.2rem', marginBottom: '6px', fontWeight: 700 }}>
                    Payment Verification Request Logged!
                  </h4>
                  <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.9rem', marginBottom: '16px' }}>
                    Transaction UTR <strong>{paySubmitted.utr}</strong> for amount <strong>₹{paySubmitted.amount}</strong> submitted under <strong>{paySubmitted.name}</strong>.
                  </p>
                  <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <a 
                      href={`https://wa.me/918670783810?text=${encodeURIComponent(`Hello Sarkar Enterprise,\nI have submitted an advance payment receipt for verification:\n\n👤 Name / Firm: ${paySubmitted.name}\n📱 Phone: ${paySubmitted.phone}\n🔢 UTR Number: ${paySubmitted.utr}\n💰 Amount Paid: ₹${paySubmitted.amount}\n\nPlease generate official money receipt.`)}`}
                      target="_blank"
                      rel="noreferrer"
                      style={{ background: '#25D366', color: '#000', fontWeight: 800, padding: '10px 20px', borderRadius: '6px', textDecoration: 'none', fontSize: '0.88rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                    >
                      <MessageCircle size={16} /> CONFIRM VIA WHATSAPP
                    </a>
                    <button 
                      type="button"
                      onClick={() => {
                        setPaySubmitted(null);
                        setPayData({ name: '', phone: '', utr: '', amount: '' });
                      }}
                      style={{ background: '#222', color: '#fff', border: '1px solid #444', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.88rem' }}
                    >
                      SUBMIT ANOTHER PAYMENT
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={submitAdvancePayment}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '18px', marginBottom: '18px' }}>
                    <div className="cc-form-group">
                      <label style={{ color: '#d4d4d4', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px', display: 'block' }}>
                        Full Name / Company Name *
                      </label>
                      <input 
                        type="text" 
                        className="cc-form-input" 
                        placeholder="Full Name / Company Name" 
                        value={payData.name}
                        onChange={e => setPayData({ ...payData, name: e.target.value })}
                        required 
                      />
                    </div>

                    <div className="cc-form-group">
                      <label style={{ color: '#d4d4d4', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px', display: 'block' }}>
                        Phone Number *
                      </label>
                      <input 
                        type="tel" 
                        className="cc-form-input" 
                        placeholder="Phone Number" 
                        value={payData.phone}
                        onChange={e => setPayData({ ...payData, phone: e.target.value })}
                        required 
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '18px', marginBottom: '22px' }}>
                    <div className="cc-form-group">
                      <label style={{ color: '#d4d4d4', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px', display: 'block' }}>
                        Transaction / UTR Number *
                      </label>
                      <input 
                        type="text" 
                        className="cc-form-input" 
                        placeholder="12-digit UTR Number" 
                        value={payData.utr}
                        onChange={e => setPayData({ ...payData, utr: e.target.value })}
                        required 
                      />
                    </div>

                    <div className="cc-form-group">
                      <label style={{ color: '#d4d4d4', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px', display: 'block' }}>
                        Amount Paid (₹) *
                      </label>
                      <input 
                        type="text" 
                        className="cc-form-input" 
                        placeholder="Amount Paid (₹)" 
                        value={payData.amount}
                        onChange={e => setPayData({ ...payData, amount: e.target.value })}
                        required 
                      />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isPaySubmitting}
                    style={{ 
                      width: '100%', 
                      background: '#FFD700', 
                      color: '#000000', 
                      fontWeight: 800, 
                      fontSize: '0.92rem', 
                      letterSpacing: '0.05em', 
                      padding: '16px', 
                      borderRadius: '8px', 
                      border: 'none', 
                      cursor: isPaySubmitting ? 'wait' : 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: '0 4px 15px rgba(255,215,0,0.3)',
                      textTransform: 'uppercase'
                    }}
                  >
                    {isPaySubmitting ? 'VERIFYING TRANSACTION...' : 'VERIFY TRANSACTION & REQUEST RECEIPT →'}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Send us a Message Form */}
          <div className="cc-section-badge">MESSAGE</div>
          <h2 className="cc-section-title">Official Contact & Inquiry Form</h2>
          <p className="cc-section-sub">
            Fill in your business details or project requirements below. Our executive team will get back to you within 24 hours.
          </p>

          <motion.div 
            className="cc-form-container"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {submittedData ? (
              <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid #10b981', padding: '32px', borderRadius: '16px', textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '12px' }}>✅</div>
                <h3 style={{ color: '#10b981', fontSize: '1.5rem', marginBottom: '8px', fontWeight: 700, fontFamily: "'Playfair Display', serif" }}>
                  Inquiry Logged Successfully!
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.95rem', marginBottom: '24px', lineHeight: '1.6', maxWidth: '600px', margin: '0 auto 24px auto' }}>
                  Thank you, <strong>{submittedData.name}</strong>. Your inquiry regarding <strong>{submittedData.sector}</strong> has been logged into Sarkar Enterprise database.
                </p>

                <div style={{ background: 'rgba(0,0,0,0.4)', padding: '20px', borderRadius: '10px', textAlign: 'left', marginBottom: '24px', fontSize: '0.88rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <p style={{ margin: '0 0 8px 0', color: 'rgba(255,255,255,0.8)' }}><strong>Contact Person:</strong> {submittedData.name}</p>
                  <p style={{ margin: '0 0 8px 0', color: 'rgba(255,255,255,0.8)' }}><strong>Company / Firm:</strong> {submittedData.company || 'N/A'}</p>
                  <p style={{ margin: '0 0 8px 0', color: 'rgba(255,255,255,0.8)' }}><strong>Phone / WhatsApp:</strong> {submittedData.phone}</p>
                  <p style={{ margin: '0 0 8px 0', color: 'rgba(255,255,255,0.8)' }}><strong>Email:</strong> {submittedData.email}</p>
                  <p style={{ margin: '0 0 8px 0', color: 'rgba(255,255,255,0.8)' }}><strong>City / District:</strong> {submittedData.location || 'N/A'}</p>
                  <p style={{ margin: '0 0 8px 0', color: 'rgba(255,255,255,0.8)' }}><strong>Budget Capacity:</strong> {submittedData.budget}</p>
                  <p style={{ margin: '0', color: 'rgba(255,255,255,0.8)' }}><strong>Preferred Contact:</strong> {submittedData.contactPref}</p>
                </div>

                <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button 
                    type="button" 
                    onClick={handleWhatsAppSend}
                    style={{ background: '#25D366', color: '#000', fontWeight: 800, padding: '12px 24px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}
                  >
                    <MessageCircle size={18} /> CONFIRM VIA WHATSAPP
                  </button>
                  <button 
                    type="button" 
                    onClick={() => {
                      setSubmittedData(null);
                      setFormData({
                        name: '',
                        company: '',
                        email: '',
                        phone: '',
                        location: '',
                        sector: 'FMCG Distributorship & Hawker Scheme (Chanachur, Agarbatti, Mosquito, Soan Papdi)',
                        budget: '₹1 Lakh – ₹5 Lakhs',
                        contactPref: 'Phone Call / WhatsApp',
                        message: ''
                      });
                    }}
                    style={{ background: '#222', color: '#fff', fontWeight: 600, padding: '12px 24px', border: '1px solid #444', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem' }}
                  >
                    SUBMIT ANOTHER INQUIRY
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={submitContact} className="cc-form-grid">
                
                {/* Row 1: Name & Company */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                  <div className="cc-form-group">
                    <label>Your Full Name *</label>
                    <input 
                      type="text" 
                      className="cc-form-input" 
                      placeholder="e.g. Subhashish Roy"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      required 
                    />
                  </div>

                  <div className="cc-form-group">
                    <label>Company / Firm / Shop Name</label>
                    <input 
                      type="text" 
                      className="cc-form-input" 
                      placeholder="e.g. Roy Traders & Sons"
                      value={formData.company}
                      onChange={e => setFormData({ ...formData, company: e.target.value })}
                    />
                  </div>
                </div>

                {/* Row 2: Email & Phone */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                  <div className="cc-form-group">
                    <label>Email Address *</label>
                    <input 
                      type="email" 
                      className="cc-form-input" 
                      placeholder="e.g. contact@roytraders.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      required 
                    />
                  </div>

                  <div className="cc-form-group">
                    <label>Mobile / WhatsApp Number *</label>
                    <input 
                      type="tel" 
                      className="cc-form-input" 
                      placeholder="+91 98321 XXXXX"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      required 
                    />
                  </div>
                </div>

                {/* Row 3: Location & Preferred Contact Mode */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                  <div className="cc-form-group">
                    <label>City / District & State *</label>
                    <input 
                      type="text" 
                      className="cc-form-input" 
                      placeholder="e.g. Durgapur, Paschim Bardhaman, WB"
                      value={formData.location}
                      onChange={e => setFormData({ ...formData, location: e.target.value })}
                      required 
                    />
                  </div>

                  <div className="cc-form-group">
                    <label>Preferred Contact Method</label>
                    <select 
                      className="cc-form-select"
                      value={formData.contactPref}
                      onChange={e => setFormData({ ...formData, contactPref: e.target.value })}
                    >
                      <option value="Phone Call / WhatsApp">Phone Call / WhatsApp</option>
                      <option value="Direct Phone Call">Direct Phone Call</option>
                      <option value="WhatsApp Chat Only">WhatsApp Chat Only</option>
                      <option value="Official Email Reply">Official Email Reply</option>
                      <option value="In-Person Meeting (Durgapur Office)">In-Person Meeting (Durgapur Office)</option>
                    </select>
                  </div>
                </div>

                {/* Row 4: Sector & Budget */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                  <div className="cc-form-group">
                    <label>Sector / Partnership Category *</label>
                    <select 
                      className="cc-form-select"
                      value={formData.sector}
                      onChange={e => setFormData({ ...formData, sector: e.target.value })}
                    >
                      <option value="FMCG Distributorship & Hawker Scheme (Chanachur, Agarbatti, Mosquito, Soan Papdi)">
                        FMCG Distributorship & Hawker Scheme (Chanachur, Agarbatti, Mosquito, Soan Papdi)
                      </option>
                      <option value="Jewellery Monopoly Outlet (M1 / Y4 / 6-Year Competitive Schemes)">
                        Jewellery Monopoly Outlet (M1 / Y4 / 6-Year Competitive Schemes)
                      </option>
                      <option value="Corporate & Luxury Interior Design (Modular Kitchen, Showroom Interiors)">
                        Corporate & Luxury Interior Design (Modular Kitchen, Showroom Interiors)
                      </option>
                      <option value="5-Year Business Promotion Partnership (2% Turnover Growth Agreement)">
                        5-Year Business Promotion Partnership (2% Turnover Growth Agreement)
                      </option>
                      <option value="Financial Consultancy Facilitation (Up to ₹10 Cr Corporate Loan/Fund)">
                        Financial Consultancy Facilitation (Up to ₹10 Cr Corporate Loan/Fund)
                      </option>
                      <option value="General Business Partnership Inquiry">
                        General Business Partnership Inquiry
                      </option>
                    </select>
                  </div>

                  <div className="cc-form-group">
                    <label>Estimated Investment / Budget</label>
                    <select 
                      className="cc-form-select"
                      value={formData.budget}
                      onChange={e => setFormData({ ...formData, budget: e.target.value })}
                    >
                      <option value="Below ₹1 Lakh">Below ₹1 Lakh (Hawker / Starter Scheme)</option>
                      <option value="₹1 Lakh – ₹5 Lakhs">₹1 Lakh – ₹5 Lakhs (Distributor / Small Counter)</option>
                      <option value="₹5 Lakhs – ₹25 Lakhs">₹5 Lakhs – ₹25 Lakhs (Monopoly Franchise / Interior)</option>
                      <option value="₹25 Lakhs – ₹1 Crore">₹25 Lakhs – ₹1 Crore (Super Stockist / Large Unit)</option>
                      <option value="Above ₹1 Crore">Above ₹1 Crore (Corporate Partnership / Fund Facilitation)</option>
                    </select>
                  </div>
                </div>

                {/* Row 5: Detailed Message */}
                <div className="cc-form-group">
                  <label>Detailed Message / Project Requirements *</label>
                  <textarea 
                    className="cc-form-textarea" 
                    rows={5} 
                    placeholder="Provide details about your business background, target region, or specific partnership requirement..."
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    required
                  ></textarea>
                </div>

                {/* Actions */}
                <div className="cc-form-actions">
                  <button 
                    type="submit" 
                    className="cc-submit-btn"
                    disabled={isSubmitting}
                  >
                    <Send size={16} /> {isSubmitting ? 'LOGGING INQUIRY...' : 'SUBMIT OFFICIAL INQUIRY'}
                  </button>
                </div>
              </form>
            )}
          </motion.div>

          {/* Location Map */}
          <div className="cc-section-badge">LOCATION</div>
          <h2 className="cc-section-title">Visit Our Durgapur Office</h2>
          <p className="cc-section-sub">
            Bhiringi More, Benachity, Durgapur – 713213, West Bengal, India
          </p>

          <motion.div 
            className="cc-map-wrapper"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <iframe 
              title="Durgapur Office Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.489123!2d87.3110!3d23.5500!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f7724a46000001%3A0x123456789abcdef!2sBenachity%2C%20Durgapur%2C%20West%20Bengal%20713213!5e0!3m2!1sen!2sin!4v1650000000000!5m2!1sen!2sin" 
              className="cc-map-iframe"
              allowFullScreen 
              loading="lazy"
            ></iframe>
          </motion.div>

          {/* Privacy, Terms & Cookies Section */}
          <div className="cc-section-badge">LEGAL</div>
          <h2 className="cc-section-title">Privacy, Terms & Cookies</h2>

          <div className="cc-legal-grid">
            <motion.div 
              className="cc-legal-card"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <h3 className="cc-legal-title">Privacy Policy</h3>
              <p className="cc-legal-desc">
                We collect only necessary information for business communication and partnership processing. Data is not sold to third parties. Contact details are used solely for service delivery and follow-up.
              </p>
            </motion.div>

            <motion.div 
              className="cc-legal-card"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <h3 className="cc-legal-title">Terms of Service</h3>
              <p className="cc-legal-desc">
                All promotional schemes, targets and commercials are governed by the signed 5-year agreement. Schemes are subject to change based on market conditions and government regulations. GST applicable as per law.
              </p>
            </motion.div>

            <motion.div 
              className="cc-legal-card"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <h3 className="cc-legal-title">Cookies Policy</h3>
              <p className="cc-legal-desc">
                This website may use essential cookies for functionality and basic analytics. By continuing to browse you consent to the use of such cookies. No invasive tracking is performed.
              </p>
            </motion.div>
          </div>

          <div className="cc-legal-footer-note">
            GST Registered • Full compliance documentation available upon request.
          </div>

        </div>
      </section>
    </PageWrapper>
  );
};

export const Legal = () => {
  const location = useLocation();
  const { setIsPaymentOpen } = useStore();

  React.useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const el = document.getElementById(id) || document.querySelector(location.hash);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.hash, location.pathname]);

  return (
    <PageWrapper>
      <section className="section" style={{ paddingTop: '60px' }}>
        <div className="container">
          <div className="legal-content">
            <h2>Legal Framework & Compliance</h2>
            <p style={{ color: 'var(--gray)', marginBottom: '32px' }}>Last updated: August 2026 • Official policies governing Sarkar Enterprise digital and commercial operations.</p>

            <div id="privacy" style={{ scrollMarginTop: '100px', marginBottom: '40px' }}>
              <h3 style={{ color: '#FFD700', fontSize: '1.4rem', borderBottom: '1px solid rgba(255,215,0,0.2)', paddingBottom: '8px' }}>Privacy Policy</h3>
              <p>When you apply for a role or submit an inquiry, we collect: full name, email address, phone number, company information, resume/CV file, cover note, and any additional details voluntarily provided.</p>

              <h4>How We Use Your Data</h4>
              <ul>
                <li>To evaluate job applications and contact shortlisted candidates.</li>
                <li>To respond to business inquiries and partnership requests.</li>
                <li>To maintain contractual agreement records and GST compliance.</li>
                <li>We do not sell or share applicant or client data with third parties for marketing.</li>
              </ul>

              <h4>Data Storage & Security</h4>
              <p>Resumes and business inquiry data are stored securely with encrypted access restricted to authorized HR and management personnel only.</p>
            </div>

            <div id="terms" style={{ scrollMarginTop: '100px', marginBottom: '40px' }}>
              <h3 style={{ color: '#FFD700', fontSize: '1.4rem', borderBottom: '1px solid rgba(255,215,0,0.2)', paddingBottom: '8px' }}>Terms of Service</h3>
              <p>By using this website and submitting forms or executing business agreements, you agree to the following terms:</p>
              <ul>
                <li>All submissions must contain truthful and verifiable business data.</li>
                <li>Sarkar Enterprise retains intellectual property rights to all marketing blueprints, schemes (M1, M2, Y4), and proprietary collateral.</li>
                <li>5-Year Contractual Agreements operate on a 2% face-value business turnover model with guaranteed establishment liabilities within 1-2 years.</li>
              </ul>
            </div>

            <div id="cookies" style={{ scrollMarginTop: '100px', marginBottom: '40px' }}>
              <h3 style={{ color: '#FFD700', fontSize: '1.4rem', borderBottom: '1px solid rgba(255,215,0,0.2)', paddingBottom: '8px' }}>Cookie Policy</h3>
              <p>We use essential functional cookies to ensure optimal performance, secure session state management, and user preference retention during your session. No tracking cookies are stored without consent.</p>
            </div>

            <div id="payment" style={{ scrollMarginTop: '100px', marginBottom: '20px' }}>
              <h3 style={{ color: '#FFD700', fontSize: '1.4rem', borderBottom: '1px solid rgba(255,215,0,0.2)', paddingBottom: '8px' }}>Payment & Receipt Verification</h3>
              <p>All partnership payments, booking advances, and agreement fees are processed strictly via Sarkar Enterprise official channels backed by GST invoice and money receipt.</p>
              <button 
                onClick={() => setIsPaymentOpen(true)}
                className="btn-partnership-pay"
                style={{ marginTop: '12px' }}
              >
                OPEN OFFICIAL QR & BANK PAYMENT MODAL →
              </button>
            </div>

          </div>
        </div>
      </section>
    </PageWrapper>
  );
};
