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
  const [toast, setToast] = useState<{msg: string, type: string} | null>(null);
  const [zoomModal, setZoomModal] = useState<{imgs: string[], start: number, title: string} | null>(null);
  const [videoModal, setVideoModal] = useState<{url: string, title: string} | null>(null);

  useEffect(() => {
    let seedingJobs = false;
    let seedingMedia = false;

    const unsubJobs = onSnapshot(collection(db, 'jobs'), (snapshot) => {
      let data = snapshot.docs.map(d => ({ ...d.data(), id: d.id })) as any[];
      if (data.length === 0 && !seedingJobs) {
        seedingJobs = true;
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
      if (data.length === 0 && !seedingMedia) {
        seedingMedia = true;
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

  const addJob = async (job: any) => await addDoc(collection(db, 'jobs'), job);
  const deleteJob = async (id: string) => await deleteDoc(doc(db, 'jobs', id));
  
  const addApplication = async (app: any) => await addDoc(collection(db, 'applications'), app);
  const deleteApplication = async (id: string) => await deleteDoc(doc(db, 'applications', id));

  const addMedia = async (media: any) => await addDoc(collection(db, 'media'), media);
  const deleteMedia = async (id: string) => await deleteDoc(doc(db, 'media', id));

  const addInquiry = async (inquiry: any) => await addDoc(collection(db, 'inquiries'), inquiry);
  const deleteInquiry = async (id: string) => await deleteDoc(doc(db, 'inquiries', id));

  const showToast = (msg: string, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };
  const openZoomGallery = (imgs: string[], start = 0, title = 'Catalog View') => {
    setZoomModal({ imgs, start, title });
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
      toast, showToast,
      zoomModal, setZoomModal,
      videoModal, setVideoModal,
      openZoomGallery, playVideo
    }}>
      {children}
    </StoreContext.Provider>
  );
};
