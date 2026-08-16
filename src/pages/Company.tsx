import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { PageWrapper } from '../components/PageWrapper';
import { useStore } from '../store';
import { useLanguage } from '../lib/LanguageContext';
import { 
  Volume2, Play, ZoomIn, FileText, Download, Sparkles, MessageCircle, ArrowRight, Music, Image as ImageIcon, Film,
  Briefcase, MapPin, Clock, Award, TrendingUp, CheckCircle2, UploadCloud, ShieldCheck, ChevronDown, UserCheck, 
  DollarSign, Building2, ChevronRight, PhoneCall, X, Send, Users, Check, HelpCircle, Search, ShoppingBag, Tag, Filter
} from 'lucide-react';

export const Careers = () => {
  const { jobs, addApplication, showToast } = useStore();
  const { t } = useLanguage();
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
            <Link to="/" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>{t('breadcrumbHome')}</Link>
            <span style={{ margin: '0 8px', color: 'rgba(255,215,0,0.5)' }}>/</span>
            <span style={{ color: '#ffd700', fontWeight: 600 }}>{t('breadcrumbCareers')}</span>
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
              {t('careersTitleLine1')} <span style={{ color: '#ffd700', textShadow: '0 0 25px rgba(255,215,0,0.25)' }}>{t('careersTitleLine2')}</span>
            </h1>
            <p style={{ 
              color: 'rgba(255,255,255,0.75)', 
              fontSize: 'clamp(1rem, 2vw, 1.2rem)', 
              maxWidth: '780px', 
              margin: '0 auto',
              lineHeight: 1.6
            }}>
              {t('careersDesc')}
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
                {t('careersOpeningsTitle')}
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem', maxWidth: '700px', margin: '0 auto' }}>
                {t('careersOpeningsSub')}
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
                          {j.type || t('fullTime')}
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
                            {t('details')}
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
                            {t('careersApplyNow')}
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
                {t('joinUs')}
              </div>
              <h2 style={{ 
                fontFamily: "'Playfair Display', serif", 
                color: '#ffffff', 
                fontSize: '2.5rem', 
                fontWeight: 700 
              }}>
                {t('submitCVTitle')}
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
                    {t('fullNameLabel')} <span style={{ color: '#ffd700' }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder={t('careersNamePlaceholder')}
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
                    {t('emailLabel')} <span style={{ color: '#ffd700' }}>*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder={t('careersEmailPlaceholder')}
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
                    {t('phoneLabel')} <span style={{ color: '#ffd700' }}>*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder={t('careersPhonePlaceholder')}
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
                    {t('positionLabel')} <span style={{ color: '#ffd700' }}>*</span>
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
                      <option value="" style={{ background: '#12151c' }}>{t('selectPosition')}</option>
                      {jobs.map((j: any) => (
                        <option key={j.id || j.title} value={j.title} style={{ background: '#12151c' }}>
                          {j.title} ({j.type || t('fullTime')})
                        </option>
                      ))}
                      <option value="General Application" style={{ background: '#12151c' }}>{t('generalApplication')}</option>
                    </select>
                    <ChevronDown size={18} color="rgba(255,255,255,0.5)" style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                  </div>
                </div>

                {/* Upload CV Dropzone matching Screenshot 3 */}
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', color: 'rgba(255,255,255,0.85)', fontSize: '0.9rem', fontWeight: 500, marginBottom: '8px' }}>
                    {t('uploadCVLabel')} <span style={{ color: '#ffd700' }}>*</span>
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
                      {t('chooseFile')}
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
                          {t('noFileChosen')}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Message (optional) */}
                <div style={{ marginBottom: '28px' }}>
                  <label style={{ display: 'block', color: 'rgba(255,255,255,0.85)', fontSize: '0.9rem', fontWeight: 500, marginBottom: '8px' }}>
                    {t('messageOptionalLabel')}
                  </label>
                  <textarea
                    name="cover"
                    rows={4}
                    placeholder={t('tellUsExperience')}
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
                    t('careersSubmittingBtn')
                  ) : (
                    <>
                      {t('careersSubmitBtn')} <ArrowRight size={18} />
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
                {t('guidelinesEyebrow')}
              </div>
              <h2 style={{ 
                fontFamily: "'Playfair Display', serif", 
                color: '#ffffff', 
                fontSize: '2.2rem', 
                fontWeight: 700 
              }}>
                {t('termsHeading')}
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
                <li>{t('termBullet1')}</li>
                <li>{t('termBullet2')}</li>
                <li>{t('termBullet3')}</li>
                <li>{t('termBullet4')}</li>
                <li>{t('termBullet5')}</li>
                <li>{t('termBullet6')}</li>
                <li>{t('termBullet7')}</li>
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
                {t('termsAgreeNote')}
              </p>
            </motion.div>
          </div>

          {/* Culture & Employee Benefits Section */}
          <div style={{ marginTop: '70px', marginBottom: '50px' }}>
            <div style={{ textAlign: 'center', marginBottom: '36px' }}>
              <div style={{ color: '#ffd700', fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '8px' }}>
                {t('perksEyebrow')}
              </div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", color: '#ffffff', fontSize: '2.2rem', fontWeight: 700 }}>
                {t('whyJoinHeading')}
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
              <div style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '24px' }}>
                <div style={{ color: '#ffd700', marginBottom: '12px' }}><TrendingUp size={28} /></div>
                <h4 style={{ color: '#ffffff', fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px' }}>{t('perk1Title')}</h4>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.88rem', lineHeight: 1.5 }}>
                  {t('perk1Desc')}
                </p>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '24px' }}>
                <div style={{ color: '#ffd700', marginBottom: '12px' }}><DollarSign size={28} /></div>
                <h4 style={{ color: '#ffffff', fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px' }}>{t('perk2Title')}</h4>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.88rem', lineHeight: 1.5 }}>
                  {t('perk2Desc')}
                </p>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '24px' }}>
                <div style={{ color: '#ffd700', marginBottom: '12px' }}><ShieldCheck size={28} /></div>
                <h4 style={{ color: '#ffffff', fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px' }}>{t('perk3Title')}</h4>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.88rem', lineHeight: 1.5 }}>
                  {t('perk3Desc')}
                </p>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '24px' }}>
                <div style={{ color: '#ffd700', marginBottom: '12px' }}><Award size={28} /></div>
                <h4 style={{ color: '#ffffff', fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px' }}>{t('perk4Title')}</h4>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.88rem', lineHeight: 1.5 }}>
                  {t('perk4Desc')}
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
                {t('hrQuestionHeading')}
              </h4>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.9rem', margin: 0 }}>
                {t('hrQuestionSub')}
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
              <MessageCircle size={18} /> {t('chatWhatsappBtn')}
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
                {t('positionDetails')}
              </div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", color: '#ffffff', fontSize: '1.8rem', fontWeight: 700, marginBottom: '16px' }}>
                {activeModalJob.title}
              </h2>

              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.98rem', lineHeight: 1.6, marginBottom: '20px' }}>
                {activeModalJob.desc}
              </p>

              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '16px', marginBottom: '24px' }}>
                <h4 style={{ color: '#ffd700', margin: '0 0 10px 0', fontSize: '0.95rem', fontWeight: 700 }}>{t('keySpecs')}</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.88rem', color: 'rgba(255,255,255,0.8)' }}>
                  <div>🏢 <strong>{t('deptLabel')}</strong> {activeModalJob.dept || 'Sales & Operations'}</div>
                  <div>📍 <strong>{t('locLabel')}</strong> {activeModalJob.loc || 'Bengal & Region'}</div>
                  <div>⏱ <strong>{t('empLabel')}</strong> {activeModalJob.type || t('fullTime')}</div>
                  <div>📈 <strong>{t('expLabel')}</strong> {activeModalJob.exp || 'Freshers / Exp'}</div>
                </div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 700, marginBottom: '10px' }}>{t('roleGuidelinesHeader')}</h4>
                <ul style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.9rem', lineHeight: 1.6, paddingLeft: '18px', margin: 0 }}>
                  <li>{t('roleReq1')}</li>
                  <li>{t('roleReq2')}</li>
                  <li>{t('roleReq3')}</li>
                  <li>{t('roleReq4')}</li>
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
                  {t('btnClose')}
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
                  {t('careersApplyNow')}
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
  const { t } = useLanguage();
  
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

  // Dynamically map all media assets directly from Admin Panel / Store State (mediaItems)
  const allVisuals = (mediaItems?.filter((m: any) => m.type === 'photo' || m.type === 'image') || []).map((m: any) => ({
    id: m.id || `va-${Math.random()}`,
    title: m.title || 'Media Asset',
    url: m.url,
    sector: m.sector || 'fmcg',
    productSub: m.productSub || m.subCategory || 'all_sub',
    productLabel: m.productLabel || 'Media Asset',
    tags: Array.isArray(m.tags) ? m.tags : [m.title || 'photo']
  }));

  const allAudios = (mediaItems?.filter((m: any) => m.type === 'audio') || []).map((m: any) => ({
    id: m.id || `ac-${Math.random()}`,
    title: m.title || 'Audio Campaign Track',
    desc: m.desc || 'Audio spot',
    url: m.url,
    fallbackUrl: m.url,
    sector: m.sector || 'fmcg',
    productSub: m.productSub || m.subCategory || 'all_sub',
    productLabel: m.productLabel || 'Audio Spot',
    tags: Array.isArray(m.tags) ? m.tags : [m.title || 'audio']
  }));

  const allVideos = (mediaItems?.filter((m: any) => m.type === 'video') || []).map((m: any) => ({
    id: m.id || `vh-${Math.random()}`,
    title: m.title || 'Video Commercial',
    desc: m.desc || 'Video clip',
    thumb: m.thumb || m.url,
    url: m.url,
    sector: m.sector || 'company',
    productSub: m.productSub || m.subCategory || 'all_sub',
    productLabel: m.productLabel || 'Corporate Film',
    tags: Array.isArray(m.tags) ? m.tags : [m.title || 'video']
  }));

  const allCredentials = (mediaItems?.filter((m: any) => m.type === 'credential') || []).map((m: any) => ({
    id: m.id || `cred-${Math.random()}`,
    title: m.title || 'Official Certificate Document',
    desc: m.desc || 'Official credential document',
    url: m.url,
    sector: m.sector || 'credentials',
    productSub: m.productSub || m.subCategory || 'all_sub',
    productLabel: m.productLabel || 'Certificate',
    tags: Array.isArray(m.tags) ? m.tags : [m.title || 'credential']
  }));

  // Helper matching function for filter criteria
  const isMatch = (item: any) => {
    // 1. Primary Sector / Type Filter
    if (filter === 'fmcg' && item.sector !== 'fmcg') return false;
    if (filter === 'jewellery' && item.sector !== 'jewellery') return false;
    if (filter === 'interior' && item.sector !== 'interior') return false;

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
  const filteredCredentials = allCredentials.filter(isMatch);

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
              <Link to="/">{t('breadcrumbHome')}</Link> / {t('mediaBreadcrumb')}
            </div>
            <h1 className="media-hero-title">
              {t('mediaHeroTitle1')} <span>{t('mediaHeroTitle2')}</span>
            </h1>
            <p className="media-hero-sub">
              {t('mediaHeroSub')}
            </p>
          </div>

          {/* 1. Instant Search Input */}
          <div className="mg-search-wrap">
            <Search className="mg-search-icon" size={20} />
            <input 
              type="text"
              className="mg-search-input"
              placeholder={t('mediaSearchPlaceholder')}
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
              <Sparkles size={15} /> {t('mediaFilterAll')}
            </button>
            <button 
              className={`mg-filter-btn ${filter === 'fmcg' ? 'active' : ''}`}
              onClick={() => { setFilter('fmcg'); setProductSubFilter('all_sub'); }}
            >
              <ShoppingBag size={15} /> {t('mediaFilterFmcg')}
            </button>
            <button 
              className={`mg-filter-btn ${filter === 'jewellery' ? 'active' : ''}`}
              onClick={() => { setFilter('jewellery'); setProductSubFilter('all_sub'); }}
            >
              <Award size={15} /> {t('mediaFilterJewellery')}
            </button>
            <button 
              className={`mg-filter-btn ${filter === 'interior' ? 'active' : ''}`}
              onClick={() => { setFilter('interior'); setProductSubFilter('all_sub'); }}
            >
              <Building2 size={15} /> {t('mediaFilterInterior')}
            </button>
            <button 
              className={`mg-filter-btn ${filter === 'audio' ? 'active' : ''}`}
              onClick={() => { setFilter('audio'); setProductSubFilter('all_sub'); }}
            >
              <Volume2 size={15} /> {t('mediaFilterAudio')}
            </button>
            <button 
              className={`mg-filter-btn ${filter === 'videos' ? 'active' : ''}`}
              onClick={() => { setFilter('videos'); setProductSubFilter('all_sub'); }}
            >
              <Film size={15} /> {t('mediaFilterVideos')}
            </button>
            <button 
              className={`mg-filter-btn ${filter === 'credentials' ? 'active' : ''}`}
              onClick={() => { setFilter('credentials'); setProductSubFilter('all_sub'); }}
            >
              <FileText size={15} /> {t('mediaFilterCertificates')}
            </button>
          </div>

          {/* 3. Secondary Sub-Product Filter Bar */}
          <div className="mg-subfilter-bar">
            <button 
              className={`mg-subfilter-btn ${productSubFilter === 'all_sub' ? 'active' : ''}`}
              onClick={() => setProductSubFilter('all_sub')}
            >
              <Tag size={13} /> {t('mediaSubfilterAll')}
            </button>

            {(filter === 'all' || filter === 'fmcg' || filter === 'audio') && (
              <>
                <button 
                  className={`mg-subfilter-btn ${productSubFilter === 'chanachur' ? 'active' : ''}`}
                  onClick={() => setProductSubFilter('chanachur')}
                >
                  🌶️ {t('mediaSubfilterChanachur')}
                  <span className="mg-count-badge">
                    {allVisuals.filter(v => v.productSub === 'chanachur').length}
                  </span>
                </button>
                <button 
                  className={`mg-subfilter-btn ${productSubFilter === 'mosquito' ? 'active' : ''}`}
                  onClick={() => setProductSubFilter('mosquito')}
                >
                  🦟 {t('mediaSubfilterMosquito')}
                  <span className="mg-count-badge">
                    {allVisuals.filter(v => v.productSub === 'mosquito').length + allAudios.filter(a => a.productSub === 'mosquito').length}
                  </span>
                </button>
                <button 
                  className={`mg-subfilter-btn ${productSubFilter === 'soan_papdi' ? 'active' : ''}`}
                  onClick={() => setProductSubFilter('soan_papdi')}
                >
                  🍬 {t('mediaSubfilterSoanPapdi')}
                  <span className="mg-count-badge">
                    {allVisuals.filter(v => v.productSub === 'soan_papdi').length}
                  </span>
                </button>
                <button 
                  className={`mg-subfilter-btn ${productSubFilter === 'hawker_scheme' ? 'active' : ''}`}
                  onClick={() => setProductSubFilter('hawker_scheme')}
                >
                  📜 {t('mediaSubfilterHawker')}
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
                  🏆 {t('mediaSubfilterJewelleryScheme')}
                  <span className="mg-count-badge">
                    {allVisuals.filter(v => v.productSub === 'jewellery_scheme').length}
                  </span>
                </button>
                <button 
                  className={`mg-subfilter-btn ${productSubFilter === 'jewellery_equipment' ? 'active' : ''}`}
                  onClick={() => setProductSubFilter('jewellery_equipment')}
                >
                  ⚙️ {t('mediaSubfilterGoldProcessing')}
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
                  🍳 {t('mediaSubfilterModularKitchens')}
                  <span className="mg-count-badge">
                    {allVisuals.filter(v => v.productSub === 'modular_kitchen').length}
                  </span>
                </button>
                <button 
                  className={`mg-subfilter-btn ${productSubFilter === 'luxury_living' ? 'active' : ''}`}
                  onClick={() => setProductSubFilter('luxury_living')}
                >
                  🛋️ {t('mediaSubfilterLuxuryLiving')}
                  <span className="mg-count-badge">
                    {allVisuals.filter(v => v.productSub === 'luxury_living').length}
                  </span>
                </button>
                <button 
                  className={`mg-subfilter-btn ${productSubFilter === 'corporate_branding' ? 'active' : ''}`}
                  onClick={() => setProductSubFilter('corporate_branding')}
                >
                  🏢 {t('mediaSubfilterCommercialMall')}
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
              {t('mediaShowingCount')} {totalFilteredCount} {t('mediaMatchingItems')} {searchQuery ? `${t('mediaForQuery')} "${searchQuery}"` : ''}
            </div>
          )}

          {/* No Match State */}
          {totalFilteredCount === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 20px', background: 'rgba(255,255,255,0.02)', borderRadius: '20px', margin: '40px 0' }}>
              <Filter size={40} style={{ color: 'var(--gold)', marginBottom: '16px', opacity: 0.7 }} />
              <h3 style={{ color: '#ffffff', fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', marginBottom: '8px' }}>
                {t('mediaNoMatchTitle')}
              </h3>
              <p style={{ color: '#a3a3a3', fontSize: '0.92rem', marginBottom: '20px' }}>
                {t('mediaNoMatchSub')}
              </p>
              <button 
                className="btn btn-outline"
                onClick={() => { setFilter('all'); setProductSubFilter('all_sub'); setSearchQuery(''); }}
              >
                {t('mediaResetFilters')}
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
              <div className="mg-section-badge">{t('mediaAudioBadge')}</div>
              <h2 className="mg-section-title">{t('mediaAudioTitle')}</h2>
              <p className="mg-section-sub">
                {t('mediaAudioSub')}
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
              <div className="mg-section-badge">{t('mediaVisualsBadge')}</div>
              <h2 className="mg-section-title">{t('mediaVisualsTitle')}</h2>

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
              <div className="mg-section-badge">{t('mediaVideosBadge')}</div>
              <h2 className="mg-section-title">{t('mediaVideosTitle')}</h2>

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
                        <Play size={14} fill="currentColor" /> {t('mediaWatchVideo')}
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
              <div className="mg-section-badge">{t('mediaCredentialsBadge')}</div>
              
              <div className="credentials-box">
                <h2 className="credentials-title">
                  {t('mediaCredentialsTitleLine1')} <span>{t('mediaCredentialsTitleLine2')}</span>
                </h2>
                <p className="credentials-desc">
                  {t('mediaCredentialsDesc')}
                </p>
                <button 
                  className="request-kit-btn"
                  onClick={handleRequestMediaKit}
                >
                  {t('mediaRequestKitBtn')}
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
  const { t } = useLanguage();
  const [openId, setOpenId] = useState<number | null>(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategoryKey, setActiveCategoryKey] = useState('All');

  const categories = [
    { key: 'All', label: t('faqCategoryAll') },
    { key: 'Services & Scope', label: t('faqCategoryServices') },
    { key: 'Pricing & Fees', label: t('faqCategoryPricing') },
    { key: 'Operations & Delivery', label: t('faqCategoryOperations') }
  ];

  const faqs = [
    {
      id: 1,
      num: '01',
      categoryKey: 'Services & Scope',
      question: t('faqQ1Question'),
      answer: t('faqQ1Answer'),
      highlights: [t('faqQ1Hl1'), t('faqQ1Hl2'), t('faqQ1Hl3')]
    },
    {
      id: 2,
      num: '02',
      categoryKey: 'Services & Scope',
      question: t('faqQ2Question'),
      answer: t('faqQ2Answer'),
      highlights: [t('faqQ2Hl1'), t('faqQ2Hl2'), t('faqQ2Hl3')]
    },
    {
      id: 3,
      num: '03',
      categoryKey: 'Pricing & Fees',
      question: t('faqQ3Question'),
      answer: t('faqQ3Answer'),
      highlights: [t('faqQ3Hl1'), t('faqQ3Hl2')]
    },
    {
      id: 4,
      num: '04',
      categoryKey: 'Pricing & Fees',
      question: t('faqQ4Question'),
      answer: t('faqQ4Answer'),
      highlights: [t('faqQ4Hl1')]
    },
    {
      id: 5,
      num: '05',
      categoryKey: 'Pricing & Fees',
      question: t('faqQ5Question'),
      answer: t('faqQ5Answer'),
      highlights: [t('faqQ5Hl1')]
    },
    {
      id: 6,
      num: '06',
      categoryKey: 'Pricing & Fees',
      question: t('faqQ6Question'),
      answer: t('faqQ6Answer'),
      highlights: [t('faqQ6Hl1')]
    },
    {
      id: 7,
      num: '07',
      categoryKey: 'Operations & Delivery',
      question: t('faqQ7Question'),
      answer: t('faqQ7Answer'),
      highlights: [t('faqQ7Hl1'), t('faqQ7Hl2'), t('faqQ7Hl3'), t('faqQ7Hl4')]
    },
    {
      id: 8,
      num: '08',
      categoryKey: 'Operations & Delivery',
      question: t('faqQ8Question'),
      answer: t('faqQ8Answer'),
      highlights: [t('faqQ8Hl1'), t('faqQ8Hl2')]
    },
    {
      id: 9,
      num: '09',
      categoryKey: 'Services & Scope',
      question: t('faqQ9Question'),
      answer: t('faqQ9Answer'),
      highlights: [t('faqQ9Hl1'), t('faqQ9Hl2')]
    },
    {
      id: 10,
      num: '10',
      categoryKey: 'Operations & Delivery',
      question: t('faqQ10Question'),
      answer: t('faqQ10Answer'),
      highlights: [t('faqQ10Hl1'), t('faqQ10Hl2')]
    }
  ];

  const filteredFaqs = faqs.filter(f => {
    const matchesCategory = activeCategoryKey === 'All' || f.categoryKey === activeCategoryKey;
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
            {t('faqHeroBadge')}
          </motion.div>
          <div className="faq-breadcrumb">
            <Link to="/">{t('breadcrumbHome')}</Link> / {t('breadcrumbFaq')}
          </div>
          <h1 className="faq-hero-title">
            {t('faqTitle')}
          </h1>
          <p className="faq-hero-sub">
            {t('faqSubtitle')}
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
              placeholder={t('faqSearchPlaceholder')}
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
                key={cat.key}
                className={`faq-cat-chip ${activeCategoryKey === cat.key ? 'active' : ''}`}
                onClick={() => setActiveCategoryKey(cat.key)}
              >
                {cat.label}
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
              <h3>{t('faqNoMatchTitle')}</h3>
              <p>{t('faqNoMatchSub')}</p>
              <button className="btn-reset-search" onClick={() => { setSearchQuery(''); setActiveCategoryKey('All'); }}>
                {t('faqResetSearch')}
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
                              <span className="faq-hl-label">{t('faqKeyHighlightsLabel')}</span>
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
              <h3>{t('faqCtaTitle')}</h3>
              <p>{t('faqCtaDesc')}</p>
            </div>
            <div className="faq-cta-btns">
              <a href="tel:+918670783810" className="faq-cta-btn phone">
                {t('faqCtaCallBtn')}
              </a>
              <a 
                href="https://wa.me/918670783810?text=Hello%20Sarkar%20Enterprise%2C%20I%20have%20a%20query." 
                target="_blank" 
                rel="noreferrer"
                className="faq-cta-btn whatsapp"
              >
                {t('faqCtaWhatsappBtn')}
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
};
