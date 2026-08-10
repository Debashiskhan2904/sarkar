import React, { useState, useRef } from 'react';
import { PageWrapper } from '../components/PageWrapper';
import { useStore } from '../store';

export const Careers = () => {
  const { jobs, addApplication, showToast } = useStore();
  const [selectedRole, setSelectedRole] = useState('');
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState('');
  const [fileData, setFileData] = useState<string | null>(null);
  
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showToast('File must be under 5 MB', 'error');
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

  const submitApplication = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!fileData) { showToast('Please upload a resume', 'error'); return; }
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    const newApp = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      position: formData.get('position') as string,
      cover: formData.get('cover') as string,
      fileName: fileName,
      fileData: fileData,
      date: new Date().toISOString()
    };
    
    await addApplication(newApp);
    form.reset();
    setFileName('');
    setFileData(null);
    showToast('Application submitted successfully! We will review within 7 days.', 'success');
  };

  return (
    <PageWrapper>
      <section className="section" style={{ paddingTop: '60px' }}>
        <div className="container">
          <div className="section-header">
            <div className="label">Join Us</div>
            <h2>Careers at Sarkar Enterprise</h2>
            <p>Workplace culture, benefits, leadership messages, and current openings.</p>
          </div>

          <div className="culture-grid">
            <div className="culture-card"><div className="culture-icon">🌱</div><h4>Growth Culture</h4><p>Continuous learning budgets, mentorship programs, and clear promotion pathways.</p></div>
            <div className="culture-card"><div className="culture-icon">⚖️</div><h4>Work-Life Balance</h4><p>Flexible hybrid model, generous leave, and wellness initiatives for every team member.</p></div>
            <div className="culture-card"><div className="culture-icon">🏆</div><h4>Impact & Recognition</h4><p>Your work shapes national brands. We celebrate wins publicly and reward excellence.</p></div>
          </div>

          <div className="section-header" style={{ marginTop: '40px' }}>
            <div className="label">Perks</div>
            <h2>Employee Benefits</h2>
          </div>
          <div className="values-grid" style={{ marginBottom: '60px' }}>
            <div className="value-item"><h4>Health & Wellness</h4><p>Comprehensive medical cover for family + annual health check-ups and gym subsidy.</p></div>
            <div className="value-item"><h4>Learning Stipend</h4><p>₹50,000 annual budget for courses, conferences, and certifications of your choice.</p></div>
            <div className="value-item"><h4>Performance Bonus</h4><p>Transparent quarterly incentives tied to individual and company goals.</p></div>
            <div className="value-item"><h4>Remote Flexibility</h4><p>Hybrid policy with up to 3 work-from-home days per week after probation.</p></div>
          </div>

          <div className="section-header">
            <div className="label">Hiring</div>
            <h2>Current Openings</h2>
          </div>
          <div className="jobs-list">
            {jobs.length === 0 ? (
              <p style={{ textAlign: 'center', color: 'var(--gray)' }}>No open positions at the moment. Check back soon.</p>
            ) : jobs.map((j: any) => (
              <div className="job-card" key={j.id}>
                <div className="job-info">
                  <h4>{j.title}</h4>
                  <div className="job-meta">
                    <span>🏢 {j.dept}</span><span>📍 {j.loc}</span><span>⏱ {j.type}</span><span>📈 {j.exp}</span>
                  </div>
                  <p style={{ marginTop: '10px', color: 'var(--gray)', fontSize: '0.9rem' }}>{j.desc}</p>
                </div>
                <button className="btn btn-primary" onClick={() => {
                  setSelectedRole(j.title);
                  document.getElementById('applyFormContainer')?.scrollIntoView({ behavior: 'smooth' });
                }}>Apply Now</button>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '70px' }} id="applyFormContainer">
            <div className="section-header">
              <div className="label">Apply</div>
              <h2>Submit Your Application</h2>
              <p>Secure resume upload. We review every application within 7 working days.</p>
            </div>
            <div className="apply-form">
              <form onSubmit={submitApplication}>
                <div className="form-row">
                  <div className="form-group"><label>Full Name *</label><input type="text" name="name" required placeholder="Your full name" /></div>
                  <div className="form-group"><label>Email *</label><input type="email" name="email" required placeholder="you@email.com" /></div>
                </div>
                <div className="form-row">
                  <div className="form-group"><label>Phone *</label><input type="tel" name="phone" required placeholder="+91 XXXXX XXXXX" /></div>
                  <div className="form-group">
                    <label>Position *</label>
                    <select name="position" value={selectedRole} onChange={e => setSelectedRole(e.target.value)} required>
                      <option value="">Select role</option>
                      {jobs.length > 0 ? (
                        jobs.map((j: any) => <option key={j.id} value={j.title}>{j.title}</option>)
                      ) : (
                        <>
                          <option value="General Application">General Application</option>
                          <option value="Brand Manager – FMCG">Brand Manager – FMCG</option>
                          <option value="Jewellery Product Designer">Jewellery Product Designer</option>
                          <option value="Interior Design Lead">Interior Design Lead</option>
                          <option value="Digital Marketing Specialist">Digital Marketing Specialist</option>
                        </>
                      )}
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label>Cover Note</label>
                  <textarea name="cover" rows={4} placeholder="Briefly tell us why you're a great fit..."></textarea>
                </div>
                <div className="form-group">
                  <label>Resume (PDF or Word) *</label>
                  <label className="file-upload" style={{ display: 'block' }}>
                    <input type="file" name="resume" accept=".pdf,.doc,.docx" onChange={handleFileSelect} />
                    {fileName ? (
                      <div>
                        <div style={{ fontWeight: 500, color: 'var(--success)' }}>✓ {fileName}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--gray)' }}>{fileSize}</div>
                      </div>
                    ) : (
                      <div>
                        <div style={{ fontSize: '1.8rem', marginBottom: '8px' }}>📄</div>
                        <div style={{ fontWeight: 500 }}>Click or drag to upload</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--gray)', marginTop: '4px' }}>PDF, DOC, DOCX • Max 5 MB</div>
                      </div>
                    )}
                  </label>
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Submit Application</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export const Media = () => {
  const { mediaItems, playVideo, openZoomGallery } = useStore();
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? mediaItems : mediaItems.filter((m: any) => m.type === filter);

  return (
    <PageWrapper>
      <section className="section" style={{ paddingTop: '60px' }}>
        <div className="container">
          <div className="section-header">
            <div className="label">Central Asset Repository</div>
            <h2>Media & Gallery</h2>
            <p>Filterable video highlights, audio brand clips, and high-resolution photo galleries.</p>
          </div>

          <div className="filter-bar">
            {['all', 'video', 'audio', 'photo'].map(f => (
              <button key={f} className={`filter-btn ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          <div className="media-grid">
            {filtered.map((m: any) => {
              if (m.type === 'photo') return (
                <div className="media-card" key={m.id}>
                  <div className="media-thumb" style={{ cursor: 'zoom-in' }} onClick={() => openZoomGallery([m.url], 0, m.title)}>
                    <img src={m.url} alt={m.title} loading="lazy" /><span className="media-type">Photo</span>
                  </div>
                  <div className="media-body"><h5>{m.title}</h5><p>{m.desc}</p><button className="btn btn-dark" style={{ padding: '6px 12px', fontSize: '0.8rem', marginTop: '8px' }} onClick={() => openZoomGallery([m.url], 0, m.title)}>🔍 View</button></div>
                </div>
              );
              if (m.type === 'video') return (
                <div className="media-card" key={m.id}>
                  <div className="media-thumb" style={{ cursor: 'pointer' }} onClick={() => playVideo(m.url, m.title)}>
                    <img src={m.thumb || 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500'} alt={m.title} /><span className="media-type">Video</span>
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.35)' }}>
                      <span style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--gold)', color: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', fontWeight: 700 }}>▶</span>
                    </div>
                  </div>
                  <div className="media-body"><h5>{m.title}</h5><p>{m.desc}</p><button className="btn btn-dark" style={{ padding: '6px 12px', fontSize: '0.8rem', marginTop: '8px' }} onClick={() => playVideo(m.url, m.title)}>▶ Play Video</button></div>
                </div>
              );
              if (m.type === 'audio') return (
                <div className="media-card" key={m.id}>
                  <div className="media-thumb" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg,#0a1628,#1a2f4a)' }}>
                    <span style={{ fontSize: '3rem' }}>🎙️</span><span className="media-type">Audio</span>
                  </div>
                  <div className="media-body"><h5>{m.title}</h5><p>{m.desc}</p><audio controls preload="metadata" style={{ width: '100%', marginTop: '8px', height: '36px' }}><source src={m.url} type="audio/mpeg" /></audio></div>
                </div>
              );
              return null;
            })}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};
