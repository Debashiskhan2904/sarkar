/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface JobType {
  id: string;
  title: string;
  dept: string;
  loc: string;
  type: string;
  exp: string;
  desc: string;
}

export interface AppType {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  cover: string;
  fileName: string;
  fileData: string;
  date: string;
  status?: 'Pending' | 'Under Review' | 'Shortlisted' | 'Rejected' | string;
}

export interface MediaType {
  id: string | number;
  type: 'photo' | 'video' | 'audio' | 'credential' | string;
  title: string;
  url: string;
  thumb?: string;
  sector?: 'fmcg' | 'jewellery' | 'interior' | 'general' | string;
  productSub?: string;
  subCategory?: string;
  productLabel?: string;
  tags?: string;
  desc?: string;
  date?: string;
}

export interface InquiryType {
  id: string;
  name: string;
  company?: string;
  email: string;
  phone?: string;
  type: string;
  message?: string;
  date?: string;
  status?: 'New' | 'Verified' | 'Resolved' | string;
  utr?: string;
  amount?: string;
}

export interface AnnouncementType {
  id?: string;
  active: boolean;
  text: string;
  category: 'hiring' | 'offer' | 'notice' | 'urgent';
  linkText?: string;
  linkUrl?: string;
  updatedAt?: string;
}

export interface ToastMessage {
  msg: string;
  type: 'success' | 'danger' | 'info' | string;
}

export interface ZoomModalState {
  imgs: string[];
  start: number;
  title: string;
  titles?: string[];
}

export interface VideoModalState {
  url: string;
  title: string;
}
