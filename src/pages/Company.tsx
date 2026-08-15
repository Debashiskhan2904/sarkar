import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { PageWrapper } from '../components/PageWrapper';
import { useStore } from '../store';
import { 
  Volume2, Play, ZoomIn, FileText, Download, Sparkles, MessageCircle, ArrowRight, Music, Image as ImageIcon, Film,
  Briefcase, MapPin, Clock, Award, TrendingUp, CheckCircle2, UploadCloud, ShieldCheck, ChevronDown, UserCheck, 
  DollarSign, Building2, ChevronRight, PhoneCall, X, Send, Users, Check, HelpCircle, Search, ShoppingBag, Tag, Filter
} from 'lucide-react';

export const Careers = () => {
  const { jobs, addApplication, showToast } = useStore();
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedDept, setSelectedDept] = useState('all');
  const [activeModalJob, setActiveModalJob] = useState<any | null>(null);
  
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState('');
  const [fileData, setFileData] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showToast('File size must be under 5 MB', 'error');
        return;
      }
      setFileName(file.name);
      setFileSize((file.size / 1024).toFixed(1) + ' KB');
      
      const reader = new FileReader();
      reader.onload = () => {
        setFileData(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const submitApplication = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!fileData) { 
      showToast('Please upload your resume / CV document (PDF or DOC)', 'error'); 
      return; 
    }
    
    setIsSubmitting(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const newApp = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      position: formData.get('position') as string || selectedRole || 'General Application',
      cover: formData.get('cover') as string,
      fileName: fileName,
      fileData: fileData,
      date: new Date().toISOString()
    };
    
    try {
      await addApplication(newApp);
      form.reset();
      setFileName('');
      setFileData(null);
      setFileSize('');
      showToast('Application submitted successfully! HR will review within 7 days.', 'success');
    } catch (err: any) {
      showToast('Submission error. Please try again or contact HR.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter jobs by sector
  const filteredJobs = jobs.filter((j: any) => {
    if (selectedDept === 'all') return true;
    if (selectedDept === 'field') return j.dept?.includes('Field') || j.type?.includes('Field') || j.title?.includes('RCMA') || j.title?.includes('Hawker');
    if (selectedDept === 'corporate') return j.dept?.includes('Corporate') || j.dept?.includes('FMCG') || j.title?.includes('BDM');
    if (selectedDept === 'digital') return j.dept?.includes('Digital') || j.dept?.includes('Marketing') || j.title?.includes('OME');
    if (selectedDept === 'sector') return j.dept?.includes('Jewellery') || j.dept?.includes('Interior');
    return true;
  });

  return (
    <PageWrapper>
      <section className="section" style={{ paddingTop: '50px', paddingBottom: '80px', background: '#0a0d12' }}>
        <div className="container" style={{ maxWidth: '1140px', margin: '0 auto' }}>
          
          {/* Breadcrumb Navigation */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ textAlign: 'center', marginBottom: '24px', fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)' }}
          >
            <Link to="/" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Home</Link>
            <span style={{ margin: '0 8px', color: 'rgba(255,215,0,0.5)' }}>/</span>
            <span style={{ color: '#ffd700', fontWeight: 600 }}>Careers</span>
          </motion.div>

          {/* Hero Title Section matching Screenshot 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', marginBottom: '50px' }}
          >
            <h1 style={{ 
              fontFamily: "'Playfair Display', serif", 
              fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', 
              fontWeight: 700, 
              color: '#ffffff',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              marginBottom: '16px'
            }}>
              Build Your Career <span style={{ color: '#ffd700', textShadow: '0 0 25px rgba(255,215,0,0.25)' }}>With Us</span>
            </h1>
            <p style={{ 
              color: 'rgba(255,255,255,0.75)', 
              fontSize: 'clamp(1rem, 2vw, 1.2rem)', 
              maxWidth: '780px', 
              margin: '0 auto',
              lineHeight: 1.6
            }}>
              Join a team that shapes global & regional brands. We offer growth, purpose, and a culture of excellence across three dynamic sectors.
            </p>

          </motion.div>

          {/* Current Openings Section matching Screenshot 2 */}
          <div style={{ 
            background: '#12151c', 
            border: '1px solid rgba(255,255,255,0.08)', 
            borderRadius: '16px', 
            padding: '36px 28px',
            marginBottom: '60px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.4)'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <h2 style={{ 
                fontFamily: "'Playfair Display', serif", 
                color: '#ffffff', 
                fontSize: '2.2rem', 
                fontWeight: 700, 
                marginBottom: '10px' 
              }}>
                Current Openings
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem', maxWidth: '700px', margin: '0 auto' }}>
                We are expanding our Reference Chain Marketing, Field Sales, Digital Marketing and Administrative teams.
              </p>
            </div>

            {/* Jobs Cards Grid */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))', 
              gap: '20px' 
            }}>
              <AnimatePresence mode="popLayout">
                {filteredJobs.map((j: any) => (
                  <motion.div
                    key={j.id || j.title}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ y: -4, borderColor: 'rgba(255,215,0,0.5)' }}
                    style={{
                      background: 'rgba(255,255,255,0.025)',
                      border: '1px solid rgba(255,255,255,0.09)',
                      borderRadius: '12px',
                      padding: '24px',
                      display: 'flex',
                      flexDirection: 'column',
                      justify: 'space-between',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    {/* Top Accent line */}
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, #ffd700, transparent)' }} />

                    <div>
                      {/* Gold Heading Title matching Screenshot 2 */}
                      <h3 style={{ 
                        fontFamily: "'Playfair Display', serif", 
                        color: '#ffd700', 
                        fontSize: '1.2rem', 
                        fontWeight: 700, 
                        lineHeight: 1.35,
                        marginBottom: '10px' 
                      }}>
                        {j.title}
                      </h3>

                      {/* Description */}
                      <p style={{ 
                        color: 'rgba(255,255,255,0.78)', 
                        fontSize: '0.92rem', 
                        lineHeight: 1.55, 
                        marginBottom: '18px' 
                      }}>
                        {j.desc}
                      </p>

                      {/* Meta Details */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                        {j.dept && (
                          <span style={{ fontSize: '0.78rem', background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.7)', padding: '4px 10px', borderRadius: '4px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            <Building2 size={12} /> {j.dept}
                          </span>
                        )}
                        {j.loc && (
                          <span style={{ fontSize: '0.78rem', background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.7)', padding: '4px 10px', borderRadius: '4px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            <MapPin size={12} /> {j.loc}
                          </span>
                        )}
                        {j.exp && (
                          <span style={{ fontSize: '0.78rem', background: 'rgba(255,215,0,0.1)', color: '#ffd700', padding: '4px 10px', borderRadius: '4px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            <Briefcase size={12} /> {j.exp}
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      {/* Card Footer matching Screenshot 2 style (e.g., Full-time / Field) */}
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justify: 'space-between', 
                        borderTop: '1px solid rgba(255,255,255,0.06)', 
                        paddingTop: '14px',
                        marginTop: '10px'
                      }}>
                        <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', fontWeight: 500 }}>
                          {j.type || 'Full-time'}
                        </span>

                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            onClick={() => setActiveModalJob(j)}
                            style={{
                              background: 'transparent',
                              border: '1px solid rgba(255,215,0,0.3)',
                              color: '#ffd700',
                              padding: '6px 12px',
                              borderRadius: '6px',
                              fontSize: '0.8rem',
                              fontWeight: 600,
                              cursor: 'pointer'
                            }}
                          >
                            Details
                          </button>
                          <button
                            onClick={() => {
                              setSelectedRole(j.title);
                              document.getElementById('applyFormContainer')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            style={{
                              background: 'linear-gradient(135deg, #ffd700, #eab308)',
                              border: 'none',
                              color: '#000000',
                              padding: '6px 14px',
                              borderRadius: '6px',
                              fontSize: '0.82rem',
                              fontWeight: 700,
                              cursor: 'pointer'
                            }}
                          >
                            Apply Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Submit Your CV Form Container matching Screenshot 3 */}
          <div id="applyFormContainer" style={{ scrollMarginTop: '100px', marginBottom: '60px' }}>
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
              <div style={{ 
                color: '#ffd700', 
                fontSize: '0.82rem', 
                fontWeight: 700, 
                letterSpacing: '0.15em', 
                textTransform: 'uppercase', 
                marginBottom: '8px' 
              }}>
                JOIN US
              </div>
              <h2 style={{ 
                fontFamily: "'Playfair Display', serif", 
                color: '#ffffff', 
                fontSize: '2.5rem', 
                fontWeight: 700 
              }}>
                Submit Your CV
              </h2>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{
                maxWidth: '680px',
                margin: '0 auto',
                background: '#12151c',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '16px',
                padding: '36px 32px',
                boxShadow: '0 25px 60px rgba(0,0,0,0.5)'
              }}
            >
              <form onSubmit={submitApplication}>
                
                {/* Full Name */}
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', color: 'rgba(255,255,255,0.85)', fontSize: '0.9rem', fontWeight: 500, marginBottom: '8px' }}>
                    Full Name <span style={{ color: '#ffd700' }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Your full name"
                    style={{
                      width: '100%',
                      background: 'rgba(0,0,0,0.4)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      borderRadius: '8px',
                      padding: '12px 16px',
                      color: '#ffffff',
                      fontSize: '0.95rem',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                {/* Email */}
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', color: 'rgba(255,255,255,0.85)', fontSize: '0.9rem', fontWeight: 500, marginBottom: '8px' }}>
                    Email <span style={{ color: '#ffd700' }}>*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="you@email.com"
                    style={{
                      width: '100%',
                      background: 'rgba(0,0,0,0.4)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      borderRadius: '8px',
                      padding: '12px 16px',
                      color: '#ffffff',
                      fontSize: '0.95rem',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                {/* Phone / WhatsApp */}
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', color: 'rgba(255,255,255,0.85)', fontSize: '0.9rem', fontWeight: 500, marginBottom: '8px' }}>
                    Phone / WhatsApp <span style={{ color: '#ffd700' }}>*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="+91 8670783810"
                    style={{
                      width: '100%',
                      background: 'rgba(0,0,0,0.4)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      borderRadius: '8px',
                      padding: '12px 16px',
                      color: '#ffffff',
                      fontSize: '0.95rem',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                {/* Position Interested In */}
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', color: 'rgba(255,255,255,0.85)', fontSize: '0.9rem', fontWeight: 500, marginBottom: '8px' }}>
                    Position Interested In <span style={{ color: '#ffd700' }}>*</span>
                  </label>
                  <div style={{ position: 'relative' }}>
                    <select
                      name="position"
                      value={selectedRole}
                      onChange={e => setSelectedRole(e.target.value)}
                      required
                      style={{
                        width: '100%',
                        background: 'rgba(0,0,0,0.6)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        borderRadius: '8px',
                        padding: '12px 16px',
                        color: '#ffffff',
                        fontSize: '0.95rem',
                        appearance: 'none',
                        outline: 'none',
                        cursor: 'pointer',
                        boxSizing: 'border-box'
                      }}
                    >
                      <option value="" style={{ background: '#12151c' }}>Select position...</option>
                      {jobs.map((j: any) => (
                        <option key={j.id || j.title} value={j.title} style={{ background: '#12151c' }}>
                          {j.title} ({j.type || 'Full-time'})
                        </option>
                      ))}
                      <option value="General Application" style={{ background: '#12151c' }}>General Application (Any Sector)</option>
                    </select>
                    <ChevronDown size={18} color="rgba(255,255,255,0.5)" style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                  </div>
                </div>

                {/* Upload CV Dropzone matching Screenshot 3 */}
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', color: 'rgba(255,255,255,0.85)', fontSize: '0.9rem', fontWeight: 500, marginBottom: '8px' }}>
                    Upload CV (PDF / DOC) <span style={{ color: '#ffd700' }}>*</span>
                  </label>
                  
                  <div
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                      background: dragActive ? 'rgba(255,215,0,0.08)' : 'rgba(0,0,0,0.3)',
                      border: dragActive ? '2px dashed #ffd700' : '1px solid rgba(255,255,255,0.15)',
                      borderRadius: '8px',
                      padding: '20px',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.25s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px'
                    }}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileSelect}
                      style={{ display: 'none' }}
                    />

                    <div style={{ 
                      background: 'rgba(255,215,0,0.1)', 
                      padding: '10px 14px', 
                      borderRadius: '6px', 
                      border: '1px solid rgba(255,215,0,0.3)',
                      color: '#ffd700',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      whiteSpace: 'nowrap'
                    }}>
                      Choose File
                    </div>

                    <div style={{ flex: 1, overflow: 'hidden' }}>
                      {fileName ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <CheckCircle2 size={18} color="#10b981" />
                          <span style={{ color: '#10b981', fontWeight: 600, fontSize: '0.9rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {fileName}
                          </span>
                          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }}>({fileSize})</span>
                        </div>
                      ) : (
                        <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem' }}>
                          No file chosen
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Message (optional) */}
                <div style={{ marginBottom: '28px' }}>
                  <label style={{ display: 'block', color: 'rgba(255,255,255,0.85)', fontSize: '0.9rem', fontWeight: 500, marginBottom: '8px' }}>
                    Message (optional)
                  </label>
                  <textarea
                    name="cover"
                    rows={4}
                    placeholder="Tell us briefly about your experience"
                    style={{
                      width: '100%',
                      background: 'rgba(0,0,0,0.4)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      borderRadius: '8px',
                      padding: '12px 16px',
                      color: '#ffffff',
                      fontSize: '0.95rem',
                      outline: 'none',
                      resize: 'vertical',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                {/* Golden Submit Button matching Screenshot 3 */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    background: 'linear-gradient(135deg, #d4af37, #eab308)',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '14px 20px',
                    color: '#000000',
                    fontSize: '0.92rem',
                    fontWeight: 800,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    cursor: isSubmitting ? 'wait' : 'pointer',
                    boxShadow: '0 8px 25px rgba(212,175,55,0.3)',
                    transition: 'all 0.25s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justify: 'center',
                    gap: '8px'
                  }}
                >
                  {isSubmitting ? (
                    'SUBMITTING APPLICATION...'
                  ) : (
                    <>
                      SUBMIT APPLICATION <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>

          {/* Candidate Terms & Conditions / Guidelines matching Screenshot 4 */}
          <div style={{ maxWidth: '820px', margin: '0 auto 60px auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div style={{ 
                color: '#ffd700', 
                fontSize: '0.82rem', 
                fontWeight: 700, 
                letterSpacing: '0.15em', 
                textTransform: 'uppercase', 
                marginBottom: '8px' 
              }}>
                GUIDELINES
              </div>
              <h2 style={{ 
                fontFamily: "'Playfair Display', serif", 
                color: '#ffffff', 
                fontSize: '2.2rem', 
                fontWeight: 700 
              }}>
                Candidate Terms & Conditions
              </h2>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{
                background: '#12151c',
                border: '1px dashed rgba(255,215,0,0.35)',
                borderRadius: '16px',
                padding: '36px 32px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
              }}
            >
              <ul style={{ 
                color: 'rgba(255,255,255,0.82)', 
                fontSize: '0.95rem', 
                lineHeight: 1.7, 
                paddingLeft: '20px',
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                <li>
                  All candidates must provide authentic documents (Aadhaar, Voter ID, Residential proof, etc.) as required for the role.
                </li>
                <li>
                  Field roles may require own bicycle / vehicle in good condition and a basic Android phone.
                </li>
                <li>
                  Security deposits (where applicable) are refundable as per company policy after successful completion of assignment period.
                </li>
                <li>
                  Incentive structures are performance-linked and calculated on verified collections / sales.
                </li>
                <li>
                  We maintain an international standard marketing unit culture — professionalism, punctuality and integrity are expected.
                </li>
                <li>
                  Training will be provided. Continuous performance review is part of the process.
                </li>
                <li>
                  Company reserves the right to modify schemes and targets as per market conditions.
                </li>
              </ul>

              <p style={{ 
                marginTop: '28px', 
                color: 'rgba(255,255,255,0.5)', 
                fontSize: '0.88rem', 
                fontStyle: 'italic',
                borderTop: '1px solid rgba(255,255,255,0.08)',
                paddingTop: '16px',
                margin: '24px 0 0 0'
              }}>
                By submitting your application you agree to these guidelines and our privacy policy.
              </p>
            </motion.div>
          </div>

          {/* Culture & Employee Benefits Section */}
          <div style={{ marginTop: '70px', marginBottom: '50px' }}>
            <div style={{ textAlign: 'center', marginBottom: '36px' }}>
              <div style={{ color: '#ffd700', fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '8px' }}>
                PERKS & CULTURE
              </div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", color: '#ffffff', fontSize: '2.2rem', fontWeight: 700 }}>
                Why Join Sarkar Enterprise?
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
              <div style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '24px' }}>
                <div style={{ color: '#ffd700', marginBottom: '12px' }}><TrendingUp size={28} /></div>
                <h4 style={{ color: '#ffffff', fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px' }}>Fast-Track Promotion</h4>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.88rem', lineHeight: 1.5 }}>
                  Transparent quarterly evaluation. Proven field sales performance leads directly to Team Lead & Regional BDM promotions.
                </p>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '24px' }}>
                <div style={{ color: '#ffd700', marginBottom: '12px' }}><DollarSign size={28} /></div>
                <h4 style={{ color: '#ffffff', fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px' }}>Daily & Weekly Payouts</h4>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.88rem', lineHeight: 1.5 }}>
                  Daily cash income options for Hawker promoters and weekly verified collection incentives for RCMA advisors.
                </p>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '24px' }}>
                <div style={{ color: '#ffd700', marginBottom: '12px' }}><ShieldCheck size={28} /></div>
                <h4 style={{ color: '#ffffff', fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px' }}>Direct Founder Support</h4>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.88rem', lineHeight: 1.5 }}>
                  Work directly under MD Kishore Sarkar's strategic marketing frameworks and regional expansion guidance.
                </p>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '24px' }}>
                <div style={{ color: '#ffd700', marginBottom: '12px' }}><Award size={28} /></div>
                <h4 style={{ color: '#ffffff', fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px' }}>Full Training & Kits</h4>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.88rem', lineHeight: 1.5 }}>
                  Complete product brochures, uniform kits, promotional materials, and on-ground sales training provided.
                </p>
              </div>
            </div>
          </div>

          {/* Direct HR Contact Callout */}
          <div style={{ 
            background: 'linear-gradient(135deg, rgba(255,215,0,0.1), rgba(255,215,0,0.02))', 
            border: '1px solid rgba(255,215,0,0.3)', 
            borderRadius: '12px', 
            padding: '24px 30px', 
            display: 'flex', 
            flexWrap: 'wrap', 
            alignItems: 'center', 
            justify: 'space-between', 
            gap: '16px' 
          }}>
            <div>
              <h4 style={{ color: '#ffd700', fontSize: '1.15rem', margin: '0 0 4px 0', fontWeight: 700 }}>
                Have questions about a role or application status?
              </h4>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.9rem', margin: 0 }}>
                Connect directly with Sarkar Enterprise HR & Recruitment Desk at Bhiringi More, Durgapur.
              </p>
            </div>
            <a 
              href="https://wa.me/918670783810?text=Hello%20Sarkar%20Enterprise%20HR,%20I%20want%20to%20inquire%20about%20career%20openings."
              target="_blank"
              rel="noopener noreferrer"
              style={{ 
                background: '#25D366', 
                color: '#ffffff', 
                padding: '10px 20px', 
                borderRadius: '8px', 
                fontWeight: 700, 
                fontSize: '0.9rem', 
                textDecoration: 'none', 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '8px' 
              }}
            >
              <MessageCircle size={18} /> Chat on WhatsApp (+91 8670783810)
            </a>
          </div>

        </div>
      </section>

      {/* Role Details Modal Popup */}
      <AnimatePresence>
        {activeModalJob && (
          <div 
            onClick={() => setActiveModalJob(null)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.85)',
              backdropFilter: 'blur(8px)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justify: 'center',
              padding: '20px'
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: '#12151c',
                border: '1px solid rgba(255,215,0,0.4)',
                borderRadius: '16px',
                padding: '32px',
                maxWidth: '600px',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                position: 'relative',
                boxShadow: '0 30px 80px rgba(0,0,0,0.8)'
              }}
            >
              <button
                onClick={() => setActiveModalJob(null)}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  background: 'none',
                  border: 'none',
                  color: 'rgba(255,255,255,0.6)',
                  fontSize: '1.2rem',
                  cursor: 'pointer'
                }}
              >
                ✕
              </button>

              <div style={{ color: '#ffd700', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>
                POSITION DETAILS
              </div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", color: '#ffffff', fontSize: '1.8rem', fontWeight: 700, marginBottom: '16px' }}>
                {activeModalJob.title}
              </h2>

              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.98rem', lineHeight: 1.6, marginBottom: '20px' }}>
                {activeModalJob.desc}
              </p>

              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '16px', marginBottom: '24px' }}>
                <h4 style={{ color: '#ffd700', margin: '0 0 10px 0', fontSize: '0.95rem', fontWeight: 700 }}>Key Specifications</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.88rem', color: 'rgba(255,255,255,0.8)' }}>
                  <div>🏢 <strong>Department:</strong> {activeModalJob.dept || 'Sales & Operations'}</div>
                  <div>📍 <strong>Location:</strong> {activeModalJob.loc || 'Bengal & Region'}</div>
                  <div>⏱ <strong>Employment:</strong> {activeModalJob.type || 'Full-time'}</div>
                  <div>📈 <strong>Experience:</strong> {activeModalJob.exp || 'Freshers / Exp'}</div>
                </div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 700, marginBottom: '10px' }}>Role Guidelines & Requirements</h4>
                <ul style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.9rem', lineHeight: 1.6, paddingLeft: '18px', margin: 0 }}>
                  <li>Valid Photo ID (Aadhaar Card, Voter ID, Residential Proof) mandatory.</li>
                  <li>Commitment to daily target collections / customer outreach.</li>
                  <li>Professionalism, punctuality and integrity expected at all times.</li>
                  <li>Continuous training and mentorship provided by MD Kishore Sarkar & team.</li>
                </ul>
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => setActiveModalJob(null)}
                  style={{
                    background: 'transparent',
                    border: '1px solid rgba(255,255,255,0.2)',
                    color: '#ffffff',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setSelectedRole(activeModalJob.title);
                    setActiveModalJob(null);
                    document.getElementById('applyFormContainer')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  style={{
                    background: 'linear-gradient(135deg, #ffd700, #eab308)',
                    border: 'none',
                    color: '#000000',
                    padding: '10px 24px',
                    borderRadius: '8px',
                    fontWeight: 800,
                    cursor: 'pointer'
                  }}
                >
                  Apply For This Role
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </PageWrapper>
  );
};

export const Media = () => {
  const { mediaItems, playVideo, openZoomGallery, showToast } = useStore();
  
  // Primary Sector / Type Filter
  const [filter, setFilter] = useState<string>('all');
  
  // Product-specific Sub-Filter
  const [productSubFilter, setProductSubFilter] = useState<string>('all_sub');
  
  // Search query
  const [searchQuery, setSearchQuery] = useState<string>('');

  const getEncodedUrl = (url: string) => {
    if (!url) return '';
    return url.startsWith('/assets/') ? encodeURI(url) : url;
  };

  const getFallbackSvg = (title: string) => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
      <rect width="800" height="600" fill="#111827"/>
      <rect x="20" y="20" width="760" height="560" rx="12" fill="none" stroke="#d4af37" stroke-width="2" stroke-dasharray="6 6" opacity="0.5"/>
      <circle cx="400" cy="240" r="48" fill="rgba(212,175,55,0.1)" stroke="#d4af37" stroke-width="2"/>
      <path d="M380 240 h40 M400 220 v40" stroke="#d4af37" stroke-width="3" stroke-linecap="round"/>
      <text x="50%" y="360" dominant-baseline="middle" text-anchor="middle" fill="#f3f4f6" font-family="sans-serif" font-size="24" font-weight="bold">${title.replace(/&/g, '&amp;')}</text>
      <text x="50%" y="410" dominant-baseline="middle" text-anchor="middle" fill="#d4af37" font-family="sans-serif" font-size="18">Sarkar Enterprise Official Media Asset</text>
    </svg>`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  };

  // Comprehensive Product-tagged Media Assets Catalog
  const visualAssets = [
    {
      id: 'va-1',
      title: 'Hawker Route & Cash Income Chart',
      url: '/images/HawkerRecruitmentBengali.jpg',
      sector: 'fmcg',
      productSub: 'hawker_scheme',
      productLabel: 'Hawker Route Scheme',
      tags: ['hawker', 'income', 'bengali', 'fmcg', 'cash income', 'scheme']
    },
    {
      id: 'va-2',
      title: 'Triple Action Interaction Marketing Policy',
      url: '/images/Project7ReferenceChainMarketingExecutive.jpg',
      sector: 'fmcg',
      productSub: 'hawker_scheme',
      productLabel: 'Marketing Policy',
      tags: ['triple action', 'rcma', 'reference chain', 'fmcg', 'marketing']
    },
    {
      id: 'va-3',
      title: 'Mandatory Fast Track Target Achievement',
      url: '/images/Project15SubstantialProfitableAccountability.jpg',
      sector: 'jewellery',
      productSub: 'jewellery_scheme',
      productLabel: 'Jewellery Target Scheme',
      tags: ['fast track', 'target', 'jewellery', 'scheme', 'profitability']
    },
    {
      id: 'va-4',
      title: 'Grand Priti-Ji Chanachur Inauguration Poster',
      url: '/images/PritiJiAyurvedicChanachur.jpg',
      sector: 'fmcg',
      productSub: 'chanachur',
      productLabel: 'Priti-Ji Chanachur',
      tags: ['priti-ji', 'chanachur', 'ayurvedic', 'dry fruit', 'fmcg', 'launch']
    },
    {
      id: 'va-5',
      title: 'Graphics Scale Rotation – Dealers Movement',
      url: '/images/Project8Y4CompetitiveSchemeCalendar.jpg',
      sector: 'jewellery',
      productSub: 'jewellery_scheme',
      productLabel: 'Jewellery Y4 Scheme',
      tags: ['y4 scheme', 'graphics scale', 'jewellery', 'rotation', 'calendar']
    },
    {
      id: 'va-6',
      title: 'Priti-Ji Promotional Uniform & Brand Promoter Range',
      url: '/images/BrandPromoterRange.jpg',
      sector: 'fmcg',
      productSub: 'chanachur',
      productLabel: 'Priti-Ji Promoter Range',
      tags: ['priti-ji', 'promoter', 'uniform', 'chanachur', 'fmcg', 'dress code']
    },
    {
      id: 'va-7',
      title: 'Dealer Free Combo Offers & Supply Communication',
      url: '/images/FreeFreeFreeComboOffers.jpg',
      sector: 'fmcg',
      productSub: 'chanachur',
      productLabel: 'Free Combo Offers',
      tags: ['free combo', 'buy 2 get 1', 'fmcg', 'priti-ji', 'offers', 'gifts']
    },
    {
      id: 'va-8',
      title: 'Grand Launching Partner Benefits for Dealers',
      url: '/images/PartnerBenefitsAndPromotion.jpg',
      sector: 'fmcg',
      productSub: 'hawker_scheme',
      productLabel: 'Partner Benefits',
      tags: ['partner benefits', 'dealer', 'c&f', 'fmcg', 'promotion']
    },
    {
      id: 'va-9',
      title: 'Jewellery Gift Coupon & Exchange Form',
      url: "/images/M1Aug22CompetitiveScheme.jpg",
      sector: 'jewellery',
      productSub: 'jewellery_scheme',
      productLabel: 'M1 Competitive Scheme',
      tags: ['jewellery', 'm1 scheme', 'gift coupon', 'gold', 'exchange']
    },
    {
      id: 'va-10',
      title: 'Jewellery Recycling & Filter Chemical Equipment',
      url: '/images/Project14RecyclingFilterChemicalsProcess.jpg',
      sector: 'jewellery',
      productSub: 'jewellery_equipment',
      productLabel: 'Gold Recycling Machine',
      tags: ['recycling', 'filter', 'chemical', 'jewellery equipment', 'gold']
    },
    {
      id: 'va-11',
      title: 'Automatic Jewelry Polishing Machine',
      url: '/images/Project16RecyclingAndReshufflingProcess.jpg',
      sector: 'jewellery',
      productSub: 'jewellery_equipment',
      productLabel: 'Jewellery Polishing Machine',
      tags: ['polishing machine', 'reshuffling', 'jewellery equipment', 'gold']
    },
    {
      id: 'va-12',
      title: 'Jewellery Tech Daily Target Collection Unit',
      url: '/images/Project5DailyTargetTurnoverCollectionUnit.jpg',
      sector: 'jewellery',
      productSub: 'jewellery_equipment',
      productLabel: 'Collection Target Unit',
      tags: ['collection unit', 'turnover', 'jewellery', 'rcma', 'target']
    },
    {
      id: 'va-13',
      title: 'Angry Frog Mosquito Repellent Monthly Income Scheme',
      url: '/images/AngryFrogncomeScheme.jpg',
      sector: 'fmcg',
      productSub: 'mosquito',
      productLabel: 'Angry Frog Repellent',
      tags: ['angry frog', 'mosquito', 'repellent', 'citronella', 'income scheme', 'fmcg']
    },
    {
      id: 'va-14',
      title: 'Anti Mosquito Instant Kill Vaporizer & Citronella Agarbatti',
      url: '/images/AntiMosquitonstantKill.jpg',
      sector: 'fmcg',
      productSub: 'mosquito',
      productLabel: 'Mosquito Vaporizer',
      tags: ['instant kill', 'vaporizer', 'citronella', 'agarbatti', 'mosquito', 'fmcg']
    },
    {
      id: 'va-15',
      title: 'Surya Maxwell Herbal Incense Catalogue',
      url: '/images/SuryaMaxwellIncense.jpg',
      sector: 'fmcg',
      productSub: 'mosquito',
      productLabel: 'Maxwell Herbal Incense',
      tags: ['surya maxwell', 'incense', 'dhoop', 'mosquito', 'fmcg', 'herbal']
    },
    {
      id: 'va-16',
      title: 'Maxwell Agarbatti Stock & Wholesale Packaging',
      url: '/images/AgarbattiStock.jpg',
      sector: 'fmcg',
      productSub: 'mosquito',
      productLabel: 'Maxwell Agarbatti Stock',
      tags: ['maxwell', 'agarbatti', 'stock', 'wholesale', 'mosquito', 'fmcg']
    },
    {
      id: 'va-17',
      title: 'Maxwell Magic Sale Scheme & Buy 2 Get 1 Free',
      url: '/images/MaxwellMagicSaleScheme.jpg',
      sector: 'fmcg',
      productSub: 'mosquito',
      productLabel: 'Maxwell Magic Scheme',
      tags: ['magic sale', 'maxwell', 'buy 2 get 1', 'mosquito', 'scheme', 'fmcg']
    },
    {
      id: 'va-18',
      title: 'Munmun Soan Papdi Pure Ghee Flaky Sweets',
      url: '/images/MunmunSoanPapdi.jpg',
      sector: 'fmcg',
      productSub: 'soan_papdi',
      productLabel: 'Soan Papdi & Sweets',
      tags: ['munmun', 'soan papdi', 'sweets', 'pure ghee', 'pistachio', 'fmcg']
    },
    {
      id: 'va-19',
      title: "India's No.1 Jewellery Stylo Monopoly Scheme Poster",
      url: '/images/IndiasNo1JewelleryStyloScheme.jpg',
      sector: 'jewellery',
      productSub: 'jewellery_scheme',
      productLabel: 'Jewellery Stylo Scheme',
      tags: ['jewellery', 'stylo', 'monopoly', 'gold', 'diamond', 'showroom']
    },
    {
      id: 'va-20',
      title: '6 Years Banking Return Scheme with Guaranteed Interest',
      url: '/images/6YearsBankingReturnwithInterest.jpg',
      sector: 'jewellery',
      productSub: 'jewellery_scheme',
      productLabel: '6-Year Banking Scheme',
      tags: ['banking return', '6 years', 'interest', 'jewellery', 'gold']
    },
    {
      id: 'va-21',
      title: 'Project 9 – City King Monopoly & Future Growth Statistics',
      url: '/images/Project9FutureStatisticsCityKingMonopoly.jpg',
      sector: 'jewellery',
      productSub: 'jewellery_scheme',
      productLabel: 'City King Monopoly',
      tags: ['project 9', 'city king', 'monopoly', 'statistics', 'jewellery']
    },
    {
      id: 'va-22',
      title: 'Corner to Corner 100% Business Oriented Turnover',
      url: '/images/CornertoCorner100PercentBusinessOrientedTurnover.jpg',
      sector: 'jewellery',
      productSub: 'jewellery_scheme',
      productLabel: '100% Turnover Model',
      tags: ['corner to corner', '100% turnover', 'business oriented', 'jewellery']
    },
    {
      id: 'va-23',
      title: 'Project 6 – Concept Showroom & Expense Optimization',
      url: '/images/Project6ExpenseUnitAndNewConceptShowroom.jpg',
      sector: 'jewellery',
      productSub: 'jewellery_scheme',
      productLabel: 'Concept Showroom',
      tags: ['project 6', 'showroom concept', 'decor', 'jewellery', 'expense']
    },
    {
      id: 'va-24',
      title: 'Modular Kitchen Work – High Gloss Acrylic',
      url: '/images/ModularKitchenWork.jpg',
      sector: 'interior',
      productSub: 'modular_kitchen',
      productLabel: 'Modular Kitchen',
      tags: ['modular kitchen', 'acrylic', 'interior', 'kitchen chimney', 'quartz']
    },
    {
      id: 'va-25',
      title: 'Luxury Living Concept – Teak Wood & Ambient Ceilings',
      url: '/images/LuxuryLivingConcept.jpg',
      sector: 'interior',
      productSub: 'luxury_living',
      productLabel: 'Luxury Living',
      tags: ['luxury living', 'ceiling', 'marble', 'teak wood', 'interior']
    },
    {
      id: 'va-26',
      title: 'Living & TV Wall Panel Display Unit Sample',
      url: '/images/LivingAndDisplayUnitSample.jpg',
      sector: 'interior',
      productSub: 'luxury_living',
      productLabel: 'TV & Display Unit',
      tags: ['display unit', 'tv panel', 'led storage', 'interior', 'living room']
    },
    {
      id: 'va-27',
      title: 'The Compage Interior Branding & Corporate Reception Desk',
      url: '/images/TheCompageInteriorBranding.jpg',
      sector: 'interior',
      productSub: 'corporate_branding',
      productLabel: 'Corporate & Mall Setup',
      tags: ['the compage', 'interior branding', 'corporate desk', 'reception', 'mall']
    }
  ];

  // Combine custom photos from store if uploaded
  const customPhotos = (mediaItems?.filter((m: any) => m.type === 'photo') || []).map((m: any) => ({
    id: m.id || `custom-${Math.random()}`,
    title: m.title || 'Custom Media Asset',
    url: m.url,
    sector: m.sector || 'fmcg',
    productSub: m.productSub || 'all_sub',
    productLabel: m.productLabel || 'Custom Upload',
    tags: Array.isArray(m.tags) ? m.tags : ['custom', m.title || 'photo']
  }));

  const allVisuals = [...visualAssets, ...customPhotos];

  // Audio Campaigns
  const audioCampaigns = [
    {
      id: 'ac-1',
      title: 'Angry Frog Mosquito Repellent – Full Jingle Track',
      desc: 'Long-form promotional audio campaign (Bengali / Hindi mix) for Angry Frog Citronella Agarbatti & Vaporizer.',
      url: '/assets/audio/Angryfrogaudio13.7.26.mp3',
      fallbackUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      sector: 'fmcg',
      productSub: 'mosquito',
      productLabel: 'Angry Frog Jingle',
      tags: ['angry frog', 'mosquito', 'repellent', 'jingle', 'audio', 'fmcg']
    },
    {
      id: 'ac-2',
      title: 'Maxwell Herbal Mosquito Dhup & Agarbatti Spot',
      desc: 'Retail audio advertisement spot highlighting herbal mosquito incense and Buy-1-Get-1 free offers.',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
      fallbackUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
      sector: 'fmcg',
      productSub: 'mosquito',
      productLabel: 'Maxwell Audio Spot',
      tags: ['maxwell', 'herbal dhup', 'agarbatti', 'jingle', 'audio', 'fmcg']
    },
    {
      id: 'ac-3',
      title: 'Encounter Mosquito Incense Quick Promo Spot',
      desc: 'Short energetic audio promo with Buy 2 Get 1 free promotional announcement.',
      url: '/assets/audio/Encounter mosquito incense .mp3',
      fallbackUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
      sector: 'fmcg',
      productSub: 'mosquito',
      productLabel: 'Encounter Incense Spot',
      tags: ['encounter', 'mosquito', 'incense', 'audio', 'promo', 'fmcg']
    }
  ];

  const customAudios = (mediaItems?.filter((m: any) => m.type === 'audio') || []).map((ca: any) => ({
    id: ca.id,
    title: ca.title || 'Custom Audio Spot',
    desc: ca.desc || 'Uploaded audio campaign track.',
    url: ca.url,
    fallbackUrl: ca.url,
    sector: ca.sector || 'fmcg',
    productSub: ca.productSub || 'all_sub',
    productLabel: ca.productLabel || 'Custom Audio',
    tags: Array.isArray(ca.tags) ? ca.tags : ['custom', 'audio', ca.title || 'track']
  }));

  const allAudios = [...audioCampaigns, ...customAudios];

  // Video Highlights
  const videoHighlights = [
    {
      id: 'vh-1',
      title: 'Brand Vision & Corporate Headquarters Overview',
      desc: 'Official corporate brand vision film showcasing multi-sector operations, infrastructure, and leadership.',
      thumb: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
      url: 'https://videos.pexels.com/video-files/3129957/3129957-uhd_2560_1440_25fps.mp4',
      sector: 'company',
      productSub: 'corporate_branding',
      productLabel: 'Corporate Film',
      tags: ['corporate', 'brand vision', 'office', 'headquarters', 'video']
    },
    {
      id: 'vh-2',
      title: 'Interior Walkthrough – Modular Kitchens & Luxury Living',
      desc: 'Comprehensive walk-through of completed modular kitchen, living space, and reception branding projects.',
      thumb: '/images/ModularKitchenWork.jpg',
      url: 'https://videos.pexels.com/video-files/3773486/3773486-hd_1920_1080_30fps.mp4',
      sector: 'interior',
      productSub: 'modular_kitchen',
      productLabel: 'Interior Walkthrough',
      tags: ['interior', 'modular kitchen', 'luxury living', 'walkthrough', 'video']
    },
    {
      id: 'vh-3',
      title: 'Jewellery Craftsmanship & Outlet Operations',
      desc: 'Master artisan craftsmanship, gold & diamond processing equipment, and stylo scheme retail showrooms.',
      thumb: "/images/IndiasNo1JewelleryStyloScheme.jpg",
      url: 'https://videos.pexels.com/video-files/5532760/5532760-hd_1920_1080_25fps.mp4',
      sector: 'jewellery',
      productSub: 'jewellery_scheme',
      productLabel: 'Jewellery Showroom Film',
      tags: ['jewellery', 'craftsmanship', 'stylo', 'gold', 'showroom', 'video']
    }
  ];

  const customVideos = (mediaItems?.filter((m: any) => m.type === 'video') || []).map((m: any) => ({
    id: m.id,
    title: m.title || 'Custom Video Film',
    desc: m.desc || 'Uploaded video clip.',
    thumb: m.thumb || '/images/BrandPromoterRange.jpg',
    url: m.url,
    sector: m.sector || 'company',
    productSub: m.productSub || 'all_sub',
    productLabel: m.productLabel || 'Custom Video',
    tags: Array.isArray(m.tags) ? m.tags : ['custom', 'video', m.title || 'film']
  }));

  const allVideos = [...videoHighlights, ...customVideos];

  // Credentials & Blueprints
  const credentialAssets = [
    {
      id: 'cred-1',
      title: 'Distributorship & C&F Official Certificate',
      desc: 'Official government registered appointment document template for FMCG regional C&F appointments.',
      url: '/images/DistributorshipCertificate.jpg',
      sector: 'fmcg',
      productSub: 'hawker_scheme',
      productLabel: 'FMCG Certificate',
      tags: ['certificate', 'distributorship', 'c&f', 'credential', 'fmcg']
    },
    {
      id: 'cred-2',
      title: 'Jewellery Stylo City King Monopoly Agreement',
      desc: 'Contractual territorial monopoly blueprint for gold & diamond showroom establishments.',
      url: '/images/IndiasNo1JewelleryStyloScheme.jpg',
      sector: 'jewellery',
      productSub: 'jewellery_scheme',
      productLabel: 'Monopoly Contract',
      tags: ['monopoly', 'contract', 'agreement', 'jewellery', 'city king']
    },
    {
      id: 'cred-3',
      title: 'Corner to Corner Board Accountability Charter',
      desc: 'Net profit guarantee agreement and corporate board governance documentation.',
      url: '/images/CornerToCorner100Percent.jpg',
      sector: 'jewellery',
      productSub: 'jewellery_scheme',
      productLabel: 'Board Governance Charter',
      tags: ['charter', 'board model', 'governance', 'jewellery', 'accountability']
    }
  ];

  const customCredentials = (mediaItems?.filter((m: any) => m.type === 'credential') || []).map((m: any) => ({
    id: m.id || `cred-custom-${Math.random()}`,
    title: m.title || 'Custom Certificate',
    desc: m.desc || 'Uploaded credential document.',
    url: m.url,
    sector: m.sector || 'credentials',
    productSub: m.productSub || 'all_sub',
    productLabel: m.productLabel || 'Official Certificate',
    tags: Array.isArray(m.tags) ? m.tags : ['certificate', 'custom', m.title || 'credential']
  }));

  // Helper matching function for filter criteria
  const isMatch = (item: any) => {
    // 1. Primary Sector / Type Filter
    if (filter === 'fmcg' && item.sector !== 'fmcg') return false;
    if (filter === 'jewellery' && item.sector !== 'jewellery') return false;
    if (filter === 'interior' && item.sector !== 'interior') return false;
    if (filter === 'audio' && !('fallbackUrl' in item)) return false;
    if (filter === 'videos' && !('thumb' in item)) return false;
    if (filter === 'credentials' && !item.id.startsWith('cred')) return false;

    // 2. Product Sub-Filter
    if (productSubFilter !== 'all_sub') {
      if (item.productSub !== productSubFilter) return false;
    }

    // 3. Search Query Text Match
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      const titleMatch = item.title?.toLowerCase().includes(q);
      const descMatch = item.desc?.toLowerCase().includes(q);
      const labelMatch = item.productLabel?.toLowerCase().includes(q);
      const tagsMatch = item.tags?.some((t: string) => t.toLowerCase().includes(q));
      if (!titleMatch && !descMatch && !labelMatch && !tagsMatch) return false;
    }

    return true;
  };

  // Filtered lists
  const filteredVisuals = allVisuals.filter(isMatch);
  const filteredAudios = allAudios.filter(isMatch);
  const filteredVideos = allVideos.filter(isMatch);
  const filteredCredentials = [...credentialAssets, ...customCredentials].filter(isMatch);

  const totalFilteredCount = 
    filteredVisuals.length + 
    filteredAudios.length + 
    filteredVideos.length + 
    filteredCredentials.length;

  const handleRequestMediaKit = () => {
    showToast('Requesting Full Media Kit & Blueprint Credentials...', 'success');
    const topic = searchQuery ? `"${searchQuery}"` : productSubFilter !== 'all_sub' ? productSubFilter : filter;
    const msg = encodeURIComponent(`Hello Sarkar Enterprise, I am interested in your ${topic} products and would like to request the complete Media Kit, Catalog & Blueprint Credentials.`);
    window.open(`https://wa.me/918670783810?text=${msg}`, '_blank');
  };

  return (
    <PageWrapper>
      <section className="section" style={{ paddingTop: '50px', paddingBottom: '80px' }}>
        <div className="container">

          {/* Hero Header */}
          <div className="media-hero-header" style={{ marginBottom: '32px' }}>
            <div className="media-hero-breadcrumb">
              <Link to="/">Home</Link> / Media
            </div>
            <h1 className="media-hero-title">
              Media <span>Catalogue & Gallery</span>
            </h1>
            <p className="media-hero-sub">
              Audio campaigns, product schemes, visual blueprints and video films filterable by product line.
            </p>
          </div>

          {/* 1. Instant Search Input */}
          <div className="mg-search-wrap">
            <Search className="mg-search-icon" size={20} />
            <input 
              type="text"
              className="mg-search-input"
              placeholder="Search media by product (e.g. Chanachur, Mosquito, Stylo, Kitchen, Vaporizer)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="mg-search-clear" onClick={() => setSearchQuery('')} title="Clear search">
                <X size={18} />
              </button>
            )}
          </div>

          {/* 2. Primary Sector & Media Type Filter Bar */}
          <div className="mg-filter-bar">
            <button 
              className={`mg-filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => { setFilter('all'); setProductSubFilter('all_sub'); }}
            >
              <Sparkles size={15} /> All Media
            </button>
            <button 
              className={`mg-filter-btn ${filter === 'fmcg' ? 'active' : ''}`}
              onClick={() => { setFilter('fmcg'); setProductSubFilter('all_sub'); }}
            >
              <ShoppingBag size={15} /> FMCG Products 🛒
            </button>
            <button 
              className={`mg-filter-btn ${filter === 'jewellery' ? 'active' : ''}`}
              onClick={() => { setFilter('jewellery'); setProductSubFilter('all_sub'); }}
            >
              <Award size={15} /> Jewellery Schemes 💎
            </button>
            <button 
              className={`mg-filter-btn ${filter === 'interior' ? 'active' : ''}`}
              onClick={() => { setFilter('interior'); setProductSubFilter('all_sub'); }}
            >
              <Building2 size={15} /> Interior Projects 🏠
            </button>
            <button 
              className={`mg-filter-btn ${filter === 'audio' ? 'active' : ''}`}
              onClick={() => { setFilter('audio'); setProductSubFilter('all_sub'); }}
            >
              <Volume2 size={15} /> Audio Jingles 🎙️
            </button>
            <button 
              className={`mg-filter-btn ${filter === 'videos' ? 'active' : ''}`}
              onClick={() => { setFilter('videos'); setProductSubFilter('all_sub'); }}
            >
              <Film size={15} /> Video Films 🎬
            </button>
            <button 
              className={`mg-filter-btn ${filter === 'credentials' ? 'active' : ''}`}
              onClick={() => { setFilter('credentials'); setProductSubFilter('all_sub'); }}
            >
              <FileText size={15} /> Certificates 📄
            </button>
          </div>

          {/* 3. Secondary Sub-Product Filter Bar */}
          <div className="mg-subfilter-bar">
            <button 
              className={`mg-subfilter-btn ${productSubFilter === 'all_sub' ? 'active' : ''}`}
              onClick={() => setProductSubFilter('all_sub')}
            >
              <Tag size={13} /> All Products
            </button>

            {(filter === 'all' || filter === 'fmcg' || filter === 'audio') && (
              <>
                <button 
                  className={`mg-subfilter-btn ${productSubFilter === 'chanachur' ? 'active' : ''}`}
                  onClick={() => setProductSubFilter('chanachur')}
                >
                  🌶️ Priti-Ji Chanachur
                  <span className="mg-count-badge">
                    {allVisuals.filter(v => v.productSub === 'chanachur').length}
                  </span>
                </button>
                <button 
                  className={`mg-subfilter-btn ${productSubFilter === 'mosquito' ? 'active' : ''}`}
                  onClick={() => setProductSubFilter('mosquito')}
                >
                  🦟 Mosquito Repellents (Angry Frog / Maxwell)
                  <span className="mg-count-badge">
                    {allVisuals.filter(v => v.productSub === 'mosquito').length + allAudios.filter(a => a.productSub === 'mosquito').length}
                  </span>
                </button>
                <button 
                  className={`mg-subfilter-btn ${productSubFilter === 'soan_papdi' ? 'active' : ''}`}
                  onClick={() => setProductSubFilter('soan_papdi')}
                >
                  🍬 Soan Papdi & Sweets
                  <span className="mg-count-badge">
                    {allVisuals.filter(v => v.productSub === 'soan_papdi').length}
                  </span>
                </button>
                <button 
                  className={`mg-subfilter-btn ${productSubFilter === 'hawker_scheme' ? 'active' : ''}`}
                  onClick={() => setProductSubFilter('hawker_scheme')}
                >
                  📜 Hawker & C&F Schemes
                  <span className="mg-count-badge">
                    {allVisuals.filter(v => v.productSub === 'hawker_scheme').length}
                  </span>
                </button>
              </>
            )}

            {(filter === 'all' || filter === 'jewellery') && (
              <>
                <button 
                  className={`mg-subfilter-btn ${productSubFilter === 'jewellery_scheme' ? 'active' : ''}`}
                  onClick={() => setProductSubFilter('jewellery_scheme')}
                >
                  🏆 Jewellery Stylo & Monopoly Schemes
                  <span className="mg-count-badge">
                    {allVisuals.filter(v => v.productSub === 'jewellery_scheme').length}
                  </span>
                </button>
                <button 
                  className={`mg-subfilter-btn ${productSubFilter === 'jewellery_equipment' ? 'active' : ''}`}
                  onClick={() => setProductSubFilter('jewellery_equipment')}
                >
                  ⚙️ Gold Processing & Recycling
                  <span className="mg-count-badge">
                    {allVisuals.filter(v => v.productSub === 'jewellery_equipment').length}
                  </span>
                </button>
              </>
            )}

            {(filter === 'all' || filter === 'interior') && (
              <>
                <button 
                  className={`mg-subfilter-btn ${productSubFilter === 'modular_kitchen' ? 'active' : ''}`}
                  onClick={() => setProductSubFilter('modular_kitchen')}
                >
                  🍳 Modular Kitchens
                  <span className="mg-count-badge">
                    {allVisuals.filter(v => v.productSub === 'modular_kitchen').length}
                  </span>
                </button>
                <button 
                  className={`mg-subfilter-btn ${productSubFilter === 'luxury_living' ? 'active' : ''}`}
                  onClick={() => setProductSubFilter('luxury_living')}
                >
                  🛋️ Luxury Living Units
                  <span className="mg-count-badge">
                    {allVisuals.filter(v => v.productSub === 'luxury_living').length}
                  </span>
                </button>
                <button 
                  className={`mg-subfilter-btn ${productSubFilter === 'corporate_branding' ? 'active' : ''}`}
                  onClick={() => setProductSubFilter('corporate_branding')}
                >
                  🏢 Commercial & Mall Setup
                  <span className="mg-count-badge">
                    {allVisuals.filter(v => v.productSub === 'corporate_branding').length}
                  </span>
                </button>
              </>
            )}
          </div>

          {/* Search Result Counter Summary */}
          {(searchQuery || productSubFilter !== 'all_sub' || filter !== 'all') && (
            <div style={{ textAlign: 'center', color: 'var(--gold)', fontSize: '0.9rem', marginBottom: '30px', fontWeight: 600 }}>
              Showing {totalFilteredCount} matching media items {searchQuery ? `for "${searchQuery}"` : ''}
            </div>
          )}

          {/* No Match State */}
          {totalFilteredCount === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 20px', background: 'rgba(255,255,255,0.02)', borderRadius: '20px', margin: '40px 0' }}>
              <Filter size={40} style={{ color: 'var(--gold)', marginBottom: '16px', opacity: 0.7 }} />
              <h3 style={{ color: '#ffffff', fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', marginBottom: '8px' }}>
                No Media Found Matching Your Filter
              </h3>
              <p style={{ color: '#a3a3a3', fontSize: '0.92rem', marginBottom: '20px' }}>
                Try clearing your search or switching product categories.
              </p>
              <button 
                className="btn btn-outline"
                onClick={() => { setFilter('all'); setProductSubFilter('all_sub'); setSearchQuery(''); }}
              >
                Reset All Filters
              </button>
            </div>
          )}

          {/* SECTION 1: AUDIO CAMPAIGNS */}
          {filteredAudios.length > 0 && (filter === 'all' || filter === 'audio' || filter === 'fmcg') && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              style={{ marginBottom: '80px' }}
            >
              <div className="mg-section-badge">AUDIO CAMPAIGNS & PROMOTIONAL SPOTS</div>
              <h2 className="mg-section-title">Product Jingle Tracks</h2>
              <p className="mg-section-sub">
                Promotional radio, street speaker, and retail store audio tracks for FMCG & Mosquito repellent ranges.
              </p>

              <div className="audio-campaigns-grid">
                {filteredAudios.map((ac) => (
                  <div className="audio-card" key={ac.id}>
                    <div className="audio-card-badge">
                      <Volume2 size={13} /> {ac.productLabel}
                    </div>
                    <h3 className="audio-card-title">{ac.title}</h3>
                    <p className="audio-card-desc">{ac.desc}</p>

                    <div className="audio-player-wrap">
                      <audio 
                        controls 
                        preload="metadata"
                        onError={(e) => {
                          const target = e.target as HTMLAudioElement;
                          if (target.src !== ac.fallbackUrl) {
                            target.src = ac.fallbackUrl;
                          }
                        }}
                      >
                        <source src={ac.url} type="audio/mpeg" />
                        <source src={ac.fallbackUrl} type="audio/mpeg" />
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* SECTION 2: VISUAL ASSETS */}
          {filteredVisuals.length > 0 && (filter === 'all' || filter === 'fmcg' || filter === 'jewellery' || filter === 'interior') && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              style={{ marginBottom: '80px' }}
            >
              <div className="mg-section-badge">CAMPAIGN & PRODUCT VISUALS</div>
              <h2 className="mg-section-title">Product Schematics & Catalog Visuals</h2>

              <div className="visual-assets-grid">
                {filteredVisuals.map((v, index) => (
                  <div 
                    className="visual-asset-card" 
                    key={v.id || index}
                    onClick={() => openZoomGallery(filteredVisuals.map(vis => ({ url: getEncodedUrl(vis.url), title: vis.title })), index, v.title)}
                    title="Click to view full image in lightbox viewer"
                  >
                    <div className="visual-asset-sector-tag">
                      {v.productLabel}
                    </div>
                    <img 
                      src={getEncodedUrl(v.url)} 
                      alt={v.title} 
                      className="visual-asset-img"
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = getFallbackSvg(v.title);
                      }}
                    />
                    <div className="visual-asset-zoom-tag">
                      <ZoomIn size={16} />
                    </div>
                    <div className="visual-asset-overlay">
                      <div className="visual-asset-title">{v.title}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* SECTION 3: VIDEO HIGHLIGHTS */}
          {filteredVideos.length > 0 && (filter === 'all' || filter === 'videos' || filter === 'fmcg' || filter === 'jewellery' || filter === 'interior') && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              style={{ marginBottom: '80px' }}
            >
              <div className="mg-section-badge">VIDEO HIGHLIGHTS</div>
              <h2 className="mg-section-title">Corporate & Craftsmanship Films</h2>

              <div className="video-assets-grid">
                {filteredVideos.map((vid: any) => (
                  <div className="video-asset-card" key={vid.id}>
                    <div 
                      className="video-asset-thumb-wrap"
                      onClick={() => playVideo(vid.url, vid.title)}
                    >
                      <img 
                        src={vid.thumb || "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800"} 
                        alt={vid.title} 
                        className="video-asset-thumb"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800";
                        }}
                      />
                      <div className="video-play-btn-circle">
                        <div className="play-icon-inner">
                          <Play size={24} fill="#000000" style={{ marginLeft: '4px' }} />
                        </div>
                      </div>
                    </div>
                    <div className="video-asset-body">
                      <div style={{ color: 'var(--gold)', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
                        {vid.productLabel}
                      </div>
                      <h3 className="video-asset-title">{vid.title}</h3>
                      <p className="video-asset-desc">{vid.desc}</p>
                      <button 
                        className="btn btn-dark" 
                        style={{ padding: '8px 16px', fontSize: '0.82rem', width: '100%', justifyContent: 'center' }}
                        onClick={() => playVideo(vid.url, vid.title)}
                      >
                        <Play size={14} fill="currentColor" /> Watch Video
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* SECTION 4: CREDENTIALS & CASE STUDIES */}
          {filteredCredentials.length > 0 && (filter === 'all' || filter === 'credentials') && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className="mg-section-badge">CREDENTIALS & OFFICIAL CHARTERS</div>
              
              <div className="credentials-box">
                <h2 className="credentials-title">
                  Official Certificates <span>&</span> Scheme Charters
                </h2>
                <p className="credentials-desc">
                  Downloadable brochures, C&F appointment templates, and territorial monopoly contracts are available for official partners. Contact us to receive the complete Media Kit.
                </p>
                <button 
                  className="request-kit-btn"
                  onClick={handleRequestMediaKit}
                >
                  REQUEST FULL MEDIA KIT →
                </button>
              </div>
            </motion.div>
          )}

        </div>
      </section>
    </PageWrapper>
  );
};

export const Faq = () => {
  const [openId, setOpenId] = useState<number | null>(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Services & Scope', 'Pricing & Fees', 'Operations & Delivery'];

  const faqs = [
    {
      id: 1,
      num: '01',
      category: 'Services & Scope',
      question: "1. What is the primary role of Sarkar Enterprise?",
      answer: "We are an end-to-end product promoter and business establishment partner. We take complete responsibility to establish entrepreneurial and manufacturing brands and scale them to crore-to-crore turnovers with scientific precision and authentic profitable accountability.",
      highlights: ["end-to-end product promoter", "crore-to-crore turnovers", "profitable accountability"]
    },
    {
      id: 2,
      num: '02',
      category: 'Services & Scope',
      question: "2. What sectors do you specialize in?",
      answer: "FMCG (Chanachur, Soan Papdi, Mosquito Repellent Sticks/Vaporizer, Detergent Powder), Jewellery (Gold Ornaments outlets & competitive schemes), and Corporate/Domestic Interiors (including Kitchen Chimney and Shopping Mall establishment).",
      highlights: ["FMCG", "Jewellery", "Interiors"]
    },
    {
      id: 3,
      num: '03',
      category: 'Pricing & Fees',
      question: "3. What is the consultancy fee?",
      answer: "Phone / Mobile consultations are completely FREE. Physical visit for 24 hours (single visit) is charged at ₹12,000/-.",
      highlights: ["FREE", "₹12,000/-"]
    },
    {
      id: 4,
      num: '04',
      category: 'Pricing & Fees',
      question: "4. Do you facilitate finance?",
      answer: "Yes. We provide guidance and facilitation for finance facilities up to ₹10 Crores depending on the project and eligibility.",
      highlights: ["up to ₹10 Crores"]
    },
    {
      id: 5,
      num: '05',
      category: 'Pricing & Fees',
      question: "5. What is the standard contract duration?",
      answer: "Our baseline business promotion agreement is for 5 years.",
      highlights: ["5 years"]
    },
    {
      id: 6,
      num: '06',
      category: 'Pricing & Fees',
      question: "6. How do you charge for your promotional services?",
      answer: "We charge 2% of the company face value business turnover per annum under the 5-year agreement.",
      highlights: ["2% of business turnover"]
    },
    {
      id: 7,
      num: '07',
      category: 'Operations & Delivery',
      question: "7. Do you handle online delivery tie-ups?",
      answer: "Yes. We manage integrations with platforms such as Swiggy, Zomato, BigBasket, Blinkit / ApnaMart and other grocery / quick-commerce partners (some under processing).",
      highlights: ["Swiggy", "Zomato", "BigBasket", "Blinkit"]
    },
    {
      id: 8,
      num: '08',
      category: 'Operations & Delivery',
      question: "8. What does your grievance redressal cover?",
      answer: "We maintain a dedicated system for dealer / distributor feedback, compensation policy, rapid WhatsApp resolution and a special mail ID for grievance handling.",
      highlights: ["WhatsApp resolution", "compensation policy"]
    },
    {
      id: 9,
      num: '09',
      category: 'Services & Scope',
      question: "9. How do you approach digital marketing?",
      answer: "We blend 20+ years of offline concept marketing expertise with cutting-edge digital software, digital marketing schemes and competitive digital marketing theses for maximum market impact.",
      highlights: ["20+ years expertise", "digital marketing theses"]
    },
    {
      id: 10,
      num: '10',
      category: 'Operations & Delivery',
      question: "10. Where are you located / How can I reach the BDM?",
      answer: "Head operations from Bhiringi More, Benachity, Durgapur – 713213, West Bengal. Contact: +91 86 707 838 10 | WhatsApp available | Email: kishore8670@gmail.com. Business Development Manager location details are shared during initial discussion.",
      highlights: ["Durgapur, West Bengal", "+91 86 707 838 10"]
    }
  ];

  const filteredFaqs = faqs.filter(f => {
    const matchesCategory = activeCategory === 'All' || f.category === activeCategory;
    const matchesSearch = f.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          f.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <PageWrapper>
      {/* FAQ Hero */}
      <section className="faq-hero">
        <div className="container">
          <motion.div 
            className="faq-hero-badge"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            ✨ GOT QUESTIONS? WE HAVE ANSWERS
          </motion.div>
          <div className="faq-breadcrumb">
            <Link to="/">Home</Link> / FAQ
          </div>
          <h1 className="faq-hero-title">
            Frequently Asked <span className="text-gold">Questions</span>
          </h1>
          <p className="faq-hero-sub">
            Everything you need to know about our business promotion, consultancy fees, and brand growth strategies.
          </p>

          {/* Search Bar */}
          <motion.div 
            className="faq-search-wrapper"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="faq-search-icon">🔍</span>
            <input 
              type="text" 
              className="faq-search-input"
              placeholder="Search questions (e.g. fees, FMCG, finance, contact)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="faq-search-clear" onClick={() => setSearchQuery('')}>×</button>
            )}
          </motion.div>

          {/* Filter Chips */}
          <motion.div 
            className="faq-categories"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                className={`faq-cat-chip ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ List */}
      <section style={{ paddingBottom: '80px' }}>
        <div className="container faq-container">
          {filteredFaqs.length === 0 ? (
            <motion.div 
              className="faq-empty-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h3>No matching questions found</h3>
              <p>Try searching with different keywords or browse all categories.</p>
              <button className="btn-reset-search" onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}>
                Reset Search
              </button>
            </motion.div>
          ) : (
            filteredFaqs.map((f, index) => {
              const isOpen = openId === f.id;
              return (
                <motion.div 
                  key={f.id} 
                  className={`faq-card ${isOpen ? 'is-open' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: index * 0.04 }}
                >
                  <button 
                    className={`faq-question-btn ${isOpen ? 'open' : ''}`}
                    onClick={() => setOpenId(isOpen ? null : f.id)}
                  >
                    <div className="faq-q-left">
                      <span className="faq-num-pill">{f.num}</span>
                      <span className="faq-question-text">{f.question}</span>
                    </div>
                    <motion.div 
                      className={`faq-toggle-circle ${isOpen ? 'open' : ''}`}
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {isOpen ? '−' : '+'}
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div className="faq-answer-body">
                          <p className="faq-answer-text">{f.answer}</p>
                          {f.highlights && f.highlights.length > 0 && (
                            <div className="faq-highlights-pills">
                              <span className="faq-hl-label">Key Highlights:</span>
                              {f.highlights.map((hl, i) => (
                                <span key={i} className="faq-hl-tag">{hl}</span>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })
          )}

          {/* Contact Support CTA Box */}
          <motion.div 
            className="faq-cta-box"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="faq-cta-content">
              <h3>Still Have Questions?</h3>
              <p>Get in touch with Kishore Sarkar, MBA or our Business Development Manager for instant consultation.</p>
            </div>
            <div className="faq-cta-btns">
              <a href="tel:+918670783810" className="faq-cta-btn phone">
                📞 CALL +91 86707 83810
              </a>
              <a 
                href="https://wa.me/918670783810?text=Hello%20Sarkar%20Enterprise%2C%20I%20have%20a%20query." 
                target="_blank" 
                rel="noreferrer"
                className="faq-cta-btn whatsapp"
              >
                💬 WHATSAPP NOW
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
};
