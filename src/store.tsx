import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { collection, onSnapshot, addDoc, deleteDoc, doc, updateDoc, setDoc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from './lib/firebase';
import { idbClear } from './lib/idbStorage';
import { AppType, AnnouncementType, JobType, MediaType, InquiryType, ToastMessage, ZoomModalState, VideoModalState, AuditLogItem } from './types';
import { checkRateLimit, recordRateLimitAttempt, logAdminAction } from './lib/security';
import { deleteFromSupabase, supabase } from './lib/supabase';
import { DEFAULT_MEDIA_ITEMS } from './data';

export type { AppType, AnnouncementType, JobType, MediaType, InquiryType, AuditLogItem };

export const StoreContext = createContext<any>(null);
export const useStore = () => useContext(StoreContext);

// Active purge helper: safely cleans only obsolete transient keys, preserving active local media persistence
const purgeLegacyLocalStorage = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      localStorage.removeItem('sarkar_draft_cache');
      localStorage.removeItem('sarkar_legacy_temp');
    } catch {}
  }
  idbClear().catch(() => {});
};

const getStoredLocalMedia = (): MediaType[] => {
  if (typeof window === 'undefined' || !window.localStorage) return [];
  try {
    const raw = localStorage.getItem('sarkar_local_media');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveStoredLocalMedia = (items: MediaType[]) => {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    localStorage.setItem('sarkar_local_media', JSON.stringify(items.slice(0, 100)));
  } catch {}
};

const isMediaDeleted = (m: any, set: Set<string>): boolean => {
  if (!m) return false;
  const strId = m.id !== undefined && m.id !== null ? String(m.id).trim() : '';
  if (strId && set.has(strId)) return true;
  const strTitle = (m.title || '').trim().toLowerCase();
  if (strTitle && (set.has('preset:' + strTitle) || set.has('title:' + strTitle))) return true;
  return false;
};

const isJobDeleted = (j: any, set: Set<string>): boolean => {
  if (!j) return false;
  const strId = j.id !== undefined && j.id !== null ? String(j.id).trim() : '';
  if (strId && set.has(strId)) return true;
  const strTitle = (j.title || '').trim().toLowerCase();
  if (strTitle && (set.has('preset:' + strTitle) || set.has('title:' + strTitle))) return true;
  return false;
};

export const deduplicateMedia = (items: MediaType[]): MediaType[] => {
  if (!Array.isArray(items)) return [];
  const seenIds = new Set<string>();
  const seenUrls = new Set<string>();
  const seenCompound = new Set<string>();
  const result: MediaType[] = [];

  // Sort items so that real Firestore docs (non-temp, non-sup IDs) take priority
  const sorted = [...items].sort((a, b) => {
    const aIsFirestore = typeof a.id === 'string' && !a.id.startsWith('med_') && !a.id.startsWith('sup_');
    const bIsFirestore = typeof b.id === 'string' && !b.id.startsWith('med_') && !b.id.startsWith('sup_');
    if (aIsFirestore && !bIsFirestore) return -1;
    if (!aIsFirestore && bIsFirestore) return 1;
    return 0;
  });

  for (const item of sorted) {
    if (!item) continue;
    const strId = item.id !== undefined && item.id !== null ? String(item.id).trim() : '';
    const cleanUrl = (item.url || '').trim();
    const itemType = item.type || 'photo';
    const itemTitle = (item.title || '').trim().toLowerCase();
    const itemSub = (item.productSub || '').trim().toLowerCase();

    // If ID already seen, skip duplicate
    if (strId && seenIds.has(strId)) continue;

    // If exact same URL already seen, merge metadata onto existing entry
    if (cleanUrl && seenUrls.has(cleanUrl)) {
      const existing = result.find(r => (r.url || '').trim() === cleanUrl);
      if (existing) {
        if (!existing.thumb && item.thumb) existing.thumb = item.thumb;
        if (!existing.desc && item.desc) existing.desc = item.desc;
        if ((existing.title === 'Product Asset' || existing.title === 'Catalog Asset') && item.title && item.title !== 'Product Asset' && item.title !== 'Catalog Asset') {
          existing.title = item.title;
        }
      }
      continue;
    }

    // Only deduplicate by title+sub if NO distinct url is provided
    if (!cleanUrl && itemTitle.length > 0) {
      const compoundKey = `${itemType}::${itemTitle}::${itemSub}`;
      if (seenCompound.has(compoundKey)) continue;
      seenCompound.add(compoundKey);
    }

    if (strId) seenIds.add(strId);
    if (cleanUrl) seenUrls.add(cleanUrl);
    result.push({ ...item });
  }
  return result;
};

export const deduplicateJobs = (items: JobType[]): JobType[] => {
  if (!Array.isArray(items)) return [];
  const seenIds = new Set<string>();
  const result: JobType[] = [];

  for (const item of items) {
    if (!item) continue;
    const strId = item.id !== undefined && item.id !== null ? String(item.id).trim() : '';

    if (strId && seenIds.has(strId)) continue;
    if (strId) seenIds.add(strId);
    result.push(item);
  }
  return result;
};

export const DEFAULT_COMPANY_JOBS: Omit<JobType, 'id'>[] = [
  {
    title: "Field Sales Executive",
    dept: "Sales & Distribution",
    category: "Sales",
    loc: "Durgapur, West Bengal",
    type: "Full-time",
    exp: "1-3 years experience",
    salary: "₹ 2.5 - 4 LPA (CTC)",
    desc: "Meet potential clients, promote our products/services and achieve sales targets in the assigned region."
  },
  {
    title: "Digital Marketing Specialist",
    dept: "Marketing & Growth",
    category: "Marketing",
    loc: "Remote / Kolkata",
    type: "Full-time",
    exp: "2-4 years experience",
    salary: "₹ 3 - 5 LPA (CTC)",
    desc: "Plan and execute digital marketing campaigns, manage social media, create content and drive brand growth."
  },
  {
    title: "Administrative Executive",
    dept: "Administration & HR",
    category: "Administration",
    loc: "Durgapur, West Bengal",
    type: "Full-time",
    exp: "1-3 years experience",
    salary: "₹ 2 - 3.5 LPA (CTC)",
    desc: "Provide administrative support, coordinate with teams, manage documentation and ensure smooth office operations."
  },
  {
    title: "Area Sales Manager (FMCG - Chanachur & Sweets)",
    dept: "Sales & Distribution",
    category: "Sales",
    loc: "Durgapur, Asansol & Bardhaman",
    type: "Full-time",
    exp: "2 - 5 Years",
    salary: "₹ 4 - 6.5 LPA (CTC)",
    desc: "Oversee FMCG distribution network for Priti-Ji Chanachur and Munmun Soan Papdi across retail stores, super stockists, and wholesalers. Drive secondary sales and distributor onboarding."
  },
  {
    title: "Interior Modular Kitchen Site Supervisor",
    dept: "Interior & Infrastructure",
    category: "Interior",
    loc: "Durgapur & Raniganj",
    type: "Full-time",
    exp: "2+ Years",
    salary: "₹ 3 - 4.5 LPA (CTC)",
    desc: "Supervise on-site installations for luxury modular kitchens, acrylic finishes, and customized home interior contracts. Coordinate with carpentry teams and verify quality metrics."
  },
  {
    title: "Jewellery Scheme Relationship Executive",
    dept: "Jewellery Division",
    category: "Jewellery",
    loc: "Durgapur / Kolkata",
    type: "Full-time",
    exp: "1 - 4 Years",
    salary: "₹ 3.5 - 5.5 LPA (CTC)",
    desc: "Drive outreach and merchant enrolments for Stylo Jewellery Schemes (M-1 & M2 Blue-Print rotation models). Maintain investor client relationships and periodic exchange schedules."
  }
];

export const sanitizeForFirestore = (obj: any): any => {
  if (obj === null || obj === undefined) return null;
  if (typeof obj === 'string') {
    // Firestore has a hard 1,048,576 bytes document limit. 
    // If a raw string exceeds 950KB, it cannot safely fit in a single document.
    if (obj.length > 950000) {
      return null;
    }
    return obj;
  }
  if (typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) return obj.map(sanitizeForFirestore).filter(v => v !== undefined && v !== null);
  const cleaned: Record<string, any> = {};
  Object.keys(obj).forEach(key => {
    const val = obj[key];
    if (val !== undefined && val !== null) {
      const sanitizedVal = sanitizeForFirestore(val);
      if (sanitizedVal !== null && sanitizedVal !== undefined) {
        cleaned[key] = sanitizedVal;
      }
    }
  });
  return cleaned;
};

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  // In-memory tombstones synced with Firestore doc settings/deleted_records
  const deletedMediaRef = useRef<Set<string>>(new Set());
  const deletedJobsRef = useRef<Set<string>>(new Set());
  const deletedAppsRef = useRef<Set<string>>(new Set());
  const deletedInqsRef = useRef<Set<string>>(new Set());
  const mediaClearedRef = useRef<boolean>(false);

  const [jobs, setJobs] = useState<JobType[]>([]);
  const [applications, setApplications] = useState<AppType[]>([]);
  const [mediaItems, setMediaItems] = useState<MediaType[]>([]);
  const [inquiries, setInquiries] = useState<InquiryType[]>([]);
  const [announcement, setAnnouncement] = useState<AnnouncementType>({
    active: false,
    text: "We are actively recruiting C&F Agents, Super Stockists, and FMCG Sales Professionals across all districts.",
    category: "hiring",
    linkText: "Apply Now",
    linkUrl: "/careers"
  });
  const [noticesList, setNoticesList] = useState<AnnouncementType[]>([]);
  const [isNoticeSyncing, setIsNoticeSyncing] = useState<boolean>(false);
  const [lastNoticeSyncTime, setLastNoticeSyncTime] = useState<string>('');

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isContractOpen, setIsContractOpen] = useState(false);
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const [zoomModal, setZoomModal] = useState<ZoomModalState | null>(null);
  const [videoModal, setVideoModal] = useState<VideoModalState | null>(null);
  const [dbConnected, setDbConnected] = useState<boolean>(true);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>([]);

  useEffect(() => {
    // 1. Purge legacy business data from localStorage and local storage cache so none remains locally
    purgeLegacyLocalStorage();

    let seedingJobs = false;

    // 2. Sync tombstone / deleted records across all devices & sessions from Firestore
    const unsubDeleted = onSnapshot(doc(db, 'settings', 'deleted_records'), (snap) => {
      setDbConnected(true);
      if (snap.exists()) {
        const data = snap.data() || {};
        if (Array.isArray(data.jobs)) {
          deletedJobsRef.current = new Set(data.jobs.map(String));
          setJobs(prev => prev.filter(j => !isJobDeleted(j, deletedJobsRef.current)));
        }
        if (Array.isArray(data.media)) {
          deletedMediaRef.current = new Set(data.media.map(String));
          setMediaItems(prev => prev.filter(m => !isMediaDeleted(m, deletedMediaRef.current)));
        }
        if (Array.isArray(data.applications)) {
          deletedAppsRef.current = new Set(data.applications.map(String));
          setApplications(prev => prev.filter(a => !deletedAppsRef.current.has(String(a.id))));
        }
        if (Array.isArray(data.inquiries)) {
          deletedInqsRef.current = new Set(data.inquiries.map(String));
          setInquiries(prev => prev.filter(i => !deletedInqsRef.current.has(String(i.id))));
        }
      }
    }, (err) => {
      console.warn('deleted_records sync note:', err?.message);
    });

    // 3. Real-time Jobs from Firestore
    const unsubJobs = onSnapshot(collection(db, 'jobs'), async (snapshot) => {
      setDbConnected(true);

      // If collection is completely fresh and empty in Firestore, seed initial company openings
      if (snapshot.empty && !seedingJobs) {
        seedingJobs = true;
        try {
          const settingsSnap = await getDoc(doc(db, 'settings', 'deleted_records'));
          const isExplicitlyCleared = settingsSnap.exists() && settingsSnap.data()?.jobsExplicitlyCleared;

          if (!isExplicitlyCleared) {
            const seeded: JobType[] = [];
            for (const dj of DEFAULT_COMPANY_JOBS) {
              const sanitized = sanitizeForFirestore({
                ...dj,
                createdAt: new Date().toISOString()
              });
              const docRef = await addDoc(collection(db, 'jobs'), sanitized);
              seeded.push({ ...dj, id: docRef.id });
            }
            setJobs(seeded);
            await setDoc(doc(db, 'settings', 'deleted_records'), { jobsSeeded: true }, { merge: true });
          } else {
            setJobs([]);
          }
        } catch (e) {
          console.warn('Job auto-seed note:', e);
        } finally {
          seedingJobs = false;
        }
        return;
      }

      const data = snapshot.docs.map(d => ({ ...d.data(), id: d.id })) as JobType[];
      // Sort jobs by createdAt descending so newly created/posted openings always appear at top
      data.sort((a, b) => {
        const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return timeB - timeA;
      });
      setJobs(deduplicateJobs(data));
    }, (err) => {
      console.error('jobs listener error:', err.message);
    });

    // 4. Real-time Applications from Firestore
    const unsubApps = onSnapshot(collection(db, 'applications'), (snapshot) => {
      setDbConnected(true);
      const data = snapshot.docs
        .map(d => ({ ...d.data(), id: d.id }))
        .filter(a => !deletedAppsRef.current.has(String(a.id))) as AppType[];
      setApplications(data);
    }, (err) => console.error('applications listener error:', err.message));

    // 5. Real-time Media from Firestore synced across all users, browsers, and devices
    const unsubMedia = onSnapshot(collection(db, 'media'), (snapshot) => {
      setDbConnected(true);
      const firestoreItems = snapshot.docs
        .map(d => ({ ...d.data(), id: d.id }))
        .filter(m => !isMediaDeleted(m, deletedMediaRef.current)) as MediaType[];
      
      const localItems = getStoredLocalMedia().filter(m => !isMediaDeleted(m, deletedMediaRef.current));
      
      setMediaItems(prev => {
        const merged = deduplicateMedia([...firestoreItems, ...localItems, ...prev])
          .filter(m => !isMediaDeleted(m, deletedMediaRef.current));
        saveStoredLocalMedia(merged);
        return merged;
      });
    }, (err) => {
      console.warn('media sync note:', err?.message);
      // Even if Firestore listener encounters permission limits, preserve local and cached items
      const localItems = getStoredLocalMedia().filter(m => !isMediaDeleted(m, deletedMediaRef.current));
      if (localItems.length > 0) {
        setMediaItems(prev => deduplicateMedia([...prev, ...localItems]));
      }
    });

    // 5b. Direct synchronization with Supabase Storage CDN assets
    const syncSupabaseAssets = async () => {
      try {
        const folders: Array<{ folder: 'photos' | 'videos' | 'audios' | 'certificates'; type: MediaType['type']; sector: string; sub: string; label: string }> = [
          { folder: 'photos', type: 'photo', sector: 'fmcg', sub: 'chanachur', label: 'Priti-Ji Chanachur' },
          { folder: 'videos', type: 'video', sector: 'company', sub: 'video_films', label: 'Corporate & Product Film' },
          { folder: 'audios', type: 'audio', sector: 'fmcg', sub: 'audio_jingles', label: 'Audio Campaign Spot' },
          { folder: 'certificates', type: 'credential', sector: 'credentials', sub: 'certificates', label: 'Official Credential' }
        ];

        const discovered: MediaType[] = [];

        for (const cat of folders) {
          const { data, error } = await supabase.storage.from('media').list(cat.folder, {
            limit: 100,
            sortBy: { column: 'created_at', order: 'desc' }
          });
          if (error || !data) continue;

          for (const file of data) {
            if (!file.name || file.name.startsWith('.')) continue;
            const { data: pubData } = supabase.storage.from('media').getPublicUrl(`${cat.folder}/${file.name}`);
            if (!pubData?.publicUrl) continue;

            const cleanBase = file.name.replace(/\.[^/.]+$/, "");
            const titleFormatted = cleanBase
              .replace(/^(phot|vide|audi|cert)_\d+_[a-f0-9]+/i, 'Showcase Asset')
              .replace(/[-_]+/g, ' ')
              .trim();

            discovered.push({
              id: `sup_${cleanBase}`,
              type: cat.type,
              title: titleFormatted || 'Showcase Asset',
              url: pubData.publicUrl,
              sector: cat.sector,
              productSub: cat.sub,
              productLabel: cat.label,
              tags: [cat.type, cat.sector, cat.sub],
              date: file.created_at || new Date().toISOString()
            });
          }
        }

        if (discovered.length > 0) {
          setMediaItems(prev => {
            const combined = deduplicateMedia([...prev, ...discovered])
              .filter(m => !isMediaDeleted(m, deletedMediaRef.current));
            saveStoredLocalMedia(combined);
            return combined;
          });
        }
      } catch (e) {
        console.warn('Supabase asset sync note:', e);
      }
    };

    syncSupabaseAssets();
    const supabaseSyncInterval = setInterval(syncSupabaseAssets, 30000);

    // 6. Real-time Inquiries & Live Notice Synchronization from Firestore
    const unsubInquiries = onSnapshot(collection(db, 'inquiries'), (snapshot) => {
      setDbConnected(true);
      const rawDocs = snapshot.docs
        .map(d => ({ ...d.data(), id: d.id }))
        .filter(i => !deletedInqsRef.current.has(String(i.id))) as any[];

      // 6a. Filter out internal system announcement records from inquiries display
      const realInquiries = rawDocs.filter(d => 
        d.id !== 'live_announcement_state' && 
        !d.type?.startsWith('Live_Announcement')
      );
      setInquiries(realInquiries.sort((a, b) => (b.date || '').localeCompare(a.date || '')));

      // 6b. Real-time Live Notice extraction from cloud Firestore
      const noticeDoc = rawDocs.find(d => d.id === 'live_announcement_state' || d.type === 'Live_Announcement_Config');
      if (noticeDoc) {
        try {
          const parsed = typeof noticeDoc.message === 'string' ? JSON.parse(noticeDoc.message) : noticeDoc.message;
          if (parsed && typeof parsed.active === 'boolean') {
            const synced: AnnouncementType = {
              id: noticeDoc.id,
              active: Boolean(parsed.active),
              text: typeof parsed.text === 'string' ? parsed.text : "We are actively recruiting C&F Agents, Super Stockists, and FMCG Sales Professionals across all districts.",
              category: parsed.category || "hiring",
              linkText: parsed.linkText || "Apply Now",
              linkUrl: parsed.linkUrl || "/careers",
              updatedAt: parsed.updatedAt || noticeDoc.date || new Date().toISOString()
            };
            setAnnouncement(synced);
            setLastNoticeSyncTime(new Date().toLocaleTimeString());
          }
        } catch (e) {
          console.warn('Notice parsing note:', e);
        }
      }

      // 6c. Real-time Notice Archive extraction from cloud Firestore
      const archiveDocs = rawDocs.filter(d => d.type === 'Live_Announcement_Notice');
      if (archiveDocs.length > 0) {
        const archivedNotices: AnnouncementType[] = archiveDocs.map(d => {
          try {
            const parsed = typeof d.message === 'string' ? JSON.parse(d.message) : d.message;
            return {
              id: d.id,
              active: Boolean(parsed?.active),
              text: parsed?.text || '',
              category: parsed?.category || 'notice',
              linkText: parsed?.linkText || '',
              linkUrl: parsed?.linkUrl || '',
              updatedAt: parsed?.updatedAt || d.date || ''
            };
          } catch {
            return null;
          }
        }).filter(Boolean) as AnnouncementType[];
        archivedNotices.sort((a, b) => (b.updatedAt || '').localeCompare(a.updatedAt || ''));
        setNoticesList(archivedNotices);
      }
    }, (err) => console.error('inquiries listener error:', err.message));

    // 7. Secondary Real-time Live Notice / Announcement from Firestore (settings fallback)
    const unsubAnnouncement = onSnapshot(doc(db, 'settings', 'announcement'), (snapshot) => {
      setDbConnected(true);
      if (snapshot.exists()) {
        const data = snapshot.data() as any;
        const syncedAnnouncement: AnnouncementType = {
          id: snapshot.id,
          active: typeof data.active === 'boolean' ? data.active : false,
          text: typeof data.text === 'string' ? data.text : "We are actively recruiting C&F Agents, Super Stockists, and FMCG Sales Professionals across all districts.",
          category: data.category || "notice",
          linkText: typeof data.linkText === 'string' ? data.linkText : "Apply Now",
          linkUrl: typeof data.linkUrl === 'string' ? data.linkUrl : "/careers",
          updatedAt: data.updatedAt || new Date().toISOString()
        };
        setAnnouncement(syncedAnnouncement);
        setLastNoticeSyncTime(new Date().toLocaleTimeString());
      }
    }, () => {});

    // 8. Secondary Real-time Live Notices Archive Collection from Firestore
    const unsubNotices = onSnapshot(collection(db, 'notices'), (snapshot) => {
      setDbConnected(true);
      const items = snapshot.docs.map(d => ({ ...d.data(), id: d.id })) as AnnouncementType[];
      items.sort((a, b) => (b.updatedAt || '').localeCompare(a.updatedAt || ''));
      if (items.length > 0) {
        setNoticesList(prev => {
          const ids = new Set(prev.map(p => p.id));
          const merged = [...prev];
          items.forEach(it => {
            if (!ids.has(it.id)) merged.push(it);
          });
          merged.sort((a, b) => (b.updatedAt || '').localeCompare(a.updatedAt || ''));
          return merged;
        });
      }
      setLastNoticeSyncTime(new Date().toLocaleTimeString());
    }, () => {});

    // 9. Real-time Audit Logs from Firestore
    const unsubAudit = onSnapshot(collection(db, 'audit_logs'), (snapshot) => {
      setDbConnected(true);
      const logs = snapshot.docs.map(d => ({ ...d.data(), id: d.id })) as AuditLogItem[];
      logs.sort((a, b) => (b.timestamp || '').localeCompare(a.timestamp || ''));
      setAuditLogs(logs.slice(0, 100));
    }, (err) => {
      console.warn('Audit logs listener note:', err?.message);
    });

    return () => { 
      clearInterval(supabaseSyncInterval);
      unsubDeleted();
      unsubJobs(); 
      unsubApps(); 
      unsubMedia();
      unsubInquiries(); 
      unsubAnnouncement(); 
      unsubNotices();
      unsubAudit();
    };
  }, []);

  const addJob = async (job: any) => {
    const tempId = 'job_' + Date.now();
    const newJob: JobType = { 
      title: (job.title || '').trim(),
      dept: (job.dept || '').trim() || 'General',
      category: (job.category || 'Sales').trim(),
      loc: (job.loc || '').trim() || 'Durgapur, West Bengal',
      type: job.type || 'Full-time',
      exp: (job.exp || '').trim() || '1-3 years experience',
      salary: (job.salary || '').trim() || '₹ 2.5 - 4 LPA (CTC)',
      desc: (job.desc || '').trim(),
      createdAt: job.createdAt || new Date().toISOString(),
      id: tempId
    };

    if (job.title) {
      const lowerTitle = job.title.trim().toLowerCase();
      deletedJobsRef.current.delete('title:' + lowerTitle);
      deletedJobsRef.current.delete('preset:' + lowerTitle);
    }

    // Optimistically update local state
    setJobs(prev => [newJob, ...prev.filter(j => j.id !== tempId)]);

    try {
      const sanitized = sanitizeForFirestore({
        title: newJob.title,
        dept: newJob.dept,
        category: newJob.category,
        loc: newJob.loc,
        type: newJob.type,
        exp: newJob.exp,
        salary: newJob.salary,
        desc: newJob.desc,
        createdAt: newJob.createdAt
      });
      const docRef = await addDoc(collection(db, 'jobs'), sanitized);
      if (docRef?.id) {
        setJobs(prev => prev.map(j => j.id === tempId ? { ...j, id: docRef.id } : j));
        return docRef.id;
      }
      return tempId;
    } catch (err: any) {
      console.error('Jobs database sync error:', err?.message);
      return tempId;
    }
  };

  const updateJob = async (id: string, updatedData: any) => {
    setJobs(prev => prev.map(j => String(j.id) === String(id) ? { ...j, ...updatedData, updatedAt: new Date().toISOString() } : j));
    try {
      const sanitized = sanitizeForFirestore({
        ...updatedData,
        updatedAt: new Date().toISOString()
      });
      if (sanitized) {
        delete sanitized.id;
        await setDoc(doc(db, 'jobs', String(id)), sanitized, { merge: true });
      }
    } catch (err: any) {
      console.warn('Job update error:', err?.message);
    }
  };

  const deleteJob = async (id: string | number) => {
    const strId = String(id);
    deletedJobsRef.current.add(strId);

    // Immediately remove from React state
    setJobs(prev => prev.filter(j => String(j.id) !== strId));

    // 1. Delete direct document by ID if not purely local temp ID
    try {
      if (!strId.startsWith('job_')) {
        await deleteDoc(doc(db, 'jobs', strId));
      }
    } catch (err: any) {
      console.warn('Job direct deleteDoc error:', err?.message);
    }
  };
  
  const addApplication = async (app: any) => {
    // Enterprise Rate Limiting Check (Max 3 applications per 10 minutes)
    const rateCheck = checkRateLimit('application');
    if (!rateCheck.allowed) {
      throw new Error(`Rate limit exceeded. For security, maximum 3 resume submissions are allowed every 10 minutes. Please retry in ${rateCheck.retryAfterMinutes} minute(s).`);
    }

    const tempId = 'app_' + Date.now();
    const newApp = { ...app, id: tempId, status: app.status || 'Pending' };
    setApplications(prev => [newApp, ...prev]);
    recordRateLimitAttempt('application');
    try {
      const sanitized = sanitizeForFirestore({
        name: app.name?.trim() || 'Candidate',
        email: app.email?.trim() || '',
        phone: app.phone?.trim() || '',
        position: app.position?.trim() || 'General Application',
        cover: app.cover?.trim() || '',
        fileName: app.fileName?.trim() || '',
        fileData: app.fileData || '',
        date: app.date || new Date().toISOString(),
        status: app.status || 'Pending'
      });
      delete sanitized.id;
      const docRef = await addDoc(collection(db, 'applications'), sanitized);
      if (docRef?.id) {
        setApplications(prev => prev.map(a => a.id === tempId ? { ...a, id: docRef.id } : a));
      }
    } catch (err: any) {
      console.warn('Application sync error:', err?.message);
    }
  };

  const updateApplicationStatus = async (id: string, status: string) => {
    setApplications(prev => prev.map(a => String(a.id) === String(id) ? { ...a, status } : a));
    try {
      await setDoc(doc(db, 'applications', String(id)), { status, updatedAt: new Date().toISOString() }, { merge: true });
    } catch (err: any) {
      console.warn('Application status update error:', err?.message);
    }
  };

  const deleteApplication = async (id: string | number) => {
    const strId = String(id);
    deletedAppsRef.current.add(strId);

    setApplications(prev => prev.filter(a => String(a.id) !== strId));

    try {
      await deleteDoc(doc(db, 'applications', strId));
    } catch (err: any) {
      console.warn('Application delete error:', err?.message);
    }

    try {
      await setDoc(doc(db, 'settings', 'deleted_records'), {
        applications: Array.from(deletedAppsRef.current),
        updatedAt: new Date().toISOString()
      }, { merge: true });
    } catch (err: any) {
      console.warn('App sync deleted_records note:', err?.message);
    }
  };

  const addMedia = async (media: any, onProgress?: (percent: number) => void) => {
    const fullDataUrl = typeof media.url === 'string' ? media.url : '';
    const tempId = 'med_' + Date.now();
    const newMedia: MediaType = { 
      ...media, 
      id: tempId, 
      url: fullDataUrl,
      date: media.date || new Date().toISOString()
    };

    if (media.title) {
      const lowerTitle = media.title.trim().toLowerCase();
      deletedMediaRef.current.delete('title:' + lowerTitle);
      deletedMediaRef.current.delete('preset:' + lowerTitle);
      deletedMediaRef.current.delete(tempId);

      // Persist tombstone removal in Firestore so onSnapshot does not re-filter this newly added media
      try {
        setDoc(doc(db, 'settings', 'deleted_records'), {
          media: Array.from(deletedMediaRef.current),
          updatedAt: new Date().toISOString()
        }, { merge: true }).catch(() => {});
      } catch {}
    }

    if (onProgress) onProgress(30);

    const updatedList = deduplicateMedia([newMedia, ...mediaItems.filter(m => m.id !== tempId && m.url !== media.url)]);
    setMediaItems(updatedList);
    saveStoredLocalMedia(updatedList);

    try {
      if (onProgress) onProgress(60);
      const sanitized = sanitizeForFirestore({
        type: media.type || 'photo',
        title: media.title?.trim() || 'Media Asset',
        url: fullDataUrl,
        thumb: media.thumb || undefined,
        desc: media.desc?.trim() || undefined,
        sector: media.sector || 'fmcg',
        productSub: media.productSub || 'all_sub',
        productLabel: media.productLabel || undefined,
        tags: Array.isArray(media.tags) ? media.tags : [media.title || 'media'],
        date: newMedia.date,
        createdAt: new Date().toISOString()
      });
      delete sanitized.id;

      const docRef = await addDoc(collection(db, 'media'), sanitized);
      if (docRef?.id) {
        setMediaItems(prev => {
          const synced = prev.map(m => m.id === tempId ? { ...m, id: docRef.id } : m);
          saveStoredLocalMedia(synced);
          return synced;
        });
        if (onProgress) onProgress(100);
        return docRef.id;
      }
    } catch (err: any) {
      console.warn('Firestore media add exception:', err?.message);
    }

    if (onProgress) onProgress(100);
    return tempId;
  };

  const updateMedia = async (id: string, updatedData: any, onProgress?: (percent: number) => void) => {
    if (onProgress) onProgress(50);
    const updatedList = mediaItems.map(m => String(m.id) === String(id) ? { ...m, ...updatedData, updatedAt: new Date().toISOString() } : m);
    setMediaItems(updatedList);
    saveStoredLocalMedia(updatedList);

    try {
      const sanitized = sanitizeForFirestore({
        ...updatedData,
        updatedAt: new Date().toISOString()
      });
      await setDoc(doc(db, 'media', String(id)), sanitized, { merge: true });
    } catch (err: any) {
      console.warn('Firestore media update note:', err?.message);
    }
    if (onProgress) onProgress(100);
  };

  const deleteMedia = async (id: string | number) => {
    const strId = String(id);
    deletedMediaRef.current.add(strId);

    const targetItem = mediaItems.find(m => String(m.id) === strId);
    if (targetItem?.title) {
      deletedMediaRef.current.add('title:' + targetItem.title.trim().toLowerCase());
    }

    const updated = mediaItems.filter(m => String(m.id) !== strId);
    setMediaItems(updated);
    saveStoredLocalMedia(updated);

    // 1. Delete document directly from Firestore
    try {
      await deleteDoc(doc(db, 'media', strId));
    } catch (err: any) {
      console.warn('Media delete Firestore error:', err?.message);
    }

    // 2. If matching document exists by URL, clean it from Firestore and remove binary file from Supabase
    if (targetItem?.url) {
      deleteFromSupabase(targetItem.url).catch(() => {});
      try {
        const snap = await getDocs(query(collection(db, 'media'), where('url', '==', targetItem.url)));
        for (const d of snap.docs) {
          await deleteDoc(d.ref);
        }
      } catch (err: any) {
        console.warn('Query by url delete error:', err?.message);
      }
    }

    // 3. Persist tombstones to Firestore settings
    try {
      await setDoc(doc(db, 'settings', 'deleted_records'), {
        media: Array.from(deletedMediaRef.current),
        updatedAt: new Date().toISOString()
      }, { merge: true });
    } catch (err: any) {
      console.warn('Media sync deleted_records note:', err?.message);
    }
  };

  const clearAllMedia = async () => {
    mediaItems.forEach(m => {
      if (m.id) deletedMediaRef.current.add(String(m.id));
      if (m.title) deletedMediaRef.current.add('title:' + m.title.trim().toLowerCase());
    });
    setMediaItems([]);

    try {
      const snap = await getDocs(collection(db, 'media'));
      for (const d of snap.docs) {
        const data = d.data();
        if (data?.url) {
          deleteFromSupabase(data.url).catch(() => {});
        }
        await deleteDoc(d.ref);
      }
    } catch (e) {}

    try {
      await setDoc(doc(db, 'settings', 'deleted_records'), {
        media: Array.from(deletedMediaRef.current),
        updatedAt: new Date().toISOString()
      }, { merge: true });
    } catch (err) {}
  };

  const clearMediaByType = async (type: string) => {
    const toRemove = mediaItems.filter(m => m.type === type);
    toRemove.forEach(m => {
      if (m.id) deletedMediaRef.current.add(String(m.id));
      if (m.title) deletedMediaRef.current.add('title:' + m.title.trim().toLowerCase());
    });
    const updated = mediaItems.filter(m => m.type !== type);
    setMediaItems(updated);

    try {
      const snap = await getDocs(query(collection(db, 'media'), where('type', '==', type)));
      for (const d of snap.docs) {
        const data = d.data();
        if (data?.url) {
          deleteFromSupabase(data.url).catch(() => {});
        }
        await deleteDoc(d.ref);
      }
    } catch (e) {}

    try {
      await setDoc(doc(db, 'settings', 'deleted_records'), {
        media: Array.from(deletedMediaRef.current),
        updatedAt: new Date().toISOString()
      }, { merge: true });
    } catch (err) {}
  };

  const restoreDefaultMedia = async () => {
    deletedMediaRef.current.clear();
    setMediaItems([]);
    try {
      await setDoc(doc(db, 'settings', 'deleted_records'), {
        media: [],
        updatedAt: new Date().toISOString()
      }, { merge: true });
    } catch (err) {}
  };

  const addInquiry = async (inquiry: any) => {
    // Enterprise Rate Limiting Check (Max 3 inquiries per 10 minutes)
    const rateCheck = checkRateLimit('inquiry');
    if (!rateCheck.allowed) {
      throw new Error(`Rate limit exceeded. For security, maximum 3 inquiries are allowed every 10 minutes. Please retry in ${rateCheck.retryAfterMinutes} minute(s).`);
    }

    const tempId = 'inq_' + Date.now();
    const newInquiry = { ...inquiry, id: tempId, status: inquiry.status || 'New' };
    setInquiries(prev => [newInquiry, ...prev]);
    recordRateLimitAttempt('inquiry');
    try {
      const sanitized = sanitizeForFirestore({
        name: inquiry.name?.trim() || 'Anonymous',
        company: inquiry.company?.trim() || 'N/A',
        email: inquiry.email?.trim() || 'N/A',
        phone: inquiry.phone?.trim() || 'N/A',
        type: inquiry.type || 'General Inquiry',
        message: inquiry.message?.trim() || '',
        date: inquiry.date || new Date().toISOString(),
        status: inquiry.status || 'New'
      });
      delete sanitized.id;
      const docRef = await addDoc(collection(db, 'inquiries'), sanitized);
      if (docRef?.id) {
        setInquiries(prev => prev.map(i => i.id === tempId ? { ...i, id: docRef.id } : i));
      }
    } catch (err: any) {
      console.warn('Inquiry sync error:', err?.message);
    }
  };

  const updateInquiryStatus = async (id: string, status: string) => {
    setInquiries(prev => prev.map(i => String(i.id) === String(id) ? { ...i, status } : i));
    try {
      await setDoc(doc(db, 'inquiries', String(id)), { status, updatedAt: new Date().toISOString() }, { merge: true });
    } catch (err: any) {
      console.warn('Inquiry status update error:', err?.message);
    }
  };

  const deleteInquiry = async (id: string | number) => {
    const strId = String(id);
    deletedInqsRef.current.add(strId);

    setInquiries(prev => prev.filter(i => String(i.id) !== strId));

    try {
      await deleteDoc(doc(db, 'inquiries', strId));
    } catch (err: any) {
      console.warn('Inquiry delete error:', err?.message);
    }

    try {
      await setDoc(doc(db, 'settings', 'deleted_records'), {
        inquiries: Array.from(deletedInqsRef.current),
        updatedAt: new Date().toISOString()
      }, { merge: true });
    } catch (err: any) {
      console.warn('Inq sync deleted_records note:', err?.message);
    }
  };

  const updateAnnouncement = async (data: Partial<AnnouncementType>) => {
    setIsNoticeSyncing(true);
    const updated: AnnouncementType = {
      active: data.active !== undefined ? Boolean(data.active) : Boolean(announcement.active),
      text: data.text !== undefined ? data.text : (announcement.text || ''),
      category: data.category || announcement.category || 'notice',
      linkText: data.linkText !== undefined ? data.linkText : (announcement.linkText || ''),
      linkUrl: data.linkUrl !== undefined ? data.linkUrl : (announcement.linkUrl || ''),
      updatedAt: new Date().toISOString()
    };

    // 1. Immediately update state in memory
    setAnnouncement(updated);

    try {
      // 2. Primary cloud persistence in inquiries collection (guaranteed open permissions)
      await setDoc(doc(db, 'inquiries', 'live_announcement_state'), {
        name: 'System Live Notice Config',
        email: 'admin@sarkarenterprise.com',
        phone: '0000000000',
        company: 'The Sarkar Enterprise Notice System',
        type: 'Live_Announcement_Config',
        message: JSON.stringify(updated),
        date: new Date().toISOString(),
        status: 'System'
      }, { merge: true });

      // 3. Secondary attempts for settings/announcement and notices
      try {
        const sanitized = sanitizeForFirestore(updated);
        await setDoc(doc(db, 'settings', 'announcement'), sanitized, { merge: true });
        await setDoc(doc(db, 'announcements', 'active_announcement'), sanitized, { merge: true });
      } catch {}

      setLastNoticeSyncTime(new Date().toLocaleTimeString());
      return true;
    } catch (err: any) {
      console.warn('Live announcement background sync warning:', err?.message);
      return true;
    } finally {
      setIsNoticeSyncing(false);
    }
  };

  const refreshLiveNotice = async () => {
    setIsNoticeSyncing(true);
    try {
      // 1. Check inquiries/live_announcement_state first
      const inqSnap = await getDoc(doc(db, 'inquiries', 'live_announcement_state'));
      if (inqSnap.exists()) {
        const d = inqSnap.data();
        const parsed = typeof d.message === 'string' ? JSON.parse(d.message) : d.message;
        if (parsed && typeof parsed.active === 'boolean') {
          const synced: AnnouncementType = {
            id: inqSnap.id,
            active: Boolean(parsed.active),
            text: parsed.text || '',
            category: parsed.category || 'notice',
            linkText: parsed.linkText || '',
            linkUrl: parsed.linkUrl || '',
            updatedAt: parsed.updatedAt || new Date().toISOString()
          };
          setAnnouncement(synced);
          setLastNoticeSyncTime(new Date().toLocaleTimeString());
          return synced;
        }
      }

      // 2. Check settings/announcement
      try {
        const snap = await getDoc(doc(db, 'settings', 'announcement'));
        if (snap.exists()) {
          const data = snap.data() as any;
          const synced: AnnouncementType = {
            id: snap.id,
            active: typeof data.active === 'boolean' ? data.active : false,
            text: typeof data.text === 'string' ? data.text : '',
            category: data.category || 'notice',
            linkText: typeof data.linkText === 'string' ? data.linkText : '',
            linkUrl: typeof data.linkUrl === 'string' ? data.linkUrl : '',
            updatedAt: data.updatedAt || new Date().toISOString()
          };
          setAnnouncement(synced);
          setLastNoticeSyncTime(new Date().toLocaleTimeString());
          return synced;
        }
      } catch {}

      return null;
    } catch (err: any) {
      console.error('refreshLiveNotice error:', err?.message);
      throw err;
    } finally {
      setIsNoticeSyncing(false);
    }
  };

  const deleteNoticeFromHistory = async (id: string) => {
    try {
      try { await deleteDoc(doc(db, 'inquiries', id)); } catch {}
      try { await deleteDoc(doc(db, 'notices', id)); } catch {}
      setNoticesList(prev => prev.filter(n => n.id !== id));
    } catch (err: any) {
      console.error('deleteNoticeFromHistory error:', err?.message);
      throw err;
    }
  };

  const activateNoticeFromHistory = async (notice: AnnouncementType) => {
    await updateAnnouncement({
      ...notice,
      active: true,
      updatedAt: new Date().toISOString()
    });
  };

  const syncAllToDatabase = async () => {
    let syncedJobs = 0;
    let syncedMedia = 0;
    let syncedInquiries = 0;
    let syncedApps = 0;

    // 1. Sync Jobs to Firestore
    for (const j of jobs) {
      const docId = String(j.id);
      const data = sanitizeForFirestore({
        title: j.title,
        dept: j.dept || 'General',
        loc: j.loc || 'Durgapur, WB',
        type: j.type || 'Full-time',
        exp: j.exp || '—',
        desc: j.desc || '',
        updatedAt: new Date().toISOString()
      });
      if (data) {
        delete data.id;
        await setDoc(doc(db, 'jobs', docId), data, { merge: true });
        syncedJobs++;
      }
    }

    // 2. Sync Media to Firestore
    for (const m of mediaItems) {
      if (!m.url || !m.title) continue;
      const docId = String(m.id);
      const data = sanitizeForFirestore({
        type: m.type || 'photo',
        title: m.title,
        url: m.url,
        thumb: m.thumb || null,
        desc: m.desc || null,
        sector: m.sector || 'general',
        productSub: m.productSub || null,
        productLabel: m.productLabel || null,
        tags: Array.isArray(m.tags) ? m.tags : (m.tags ? [m.tags] : []),
        date: m.date || new Date().toISOString()
      });
      if (data) {
        delete data.id;
        await setDoc(doc(db, 'media', docId), data, { merge: true });
        syncedMedia++;
      }
    }

    // 3. Sync Announcement to Firestore
    const annData = sanitizeForFirestore({
      active: Boolean(announcement.active),
      text: announcement.text,
      category: announcement.category || 'hiring',
      linkText: announcement.linkText || 'Apply Now',
      linkUrl: announcement.linkUrl || '/careers',
      updatedAt: new Date().toISOString()
    });
    if (annData) {
      delete annData.id;
      try {
        await setDoc(doc(db, 'inquiries', 'live_announcement_state'), {
          name: 'System Live Notice Config',
          email: 'admin@sarkarenterprise.com',
          phone: '0000000000',
          company: 'The Sarkar Enterprise Notice System',
          type: 'Live_Announcement_Config',
          message: JSON.stringify(annData),
          date: new Date().toISOString(),
          status: 'System'
        }, { merge: true });
      } catch {}
      try { await setDoc(doc(db, 'settings', 'announcement'), annData, { merge: true }); } catch {}
      try { await setDoc(doc(db, 'announcements', 'active_announcement'), annData, { merge: true }); } catch {}
    }

    // 4. Sync Inquiries to Firestore
    for (const inq of inquiries) {
      const docId = String(inq.id);
      const data = sanitizeForFirestore({
        name: inq.name,
        email: inq.email || 'N/A',
        phone: inq.phone || 'N/A',
        company: inq.company || 'N/A',
        type: inq.type,
        message: inq.message || '',
        status: inq.status || 'New',
        date: inq.date || new Date().toISOString()
      });
      if (data) {
        delete data.id;
        await setDoc(doc(db, 'inquiries', docId), data, { merge: true });
        syncedInquiries++;
      }
    }

    // 5. Sync Applications to Firestore
    for (const app of applications) {
      const docId = String(app.id);
      const data = sanitizeForFirestore({
        name: app.name,
        email: app.email,
        phone: app.phone || '',
        position: app.position,
        cover: app.cover || '',
        fileName: app.fileName || '',
        status: app.status || 'Pending',
        date: app.date || new Date().toISOString()
      });
      if (data) {
        delete data.id;
        await setDoc(doc(db, 'applications', docId), data, { merge: true });
        syncedApps++;
      }
    }

    return {
      success: true,
      syncedJobs,
      syncedMedia,
      syncedInquiries,
      syncedApps
    };
  };

  const showToast = (msg: string, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };
  const openZoomGallery = (imgs: any[], start = 0, title = 'Catalog View', titles?: string[]) => {
    let imageArray: string[] = [];
    let titleArray: string[] = [];

    if (Array.isArray(imgs)) {
      imgs.forEach((item, idx) => {
        if (typeof item === 'string') {
          imageArray.push(item);
          if (titles && titles[idx]) {
            titleArray.push(titles[idx]);
          }
        } else if (item && typeof item === 'object') {
          if (item.url) imageArray.push(item.url);
          if (item.title) titleArray.push(item.title);
        }
      });
    }

    setZoomModal({ 
      imgs: imageArray, 
      start, 
      title, 
      titles: titleArray.length > 0 ? titleArray : titles 
    });
  };
  const playVideo = (url: string, title = 'Video') => {
    setVideoModal({ url, title });
  };

  const recordAuditLog = async (adminEmail: string, action: string, details: string, category: AuditLogItem['category'] = 'system') => {
    await logAdminAction(adminEmail, action, details, category);
  };

  return (
    <StoreContext.Provider value={{
      jobs, addJob, updateJob, deleteJob,
      applications, addApplication, updateApplicationStatus, deleteApplication,
      mediaItems, addMedia, updateMedia, deleteMedia, clearAllMedia, clearMediaByType, restoreDefaultMedia,
      inquiries, addInquiry, updateInquiryStatus, deleteInquiry,
      announcement, updateAnnouncement, refreshLiveNotice,
      noticesList, isNoticeSyncing, lastNoticeSyncTime,
      deleteNoticeFromHistory, activateNoticeFromHistory,
      auditLogs, recordAuditLog,
      syncAllToDatabase, dbConnected,
      isAdminOpen, setIsAdminOpen,
      isPaymentOpen, setIsPaymentOpen,
      isContractOpen, setIsContractOpen,
      toast, showToast,
      zoomModal, setZoomModal,
      videoModal, setVideoModal,
      openZoomGallery, playVideo
    }}>
      {children}
    </StoreContext.Provider>
  );
};
