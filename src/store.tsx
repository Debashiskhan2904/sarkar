import React, { createContext, useContext, useState, useEffect } from 'react';
import { collection, onSnapshot, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from './lib/firebase';
import { DEFAULT_JOBS, DEFAULT_MEDIA } from './data';

interface AppType {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  cover: string;
  fileName: string;
  fileData: string;
  date: string;
}

export const StoreContext = createContext<any>(null);
export const useStore = () => useContext(StoreContext);

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [applications, setApplications] = useState<AppType[]>([]);
  const [mediaItems, setMediaItems] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isContractOpen, setIsContractOpen] = useState(false);
  const [toast, setToast] = useState<{msg: string, type: string} | null>(null);
  const [zoomModal, setZoomModal] = useState<{imgs: string[], start: number, title: string, titles?: string[]} | null>(null);
  const [videoModal, setVideoModal] = useState<{url: string, title: string} | null>(null);

  useEffect(() => {
    let seedingJobs = false;
    let seedingMedia = false;

    const unsubJobs = onSnapshot(collection(db, 'jobs'), (snapshot) => {
      let data = snapshot.docs.map(d => ({ ...d.data(), id: d.id })) as any[];
      if (data.length === 0 && !seedingJobs && !localStorage.getItem('jobs_seeded')) {
        seedingJobs = true;
        localStorage.setItem('jobs_seeded', 'true');
        DEFAULT_JOBS.forEach(j => {
          const { id, ...rest } = j as any;
          addDoc(collection(db, 'jobs'), rest).catch(err => console.log('Seeding jobs failed:', err.message));
        });
      } else {
        setJobs(data);
      }
    }, (err) => console.error('jobs listener error:', err.message));

    const unsubMedia = onSnapshot(collection(db, 'media'), (snapshot) => {
      let data = snapshot.docs.map(d => ({ ...d.data(), id: d.id })) as any[];
      if (data.length === 0 && !seedingMedia && !localStorage.getItem('media_seeded')) {
        seedingMedia = true;
        localStorage.setItem('media_seeded', 'true');
        DEFAULT_MEDIA.forEach(m => {
          const { id, ...rest } = m as any;
          addDoc(collection(db, 'media'), rest).catch(err => console.log('Seeding media failed:', err.message));
        });
      } else {
        setMediaItems(data);
      }
    }, (err) => console.error('media listener error:', err.message));

    const unsubApps = onSnapshot(collection(db, 'applications'), (snapshot) => {
      setApplications(snapshot.docs.map(d => ({ ...d.data(), id: d.id })) as AppType[]);
    }, (err) => console.error('applications listener error:', err.message));

    const unsubInquiries = onSnapshot(collection(db, 'inquiries'), (snapshot) => {
      // sort by date descending natively in js for simplicity
      const data = snapshot.docs.map(d => ({ ...d.data(), id: d.id })) as any[];
      setInquiries(data.sort((a, b) => b.date.localeCompare(a.date)));
    }, (err) => console.error('inquiries listener error:', err.message));

    return () => { unsubJobs(); unsubMedia(); unsubApps(); unsubInquiries(); };
  }, []);

  const addJob = async (job: any) => {
    const tempId = 'job_' + Date.now();
    setJobs(prev => [{ ...job, id: tempId }, ...prev]);
    try {
      await addDoc(collection(db, 'jobs'), job);
    } catch (err: any) {
      console.warn('Jobs sync error:', err?.message);
    }
  };
  const deleteJob = async (id: string) => {
    setJobs(prev => prev.filter(j => j.id !== id));
    try {
      await deleteDoc(doc(db, 'jobs', id));
    } catch (err: any) {
      console.warn('Job delete error:', err?.message);
    }
  };
  
  const addApplication = async (app: any) => {
    const tempId = 'app_' + Date.now();
    setApplications(prev => [{ ...app, id: tempId }, ...prev]);
    try {
      await addDoc(collection(db, 'applications'), app);
    } catch (err: any) {
      console.warn('Application sync error:', err?.message);
    }
  };
  const deleteApplication = async (id: string) => {
    setApplications(prev => prev.filter(a => a.id !== id));
    try {
      await deleteDoc(doc(db, 'applications', id));
    } catch (err: any) {
      console.warn('Application delete error:', err?.message);
    }
  };

  const addMedia = async (media: any) => {
    const tempId = 'med_' + Date.now();
    setMediaItems(prev => [{ ...media, id: tempId }, ...prev]);
    try {
      await addDoc(collection(db, 'media'), media);
    } catch (err: any) {
      console.warn('Media sync error:', err?.message);
    }
  };
  const deleteMedia = async (id: string) => {
    setMediaItems(prev => prev.filter(m => m.id !== id));
    try {
      await deleteDoc(doc(db, 'media', id));
    } catch (err: any) {
      console.warn('Media delete error:', err?.message);
    }
  };

  const addInquiry = async (inquiry: any) => {
    const tempId = 'inq_' + Date.now();
    setInquiries(prev => [{ ...inquiry, id: tempId }, ...prev]);
    try {
      await addDoc(collection(db, 'inquiries'), inquiry);
    } catch (err: any) {
      console.warn('Inquiry sync error:', err?.message);
    }
  };
  const deleteInquiry = async (id: string) => {
    setInquiries(prev => prev.filter(i => i.id !== id));
    try {
      await deleteDoc(doc(db, 'inquiries', id));
    } catch (err: any) {
      console.warn('Inquiry delete error:', err?.message);
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
      jobs, addJob, deleteJob,
      applications, addApplication, deleteApplication,
      mediaItems, addMedia, deleteMedia,
      inquiries, addInquiry, deleteInquiry,
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
