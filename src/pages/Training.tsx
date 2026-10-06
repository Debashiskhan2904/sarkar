import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { PageWrapper } from '../components/PageWrapper';
import { 
  GraduationCap, 
  Calendar, 
  Target, 
  TrendingUp, 
  Award, 
  CheckCircle2, 
  ShieldCheck, 
  IndianRupee, 
  Briefcase, 
  Sparkles, 
  BookOpen, 
  Smartphone, 
  Gift, 
  CreditCard, 
  Tag, 
  Tv, 
  Package, 
  FileSpreadsheet, 
  Clock, 
  ArrowRight,
  Flame,
  Lightbulb,
  Compass,
  Users
} from 'lucide-react';

export const Training = () => {
  const trainingKitItems = [
    {
      title: 'Company Uniform & Corporate Apparel',
      desc: 'Smart, branded company uniform and badges ensuring professional executive presence during dealer visits.',
      icon: <Users size={24} color="#ffd700" />,
      tag: 'Executive Gear',
      image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'Official ID Cards & Lanyards',
      desc: 'Authorised employee ID card with QR code verification, holographic security seal, and corporate neck lanyard.',
      icon: <CreditCard size={24} color="#ffd700" />,
      tag: 'Credential',
      image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'Premium Visiting Cards',
      desc: 'Laminated, gold-embossed business cards featuring your direct designation, phone, and territory details.',
      icon: <Tag size={24} color="#ffd700" />,
      tag: 'B2B Networking',
      image: 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'Product Catalogues & Glossy Brochures',
      desc: 'High-definition colour brochures, product catalogs for FMCG, Jewellery, and Modular Interiors.',
      icon: <BookOpen size={24} color="#ffd700" />,
      tag: 'Marketing Assets',
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'Executive Kit Bag & Official Diary',
      desc: 'Heavy-duty water-resistant field kit bag equipped with corporate planner diary and executive pen.',
      icon: <Briefcase size={24} color="#ffd700" />,
      tag: 'Field Equipment',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'Updated Sales Software & Mobile CRM',
      desc: 'Cloud ordering software, automated retailer beat tracking, stock visibility, and instant invoice generation.',
      icon: <Smartphone size={24} color="#ffd700" />,
      tag: 'Digital Tech',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'Products Commercial Schemes & Price Lists',
      desc: 'Ready calculation sheets, wholesale slab discount structures, and seasonal retailer trade margins.',
      icon: <FileSpreadsheet size={24} color="#ffd700" />,
      tag: 'Trade Schemes',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'Dealer Sales Facilities & POS Collateral',
      desc: 'Countertop display racks, shelf banners, point-of-sale danglers, and dealer certificate frames.',
      icon: <Package size={24} color="#ffd700" />,
      tag: 'Store POS',
      image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'Outdoor Canopies (CANOPE)',
      desc: 'Foldable branded promotional canopy tents (6x6 ft) for outdoor roadshows, local melas, and market activations.',
      icon: <Compass size={24} color="#ffd700" />,
      tag: 'Field Activations',
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'Flex Boards & High-Impact Signages',
      desc: 'Outdoor flex hoardings, dealer shop-front flex signboards, and roadside brand visibility boards.',
      icon: <Tv size={24} color="#ffd700" />,
      tag: 'Branding',
      image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'Retailer & Dealer Corporate Gift Items',
      desc: 'Festive gift hampers, stainless steel utilities, premium branded pens, and special festive token rewards.',
      icon: <Gift size={24} color="#ffd700" />,
      tag: 'Channel Loyalty',
      image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'Customer Scratch Cards & Lucky Schemes',
      desc: 'Interactive scratch cards for retail consumers with guaranteed gifts to drive rapid consumer trial.',
      icon: <Sparkles size={24} color="#ffd700" />,
      tag: 'Consumer Promo',
      image: 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?auto=format&fit=crop&w=600&q=80'
    }
  ];

  const policyPillars = [
    {
      title: 'Advance Digital Training Theory',
      desc: 'Comprehensive module covering digital territory mapping, B2B WhatsApp business tools, ERP mobile app operation, digital ordering pipelines, and customer relationship analytics.',
      icon: <Smartphone size={24} color="#ffd700" />
    },
    {
      title: 'Dealers Concept Theory',
      desc: 'Deep-dive into distributor psychology, stockist ROI management, credit cycle control, primary vs. secondary sales synchronization, and dispute-free account settlements.',
      icon: <Lightbulb size={24} color="#ffd700" />
    },
    {
      title: 'Motivational & Scientific Marketing Blueprints',
      desc: 'Field-tested neuro-marketing strategies, objection handling formulas, closing psychological triggers, high-impact product demonstration tactics, and rapid sales pitch mastery.',
      icon: <Flame size={24} color="#ffd700" />
    },
    {
      title: 'Targeting Turnovers & 100% Target Oriented Jobs',
      desc: 'Systematic daily sales target breakdown, beat-level turnover quotas, distributor pipeline management, and aggressive performance benchmarks backed by live mentorship.',
      icon: <Target size={24} color="#ffd700" />
    }
  ];

  return (
    <PageWrapper>
      <section className="section" style={{ paddingTop: '50px', paddingBottom: '90px', background: '#0a0d14' }}>
        <div className="container" style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 20px' }}>
          
          {/* Breadcrumb Navigation */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ textAlign: 'center', marginBottom: '24px', fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)' }}
          >
            <Link to="/" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Home</Link>
            <span style={{ margin: '0 8px', color: 'rgba(255,215,0,0.5)' }}>/</span>
            <Link to="/careers" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Careers</Link>
            <span style={{ margin: '0 8px', color: 'rgba(255,215,0,0.5)' }}>/</span>
            <span style={{ color: '#ffd700', fontWeight: 600 }}>Training & Development</span>
          </motion.div>

          {/* Hero Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', marginBottom: '50px' }}
          >
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: '20px',
              background: 'rgba(255,215,0,0.08)',
              border: '1px solid rgba(255,215,0,0.3)',
              color: '#ffd700',
              fontSize: '0.82rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '16px'
            }}>
              <GraduationCap size={16} /> Corporate Induction & Skill Mastery
            </div>
            
            <h1 style={{ 
              fontFamily: "'Playfair Display', serif", 
              fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', 
              fontWeight: 700, 
              color: '#ffffff',
              lineHeight: 1.15,
              marginBottom: '16px'
            }}>
              Professional <span style={{ color: '#ffd700', textShadow: '0 0 30px rgba(255,215,0,0.3)' }}>Training Program</span> & Kits
            </h1>
            
            <p style={{ 
              color: 'rgba(255,255,255,0.75)', 
              fontSize: 'clamp(1rem, 2vw, 1.15rem)', 
              maxWidth: '820px', 
              margin: '0 auto',
              lineHeight: 1.6
            }}>
              At The Sarkar Enterprise, every selected professional is equipped with full corporate kits, digital field tools, marketing materials, and certified scientific marketing training to ensure rapid career success.
            </p>
          </motion.div>

          {/* Golden Highlight Box: Mandatory Sunday Training Schedule */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            style={{ 
              background: 'linear-gradient(135deg, rgba(255,215,0,0.15) 0%, rgba(212,175,55,0.05) 100%)',
              border: '2px solid #ffd700',
              borderRadius: '16px',
              padding: '24px 28px',
              marginBottom: '50px',
              boxShadow: '0 15px 40px rgba(255,215,0,0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '20px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ 
                background: '#ffd700', 
                color: '#000000', 
                padding: '12px', 
                borderRadius: '12px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Calendar size={28} strokeWidth={2.5} />
              </div>
              <div>
                <div style={{ color: '#ffd700', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>
                  MANDATORY BATCH SCHEDULE
                </div>
                <div style={{ color: '#ffffff', fontSize: '1.25rem', fontWeight: 900, letterSpacing: '0.02em' }}>
                  EVERY SUNDAY FIRST HALF TRAINING SLOT
                </div>
                <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.9rem', marginTop: '2px' }}>
                  Weekly in-depth sales masterclasses, live territory reviews, product demo workshops, and target orientation.
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(0,0,0,0.5)', padding: '10px 18px', borderRadius: '10px', border: '1px solid rgba(255,215,0,0.3)' }}>
              <Clock size={18} color="#ffd700" />
              <span style={{ color: '#ffd700', fontWeight: 700, fontSize: '0.95rem' }}>10:00 AM – 02:00 PM IST</span>
            </div>
          </motion.div>

          {/* Section 1: Full Training Kit & Field Materials (Box 1) */}
          <div style={{ marginBottom: '65px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <span style={{ color: '#ffd700', fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  BOX 1: COMPREHENSIVE STARTER KIT
                </span>
                <h2 style={{ fontFamily: "'Playfair Display', serif", color: '#ffffff', fontSize: '2.1rem', fontWeight: 700, margin: '4px 0 0 0' }}>
                  Full Training Kit & Field Materials
                </h2>
              </div>
              <span style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '20px', padding: '6px 14px', fontSize: '0.82rem', color: 'rgba(255,255,255,0.8)' }}>
                12 Essential Assets Provided
              </span>
            </div>

            {/* Grid of 12 Training Materials */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 270px), 1fr))', 
              gap: '20px' 
            }}>
              {trainingKitItems.map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    background: '#121622',
                    border: '1px solid rgba(255,215,0,0.18)',
                    borderRadius: '14px',
                    padding: '22px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.4)'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                      <div style={{ background: 'rgba(255,215,0,0.12)', color: '#ffd700', padding: '10px', borderRadius: '10px', display: 'inline-flex' }}>
                        {item.icon}
                      </div>
                      <span style={{ 
                        background: 'rgba(255,215,0,0.08)', 
                        border: '1px solid rgba(255,215,0,0.3)', 
                        borderRadius: '6px', 
                        padding: '3px 8px', 
                        fontSize: '0.72rem', 
                        fontWeight: 700, 
                        color: '#ffd700' 
                      }}>
                        {item.tag}
                      </span>
                    </div>

                    <h3 style={{ color: '#ffffff', fontSize: '1.05rem', fontWeight: 700, margin: '0 0 8px 0', lineHeight: 1.3 }}>
                      {item.title}
                    </h3>
                    
                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.86rem', lineHeight: 1.55, margin: 0 }}>
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Section 2: Training Policy & Scientific Blueprints (Box 2) */}
          <div style={{ 
            background: 'linear-gradient(180deg, #111520 0%, #0c0f17 100%)',
            border: '1px solid rgba(255,215,0,0.25)',
            borderRadius: '20px',
            padding: 'clamp(24px, 4vw, 40px)',
            marginBottom: '65px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '36px' }}>
              <span style={{ color: '#ffd700', fontSize: '0.82rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                BOX 2: METHODOLOGY & POLICIES
              </span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", color: '#ffffff', fontSize: '2.2rem', fontWeight: 700, margin: '6px 0 12px 0' }}>
                Corporate Training Policy & Blueprints
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.95rem', maxWidth: '700px', margin: '0 auto' }}>
                Scientific execution formulas designed to cultivate executive leadership, retail dominance, and 100% target achievement across all sales territories.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '20px', marginBottom: '36px' }}>
              {policyPillars.map((pillar, idx) => (
                <div 
                  key={idx}
                  style={{
                    background: 'rgba(255,255,255,0.025)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '12px',
                    padding: '22px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ background: 'rgba(255,215,0,0.12)', padding: '8px', borderRadius: '8px' }}>
                      {pillar.icon}
                    </div>
                    <h3 style={{ color: '#ffd700', fontSize: '1.02rem', fontWeight: 700, margin: 0 }}>
                      {pillar.title}
                    </h3>
                  </div>
                  <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.86rem', lineHeight: 1.55, margin: 0 }}>
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Target Oriented Notice with Sunday Bold Slot */}
            <div style={{ 
              background: '#090b10', 
              border: '1px solid rgba(255,215,0,0.3)', 
              borderRadius: '12px', 
              padding: '20px 24px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              flexWrap: 'wrap'
            }}>
              <Target size={28} color="#ffd700" style={{ flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <strong style={{ color: '#ffffff', fontSize: '1.05rem', display: 'block', marginBottom: '4px' }}>
                  100% Target-Oriented Career Framework:
                </strong>
                <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.88rem', lineHeight: 1.5 }}>
                  All executive sales positions are designed with clear turnover milestones. Continuous training is conducted during the 
                  <strong style={{ color: '#ffd700', fontWeight: 800 }}> EVERY SUNDAY FIRST HALF TRAINING SLOT </strong> 
                  to ensure every candidate exceeds monthly performance goals effortlessly.
                </span>
              </div>
            </div>
          </div>

          {/* Section 3: Comprehensive Perks & Package Breakdown (Box 3) */}
          <div style={{ 
            background: 'linear-gradient(135deg, #131724 0%, #0d101a 100%)', 
            border: '1px solid rgba(255,215,0,0.3)', 
            borderRadius: '20px', 
            padding: 'clamp(24px, 4vw, 40px)',
            boxShadow: '0 25px 60px rgba(0,0,0,0.5)'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <span style={{ color: '#ffd700', fontSize: '0.82rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                BOX 3: PERKS / PACKAGE & REMUNERATION
              </span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", color: '#ffffff', fontSize: '2.2rem', fontWeight: 700, margin: '6px 0 8px 0' }}>
                Unexpected Salary + High Incentives + Daily Allowance (DA)
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.95rem', maxWidth: '750px', margin: '0 auto' }}>
                We reward high-achieving talent with top-of-market compensation packages, monthly payouts, and extensive statutory benefits.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: '20px', marginBottom: '32px' }}>
              
              {/* Card 1: Unexpected Salary */}
              <div style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,215,0,0.25)', borderRadius: '14px', padding: '24px', textAlign: 'center' }}>
                <div style={{ width: '56px', height: '56px', background: 'rgba(255,215,0,0.12)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto', color: '#ffd700' }}>
                  <IndianRupee size={28} />
                </div>
                <h3 style={{ color: '#ffffff', fontSize: '1.15rem', fontWeight: 800, marginBottom: '8px' }}>
                  Unexpected Salary (Base CTC)
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.84rem', lineHeight: 1.5, margin: 0 }}>
                  Competitive, guaranteed monthly base salary disbursed on the 1st of every month directly to your bank account.
                </p>
              </div>

              {/* Card 2: Performance Incentives */}
              <div style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,215,0,0.25)', borderRadius: '14px', padding: '24px', textAlign: 'center' }}>
                <div style={{ width: '56px', height: '56px', background: 'rgba(255,215,0,0.12)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto', color: '#ffd700' }}>
                  <TrendingUp size={28} />
                </div>
                <h3 style={{ color: '#ffffff', fontSize: '1.15rem', fontWeight: 800, marginBottom: '8px' }}>
                  Lucrative Sales Incentives
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.84rem', lineHeight: 1.5, margin: 0 }}>
                  Transparent slab-based commissions and monthly turnover bonuses with no upper ceiling on total earnings.
                </p>
              </div>

              {/* Card 3: Daily Allowance (DA) & Travel */}
              <div style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,215,0,0.25)', borderRadius: '14px', padding: '24px', textAlign: 'center' }}>
                <div style={{ width: '56px', height: '56px', background: 'rgba(255,215,0,0.12)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto', color: '#ffd700' }}>
                  <Briefcase size={28} />
                </div>
                <h3 style={{ color: '#ffffff', fontSize: '1.15rem', fontWeight: 800, marginBottom: '8px' }}>
                  Daily Allowance (DA)
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.84rem', lineHeight: 1.5, margin: 0 }}>
                  Daily food & field travel allowances provided for outstation client visits, distributor beats, and trade fairs.
                </p>
              </div>

              {/* Card 4: PF & ESI Available */}
              <div style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,215,0,0.25)', borderRadius: '14px', padding: '24px', textAlign: 'center' }}>
                <div style={{ width: '56px', height: '56px', background: 'rgba(255,215,0,0.12)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto', color: '#ffd700' }}>
                  <ShieldCheck size={28} />
                </div>
                <h3 style={{ color: '#ffffff', fontSize: '1.15rem', fontWeight: 800, marginBottom: '8px' }}>
                  PF &amp; ESI Statutory Benefits
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.84rem', lineHeight: 1.5, margin: 0 }}>
                  Provident Fund (PF) retirement security and Employee State Insurance (ESI) healthcare benefits for you and your family.
                </p>
              </div>

            </div>

            {/* Pictorial Salary & Growth Visualization Banner */}
            <div style={{ 
              borderRadius: '12px', 
              overflow: 'hidden', 
              position: 'relative', 
              height: '180px',
              border: '1px solid rgba(255,215,0,0.2)'
            }}>
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80" 
                alt="The Sarkar Enterprise Corporate Team Growth" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(90deg, rgba(10,13,20,0.92) 0%, rgba(10,13,20,0.65) 60%, rgba(10,13,20,0.4) 100%)',
                display: 'flex',
                alignItems: 'center',
                padding: '0 clamp(20px, 4vw, 40px)',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px'
              }}>
                <div>
                  <h3 style={{ color: '#ffffff', fontSize: '1.3rem', fontWeight: 800, margin: '0 0 6px 0' }}>
                    Ready to Accelerate Your Professional Career?
                  </h3>
                  <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.88rem', margin: 0 }}>
                    Apply today, attend the induction module, and receive your complete starter kit.
                  </p>
                </div>
                
                <Link
                  to="/careers"
                  style={{
                    background: 'linear-gradient(135deg, #ffd700 0%, #eab308 100%)',
                    color: '#000000',
                    padding: '12px 22px',
                    borderRadius: '8px',
                    fontWeight: 800,
                    textDecoration: 'none',
                    fontSize: '0.88rem',
                    letterSpacing: '0.04em',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 6px 20px rgba(255,215,0,0.3)',
                    transition: 'transform 0.2s ease'
                  }}
                >
                  View Openings &amp; Apply <ArrowRight size={16} />
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>
    </PageWrapper>
  );
};
