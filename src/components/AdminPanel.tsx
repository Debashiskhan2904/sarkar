import React, { useState, useEffect } from 'react';
import { useStore } from '../store';
import { auth, loginWithGoogle, logout } from '../lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { motion, AnimatePresence } from 'motion/react';

export const AdminPanel = () => {
  const { 
    isAdminOpen, setIsAdminOpen, 
    jobs, addJob, deleteJob, 
    applications, deleteApplication, 
    mediaItems, addMedia, deleteMedia, 
    inquiries, deleteInquiry,
    showToast 
  } = useStore();
  
  const [authed, setAuthed] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const ALLOWED_EMAILS = ['debashiskhan586@gmail.com', 'business.gdp.hinton@gmail.com'];

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
    await addMedia({ type, title: mTitle, url: mUrl, thumb: mThumb, desc: mDesc });
    setMTitle(''); setMUrl(''); setMThumb(''); setMDesc('');
    showToast(`${type} added`, 'success');
  };

  const handleDeleteJob = async (id: string) => { await deleteJob(id); showToast('Job removed', 'success'); };
  const deleteApp = async (id: string) => { await deleteApplication(id); showToast('Application removed', 'success'); };
  const handleDeleteMedia = async (id: string) => { await deleteMedia(id); showToast('Item deleted', 'success'); };
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
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}
          >
            <div className="admin-header" style={{ background: 'transparent', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <h2>⚙ Admin Panel — Sarkar Enterprise</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                {authed && <button className="btn-sm btn-danger" onClick={handleLogout} style={{ background: 'rgba(255,50,50,0.2)', color: '#ff6b6b', border: 'none' }}>Logout</button>}
                <button className="admin-close" onClick={() => setIsAdminOpen(false)} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff' }}>✕ Close</button>
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
            <div className="admin-tabs" style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
              {['dashboard', 'jobs', 'applications', 'inquiries', 'media', 'videos', 'audios'].map(t => (
                <button key={t} className={`admin-tab ${activeTab === t ? 'active' : ''}`} onClick={() => setActiveTab(t)}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
            <div className="admin-body">
              {activeTab === 'dashboard' && (
                <div className="admin-section active">
                  <div className="stats-row" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))' }}>
                    <div className="stat-card"><div className="num">{jobs.length}</div><div className="lbl">Open Jobs</div></div>
                    <div className="stat-card"><div className="num">{applications.length}</div><div className="lbl">Applications</div></div>
                    <div className="stat-card"><div className="num">{inquiries?.length || 0}</div><div className="lbl">Inquiries</div></div>
                    <div className="stat-card"><div className="num">{mediaItems.filter((m: any) => m.type==='photo').length}</div><div className="lbl">Photos</div></div>
                    <div className="stat-card"><div className="num">{mediaItems.filter((m: any) => m.type==='video').length}</div><div className="lbl">Videos</div></div>
                  </div>
                  <p style={{ color: 'var(--gray)' }}>Welcome, Admin. Use the tabs above to manage content.</p>
                </div>
              )}

              {activeTab === 'jobs' && (
                <div className="admin-section active">
                  <h3 style={{ marginBottom: '20px' }}>Post / Manage Jobs</h3>
                  <div className="admin-form" style={{ marginBottom: '32px' }}>
                    <div className="form-group"><label>Job Title</label><input type="text" value={jTitle} onChange={e=>setJTitle(e.target.value)} /></div>
                    <div className="form-row">
                      <div className="form-group"><label>Department</label><input type="text" value={jDept} onChange={e=>setJDept(e.target.value)} /></div>
                      <div className="form-group"><label>Location</label><input type="text" value={jLoc} onChange={e=>setJLoc(e.target.value)} /></div>
                    </div>
                    <div className="form-row">
                      <div className="form-group"><label>Type</label><select value={jType} onChange={e=>setJType(e.target.value)}><option>Full-time</option><option>Part-time</option><option>Contract</option><option>Internship</option></select></div>
                      <div className="form-group"><label>Experience</label><input type="text" value={jExp} onChange={e=>setJExp(e.target.value)} /></div>
                    </div>
                    <div className="form-group"><label>Description</label><textarea rows={3} value={jDesc} onChange={e=>setJDesc(e.target.value)}></textarea></div>
                    <button className="btn btn-primary" onClick={handleAddJob}>+ Post Job</button>
                  </div>
                  <table className="admin-table">
                    <thead><tr><th>Title</th><th>Dept</th><th>Location</th><th>Type</th><th>Action</th></tr></thead>
                    <tbody>
                      {jobs.map((j: any) => <tr key={j.id}><td>{j.title}</td><td>{j.dept}</td><td>{j.loc}</td><td>{j.type}</td><td><button className="btn-sm btn-danger" onClick={() => handleDeleteJob(j.id)}>Delete</button></td></tr>)}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === 'applications' && (
                <div className="admin-section active">
                  <h3 style={{ marginBottom: '20px' }}>Candidate Applications</h3>
                  <table className="admin-table">
                    <thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Position</th><th>Date</th><th>CV</th><th>Action</th></tr></thead>
                    <tbody>
                      {applications.length > 0 ? applications.map((a: any) => (
                        <tr key={a.id}><td>{a.name}</td><td>{a.email}</td><td>{a.phone || '—'}</td><td>{a.position}</td><td>{new Date(a.date).toLocaleDateString()}</td>
                        <td><button className="btn-sm btn-success" onClick={() => downloadCV(a)}>⬇ {a.fileName}</button></td>
                        <td><button className="btn-sm btn-danger" onClick={() => deleteApp(a.id)}>Delete</button></td></tr>
                      )) : <tr><td colSpan={7} style={{ textAlign: 'center' }}>No applications yet</td></tr>}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === 'inquiries' && (
                <div className="admin-section active">
                  <h3 style={{ marginBottom: '20px' }}>Contact Inquiries</h3>
                  <table className="admin-table">
                    <thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Company</th><th>Type</th><th>Message</th><th>Date</th><th>Action</th></tr></thead>
                    <tbody>
                      {inquiries && inquiries.length > 0 ? inquiries.map((i: any) => (
                        <tr key={i.id}>
                          <td>{i.name}</td>
                          <td>{i.email}</td>
                          <td>{i.phone || '—'}</td>
                          <td>{i.company || '—'}</td>
                          <td>{i.type}</td>
                          <td style={{ maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={i.message}>{i.message}</td>
                          <td>{new Date(i.date).toLocaleDateString()}</td>
                          <td><button className="btn-sm btn-danger" onClick={() => handleDeleteInquiry(i.id)}>Delete</button></td>
                        </tr>
                      )) : <tr><td colSpan={8} style={{ textAlign: 'center' }}>No inquiries yet</td></tr>}
                    </tbody>
                  </table>
                </div>
              )}

              {['media', 'videos', 'audios'].includes(activeTab) && (
                <div className="admin-section active">
                  <h3 style={{ marginBottom: '20px' }}>Add {activeTab === 'media' ? 'Photo' : activeTab === 'videos' ? 'Video' : 'Audio'}</h3>
                  <div className="admin-form" style={{ marginBottom: '32px' }}>
                    <div className="form-group"><label>Title</label><input type="text" value={mTitle} onChange={e=>setMTitle(e.target.value)} /></div>
                    <div className="form-group"><label>URL</label><input type="url" value={mUrl} onChange={e=>setMUrl(e.target.value)} /></div>
                    {activeTab === 'videos' && <div className="form-group"><label>Thumbnail URL</label><input type="url" value={mThumb} onChange={e=>setMThumb(e.target.value)} /></div>}
                    <div className="form-group"><label>Description</label><input type="text" value={mDesc} onChange={e=>setMDesc(e.target.value)} /></div>
                    <button className="btn btn-primary" onClick={() => addMediaItem(activeTab === 'media' ? 'photo' : activeTab === 'videos' ? 'video' : 'audio')}>+ Add Item</button>
                  </div>
                  <table className="admin-table">
                    <thead><tr><th>Title</th><th>Type</th><th>Action</th></tr></thead>
                    <tbody>
                      {mediaItems.filter((m: any) => m.type === (activeTab === 'media' ? 'photo' : activeTab === 'videos' ? 'video' : 'audio')).map((m: any) => (
                        <tr key={m.id}><td>{m.title}</td><td>{m.type}</td><td><button className="btn-sm btn-danger" onClick={() => handleDeleteMedia(m.id)}>Delete</button></td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
    )}
    </AnimatePresence>
  );
};
