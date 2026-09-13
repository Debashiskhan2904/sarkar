import React, { useState, useEffect } from 'react';
import { useStore } from '../store';
import { auth, loginWithGoogle, logout } from '../lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { motion, AnimatePresence } from 'motion/react';
import { compressImageFile, createThumbnail } from '../lib/imageUtils';

export const AdminPanel = () => {
  const { 
    isAdminOpen, setIsAdminOpen, 
    jobs, addJob, updateJob, deleteJob, 
    applications, deleteApplication, updateApplicationStatus,
    mediaItems, addMedia, updateMedia, deleteMedia, clearAllMedia, clearMediaByType, restoreDefaultMedia,
    inquiries, deleteInquiry, updateInquiryStatus,
    announcement, updateAnnouncement,
    showToast 
  } = useStore();
  
  const [authed, setAuthed] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const ALLOWED_EMAILS = [
    'debashiskhan586@gmail.com',
    'kishore8670@gmail.com',
    'hintonevolutiontechdgp@gmail.com'
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser && currentUser.email && ALLOWED_EMAILS.includes(currentUser.email)) {
        setAuthed(true);
        setUser(currentUser);
      } else if (currentUser) {
        // Log out immediately if email doesn't match
        logout();
        setAuthed(false);
        setUser(null);
      } else {
        setAuthed(false);
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // Filter States
  const [appStatusFilter, setAppStatusFilter] = useState('All');
  const [inqStatusFilter, setInqStatusFilter] = useState('All');

  // Edit Job State
  const [editingJob, setEditingJob] = useState<any | null>(null);
  const [editJTitle, setEditJTitle] = useState('');
  const [editJDept, setEditJDept] = useState('');
  const [editJLoc, setEditJLoc] = useState('');
  const [editJType, setEditJType] = useState('Full-time');
  const [editJExp, setEditJExp] = useState('');
  const [editJDesc, setEditJDesc] = useState('');

  // Edit Media State
  const [editingMedia, setEditingMedia] = useState<any | null>(null);
  const [editMTitle, setEditMTitle] = useState('');
  const [editMSector, setEditMSector] = useState('fmcg');
  const [editMProductSub, setEditMProductSub] = useState('chanachur');
  const [editMProductLabel, setEditMProductLabel] = useState('');
  const [editMDesc, setEditMDesc] = useState('');
  const [editMTags, setEditMTags] = useState('');
  const [editMUrl, setEditMUrl] = useState('');
  const [editMThumb, setEditMThumb] = useState('');

  // Announcement Form State
  const [annActive, setAnnActive] = useState(true);
  const [annCategory, setAnnCategory] = useState<'hiring' | 'offer' | 'notice' | 'urgent'>('hiring');
  const [annText, setAnnText] = useState('');
  const [annLinkText, setAnnLinkText] = useState('');
  const [annLinkUrl, setAnnLinkUrl] = useState('');

  useEffect(() => {
    if (announcement) {
      setAnnActive(announcement.active ?? true);
      setAnnCategory(announcement.category || 'hiring');
      setAnnText(announcement.text || '');
      setAnnLinkText(announcement.linkText || '');
      setAnnLinkUrl(announcement.linkUrl || '');
    }
  }, [announcement]);

  // Job Form
  const [jTitle, setJTitle] = useState('');
  const [jDept, setJDept] = useState('');
  const [jLoc, setJLoc] = useState('');
  const [jType, setJType] = useState('Full-time');
  const [jExp, setJExp] = useState('');
  const [jDesc, setJDesc] = useState('');

  // Media Form
  const [mTitle, setMTitle] = useState('');
  const [mUrl, setMUrl] = useState('');
  const [mThumb, setMThumb] = useState('');
  const [mDesc, setMDesc] = useState('');
  const [mSector, setMSector] = useState('fmcg');
  const [mProductSub, setMProductSub] = useState('chanachur');
  const [mProductLabel, setMProductLabel] = useState('');
  const [mTags, setMTags] = useState('');

  // Device File Upload State
  const [uploadFileName, setUploadFileName] = useState('');
  const [uploadFileSize, setUploadFileSize] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [thumbFileName, setThumbFileName] = useState('');

  const mediaFileInputRef = React.useRef<HTMLInputElement>(null);
  const thumbFileInputRef = React.useRef<HTMLInputElement>(null);
  const adminOverlayRef = React.useRef<HTMLDivElement>(null);
  const jobFormHeadRef = React.useRef<HTMLDivElement>(null);
  const jobTitleInputRef = React.useRef<HTMLInputElement>(null);

  const handleMediaFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const originalSizeMB = file.size / (1024 * 1024);
    setUploadFileName(file.name);
    setUploadFileSize(`${originalSizeMB.toFixed(2)} MB`);

    // Auto populate item title if title field is currently empty
    if (!mTitle) {
      const nameWithoutExt = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
      setMTitle(nameWithoutExt);
    }

    setIsUploading(true);

    if (file.type.startsWith('image/')) {
      try {
        const compressed = await compressImageFile(file, { maxWidth: 1280, maxHeight: 1280, quality: 0.82 });
        setMUrl(compressed.dataUrl);
        setUploadFileSize(`${originalSizeMB.toFixed(2)} MB ➔ ${compressed.compressedSizeKB} KB (Ready)`);

        // Automatically generate optimized thumbnail if not set
        if (!mThumb) {
          const thumb = await createThumbnail(compressed.dataUrl, { maxWidth: 320, maxHeight: 320 });
          setMThumb(thumb);
        }

        setIsUploading(false);
        showToast(`Photo "${file.name}" compressed & ready to publish`, 'success');
      } catch (err: any) {
        console.warn('Compression fallback to standard file reader:', err?.message);
        const reader = new FileReader();
        reader.onload = () => {
          const dataUrl = reader.result as string;
          setMUrl(dataUrl);
          setIsUploading(false);
          showToast(`File "${file.name}" ready to save`, 'success');
        };
        reader.onerror = () => {
          setIsUploading(false);
          showToast('Failed to read file from device', 'error');
        };
        reader.readAsDataURL(file);
      }
    } else {
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        setMUrl(dataUrl);
        setIsUploading(false);
        showToast(`Device file "${file.name}" ready to save`, 'success');
      };
      reader.onerror = () => {
        setIsUploading(false);
        showToast('Failed to read file from device', 'error');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleThumbFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setThumbFileName(file.name);
    if (file.type.startsWith('image/')) {
      try {
        const thumb = await createThumbnail(file, { maxWidth: 320, maxHeight: 320 });
        setMThumb(thumb);
        showToast(`Thumbnail image "${file.name}" loaded`, 'success');
      } catch {
        const reader = new FileReader();
        reader.onload = () => {
          const dataUrl = reader.result as string;
          setMThumb(dataUrl);
          showToast(`Thumbnail image "${file.name}" loaded`, 'success');
        };
        reader.readAsDataURL(file);
      }
    } else {
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        setMThumb(dataUrl);
        showToast(`Thumbnail image "${file.name}" loaded`, 'success');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const dummyEvent = { target: { files: [file] } } as any;
      handleMediaFileChange(dummyEvent);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const loggedInUser = await loginWithGoogle();
      if (loggedInUser.email && ALLOWED_EMAILS.includes(loggedInUser.email)) {
        setAuthed(true);
        setUser(loggedInUser);
        showToast('Admin access granted', 'success');
      } else {
        await logout();
        showToast('Unauthorized email', 'error');
      }
    } catch (error: any) {
      console.error(error);
      if (error.code === 'auth/unauthorized-domain') {
        showToast('Domain not authorized. Please add your Vercel domain to Firebase Console -> Authentication -> Settings -> Authorized domains.', 'error');
      } else if (error.code === 'auth/popup-blocked' || error.code === 'auth/cancelled-popup-request') {
        showToast('Popup blocked by browser. Please allow popups or open in a new tab to log in.', 'error');
      } else {
        showToast(`Login failed: ${error.message}`, 'error');
      }
    }
  };

  const handleLogout = async () => {
    await logout();
    showToast('Logged out', 'success');
  };

  const handleAddJob = async () => {
    if (!jTitle) { showToast('Title required', 'error'); return; }
    await addJob({ title: jTitle, dept: jDept || 'General', loc: jLoc || 'New Delhi', type: jType, exp: jExp || '—', desc: jDesc });
    setJTitle(''); setJDept(''); setJLoc(''); setJExp(''); setJDesc('');
    showToast('Job posted successfully', 'success');
  };

  const addMediaItem = async (type: string) => {
    if (!mTitle || !mUrl) { showToast('Title and URL required', 'error'); return; }

    const computedLabel = mProductLabel.trim() || (
      mProductSub === 'chanachur' ? 'Priti-Ji Chanachur' :
      mProductSub === 'mosquito' ? 'Mosquito Repellent' :
      mProductSub === 'soan_papdi' ? 'Soan Papdi & Sweets' :
      mProductSub === 'hawker_scheme' ? 'Hawker & C&F Scheme' :
      mProductSub === 'jewellery_scheme' ? 'Jewellery Scheme' :
      mProductSub === 'jewellery_equipment' ? 'Jewellery Equipment' :
      mProductSub === 'modular_kitchen' ? 'Modular Kitchen' :
      mProductSub === 'luxury_living' ? 'Luxury Living' :
      mProductSub === 'corporate_branding' ? 'Corporate Setup' :
      mProductSub === 'all_sub' ? 'General Product' : 'Custom Asset'
    );

    const tagsArray = mTags ? mTags.split(',').map(t => t.trim()).filter(Boolean) : [mTitle.toLowerCase()];

    await addMedia({ 
      type, 
      title: mTitle.trim(), 
      url: mUrl.trim(), 
      thumb: mThumb.trim() || undefined, 
      desc: mDesc.trim() || undefined,
      sector: mSector,
      productSub: mProductSub,
      productLabel: computedLabel,
      tags: tagsArray,
      date: new Date().toISOString()
    });

    setMTitle(''); setMUrl(''); setMThumb(''); setMDesc(''); setMProductLabel(''); setMTags('');
    setUploadFileName(''); setUploadFileSize(''); setThumbFileName('');
    if (mediaFileInputRef.current) mediaFileInputRef.current.value = '';
    if (thumbFileInputRef.current) thumbFileInputRef.current.value = '';
    showToast(`${type.charAt(0).toUpperCase() + type.slice(1)} added successfully`, 'success');
  };

  // Edit Job Handlers
  const openEditJob = (job: any) => {
    setEditingJob(job);
    setJTitle(job.title || '');
    setJDept(job.dept || '');
    setJLoc(job.loc || '');
    setJType(job.type || 'Full-time');
    setJExp(job.exp || '');
    setJDesc(job.desc || '');

    setEditJTitle(job.title || '');
    setEditJDept(job.dept || '');
    setEditJLoc(job.loc || '');
    setEditJType(job.type || 'Full-time');
    setEditJExp(job.exp || '');
    setEditJDesc(job.desc || '');

    // Smooth scroll straight to form head part
    setTimeout(() => {
      if (jobFormHeadRef.current) {
        jobFormHeadRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else if (adminOverlayRef.current) {
        adminOverlayRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      }
      jobTitleInputRef.current?.focus();
    }, 60);

    showToast(`Loaded "${job.title}" into form above`, 'info');
  };

  const handleSaveEditJob = async () => {
    if (!editingJob) return;
    const titleToSave = (jTitle || editJTitle).trim();
    if (!titleToSave) { showToast('Job title is required', 'error'); return; }
    await updateJob(editingJob.id, {
      title: titleToSave,
      dept: (jDept || editJDept).trim() || 'General',
      loc: (jLoc || editJLoc).trim() || 'New Delhi',
      type: jType || editJType || 'Full-time',
      exp: (jExp || editJExp).trim() || '—',
      desc: (jDesc || editJDesc).trim()
    });
    setEditingJob(null);
    setJTitle(''); setJDept(''); setJLoc(''); setJExp(''); setJDesc(''); setJType('Full-time');
    setEditJTitle(''); setEditJDept(''); setEditJLoc(''); setEditJExp(''); setEditJDesc('');
    showToast('Job updated successfully', 'success');
  };

  const handleCancelEditJob = () => {
    setEditingJob(null);
    setJTitle(''); setJDept(''); setJLoc(''); setJExp(''); setJDesc(''); setJType('Full-time');
    setEditJTitle(''); setEditJDept(''); setEditJLoc(''); setEditJExp(''); setEditJDesc('');
  };

  // Edit Media Handlers
  const openEditMedia = (media: any) => {
    setEditingMedia(media);
    setEditMTitle(media.title || '');
    setEditMSector(media.sector || 'fmcg');
    setEditMProductSub(media.productSub || 'chanachur');
    setEditMProductLabel(media.productLabel || '');
    setEditMDesc(media.desc || '');
    setEditMTags(Array.isArray(media.tags) ? media.tags.join(', ') : (media.tags || ''));
    setEditMUrl(media.url || '');
    setEditMThumb(media.thumb || '');

    // Scroll to top
    setTimeout(() => {
      if (adminOverlayRef.current) {
        adminOverlayRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);
  };

  const handleSaveEditMedia = async () => {
    if (!editingMedia) return;
    if (!editMTitle.trim() || !editMUrl.trim()) { showToast('Title and URL required', 'error'); return; }
    const tagsArray = editMTags ? editMTags.split(',').map(t => t.trim()).filter(Boolean) : [editMTitle.toLowerCase()];
    await updateMedia(editingMedia.id, {
      title: editMTitle.trim(),
      sector: editMSector,
      productSub: editMProductSub,
      productLabel: editMProductLabel.trim() || undefined,
      desc: editMDesc.trim() || undefined,
      tags: tagsArray,
      url: editMUrl.trim(),
      thumb: editMThumb.trim() || undefined
    });
    setEditingMedia(null);
    showToast('Media updated successfully', 'success');
  };

  // Status Handlers
  const handleStatusChangeApp = async (appId: string, newStatus: string) => {
    await updateApplicationStatus(appId, newStatus);
    showToast(`Application marked as ${newStatus}`, 'success');
  };

  const handleStatusChangeInquiry = async (inqId: string, newStatus: string) => {
    await updateInquiryStatus(inqId, newStatus);
    showToast(`Inquiry marked as ${newStatus}`, 'success');
  };

  // Announcement Handlers
  const handleSaveAnnouncement = async () => {
    if (!annText.trim()) {
      showToast('Banner text cannot be empty', 'error');
      return;
    }
    await updateAnnouncement({
      active: annActive,
      category: annCategory,
      text: annText.trim(),
      linkText: annLinkText.trim() || undefined,
      linkUrl: annLinkUrl.trim() || undefined
    });
    showToast('Live Website Announcement updated!', 'success');
  };

  const applyAnnouncementPreset = (preset: 'hiring' | 'offer' | 'distributor' | 'urgent') => {
    if (preset === 'hiring') {
      setAnnActive(true);
      setAnnCategory('hiring');
      setAnnText('We are actively recruiting FMCG Sales Executives, Area Managers & Field Staff across West Bengal.');
      setAnnLinkText('View Jobs');
      setAnnLinkUrl('/careers');
    } else if (preset === 'offer') {
      setAnnActive(true);
      setAnnCategory('offer');
      setAnnText('Special Festive Booking Scheme open for Priti-Ji Chanachur, Mosquito Coils & Confectionery!');
      setAnnLinkText('Inquire Now');
      setAnnLinkUrl('/contact');
    } else if (preset === 'distributor') {
      setAnnActive(true);
      setAnnCategory('notice');
      setAnnText('Exclusive C&F and Super Stockist dealership distribution opportunities open for key districts.');
      setAnnLinkText('Explore Sectors');
      setAnnLinkUrl('/products');
    } else if (preset === 'urgent') {
      setAnnActive(true);
      setAnnCategory('urgent');
      setAnnText('Important Notice: Official office working hours and regional distributor verification updates.');
      setAnnLinkText('Contact Office');
      setAnnLinkUrl('/contact');
    }
  };

  const handleDeleteJob = async (id: string) => { await deleteJob(id); showToast('Job removed', 'success'); };
  const deleteApp = async (id: string) => { await deleteApplication(id); showToast('Application removed', 'success'); };
  const handleDeleteMedia = async (id: string | number) => { 
    await deleteMedia(id); 
    showToast('Item deleted and permanently removed from website', 'success'); 
  };
  const handleDeleteInquiry = async (id: string) => { await deleteInquiry(id); showToast('Inquiry deleted', 'success'); };

  const downloadCV = (app: any) => {
    if (!app.fileData) { showToast('CV not available', 'error'); return; }
    const a = document.createElement('a');
    a.href = app.fileData;
    a.download = app.fileName || 'resume.pdf';
    a.click();
    showToast('CV download started', 'success');
  };

  return (
    <AnimatePresence>
      {isAdminOpen && (
        <motion.div 
          ref={adminOverlayRef}
          initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          animate={{ opacity: 1, backdropFilter: 'blur(10px)' }}
          exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          className="admin-overlay open" 
          onClick={(e) => { if (e.target === e.currentTarget) setIsAdminOpen(false); }}
        >
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="admin-panel"
            style={{ 
              background: !authed ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' : '#0a0a0a',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              maxWidth: '1400px',
              width: '100%'
            }}
          >
            <div className="admin-header" style={{ background: 'transparent', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', flexWrap: 'wrap', padding: '16px 20px' }}>
              <h2 style={{ fontSize: 'clamp(0.95rem, 3.8vw, 1.35rem)', color: '#ffd700', fontWeight: 700, margin: 0, minWidth: 0, wordBreak: 'break-word', flex: '1 1 auto', display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                <span>⚙ Admin Panel</span>
                <span style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 400, fontSize: '0.88em' }}>| Sarkar Enterprise</span>
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0, marginLeft: 'auto' }}>
                {authed && (
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-sm btn-danger" 
                    onClick={handleLogout} 
                    style={{ background: 'rgba(255,50,50,0.25)', color: '#ff6b6b', border: '1px solid rgba(255,80,80,0.3)', padding: '6px 14px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}
                  >
                    Logout
                  </motion.button>
                )}
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="admin-close" 
                  onClick={() => setIsAdminOpen(false)} 
                  style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: '6px 14px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}
                >
                  ✕ Close
                </motion.button>
              </div>
            </div>

            {!authed ? (
              <div style={{ position: 'relative', overflow: 'hidden' }}>
                {/* Animated Background Elements */}
                <motion.div
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  style={{
                    position: 'absolute',
                    top: '10%',
                    left: '15%',
                    width: '300px',
                    height: '300px',
                    background: 'radial-gradient(circle, rgba(201,162,39,0.15) 0%, rgba(0,0,0,0) 70%)',
                    borderRadius: '50%',
                    filter: 'blur(20px)',
                    zIndex: 0,
                    pointerEvents: 'none'
                  }}
                />
                <motion.div
                  animate={{
                    y: [0, 30, 0],
                    x: [0, -30, 0],
                    opacity: [0.2, 0.5, 0.2],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  style={{
                    position: 'absolute',
                    bottom: '10%',
                    right: '15%',
                    width: '250px',
                    height: '250px',
                    background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0) 70%)',
                    borderRadius: '50%',
                    filter: 'blur(30px)',
                    zIndex: 0,
                    pointerEvents: 'none'
                  }}
                />

              <motion.div 
                className="admin-login" 
                style={{ display: 'block', textAlign: 'center', padding: '100px 40px', maxWidth: '440px', margin: '0 auto', position: 'relative', zIndex: 1 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                <div style={{ marginBottom: '48px' }}>
                  <motion.div 
                    initial={{ scale: 0.8, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
                    style={{ width: '72px', height: '72px', background: 'linear-gradient(135deg, var(--gold), #f39c12)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px auto', boxShadow: '0 10px 25px rgba(197, 160, 89, 0.4)' }}
                  >
                     <svg style={{ width: '32px', height: '32px', color: '#fff' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                  </motion.div>
                  <motion.h3 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                    style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.4rem', fontStyle: 'italic', color: '#fff', fontWeight: 300, marginBottom: '16px' }}
                  >
                    Admin Portal
                  </motion.h3>
                  <motion.p 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                    style={{ color: '#rgba(255,255,255,0.7)', fontSize: '1rem', lineHeight: '1.6' }}
                  >
                    Secure access restricted to authorized personnel.
                  </motion.p>
                </div>
                
                <motion.button 
                  whileHover={{ scale: 1.03, boxShadow: '0 10px 20px rgba(0,0,0,0.3)' }}
                  whileTap={{ scale: 0.97 }}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, type: "spring", stiffness: 400, damping: 25 }}
                  onClick={handleGoogleLogin}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    padding: '16px 24px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: '#fff',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    fontWeight: 500,
                    letterSpacing: '0.05em',
                    cursor: 'pointer',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <svg style={{ width: '22px', height: '22px', marginRight: '14px' }} viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Continue with Google
                </motion.button>
              </motion.div>
              </div>
            ) : (
          <div>
            <div className="admin-tabs" style={{ overflowX: 'auto', whiteSpace: 'nowrap', display: 'flex', gap: '4px', padding: '10px 16px', background: 'rgba(0,0,0,0.25)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              {['dashboard', 'announcements', 'jobs', 'applications', 'inquiries', 'media', 'videos', 'audios', 'credentials'].map(t => {
                const isActive = activeTab === t;
                return (
                  <motion.button 
                    key={t} 
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    className={`admin-tab ${isActive ? 'active' : ''}`} 
                    onClick={() => setActiveTab(t)}
                    style={{
                      position: 'relative',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      cursor: 'pointer'
                    }}
                  >
                    {t === 'announcements' ? '📢 Live Notice' : t === 'media' ? 'Photos' : t === 'credentials' ? 'Certificates' : t.charAt(0).toUpperCase() + t.slice(1)}
                    {isActive && (
                      <motion.div
                        layoutId="adminTabGlow"
                        style={{
                          position: 'absolute',
                          bottom: '-2px',
                          left: '10%',
                          right: '10%',
                          height: '2px',
                          background: '#ffd700',
                          boxShadow: '0 0 8px #ffd700',
                          borderRadius: '2px'
                        }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>
            <div className="admin-body">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                >
                  {activeTab === 'dashboard' && (
                    <div className="admin-section active">
                      <motion.div 
                        className="stats-row" 
                        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))' }}
                        initial="hidden"
                        animate="visible"
                        variants={{
                          hidden: { opacity: 0 },
                          visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
                        }}
                      >
                        {[
                          { num: jobs.length, lbl: 'Open Jobs' },
                          { num: applications.length, lbl: 'Applications' },
                          { num: inquiries?.length || 0, lbl: 'Inquiries' },
                          { num: inquiries?.filter((i: any) => i.type?.includes('Payment') || i.type?.includes('UTR')).length || 0, lbl: 'Payment UTRs', highlight: true },
                          { num: mediaItems.filter((m: any) => m.type==='photo').length, lbl: 'Photos' },
                          { num: mediaItems.filter((m: any) => m.type==='video').length, lbl: 'Videos' },
                          { num: mediaItems.filter((m: any) => m.type==='audio').length, lbl: 'Audios' },
                          { num: mediaItems.filter((m: any) => m.type==='credential').length, lbl: 'Certificates' }
                        ].map((stat, sIdx) => (
                          <motion.div 
                            key={sIdx}
                            variants={{
                              hidden: { opacity: 0, y: 12, scale: 0.95 },
                              visible: { opacity: 1, y: 0, scale: 1 }
                            }}
                            whileHover={{ 
                              y: -4, 
                              scale: 1.02,
                              borderColor: stat.highlight ? '#ffd700' : 'rgba(255, 215, 0, 0.4)',
                              boxShadow: '0 8px 24px rgba(0,0,0,0.5)'
                            }}
                            transition={{ type: "spring", stiffness: 350, damping: 25 }}
                            className="stat-card" 
                            style={stat.highlight ? { border: '1px solid #ffd700' } : undefined}
                          >
                            <div className="num" style={stat.highlight ? { color: '#ffd700' } : undefined}>{stat.num}</div>
                            <div className="lbl" style={stat.highlight ? { color: '#ffd700' } : undefined}>{stat.lbl}</div>
                          </motion.div>
                        ))}
                      </motion.div>
                      <p style={{ color: 'var(--gray)' }}>Welcome, <strong style={{ color: '#ffffff' }}>{user?.email || 'Admin'}</strong>. Use the tabs above to manage content, track workflows, and publish live notices.</p>
                    </div>
                  )}

              {activeTab === 'announcements' && (
                <div className="admin-section active">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '14px', background: 'rgba(255,255,255,0.03)', padding: '16px 20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <div>
                      <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.2rem', color: '#fff' }}>
                        📢 Live Website Notice / Announcement Banner
                      </h3>
                      <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', margin: '4px 0 0 0' }}>
                        Publish a real-time banner across the top header of the public website for all visitors.
                      </p>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontSize: '0.85rem', color: annActive ? '#34d399' : '#9ca3af', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: annActive ? '#34d399' : '#6b7280', display: 'inline-block' }}></span>
                        {annActive ? 'Banner ACTIVE (Live)' : 'Banner INACTIVE (Hidden)'}
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          const nextState = !annActive;
                          setAnnActive(nextState);
                          updateAnnouncement({
                            active: nextState,
                            text: annText,
                            category: annCategory,
                            linkText: annLinkText,
                            linkUrl: annLinkUrl,
                            updatedAt: new Date().toISOString()
                          });
                          showToast(nextState ? 'Banner turned ON (Live)' : 'Banner turned OFF (Hidden)', 'info');
                        }}
                        style={{
                          background: annActive ? '#22c55e' : 'rgba(255,255,255,0.12)',
                          color: annActive ? '#000' : '#fff',
                          border: 'none',
                          padding: '8px 18px',
                          borderRadius: '20px',
                          fontSize: '0.85rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          transition: 'background 0.2s ease, color 0.2s ease'
                        }}
                      >
                        {annActive ? 'Turn OFF' : 'Turn ON'}
                      </motion.button>
                    </div>
                  </div>

                  {/* Preset quick buttons */}
                  <div style={{ background: 'rgba(255,255,255,0.02)', padding: '14px 18px', borderRadius: '12px', marginBottom: '22px', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <span style={{ fontSize: '0.82rem', color: '#ffd700', fontWeight: 700, display: 'block', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      ⚡ Quick Template Presets (Click to autofill):
                    </span>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                      <motion.button
                        whileHover={{ scale: 1.04, y: -2 }}
                        whileTap={{ scale: 0.96 }}
                        className="btn-sm"
                        style={{ background: 'rgba(255,215,0,0.12)', color: '#ffd700', border: '1px solid rgba(255,215,0,0.3)', padding: '8px 14px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '0.82rem' }}
                        onClick={() => applyAnnouncementPreset('hiring')}
                      >
                        💼 Hiring Alert
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.04, y: -2 }}
                        whileTap={{ scale: 0.96 }}
                        className="btn-sm"
                        style={{ background: 'rgba(52,211,153,0.12)', color: '#34d399', border: '1px solid rgba(52,211,153,0.3)', padding: '8px 14px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '0.82rem' }}
                        onClick={() => applyAnnouncementPreset('offer')}
                      >
                        🎁 Festive Booking Scheme
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.04, y: -2 }}
                        whileTap={{ scale: 0.96 }}
                        className="btn-sm"
                        style={{ background: 'rgba(96,165,250,0.12)', color: '#93c5fd', border: '1px solid rgba(96,165,250,0.3)', padding: '8px 14px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '0.82rem' }}
                        onClick={() => applyAnnouncementPreset('distributor')}
                      >
                        📦 C&F / Dealership Opportunity
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.04, y: -2 }}
                        whileTap={{ scale: 0.96 }}
                        className="btn-sm"
                        style={{ background: 'rgba(248,113,113,0.12)', color: '#f87171', border: '1px solid rgba(248,113,113,0.3)', padding: '8px 14px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '0.82rem' }}
                        onClick={() => applyAnnouncementPreset('urgent')}
                      >
                        ⚠️ Official Notice Alert
                      </motion.button>
                    </div>
                  </div>

                  <div className="admin-form" style={{ 
                    marginBottom: '28px', 
                    background: '#111111', 
                    padding: 'clamp(18px, 3vw, 28px)', 
                    borderRadius: '16px', 
                    border: '1px solid rgba(255,215,0,0.25)', 
                    width: '100%', 
                    boxSizing: 'border-box' 
                  }}>
                    {/* Top 3-Column Responsive Grid */}
                    <div style={{ 
                      display: 'grid', 
                      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
                      gap: '18px', 
                      marginBottom: '20px' 
                    }}>
                      <div className="form-group" style={{ margin: 0 }}>
                        <label style={{ color: '#ffd700', fontWeight: 700, fontSize: '0.82rem', marginBottom: '8px', display: 'block', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                          CATEGORY THEME
                        </label>
                        <select 
                          value={annCategory} 
                          onChange={(e: any) => setAnnCategory(e.target.value)}
                          style={{
                            width: '100%',
                            background: '#080808',
                            color: '#fff',
                            border: '1px solid rgba(255,215,0,0.3)',
                            borderRadius: '8px',
                            padding: '12px 14px',
                            fontSize: '0.92rem',
                            outline: 'none',
                            boxSizing: 'border-box'
                          }}
                        >
                          <option value="hiring">💼 Hiring Alert (Gold/Amber)</option>
                          <option value="offer">🎁 Festive Offer / Commercial Scheme (Emerald)</option>
                          <option value="notice">📢 Official Corporate Notice (Navy Blue)</option>
                          <option value="urgent">⚠️ Urgent Alert / Schedule Change (Crimson)</option>
                        </select>
                      </div>

                      <div className="form-group" style={{ margin: 0 }}>
                        <label style={{ color: '#ffd700', fontWeight: 700, fontSize: '0.82rem', marginBottom: '8px', display: 'block', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                          ACTION BUTTON LABEL (OPTIONAL)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Apply Now, Inquire Now, View Details"
                          value={annLinkText}
                          onChange={e => setAnnLinkText(e.target.value)}
                          style={{
                            width: '100%',
                            background: '#080808',
                            color: '#fff',
                            border: '1px solid rgba(255,215,0,0.3)',
                            borderRadius: '8px',
                            padding: '12px 14px',
                            fontSize: '0.92rem',
                            outline: 'none',
                            boxSizing: 'border-box'
                          }}
                        />
                      </div>

                      <div className="form-group" style={{ margin: 0 }}>
                        <label style={{ color: '#ffd700', fontWeight: 700, fontSize: '0.82rem', marginBottom: '8px', display: 'block', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                          ACTION DESTINATION LINK (OPTIONAL)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. /careers, /contact, /products, or URL"
                          value={annLinkUrl}
                          onChange={e => setAnnLinkUrl(e.target.value)}
                          style={{
                            width: '100%',
                            background: '#080808',
                            color: '#fff',
                            border: '1px solid rgba(255,215,0,0.3)',
                            borderRadius: '8px',
                            padding: '12px 14px',
                            fontSize: '0.92rem',
                            outline: 'none',
                            boxSizing: 'border-box'
                          }}
                        />
                      </div>
                    </div>

                    {/* Banner Text Area spanning full container width */}
                    <div className="form-group" style={{ marginBottom: '22px' }}>
                      <label style={{ color: '#ffd700', fontWeight: 700, fontSize: '0.82rem', marginBottom: '8px', display: 'block', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        BANNER TEXT / MESSAGE
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Type the message to display on the top announcement bar across the website..."
                        value={annText}
                        onChange={e => setAnnText(e.target.value)}
                        style={{
                          width: '100%',
                          background: '#080808',
                          color: '#fff',
                          border: '1px solid rgba(255,215,0,0.3)',
                          borderRadius: '8px',
                          padding: '12px 14px',
                          fontSize: '0.95rem',
                          lineHeight: '1.6',
                          outline: 'none',
                          boxSizing: 'border-box',
                          resize: 'vertical'
                        }}
                      />
                    </div>

                    {/* Live Preview Box */}
                    <div style={{ marginBottom: '24px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <span style={{ fontSize: '0.82rem', color: '#ffd700', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                          👁️ Live Banner Preview (How it appears to website visitors):
                        </span>
                        <span style={{ fontSize: '0.78rem', color: annActive ? '#34d399' : '#9ca3af' }}>
                          {annActive ? '● Visible on website' : '○ Currently hidden'}
                        </span>
                      </div>
                      <div style={{
                        padding: '14px 20px',
                        borderRadius: '10px',
                        background: annCategory === 'hiring' ? 'linear-gradient(90deg, #1c1500, #2b1e03)' :
                                    annCategory === 'offer' ? 'linear-gradient(90deg, #052414, #0d3822)' :
                                    annCategory === 'urgent' ? 'linear-gradient(90deg, #2b0b0b, #3e1212)' :
                                    'linear-gradient(90deg, #091a32, #102a4f)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '16px',
                        fontSize: '0.9rem',
                        boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.1)',
                        overflow: 'hidden'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', shrink: 0 }}>
                          <span style={{
                            padding: '3px 10px',
                            borderRadius: '12px',
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            background: 'rgba(255,255,255,0.15)',
                            color: '#ffd700',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            whiteSpace: 'nowrap',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px'
                          }}>
                            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ffd700', display: 'inline-block' }} />
                            {annCategory === 'hiring' ? 'HIRING ALERT' : annCategory}
                          </span>
                        </div>

                        {/* Moving Ticker Preview */}
                        <div
                          className="announcement-ticker-wrapper"
                          style={{
                            flex: 1,
                            overflow: 'hidden',
                            position: 'relative',
                            maskImage: 'linear-gradient(to right, transparent, black 16px, black calc(100% - 16px), transparent)',
                            WebkitMaskImage: 'linear-gradient(to right, transparent, black 16px, black calc(100% - 16px), transparent)',
                            minWidth: 0
                          }}
                        >
                          <div className="announcement-ticker-track">
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '24px', paddingRight: '24px', whiteSpace: 'nowrap' }}>
                              <span style={{ color: '#fff', fontWeight: 500 }}>{annText || '(No banner text entered yet)'}</span>
                              <span style={{ color: '#ffd700', fontSize: '0.75rem' }}>✦</span>
                              <span style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>{annText || '(No banner text entered yet)'}</span>
                              <span style={{ color: '#ffd700', fontSize: '0.75rem' }}>✦</span>
                            </div>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '24px', paddingRight: '24px', whiteSpace: 'nowrap' }} aria-hidden="true">
                              <span style={{ color: '#fff', fontWeight: 500 }}>{annText || '(No banner text entered yet)'}</span>
                              <span style={{ color: '#ffd700', fontSize: '0.75rem' }}>✦</span>
                              <span style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>{annText || '(No banner text entered yet)'}</span>
                              <span style={{ color: '#ffd700', fontSize: '0.75rem' }}>✦</span>
                            </div>
                          </div>
                        </div>

                        {annLinkText && (
                          <span style={{
                            padding: '6px 14px',
                            background: 'rgba(255,215,0,0.2)',
                            color: '#ffd700',
                            border: '1px solid rgba(255,215,0,0.3)',
                            borderRadius: '6px',
                            fontSize: '0.78rem',
                            fontWeight: 700,
                            whiteSpace: 'nowrap',
                            shrink: 0
                          }}>
                            {annLinkText} →
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions Bar */}
                    <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
                      <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="btn btn-primary" 
                        onClick={handleSaveAnnouncement} 
                        style={{ 
                          flex: '1 1 280px', 
                          padding: '14px 24px', 
                          fontWeight: 700,
                          fontSize: '0.95rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                          cursor: 'pointer'
                        }}
                      >
                        💾 Save & Publish Announcement to Live Website
                      </motion.button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'jobs' && (
                <div className="admin-section active">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                    <div>
                      <h3 style={{ margin: 0, color: '#fff', fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span>💼 Careers & Job Postings</span>
                      </h3>
                      <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', margin: '4px 0 0 0' }}>
                        Post new career opportunities or edit active listings. Listings appear immediately in the Careers portal.
                      </p>
                    </div>
                    <span style={{ background: 'rgba(255,215,0,0.12)', color: '#ffd700', border: '1px solid rgba(255,215,0,0.3)', padding: '6px 14px', borderRadius: '20px', fontSize: '0.82rem', fontWeight: 600 }}>
                      Total Active Openings: {jobs.length}
                    </span>
                  </div>

                  {/* Form Head Part */}
                  <div 
                    ref={jobFormHeadRef}
                    id="job-form-head"
                    className="admin-form" 
                    style={{ 
                      marginBottom: '32px', 
                      background: editingJob ? '#181408' : '#111111', 
                      padding: 'clamp(18px, 3vw, 26px)', 
                      borderRadius: '16px', 
                      border: editingJob ? '2px solid #ffd700' : '1px solid rgba(255,215,0,0.25)', 
                      boxShadow: editingJob ? '0 0 25px rgba(255,215,0,0.2)' : 'none',
                      width: '100%', 
                      boxSizing: 'border-box',
                      transition: 'all 0.25s ease'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '10px' }}>
                      <div>
                        <h4 style={{ color: '#ffd700', fontSize: '1.1rem', margin: 0, display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700 }}>
                          {editingJob ? (
                            <>
                              <span>✏️</span> Edit Job Opening: <span style={{ color: '#fff' }}>{jTitle || editingJob.title}</span>
                            </>
                          ) : (
                            <>
                              <span>📢</span> Post New Job Opening
                            </>
                          )}
                        </h4>
                        <p style={{ color: '#888', fontSize: '0.82rem', margin: '4px 0 0 0' }}>
                          {editingJob 
                            ? 'Editing selected listing. Update any fields below and click "Save & Update Job".' 
                            : 'Enter the job specifications to publish an active opening.'}
                        </p>
                      </div>

                      {editingJob && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ 
                            background: '#ffd700', 
                            color: '#000', 
                            fontSize: '0.72rem', 
                            fontWeight: 800, 
                            padding: '4px 10px', 
                            borderRadius: '12px', 
                            textTransform: 'uppercase', 
                            letterSpacing: '0.05em' 
                          }}>
                            Editing Mode
                          </span>
                          <button 
                            type="button" 
                            onClick={handleCancelEditJob}
                            style={{ 
                              background: 'rgba(255,255,255,0.12)', 
                              color: '#fff', 
                              border: '1px solid rgba(255,255,255,0.2)', 
                              padding: '5px 12px', 
                              borderRadius: '6px', 
                              fontSize: '0.78rem', 
                              cursor: 'pointer' 
                            }}
                          >
                            ✕ Cancel
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="form-group" style={{ marginBottom: '16px' }}>
                      <label style={{ color: '#ffd700', fontWeight: 700, fontSize: '0.82rem', marginBottom: '8px', display: 'block', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        JOB TITLE *
                      </label>
                      <input 
                        ref={jobTitleInputRef}
                        type="text" 
                        placeholder="e.g. Area Sales Manager (FMCG)" 
                        value={jTitle} 
                        onChange={e=>setJTitle(e.target.value)} 
                        style={{ background: '#080808', color: '#fff', border: editingJob ? '1px solid #ffd700' : '1px solid rgba(255,215,0,0.3)', borderRadius: '8px', padding: '12px 14px', width: '100%', boxSizing: 'border-box' }} 
                      />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                      <div className="form-group" style={{ margin: 0 }}>
                        <label style={{ color: '#ffd700', fontWeight: 700, fontSize: '0.82rem', marginBottom: '8px', display: 'block', textTransform: 'uppercase', letterSpacing: '0.04em' }}>DEPARTMENT</label>
                        <input type="text" placeholder="e.g. FMCG Sales & Distribution" value={jDept} onChange={e=>setJDept(e.target.value)} style={{ background: '#080808', color: '#fff', border: '1px solid rgba(255,215,0,0.3)', borderRadius: '8px', padding: '12px 14px', width: '100%', boxSizing: 'border-box' }} />
                      </div>
                      <div className="form-group" style={{ margin: 0 }}>
                        <label style={{ color: '#ffd700', fontWeight: 700, fontSize: '0.82rem', marginBottom: '8px', display: 'block', textTransform: 'uppercase', letterSpacing: '0.04em' }}>LOCATION</label>
                        <input type="text" placeholder="e.g. Durgapur, Bardhaman & Asansol" value={jLoc} onChange={e=>setJLoc(e.target.value)} style={{ background: '#080808', color: '#fff', border: '1px solid rgba(255,215,0,0.3)', borderRadius: '8px', padding: '12px 14px', width: '100%', boxSizing: 'border-box' }} />
                      </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                      <div className="form-group" style={{ margin: 0 }}>
                        <label style={{ color: '#ffd700', fontWeight: 700, fontSize: '0.82rem', marginBottom: '8px', display: 'block', textTransform: 'uppercase', letterSpacing: '0.04em' }}>EMPLOYMENT TYPE</label>
                        <select value={jType} onChange={e=>setJType(e.target.value)} style={{ background: '#080808', color: '#fff', border: '1px solid rgba(255,215,0,0.3)', borderRadius: '8px', padding: '12px 14px', width: '100%', boxSizing: 'border-box' }}>
                          <option>Full-time</option>
                          <option>Part-time</option>
                          <option>Contract</option>
                          <option>Internship</option>
                        </select>
                      </div>
                      <div className="form-group" style={{ margin: 0 }}>
                        <label style={{ color: '#ffd700', fontWeight: 700, fontSize: '0.82rem', marginBottom: '8px', display: 'block', textTransform: 'uppercase', letterSpacing: '0.04em' }}>EXPERIENCE REQUIRED</label>
                        <input type="text" placeholder="e.g. 2+ Years in FMCG or Retail" value={jExp} onChange={e=>setJExp(e.target.value)} style={{ background: '#080808', color: '#fff', border: '1px solid rgba(255,215,0,0.3)', borderRadius: '8px', padding: '12px 14px', width: '100%', boxSizing: 'border-box' }} />
                      </div>
                    </div>
                    <div className="form-group" style={{ marginBottom: '20px' }}>
                      <label style={{ color: '#ffd700', fontWeight: 700, fontSize: '0.82rem', marginBottom: '8px', display: 'block', textTransform: 'uppercase', letterSpacing: '0.04em' }}>DESCRIPTION & KEY RESPONSIBILITIES</label>
                      <textarea rows={3} placeholder="Provide details on duties, requirements, and incentives..." value={jDesc} onChange={e=>setJDesc(e.target.value)} style={{ background: '#080808', color: '#fff', border: '1px solid rgba(255,215,0,0.3)', borderRadius: '8px', padding: '12px 14px', width: '100%', boxSizing: 'border-box', lineHeight: '1.6' }}></textarea>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                      {editingJob ? (
                        <>
                          <motion.button 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="btn btn-primary" 
                            onClick={handleSaveEditJob} 
                            style={{ padding: '12px 28px', fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer', background: '#ffd700', color: '#000' }}
                          >
                            💾 Save & Update Job Opening
                          </motion.button>
                          <motion.button 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="button"
                            className="btn-sm" 
                            onClick={handleCancelEditJob} 
                            style={{ padding: '12px 20px', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.25)', borderRadius: '8px' }}
                          >
                            Cancel Edit
                          </motion.button>
                        </>
                      ) : (
                        <motion.button 
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="btn btn-primary" 
                          onClick={handleAddJob} 
                          style={{ padding: '12px 28px', fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer' }}
                        >
                          + Post Job Opening
                        </motion.button>
                      )}
                    </div>
                  </div>

                  {/* Jobs Management Table - Using Total Space */}
                  <div style={{ marginTop: '28px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
                      <h4 style={{ margin: 0, color: '#ffd700', fontSize: '1.05rem', fontWeight: 700 }}>
                        Active Job Listings ({jobs.length})
                      </h4>
                      <span style={{ fontSize: '0.8rem', color: '#aaa' }}>
                        Click <strong>Edit</strong> on any row to load into the form at the top
                      </span>
                    </div>

                    <div className="admin-table-container">
                      <table className="admin-table" style={{ width: '100%', minWidth: '100%', tableLayout: 'auto' }}>
                        <thead>
                          <tr>
                            <th style={{ width: '28%' }}>Title</th>
                            <th style={{ width: '20%' }}>Dept</th>
                            <th style={{ width: '22%' }}>Location</th>
                            <th style={{ width: '14%' }}>Type</th>
                            <th style={{ width: '16%', textAlign: 'right' }}>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {jobs.length > 0 ? (
                            jobs.map((j: any) => {
                              const isEditingThis = editingJob?.id === j.id;
                              return (
                                <tr 
                                  key={j.id}
                                  style={{ 
                                    background: isEditingThis ? 'rgba(255,215,0,0.12)' : undefined,
                                    borderLeft: isEditingThis ? '4px solid #ffd700' : '4px solid transparent',
                                    transition: 'background 0.2s ease'
                                  }}
                                >
                                  <td>
                                    <strong style={{ color: '#fff', fontSize: '0.95rem', display: 'block' }}>{j.title}</strong>
                                    {j.exp && <span style={{ fontSize: '0.78rem', color: '#999' }}>Exp: {j.exp}</span>}
                                  </td>
                                  <td style={{ color: '#ccc' }}>{j.dept || '—'}</td>
                                  <td style={{ color: '#ccc' }}>{j.loc || '—'}</td>
                                  <td>
                                    <span style={{ 
                                      padding: '4px 10px', 
                                      background: 'rgba(255,255,255,0.08)', 
                                      border: '1px solid rgba(255,255,255,0.15)', 
                                      borderRadius: '6px', 
                                      fontSize: '0.78rem', 
                                      color: '#fff', 
                                      whiteSpace: 'nowrap' 
                                    }}>
                                      {j.type}
                                    </span>
                                  </td>
                                  <td>
                                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', alignItems: 'center' }}>
                                      <motion.button 
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="btn-sm btn-primary" 
                                        style={{ 
                                          background: isEditingThis ? '#ffd700' : 'rgba(255,215,0,0.16)', 
                                          color: isEditingThis ? '#000' : '#ffd700', 
                                          border: '1px solid rgba(255,215,0,0.4)',
                                          fontWeight: 700, 
                                          cursor: 'pointer',
                                          display: 'inline-flex',
                                          alignItems: 'center',
                                          gap: '4px',
                                          padding: '6px 12px'
                                        }} 
                                        onClick={() => openEditJob(j)}
                                        title="Click to edit in form above"
                                      >
                                        ✏️ {isEditingThis ? 'Editing...' : 'Edit'}
                                      </motion.button>
                                      <motion.button 
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="btn-sm btn-danger" 
                                        style={{ cursor: 'pointer', padding: '6px 12px', fontWeight: 600 }} 
                                        onClick={() => handleDeleteJob(j.id)}
                                      >
                                        Delete
                                      </motion.button>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })
                          ) : (
                            <tr>
                              <td colSpan={5} style={{ textAlign: 'center', color: '#888', padding: '30px' }}>
                                No job postings created yet. Use the form above to post your first opening.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'applications' && (
                <div className="admin-section active">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
                    <h3 style={{ margin: 0 }}>Candidate Applications ({applications.length})</h3>
                    
                    {/* Status filter buttons */}
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {['All', 'Pending', 'Under Review', 'Shortlisted', 'Rejected'].map(status => {
                        const count = status === 'All' ? applications.length : applications.filter((a: any) => (a.status || 'Pending') === status).length;
                        const isSel = appStatusFilter === status;
                        return (
                          <motion.button
                            key={status}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setAppStatusFilter(status)}
                            style={{
                              background: isSel ? '#ffd700' : 'rgba(255,255,255,0.06)',
                              color: isSel ? '#000' : 'rgba(255,255,255,0.8)',
                              border: isSel ? '1px solid #ffd700' : '1px solid rgba(255,255,255,0.1)',
                              padding: '5px 12px',
                              borderRadius: '20px',
                              fontSize: '0.78rem',
                              fontWeight: 600,
                              cursor: 'pointer'
                            }}
                          >
                            {status} ({count})
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="admin-table-container">
                    <table className="admin-table">
                      <thead><tr><th>Name</th><th>Email / Phone</th><th>Position</th><th>Workflow Status</th><th>Date</th><th>CV</th><th>Action</th></tr></thead>
                    <tbody>
                      {applications.filter((a: any) => appStatusFilter === 'All' || (a.status || 'Pending') === appStatusFilter).length > 0 ? (
                        applications
                          .filter((a: any) => appStatusFilter === 'All' || (a.status || 'Pending') === appStatusFilter)
                          .map((a: any) => {
                            const curStatus = a.status || 'Pending';
                            return (
                              <tr key={a.id}>
                                <td><strong>{a.name}</strong></td>
                                <td>
                                  <div>{a.email}</div>
                                  <div style={{ fontSize: '0.8rem', color: '#aaa' }}>{a.phone || '—'}</div>
                                </td>
                                <td>{a.position}</td>
                                <td>
                                  <select
                                    value={curStatus}
                                    onChange={(e) => handleStatusChangeApp(a.id, e.target.value)}
                                    style={{
                                      background: curStatus === 'Shortlisted' ? 'rgba(37, 211, 102, 0.2)' :
                                                  curStatus === 'Under Review' ? 'rgba(56, 189, 248, 0.2)' :
                                                  curStatus === 'Rejected' ? 'rgba(239, 68, 68, 0.2)' :
                                                  'rgba(255, 215, 0, 0.2)',
                                      color: curStatus === 'Shortlisted' ? '#25D366' :
                                             curStatus === 'Under Review' ? '#38bdf8' :
                                             curStatus === 'Rejected' ? '#ef4444' :
                                             '#ffd700',
                                      border: `1px solid ${
                                        curStatus === 'Shortlisted' ? '#25D366' :
                                        curStatus === 'Under Review' ? '#38bdf8' :
                                        curStatus === 'Rejected' ? '#ef4444' :
                                        '#ffd700'
                                      }`,
                                      padding: '4px 8px',
                                      borderRadius: '6px',
                                      fontSize: '0.78rem',
                                      fontWeight: 700,
                                      cursor: 'pointer',
                                      outline: 'none'
                                    }}
                                  >
                                    <option value="Pending" style={{ background: '#111', color: '#ffd700' }}>🟡 Pending</option>
                                    <option value="Under Review" style={{ background: '#111', color: '#38bdf8' }}>🔵 Under Review</option>
                                    <option value="Shortlisted" style={{ background: '#111', color: '#25D366' }}>🟢 Shortlisted</option>
                                    <option value="Rejected" style={{ background: '#111', color: '#ef4444' }}>🔴 Rejected</option>
                                  </select>
                                </td>
                                <td>{new Date(a.date).toLocaleDateString()}</td>
                                <td>
                                  <motion.button 
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="btn-sm btn-success" 
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => downloadCV(a)}
                                  >
                                    ⬇ {a.fileName}
                                  </motion.button>
                                </td>
                                <td>
                                  <motion.button 
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="btn-sm btn-danger" 
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => deleteApp(a.id)}
                                  >
                                    Delete
                                  </motion.button>
                                </td>
                              </tr>
                            );
                          })
                      ) : (
                        <tr><td colSpan={7} style={{ textAlign: 'center' }}>No applications matching filter "{appStatusFilter}"</td></tr>
                      )}
                    </tbody>
                  </table>
                  </div>
                </div>
              )}

              {activeTab === 'inquiries' && (
                <div className="admin-section active">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
                    <div>
                      <h3 style={{ margin: 0 }}>Contact Inquiries & Payment Verification</h3>
                      <span style={{ fontSize: '0.8rem', color: '#ffd700', marginTop: '4px', display: 'inline-block' }}>
                        💳 {inquiries?.filter((i: any) => i.type?.includes('Payment') || i.type?.includes('UTR')).length || 0} Payment UTRs logged
                      </span>
                    </div>

                    {/* Inquiry status filter buttons */}
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {['All', 'New', 'Verified', 'Resolved'].map(status => {
                        const count = status === 'All' ? inquiries.length : inquiries.filter((i: any) => (i.status || 'New') === status).length;
                        const isSel = inqStatusFilter === status;
                        return (
                          <motion.button
                            key={status}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setInqStatusFilter(status)}
                            style={{
                              background: isSel ? '#ffd700' : 'rgba(255,255,255,0.06)',
                              color: isSel ? '#000' : 'rgba(255,255,255,0.8)',
                              border: isSel ? '1px solid #ffd700' : '1px solid rgba(255,255,255,0.1)',
                              padding: '5px 12px',
                              borderRadius: '20px',
                              fontSize: '0.78rem',
                              fontWeight: 600,
                              cursor: 'pointer'
                            }}
                          >
                            {status} ({count})
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="admin-table-container">
                    <table className="admin-table">
                      <thead><tr><th>Name / Firm</th><th>Email / Phone</th><th>Category / UTR</th><th>Status</th><th>Details / Message</th><th>Date</th><th>Action</th></tr></thead>
                    <tbody>
                      {inquiries && inquiries.filter((i: any) => inqStatusFilter === 'All' || (i.status || 'New') === inqStatusFilter).length > 0 ? (
                        inquiries
                          .filter((i: any) => inqStatusFilter === 'All' || (i.status || 'New') === inqStatusFilter)
                          .map((i: any) => {
                            const isPayment = i.type?.includes('Payment') || i.type?.includes('UTR');
                            const curStatus = i.status || 'New';
                            return (
                              <tr key={i.id} style={isPayment ? { background: 'rgba(255, 215, 0, 0.08)', borderLeft: '3px solid #ffd700' } : {}}>
                                <td>
                                  <strong>{i.name}</strong>
                                  {i.company && i.company !== 'N/A' && i.company !== i.name && <div style={{ fontSize: '0.8rem', color: '#aaa' }}>{i.company}</div>}
                                </td>
                                <td>
                                  <div>{i.email}</div>
                                  <div style={{ fontSize: '0.8rem', color: '#aaa' }}>{i.phone || '—'}</div>
                                </td>
                                <td>
                                  {isPayment ? (
                                    <span style={{ background: '#ffd700', color: '#000', fontWeight: 800, padding: '3px 8px', borderRadius: '4px', fontSize: '0.78rem', display: 'inline-block' }}>
                                      💳 {i.type}
                                    </span>
                                  ) : (
                                    i.type
                                  )}
                                </td>
                                <td>
                                  <select
                                    value={curStatus}
                                    onChange={(e) => handleStatusChangeInquiry(i.id, e.target.value)}
                                    style={{
                                      background: curStatus === 'Verified' ? 'rgba(37, 211, 102, 0.2)' :
                                                  curStatus === 'Resolved' ? 'rgba(168, 85, 247, 0.2)' :
                                                  'rgba(255, 215, 0, 0.2)',
                                      color: curStatus === 'Verified' ? '#25D366' :
                                             curStatus === 'Resolved' ? '#c084fc' :
                                             '#ffd700',
                                      border: `1px solid ${
                                        curStatus === 'Verified' ? '#25D366' :
                                        curStatus === 'Resolved' ? '#c084fc' :
                                        '#ffd700'
                                      }`,
                                      padding: '4px 8px',
                                      borderRadius: '6px',
                                      fontSize: '0.78rem',
                                      fontWeight: 700,
                                      cursor: 'pointer',
                                      outline: 'none'
                                    }}
                                  >
                                    <option value="New" style={{ background: '#111', color: '#ffd700' }}>🟡 New</option>
                                    <option value="Verified" style={{ background: '#111', color: '#25D366' }}>🟢 Verified</option>
                                    <option value="Resolved" style={{ background: '#111', color: '#c084fc' }}>🟣 Resolved</option>
                                  </select>
                                </td>
                                <td style={{ maxWidth: '280px', whiteSpace: 'pre-wrap', wordBreak: 'break-word', fontSize: '0.85rem' }} title={i.message}>
                                  {i.message}
                                </td>
                                <td>{new Date(i.date).toLocaleDateString()}</td>
                                <td>
                                  <motion.button 
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="btn-sm btn-danger" 
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => handleDeleteInquiry(i.id)}
                                  >
                                    Delete
                                  </motion.button>
                                </td>
                              </tr>
                            );
                          })
                      ) : (
                        <tr><td colSpan={7} style={{ textAlign: 'center' }}>No inquiries matching filter "{inqStatusFilter}"</td></tr>
                      )}
                    </tbody>
                  </table>
                  </div>
                </div>
              )}

              {['media', 'videos', 'audios', 'credentials'].includes(activeTab) && (
                <div className="admin-section active">
                  <h3 style={{ marginBottom: '8px' }}>
                    Upload {activeTab === 'media' ? 'Photo / Graphic Poster' : activeTab === 'videos' ? 'Video Commercial' : activeTab === 'audios' ? 'Audio Campaign Jingle' : 'Certificate / Official Charter Document'}
                  </h3>
                  <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.88rem', marginBottom: '20px', overflowWrap: 'break-word', wordBreak: 'break-word', lineHeight: 1.5 }}>
                    Categorize your media asset by choosing its main sector and specific product line so it automatically shows in public filters.
                  </p>

                  <div className="admin-form" style={{ marginBottom: '32px', background: '#111111', padding: 'clamp(14px, 4vw, 24px)', borderRadius: '16px', border: '1px solid rgba(255,215,0,0.25)', width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
                    
                    {/* Sector Category & Sub-Category Selection */}
                    <div className="form-row" style={{ display: 'grid', gap: '16px', marginBottom: '16px' }}>
                      <div className="form-group" style={{ display: 'flex', flexDirection: 'column', minWidth: 0, width: '100%' }}>
                        <label style={{ color: '#ffd700', fontWeight: 700, fontSize: '0.82rem', marginBottom: '6px', display: 'block' }}>🛒 SECTOR CATEGORY</label>
                        <select 
                          value={mSector} 
                          onChange={e => {
                            const newSec = e.target.value;
                            setMSector(newSec);
                            if (newSec === 'fmcg') setMProductSub('chanachur');
                            else if (newSec === 'jewellery') setMProductSub('jewellery_scheme');
                            else if (newSec === 'interior') setMProductSub('modular_kitchen');
                            else if (newSec === 'company') setMProductSub('corporate_branding');
                            else if (newSec === 'credentials') setMProductSub('all_sub');
                          }}
                          style={{ background: '#080808', color: '#fff', border: '1px solid rgba(255,215,0,0.3)', padding: '12px 14px', borderRadius: '8px', width: '100%', minWidth: 0, boxSizing: 'border-box', fontSize: '0.92rem', outline: 'none' }}
                        >
                          <option value="fmcg">🛒 FMCG Products (Chanachur, Mosquito, Sweets, C&F)</option>
                          <option value="jewellery">💎 Jewellery & Gold Schemes (Stylo, Monopoly, Gold Equipment)</option>
                          <option value="interior">🏠 Interior Projects (Modular Kitchen, Living, Mall)</option>
                          <option value="company">🏢 Corporate / Brand Vision</option>
                          <option value="credentials">📄 Credentials & Certificates</option>
                        </select>
                      </div>

                      <div className="form-group" style={{ display: 'flex', flexDirection: 'column', minWidth: 0, width: '100%' }}>
                        <label style={{ color: '#ffd700', fontWeight: 700, fontSize: '0.82rem', marginBottom: '6px', display: 'block' }}>🏷️ PRODUCT LINE / SUB-CATEGORY</label>
                        <select 
                          value={mProductSub} 
                          onChange={e => setMProductSub(e.target.value)}
                          style={{ background: '#080808', color: '#fff', border: '1px solid rgba(255,215,0,0.3)', padding: '12px 14px', borderRadius: '8px', width: '100%', minWidth: 0, boxSizing: 'border-box', fontSize: '0.92rem', outline: 'none' }}
                        >
                          {mSector === 'fmcg' && (
                            <>
                              <option value="chanachur">🌶️ Priti-Ji Chanachur</option>
                              <option value="mosquito">🦟 Mosquito Repellents (Angry Frog / Maxwell / Encounter)</option>
                              <option value="soan_papdi">🍬 Soan Papdi & Sweets</option>
                              <option value="hawker_scheme">📜 Hawker & C&F Schemes</option>
                              <option value="all_sub">📦 Other FMCG Range</option>
                            </>
                          )}
                          {mSector === 'jewellery' && (
                            <>
                              <option value="jewellery_scheme">🏆 Jewellery Stylo & Monopoly Schemes</option>
                              <option value="jewellery_equipment">⚙️ Gold Processing & Recycling Equipment</option>
                              <option value="all_sub">💎 General Jewellery Outlet</option>
                            </>
                          )}
                          {mSector === 'interior' && (
                            <>
                              <option value="modular_kitchen">🍳 Modular Kitchens</option>
                              <option value="luxury_living">🛋️ Luxury Living Units</option>
                              <option value="corporate_branding">🏢 Commercial & Mall Setup</option>
                              <option value="all_sub">🏠 Other Interior Work</option>
                            </>
                          )}
                          {mSector === 'company' && (
                            <>
                              <option value="corporate_branding">🎬 Corporate Overview / Headquarters</option>
                              <option value="all_sub">🏢 Company Vision</option>
                            </>
                          )}
                          {mSector === 'credentials' && (
                            <>
                              <option value="hawker_scheme">📄 Official Distributorship Certificate</option>
                              <option value="jewellery_scheme">📜 Monopoly Contract / Agreement</option>
                              <option value="all_sub">🏛️ Board Governance Charter</option>
                            </>
                          )}
                        </select>
                      </div>
                    </div>

                    <div className="form-row" style={{ display: 'grid', gap: '16px', marginBottom: '16px' }}>
                      <div className="form-group" style={{ display: 'flex', flexDirection: 'column', minWidth: 0, width: '100%' }}>
                        <label style={{ color: '#ffd700', fontWeight: 700, fontSize: '0.82rem', marginBottom: '6px', display: 'block' }}>ITEM TITLE *</label>
                        <input type="text" placeholder="e.g. Priti-Ji Chanachur Special Festival Pack Poster" value={mTitle} onChange={e=>setMTitle(e.target.value)} style={{ width: '100%', minWidth: 0, boxSizing: 'border-box' }} />
                      </div>
                      <div className="form-group" style={{ display: 'flex', flexDirection: 'column', minWidth: 0, width: '100%' }}>
                        <label style={{ color: '#ffd700', fontWeight: 700, fontSize: '0.82rem', marginBottom: '6px', display: 'block' }}>CUSTOM BADGE / TAGLINE (OPTIONAL)</label>
                        <input type="text" placeholder="e.g. Priti-Ji Chanachur or Angry Frog Jingle" value={mProductLabel} onChange={e=>setMProductLabel(e.target.value)} style={{ width: '100%', minWidth: 0, boxSizing: 'border-box' }} />
                      </div>
                    </div>

                    {/* Device File Upload Box (Photo / Video / Audio / Certificate) */}
                    <div className="form-group" style={{ display: 'flex', flexDirection: 'column', minWidth: 0, width: '100%', marginBottom: '18px' }}>
                      <label style={{ color: '#ffd700', fontWeight: 700, fontSize: '0.82rem', marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px' }}>
                        <span>📁 UPLOAD FILE FROM YOUR DEVICE ({activeTab === 'media' ? 'Photo' : activeTab === 'videos' ? 'Video' : activeTab === 'audios' ? 'Audio' : 'Certificate'})</span>
                        <span style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 400, fontSize: '0.78rem' }}>Click to Browse or Drag & Drop</span>
                      </label>
                      
                      <input 
                        ref={mediaFileInputRef}
                        type="file" 
                        accept={
                          activeTab === 'media' ? 'image/*,.png,.jpg,.jpeg,.webp,.gif,.svg' :
                          activeTab === 'videos' ? 'video/*,.mp4,.webm,.ogg,.mov,.mkv' :
                          activeTab === 'audios' ? 'audio/*,.mp3,.wav,.ogg,.aac,.m4a' :
                          'image/*,.pdf,.doc,.docx,.png,.jpg,.jpeg'
                        }
                        onChange={handleMediaFileChange}
                        style={{ display: 'none' }}
                      />

                      <div 
                        onClick={() => mediaFileInputRef.current?.click()}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        style={{ 
                          border: uploadFileName ? '2px dashed #ffd700' : '2px dashed rgba(255, 215, 0, 0.35)', 
                          borderRadius: '12px', 
                          padding: '24px 16px', 
                          textAlign: 'center', 
                          background: uploadFileName ? 'rgba(255, 215, 0, 0.08)' : 'rgba(255, 255, 255, 0.03)', 
                          cursor: 'pointer',
                          transition: 'all 0.25s ease',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '12px'
                        }}
                      >
                        {isUploading ? (
                          <div style={{ color: '#ffd700', fontWeight: 600, fontSize: '0.92rem' }}>⏳ Processing file data from device...</div>
                        ) : uploadFileName ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
                            <div style={{ background: '#ffd700', color: '#000', padding: '8px 16px', borderRadius: '8px', fontWeight: 700, fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span>✓ {uploadFileName}</span>
                              <span style={{ opacity: 0.8, fontSize: '0.78rem' }}>({uploadFileSize})</span>
                            </div>
                            <button 
                              type="button" 
                              onClick={(e) => {
                                e.stopPropagation();
                                setUploadFileName('');
                                setUploadFileSize('');
                                setMUrl('');
                                if (mediaFileInputRef.current) mediaFileInputRef.current.value = '';
                              }}
                              style={{ background: 'rgba(255,60,60,0.25)', color: '#ff6b6b', border: '1px solid rgba(255,80,80,0.4)', padding: '6px 14px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}
                            >
                              ✕ Remove File
                            </button>
                          </div>
                        ) : (
                          <>
                            <div style={{ fontSize: '2.4rem', lineHeight: 1 }}>
                              {activeTab === 'media' ? '🖼️' : activeTab === 'videos' ? '🎬' : activeTab === 'audios' ? '🎵' : '📄'}
                            </div>
                            <div>
                              <div style={{ color: '#fff', fontSize: '0.98rem', fontWeight: 600, marginBottom: '4px' }}>
                                Click to choose a {activeTab === 'media' ? 'photo image' : activeTab === 'videos' ? 'video file' : activeTab === 'audios' ? 'audio file' : 'certificate document'} from your device
                              </div>
                              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem' }}>
                                Drag & drop file here (Supports {activeTab === 'media' ? 'JPG, PNG, WEBP, GIF, SVG' : activeTab === 'videos' ? 'MP4, WEBM, MOV' : activeTab === 'audios' ? 'MP3, WAV, AAC' : 'PDF, DOCX, JPG, PNG'})
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="form-group" style={{ display: 'flex', flexDirection: 'column', minWidth: 0, width: '100%', marginBottom: '16px' }}>
                      <label style={{ color: '#ffd700', fontWeight: 700, fontSize: '0.82rem', marginBottom: '6px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span>OR PASTE ONLINE ASSET URL</span>
                        {mUrl && mUrl.startsWith('data:') && <span style={{ color: '#4cd137', fontSize: '0.78rem' }}>✓ Local Device File Loaded</span>}
                      </label>
                      <input 
                        type="url" 
                        placeholder={uploadFileName ? `Loaded from device: ${uploadFileName}` : activeTab === 'audios' ? 'https://.../audio.mp3 or /assets/audio/song.mp3' : activeTab === 'videos' ? 'https://.../video.mp4' : 'https://.../image.jpg or /images/photo.jpg'} 
                        value={mUrl} 
                        onChange={e => {
                          setMUrl(e.target.value);
                          if (!e.target.value.startsWith('data:')) {
                            setUploadFileName('');
                            setUploadFileSize('');
                          }
                        }} 
                        style={{ width: '100%', minWidth: 0, boxSizing: 'border-box' }} 
                      />
                    </div>

                    {activeTab === 'videos' && (
                      <div className="form-group" style={{ display: 'flex', flexDirection: 'column', minWidth: 0, width: '100%', marginBottom: '16px' }}>
                        <label style={{ color: '#ffd700', fontWeight: 700, fontSize: '0.82rem', marginBottom: '6px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span>THUMBNAIL POSTER IMAGE (Device Upload or URL)</span>
                          {thumbFileName && <span style={{ color: '#4cd137', fontSize: '0.78rem' }}>✓ {thumbFileName}</span>}
                        </label>
                        <input 
                          ref={thumbFileInputRef}
                          type="file" 
                          accept="image/*"
                          onChange={handleThumbFileChange}
                          style={{ display: 'none' }}
                        />
                        <div style={{ display: 'flex', gap: '10px' }}>
                          <input 
                            type="url" 
                            placeholder="https://.../thumb.jpg or select image file ->" 
                            value={mThumb} 
                            onChange={e=>setMThumb(e.target.value)} 
                            style={{ flex: 1, minWidth: 0, boxSizing: 'border-box' }} 
                          />
                          <motion.button 
                            type="button"
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.96 }}
                            onClick={() => thumbFileInputRef.current?.click()}
                            style={{ background: 'rgba(255,215,0,0.15)', color: '#ffd700', border: '1px solid rgba(255,215,0,0.4)', padding: '10px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem', whiteSpace: 'nowrap' }}
                          >
                            📁 Browse Device Image
                          </motion.button>
                        </div>
                      </div>
                    )}

                    <div className="form-row" style={{ display: 'grid', gap: '16px', marginBottom: '20px' }}>
                      <div className="form-group" style={{ display: 'flex', flexDirection: 'column', minWidth: 0, width: '100%' }}>
                        <label style={{ color: '#ffd700', fontWeight: 700, fontSize: '0.82rem', marginBottom: '6px', display: 'block' }}>DESCRIPTION / DETAILS</label>
                        <input type="text" placeholder="Short note or special offer details..." value={mDesc} onChange={e=>setMDesc(e.target.value)} style={{ width: '100%', minWidth: 0, boxSizing: 'border-box' }} />
                      </div>
                      <div className="form-group" style={{ display: 'flex', flexDirection: 'column', minWidth: 0, width: '100%' }}>
                        <label style={{ color: '#ffd700', fontWeight: 700, fontSize: '0.82rem', marginBottom: '6px', display: 'block' }}>SEARCH KEYWORDS / TAGS (COMMA SEPARATED)</label>
                        <input type="text" placeholder="e.g. chanachur, offer, fmcg, buy 2 get 1" value={mTags} onChange={e=>setMTags(e.target.value)} style={{ width: '100%', minWidth: 0, boxSizing: 'border-box' }} />
                      </div>
                    </div>

                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="btn btn-primary" 
                      style={{ marginTop: '8px', width: '100%', background: 'linear-gradient(135deg, #ffd700, #c5a059)', color: '#000', fontWeight: 800, padding: '14px 20px', fontSize: '0.95rem', border: 'none', borderRadius: '8px', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.05em', boxShadow: '0 4px 15px rgba(255, 215, 0, 0.25)', display: 'flex', alignItems: 'center', justifyCenter: 'center', justifyContent: 'center' }} 
                      onClick={() => addMediaItem(activeTab === 'media' ? 'photo' : activeTab === 'videos' ? 'video' : activeTab === 'audios' ? 'audio' : 'credential')}
                    >
                      + UPLOAD {activeTab === 'media' ? 'PHOTO' : activeTab === 'videos' ? 'VIDEO' : activeTab === 'audios' ? 'AUDIO JINGLE' : 'CERTIFICATE'}
                    </motion.button>
                  </div>

                  {(() => {
                    const targetType = activeTab === 'media' ? 'photo' : activeTab === 'videos' ? 'video' : activeTab === 'audios' ? 'audio' : 'credential';
                    const currentTabMedia = mediaItems.filter((m: any) => m.type === targetType);
                    const tabTitle = activeTab === 'media' ? 'Photos' : activeTab === 'videos' ? 'Videos' : activeTab === 'audios' ? 'Audio Jingles' : 'Certificates';

                    return (
                      <>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '24px 0 16px 0', flexWrap: 'wrap', gap: '10px' }}>
                          <h4 style={{ margin: 0, color: '#ffd700', fontSize: '1.05rem', fontWeight: 700 }}>
                            Active {tabTitle} ({currentTabMedia.length})
                          </h4>
                        </div>

                        <div className="admin-table-container">
                          <table className="admin-table">
                            <thead>
                              <tr>
                                <th>Title</th>
                                <th>Sector Category</th>
                                <th>Sub-Category</th>
                                <th>Badge Label</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {currentTabMedia.map((m: any) => (
                                <tr key={m.id}>
                                  <td><strong>{m.title}</strong></td>
                                  <td><span style={{ textTransform: 'uppercase', fontSize: '0.75rem', padding: '2px 8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }}>{m.sector || 'fmcg'}</span></td>
                                  <td><span style={{ color: '#aaa', fontSize: '0.82rem' }}>{m.productSub || 'all_sub'}</span></td>
                                  <td><span style={{ color: '#ffd700', fontSize: '0.82rem' }}>{m.productLabel || 'Custom'}</span></td>
                                  <td>
                                    <div style={{ display: 'flex', gap: '6px' }}>
                                      <motion.button 
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="btn-sm btn-primary" 
                                        style={{ background: '#ffd700', color: '#000', fontWeight: 600, cursor: 'pointer' }} 
                                        onClick={() => openEditMedia(m)}
                                      >
                                        ✏️ Edit
                                      </motion.button>
                                      <motion.button 
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="btn-sm btn-danger" 
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => handleDeleteMedia(m.id)}
                                      >
                                        Delete
                                      </motion.button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                              {currentTabMedia.length === 0 && (
                                <tr>
                                  <td colSpan={5} style={{ textAlign: 'center', color: '#888', padding: '28px 12px' }}>
                                    No active {tabTitle.toLowerCase()} in this category. All items were removed, or none have been added yet.
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </>
                    );
                  })()}
                </div>
              )}
                </motion.div>
              </AnimatePresence>

            </div>
          </div>
        )}

        {/* Modal: Edit Existing Media Item */}
        <AnimatePresence>
          {editingMedia && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0, 0, 0, 0.85)',
                backdropFilter: 'blur(8px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10000,
                padding: '20px'
              }}
              onClick={(e) => { if (e.target === e.currentTarget) setEditingMedia(null); }}
            >
              <motion.div 
                initial={{ scale: 0.92, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.92, opacity: 0, y: 20 }}
                transition={{ type: "spring", stiffness: 350, damping: 28 }}
                style={{
                  background: '#161616',
                  border: '1px solid #ffd700',
                  borderRadius: '12px',
                  maxWidth: '650px',
                  width: '100%',
                  maxHeight: '90vh',
                  overflowY: 'auto',
                  padding: '28px',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.8)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid rgba(255,215,0,0.2)', paddingBottom: '12px' }}>
                  <h3 style={{ margin: 0, color: '#ffd700', fontSize: '1.25rem' }}>
                    ✏️ Edit Media: {editingMedia.title}
                  </h3>
                  <button onClick={() => setEditingMedia(null)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '1.4rem', cursor: 'pointer' }}>×</button>
                </div>

                <div className="admin-form">
                  <div className="form-group">
                    <label>Title / Caption</label>
                    <input type="text" value={editMTitle} onChange={e => setEditMTitle(e.target.value)} />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Enterprise Sector</label>
                      <select value={editMSector} onChange={e => setEditMSector(e.target.value)}>
                        <option value="fmcg">FMCG & Packaged Foods</option>
                        <option value="jewellery">Fine Jewellery & Gold Scheme</option>
                        <option value="interior">Luxury Living & Modular Interior</option>
                        <option value="general">Corporate Headquarters / General</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Product Sub-Category</label>
                      <select value={editMProductSub} onChange={e => setEditMProductSub(e.target.value)}>
                        <option value="chanachur">Priti-Ji Chanachur</option>
                        <option value="mosquito">Mosquito Repellent Coils</option>
                        <option value="soan_papdi">Soan Papdi & Sweets</option>
                        <option value="hawker_scheme">Hawker & Dealership Scheme</option>
                        <option value="jewellery_scheme">Jewellery Monthly Savings Scheme</option>
                        <option value="jewellery_equipment">Precision Jewellery Tools</option>
                        <option value="modular_kitchen">Modular Kitchen</option>
                        <option value="luxury_living">Living Room & Bedrooms</option>
                        <option value="corporate_branding">Corporate Branding</option>
                        <option value="all_sub">All / General Product</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Badge Label / Display Tag</label>
                    <input type="text" placeholder="e.g. Priti-Ji Chanachur, Festive Scheme" value={editMProductLabel} onChange={e => setEditMProductLabel(e.target.value)} />
                  </div>

                  <div className="form-group">
                    <label>Media Asset URL</label>
                    <input type="text" value={editMUrl} onChange={e => setEditMUrl(e.target.value)} />
                  </div>

                  <div className="form-group">
                    <label>Thumbnail URL (Optional)</label>
                    <input type="text" value={editMThumb} onChange={e => setEditMThumb(e.target.value)} />
                  </div>

                  <div className="form-group">
                    <label>Keywords / Tags (Comma separated)</label>
                    <input type="text" value={editMTags} onChange={e => setEditMTags(e.target.value)} />
                  </div>

                  <div className="form-group">
                    <label>Description / Details</label>
                    <textarea rows={3} value={editMDesc} onChange={e => setEditMDesc(e.target.value)} />
                  </div>

                  <div style={{ display: 'flex', gap: '12px', marginTop: '20px', justifyContent: 'flex-end' }}>
                    <motion.button 
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      className="btn btn-secondary" 
                      onClick={() => setEditingMedia(null)} 
                      style={{ padding: '10px 18px', background: 'rgba(255,255,255,0.1)', color: '#fff' }}
                    >
                      Cancel
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      className="btn btn-primary" 
                      onClick={handleSaveEditMedia} 
                      style={{ padding: '10px 24px', fontWeight: 700 }}
                    >
                      💾 Save Changes
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
    )}
    </AnimatePresence>
  );
};
