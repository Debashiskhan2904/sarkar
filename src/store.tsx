import React, { createContext, useContext, useState, useEffect } from 'react';
import { collection, onSnapshot, addDoc, deleteDoc, doc, updateDoc, setDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from './lib/firebase';
import { AppType, AnnouncementType, JobType, MediaType, InquiryType, ToastMessage, ZoomModalState, VideoModalState } from './types';
import { idbGet, idbSet, idbDelete } from './lib/idbStorage';

export type { AppType, AnnouncementType, JobType, MediaType, InquiryType };

export const StoreContext = createContext<any>(null);
export const useStore = () => useContext(StoreContext);

const DELETED_MEDIA_KEY = 'sarkar_deleted_media_ids';
const DELETED_JOBS_KEY = 'sarkar_deleted_job_ids';
const DELETED_APPS_KEY = 'sarkar_deleted_app_ids';
const DELETED_INQS_KEY = 'sarkar_deleted_inq_ids';
const SAVED_MEDIA_KEY = 'sarkar_saved_media';
const SAVED_JOBS_KEY = 'sarkar_saved_jobs';

const getDeletedSet = (key: string): Set<string> => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return new Set();
    const arr = JSON.parse(raw);
    return new Set(Array.isArray(arr) ? arr.map(String) : []);
  } catch {
    return new Set();
  }
};

const saveDeletedSet = (key: string, set: Set<string>) => {
  try {
    localStorage.setItem(key, JSON.stringify(Array.from(set)));
  } catch (e) {
    console.warn('Storage save failed:', e);
  }
};

const isMediaDeleted = (m: any, set: Set<string>): boolean => {
  if (!m) return false;
  if (m.id !== undefined && set.has(String(m.id))) return true;
  if (m.title && set.has('title:' + m.title.trim().toLowerCase())) return true;
  if (m.url && set.has('url:' + m.url.trim())) return true;
  return false;
};

const isJobDeleted = (j: any, set: Set<string>): boolean => {
  if (!j) return false;
  if (j.id !== undefined && set.has(String(j.id))) return true;
  if (j.title && set.has('title:' + j.title.trim().toLowerCase())) return true;
  return false;
};

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [jobs, setJobs] = useState<JobType[]>(() => {
    const deletedJobsSet = getDeletedSet(DELETED_JOBS_KEY);
    const saved = localStorage.getItem(SAVED_JOBS_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.filter(j => !isJobDeleted(j, deletedJobsSet));
        }
      } catch {}
    }
    return [];
  });

  const [applications, setApplications] = useState<AppType[]>([]);

  const [mediaItems, setMediaItems] = useState<MediaType[]>(() => {
    const deletedMediaSet = getDeletedSet(DELETED_MEDIA_KEY);
    const saved = localStorage.getItem(SAVED_MEDIA_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.filter(m => !isMediaDeleted(m, deletedMediaSet));
        }
      } catch {}
    }
    return [];
  });

  const [inquiries, setInquiries] = useState<InquiryType[]>([]);
  const [announcement, setAnnouncement] = useState<AnnouncementType>({
    active: true,
    text: "We are actively recruiting C&F Agents, Super Stockists, and FMCG Sales Professionals across all districts.",
    category: "hiring",
    linkText: "Apply Now",
    linkUrl: "/careers"
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isContractOpen, setIsContractOpen] = useState(false);
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const [zoomModal, setZoomModal] = useState<ZoomModalState | null>(null);
  const [videoModal, setVideoModal] = useState<VideoModalState | null>(null);

  useEffect(() => {
    let seedingJobs = false;

    // Asynchronously hydrate media from IndexedDB on startup if available
    idbGet<MediaType[]>(SAVED_MEDIA_KEY).then(idbMedia => {
      if (Array.isArray(idbMedia) && idbMedia.length > 0) {
        const deletedMediaSet = getDeletedSet(DELETED_MEDIA_KEY);
        const filtered = idbMedia.filter(m => !isMediaDeleted(m, deletedMediaSet));
        if (filtered.length > 0) {
          setMediaItems(prev => {
            // If prev is empty or only default, hydrate with stored items
            if (prev.length === 0) return filtered;
            const existingIds = new Set(prev.map(p => String(p.id)));
            const newItems = filtered.filter(f => !existingIds.has(String(f.id)));
            return newItems.length > 0 ? [...prev, ...newItems] : prev;
          });
        }
      }
    }).catch(() => {});

    // 1. Sync tombstone / deleted records across all devices & sessions
    const unsubDeleted = onSnapshot(doc(db, 'settings', 'deleted_records'), (snap) => {
      if (snap.exists()) {
        const data = snap.data() || {};
        if (Array.isArray(data.media) && data.media.length > 0) {
          const set = getDeletedSet(DELETED_MEDIA_KEY);
          data.media.forEach((k: string) => set.add(String(k)));
          saveDeletedSet(DELETED_MEDIA_KEY, set);
          setMediaItems(prev => prev.filter(m => !isMediaDeleted(m, set)));
        }
        if (Array.isArray(data.jobs) && data.jobs.length > 0) {
          const set = getDeletedSet(DELETED_JOBS_KEY);
          data.jobs.forEach((k: string) => set.add(String(k)));
          saveDeletedSet(DELETED_JOBS_KEY, set);
          setJobs(prev => prev.filter(j => !isJobDeleted(j, set)));
        }
        if (Array.isArray(data.applications) && data.applications.length > 0) {
          const set = getDeletedSet(DELETED_APPS_KEY);
          data.applications.forEach((k: string) => set.add(String(k)));
          saveDeletedSet(DELETED_APPS_KEY, set);
          setApplications(prev => prev.filter(a => !set.has(String(a.id))));
        }
        if (Array.isArray(data.inquiries) && data.inquiries.length > 0) {
          const set = getDeletedSet(DELETED_INQS_KEY);
          data.inquiries.forEach((k: string) => set.add(String(k)));
          saveDeletedSet(DELETED_INQS_KEY, set);
          setInquiries(prev => prev.filter(i => !set.has(String(i.id))));
        }
      }
    }, (err) => {
      console.warn('deleted_records sync note:', err?.message);
    });

    const unsubJobs = onSnapshot(collection(db, 'jobs'), (snapshot) => {
      const deletedJobsSet = getDeletedSet(DELETED_JOBS_KEY);
      let data = snapshot.docs.map(d => ({ ...d.data(), id: d.id })) as any[];
      const activeJobs = data.filter(j => !isJobDeleted(j, deletedJobsSet));
      setJobs(activeJobs);
      localStorage.setItem(SAVED_JOBS_KEY, JSON.stringify(activeJobs));
    }, (err) => {
      console.error('jobs listener error:', err.message);
      const deletedJobsSet = getDeletedSet(DELETED_JOBS_KEY);
      setJobs(prev => prev.filter(j => !isJobDeleted(j, deletedJobsSet)));
    });

    const unsubMedia = onSnapshot(collection(db, 'media'), async (snapshot) => {
      const deletedMediaSet = getDeletedSet(DELETED_MEDIA_KEY);
      const isCleared = localStorage.getItem('sarkar_media_cleared') === 'true';
      const firestoreDocs = snapshot.docs.map(d => ({ ...d.data(), id: d.id })) as MediaType[];
      const activeFirestoreDocs = firestoreDocs.filter(m => !isMediaDeleted(m, deletedMediaSet));

      // Retrieve locally saved items to merge
      const localSaved = await idbGet<MediaType[]>(SAVED_MEDIA_KEY);
      const localActive = Array.isArray(localSaved) ? localSaved.filter(m => !isMediaDeleted(m, deletedMediaSet)) : [];

      const docMap = new Map<string, MediaType>();
      activeFirestoreDocs.forEach(d => {
        if (d.id) docMap.set(String(d.id), d);
        if (d.url) docMap.set('url:' + d.url, d);
      });

      const mergedCustomDocs = [...activeFirestoreDocs];
      localActive.forEach(localItem => {
        const idKey = localItem.id ? String(localItem.id) : '';
        const urlKey = localItem.url ? 'url:' + localItem.url : '';
        if ((!idKey || !docMap.has(idKey)) && (!urlKey || !docMap.has(urlKey))) {
          mergedCustomDocs.push(localItem);
        }
      });

      const finalMedia: MediaType[] = isCleared ? [] : mergedCustomDocs;

      setMediaItems(finalMedia);
      try {
        localStorage.setItem(SAVED_MEDIA_KEY, JSON.stringify(finalMedia));
      } catch {}
      await idbSet(SAVED_MEDIA_KEY, finalMedia);
    }, async (err) => {
      console.warn('media listener note:', err.message);
      const deletedMediaSet = getDeletedSet(DELETED_MEDIA_KEY);
      const localSaved = await idbGet<MediaType[]>(SAVED_MEDIA_KEY);
      if (Array.isArray(localSaved) && localSaved.length > 0) {
        setMediaItems(localSaved.filter(m => !isMediaDeleted(m, deletedMediaSet)));
      } else {
        setMediaItems(prev => prev.filter(m => !isMediaDeleted(m, deletedMediaSet)));
      }
    });

    const unsubApps = onSnapshot(collection(db, 'applications'), (snapshot) => {
      const deletedAppsSet = getDeletedSet(DELETED_APPS_KEY);
      const data = snapshot.docs
        .map(d => ({ ...d.data(), id: d.id }))
        .filter(a => !deletedAppsSet.has(String(a.id))) as AppType[];
      setApplications(data);
    }, (err) => console.error('applications listener error:', err.message));

    const unsubInquiries = onSnapshot(collection(db, 'inquiries'), (snapshot) => {
      const deletedInqsSet = getDeletedSet(DELETED_INQS_KEY);
      const data = snapshot.docs
        .map(d => ({ ...d.data(), id: d.id }))
        .filter(i => !deletedInqsSet.has(String(i.id))) as any[];
      setInquiries(data.sort((a, b) => (b.date || '').localeCompare(a.date || '')));
    }, (err) => console.error('inquiries listener error:', err.message));

    const unsubAnnouncement = onSnapshot(doc(db, 'settings', 'announcement'), (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data() as any;
        setAnnouncement({
          active: data.active ?? true,
          text: data.text || "We are actively recruiting C&F Agents, Super Stockists, and FMCG Sales Professionals across all districts.",
          category: data.category || "hiring",
          linkText: data.linkText || "Apply Now",
          linkUrl: "/careers",
          updatedAt: data.updatedAt
        });
      }
    }, (err) => {
      console.warn('announcement listener status:', err.message);
    });

    return () => { 
      unsubDeleted();
      unsubJobs(); 
      unsubMedia(); 
      unsubApps(); 
      unsubInquiries(); 
      unsubAnnouncement(); 
    };
  }, []);

  const addJob = async (job: any) => {
    const tempId = 'job_' + Date.now();
    const newJob = { ...job, id: tempId };
    setJobs(prev => {
      const updated = [newJob, ...prev];
      localStorage.setItem(SAVED_JOBS_KEY, JSON.stringify(updated));
      return updated;
    });
    try {
      await addDoc(collection(db, 'jobs'), job);
    } catch (err: any) {
      console.warn('Jobs sync error:', err?.message);
    }
  };

  const updateJob = async (id: string, updatedData: any) => {
    setJobs(prev => {
      const updated = prev.map(j => String(j.id) === String(id) ? { ...j, ...updatedData } : j);
      localStorage.setItem(SAVED_JOBS_KEY, JSON.stringify(updated));
      return updated;
    });
    try {
      await updateDoc(doc(db, 'jobs', String(id)), updatedData);
    } catch (err: any) {
      console.warn('Job update error:', err?.message);
    }
  };

  const deleteJob = async (id: string | number) => {
    const strId = String(id);
    const jobToDelete = jobs.find(j => String(j.id) === strId);

    // 1. Mark as permanently deleted in local tombstone
    const deletedSet = getDeletedSet(DELETED_JOBS_KEY);
    deletedSet.add(strId);
    if (jobToDelete) {
      if (jobToDelete.id !== undefined) deletedSet.add(String(jobToDelete.id));
      if (jobToDelete.title) deletedSet.add('title:' + jobToDelete.title.trim().toLowerCase());
    }
    saveDeletedSet(DELETED_JOBS_KEY, deletedSet);

    // 2. Remove immediately from state and localStorage
    const updated = jobs.filter(j => !isJobDeleted(j, deletedSet));
    setJobs(updated);
    localStorage.setItem(SAVED_JOBS_KEY, JSON.stringify(updated));

    // 3. Delete from Firestore document by id
    try {
      await deleteDoc(doc(db, 'jobs', strId));
    } catch (err: any) {
      console.warn('Job deleteDoc error:', err?.message);
    }

    // 4. Also delete any Firestore document matching this title
    if (jobToDelete?.title) {
      try {
        const q = query(collection(db, 'jobs'), where('title', '==', jobToDelete.title));
        const snap = await getDocs(q);
        snap.forEach(d => {
          deleteDoc(d.ref).catch(() => {});
        });
      } catch (err) {}
    }

    // 5. Sync to remote deleted records so all devices stay clean
    try {
      await setDoc(doc(db, 'settings', 'deleted_records'), {
        jobs: Array.from(deletedSet),
        updatedAt: new Date().toISOString()
      }, { merge: true });
    } catch (err: any) {
      console.warn('Job sync deleted_records note:', err?.message);
    }
  };
  
  const addApplication = async (app: any) => {
    const tempId = 'app_' + Date.now();
    setApplications(prev => [{ ...app, id: tempId, status: app.status || 'Pending' }, ...prev]);
    try {
      await addDoc(collection(db, 'applications'), { ...app, status: app.status || 'Pending' });
    } catch (err: any) {
      console.warn('Application sync error:', err?.message);
    }
  };

  const updateApplicationStatus = async (id: string, status: string) => {
    setApplications(prev => prev.map(a => String(a.id) === String(id) ? { ...a, status } : a));
    try {
      await updateDoc(doc(db, 'applications', String(id)), { status });
    } catch (err: any) {
      console.warn('Application status update error:', err?.message);
    }
  };

  const deleteApplication = async (id: string | number) => {
    const strId = String(id);
    const deletedSet = getDeletedSet(DELETED_APPS_KEY);
    deletedSet.add(strId);
    saveDeletedSet(DELETED_APPS_KEY, deletedSet);

    setApplications(prev => prev.filter(a => String(a.id) !== strId));

    try {
      await deleteDoc(doc(db, 'applications', strId));
    } catch (err: any) {
      console.warn('Application delete error:', err?.message);
    }

    try {
      await setDoc(doc(db, 'settings', 'deleted_records'), {
        applications: Array.from(deletedSet),
        updatedAt: new Date().toISOString()
      }, { merge: true });
    } catch (err: any) {
      console.warn('App sync deleted_records note:', err?.message);
    }
  };

  const addMedia = async (media: any) => {
    // 1. Remove cleared flag so newly added media is never suppressed
    localStorage.removeItem('sarkar_media_cleared');

    // 2. Un-tombstone this item from local and remote deleted set
    const deletedMediaSet = getDeletedSet(DELETED_MEDIA_KEY);
    if (media.title) deletedMediaSet.delete('title:' + media.title.trim().toLowerCase());
    if (media.url) deletedMediaSet.delete('url:' + media.url.trim());
    saveDeletedSet(DELETED_MEDIA_KEY, deletedMediaSet);

    const tempId = 'med_' + Date.now();
    const newMedia = { ...media, id: tempId };

    setMediaItems(prev => {
      const updated = [newMedia, ...prev.filter(m => m.id !== tempId && m.url !== media.url)];
      try {
        localStorage.setItem(SAVED_MEDIA_KEY, JSON.stringify(updated));
      } catch {}
      idbSet(SAVED_MEDIA_KEY, updated);
      return updated;
    });

    try {
      const docRef = await addDoc(collection(db, 'media'), media);
      if (docRef?.id) {
        setMediaItems(prev => {
          const updated = prev.map(m => m.id === tempId ? { ...m, id: docRef.id } : m);
          try {
            localStorage.setItem(SAVED_MEDIA_KEY, JSON.stringify(updated));
          } catch {}
          idbSet(SAVED_MEDIA_KEY, updated);
          return updated;
        });
      }
    } catch (err: any) {
      console.warn('Media firestore sync note:', err?.message);
    }
  };

  const updateMedia = async (id: string, updatedData: any) => {
    setMediaItems(prev => {
      const updated = prev.map(m => String(m.id) === String(id) ? { ...m, ...updatedData } : m);
      try {
        localStorage.setItem(SAVED_MEDIA_KEY, JSON.stringify(updated));
      } catch {}
      idbSet(SAVED_MEDIA_KEY, updated);
      return updated;
    });
    try {
      await updateDoc(doc(db, 'media', String(id)), updatedData);
    } catch (err: any) {
      console.warn('Media update error:', err?.message);
    }
  };

  const deleteMedia = async (id: string | number) => {
    const strId = String(id);
    const itemToDelete = mediaItems.find(m => String(m.id) === strId);

    // 1. Mark as permanently deleted in local tombstone
    const deletedSet = getDeletedSet(DELETED_MEDIA_KEY);
    deletedSet.add(strId);
    if (itemToDelete) {
      if (itemToDelete.id !== undefined) deletedSet.add(String(itemToDelete.id));
      if (itemToDelete.title) deletedSet.add('title:' + itemToDelete.title.trim().toLowerCase());
      if (itemToDelete.url) deletedSet.add('url:' + itemToDelete.url.trim());
    }
    saveDeletedSet(DELETED_MEDIA_KEY, deletedSet);

    // 2. Remove immediately from state, localStorage, and IndexedDB
    const updated = mediaItems.filter(m => !isMediaDeleted(m, deletedSet));
    setMediaItems(updated);
    try {
      localStorage.setItem(SAVED_MEDIA_KEY, JSON.stringify(updated));
    } catch {}
    await idbSet(SAVED_MEDIA_KEY, updated);

    if (updated.length === 0) {
      localStorage.setItem('sarkar_media_cleared', 'true');
    }

    // 3. Delete from Firestore document by id
    try {
      await deleteDoc(doc(db, 'media', strId));
    } catch (err: any) {
      console.warn('Media deleteDoc error:', err?.message);
    }

    // 4. Also delete any Firestore document matching this title
    if (itemToDelete?.title) {
      try {
        const q = query(collection(db, 'media'), where('title', '==', itemToDelete.title));
        const snap = await getDocs(q);
        snap.forEach(d => {
          deleteDoc(d.ref).catch(() => {});
        });
      } catch (err) {}
    }

    // 5. Sync to remote deleted records so all devices stay clean
    try {
      await setDoc(doc(db, 'settings', 'deleted_records'), {
        media: Array.from(deletedSet),
        updatedAt: new Date().toISOString()
      }, { merge: true });
    } catch (err: any) {
      console.warn('Media sync deleted_records note:', err?.message);
    }
  };

  const clearAllMedia = async () => {
    const deletedSet = getDeletedSet(DELETED_MEDIA_KEY);
    mediaItems.forEach(m => {
      if (m.id !== undefined) deletedSet.add(String(m.id));
      if (m.title) deletedSet.add('title:' + m.title.trim().toLowerCase());
      if (m.url) deletedSet.add('url:' + m.url.trim());
    });
    saveDeletedSet(DELETED_MEDIA_KEY, deletedSet);
    localStorage.setItem('sarkar_media_cleared', 'true');
    try {
      localStorage.setItem(SAVED_MEDIA_KEY, JSON.stringify([]));
    } catch {}
    await idbSet(SAVED_MEDIA_KEY, []);
    setMediaItems([]);

    try {
      const snap = await getDocs(collection(db, 'media'));
      snap.forEach(d => {
        deleteDoc(d.ref).catch(() => {});
      });
    } catch (err) {}

    try {
      await setDoc(doc(db, 'settings', 'deleted_records'), {
        media: Array.from(deletedSet),
        updatedAt: new Date().toISOString()
      }, { merge: true });
    } catch (err) {}
  };

  const clearMediaByType = async (type: string) => {
    const deletedSet = getDeletedSet(DELETED_MEDIA_KEY);
    const toDelete = mediaItems.filter(m => m.type === type);
    toDelete.forEach(m => {
      if (m.id !== undefined) deletedSet.add(String(m.id));
      if (m.title) deletedSet.add('title:' + m.title.trim().toLowerCase());
      if (m.url) deletedSet.add('url:' + m.url.trim());
    });
    saveDeletedSet(DELETED_MEDIA_KEY, deletedSet);

    const updated = mediaItems.filter(m => m.type !== type);
    setMediaItems(updated);
    try {
      localStorage.setItem(SAVED_MEDIA_KEY, JSON.stringify(updated));
    } catch {}
    await idbSet(SAVED_MEDIA_KEY, updated);

    if (updated.length === 0) {
      localStorage.setItem('sarkar_media_cleared', 'true');
    }

    try {
      const q = query(collection(db, 'media'), where('type', '==', type));
      const snap = await getDocs(q);
      snap.forEach(d => {
        deleteDoc(d.ref).catch(() => {});
      });
    } catch (err) {}

    try {
      await setDoc(doc(db, 'settings', 'deleted_records'), {
        media: Array.from(deletedSet),
        updatedAt: new Date().toISOString()
      }, { merge: true });
    } catch (err) {}
  };

  const restoreDefaultMedia = async () => {
    localStorage.removeItem('sarkar_media_cleared');
    const deletedSet = new Set<string>();
    saveDeletedSet(DELETED_MEDIA_KEY, deletedSet);
    setMediaItems([]);
    try {
      localStorage.setItem(SAVED_MEDIA_KEY, JSON.stringify([]));
    } catch {}
    await idbSet(SAVED_MEDIA_KEY, []);

    try {
      await setDoc(doc(db, 'settings', 'deleted_records'), {
        media: [],
        updatedAt: new Date().toISOString()
      }, { merge: true });
    } catch (err) {}
  };

  const addInquiry = async (inquiry: any) => {
    const tempId = 'inq_' + Date.now();
    setInquiries(prev => [{ ...inquiry, id: tempId, status: inquiry.status || 'New' }, ...prev]);
    try {
      await addDoc(collection(db, 'inquiries'), { ...inquiry, status: inquiry.status || 'New' });
    } catch (err: any) {
      console.warn('Inquiry sync error:', err?.message);
    }
  };
  const updateInquiryStatus = async (id: string, status: string) => {
    setInquiries(prev => prev.map(i => String(i.id) === String(id) ? { ...i, status } : i));
    try {
      await updateDoc(doc(db, 'inquiries', String(id)), { status });
    } catch (err: any) {
      console.warn('Inquiry status update error:', err?.message);
    }
  };

  const deleteInquiry = async (id: string | number) => {
    const strId = String(id);
    const deletedSet = getDeletedSet(DELETED_INQS_KEY);
    deletedSet.add(strId);
    saveDeletedSet(DELETED_INQS_KEY, deletedSet);

    setInquiries(prev => prev.filter(i => String(i.id) !== strId));

    try {
      await deleteDoc(doc(db, 'inquiries', strId));
    } catch (err: any) {
      console.warn('Inquiry delete error:', err?.message);
    }

    try {
      await setDoc(doc(db, 'settings', 'deleted_records'), {
        inquiries: Array.from(deletedSet),
        updatedAt: new Date().toISOString()
      }, { merge: true });
    } catch (err: any) {
      console.warn('Inq sync deleted_records note:', err?.message);
    }
  };

  const updateAnnouncement = async (data: Partial<AnnouncementType>) => {
    const updated = { ...announcement, ...data, updatedAt: new Date().toISOString() };
    setAnnouncement(updated);
    try {
      await setDoc(doc(db, 'settings', 'announcement'), updated, { merge: true });
    } catch (err: any) {
      console.warn('Announcement sync error:', err?.message);
    }
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

  return (
    <StoreContext.Provider value={{
      jobs, addJob, updateJob, deleteJob,
      applications, addApplication, updateApplicationStatus, deleteApplication,
      mediaItems, addMedia, updateMedia, deleteMedia, clearAllMedia, clearMediaByType, restoreDefaultMedia,
      inquiries, addInquiry, updateInquiryStatus, deleteInquiry,
      announcement, updateAnnouncement,
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
