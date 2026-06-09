import { Student, ClassConflict, TeacherAbsent, EnrollmentStat, StreamStat } from './types';

export const INITIAL_STUDENTS: Student[] = [
  {
    id: 'VAC-2026-1049',
    name: 'Aryan Kapoor',
    email: 'aryan.kapoor@gmail.com',
    phone: '+91 98250 14832',
    dob: '2008-05-14',
    gender: 'Male',
    city: 'Surat',
    area: 'Althan',
    photoUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=120',
    class: 'Class 12',
    stream: 'Science',
    school: 'Delhi Public School (DPS) Surat',
    format: 'Offline',
    parents: {
      fatherName: 'Rajesh Kapoor',
      motherName: 'Meera Kapoor',
      parentPhone: '+91 98250 88211',
      channel: 'WhatsApp'
    },
    registrationDate: '2026-03-12',
    status: 'Active',
    attendanceRate: 96.5,
    averageGrade: 'A+',
    performanceScore: 98
  },
  {
    id: 'VAC-2026-1182',
    name: 'Sanya Patel',
    email: 'sanya.patel@yahoo.com',
    phone: '+91 94268 88471',
    dob: '2009-11-22',
    gender: 'Female',
    city: 'Surat',
    area: 'Vesu',
    photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120',
    class: 'Class 11',
    stream: 'Commerce',
    school: 'Fountainhead School',
    format: 'Hybrid',
    parents: {
      fatherName: 'Vikram Patel',
      motherName: 'Anjana Patel',
      parentPhone: '+91 94268 11145',
      channel: 'WhatsApp'
    },
    registrationDate: '2026-04-01',
    status: 'Active',
    attendanceRate: 98.2,
    averageGrade: 'A+',
    performanceScore: 99
  },
  {
    id: 'VAC-2026-1204',
    name: 'Rohan Mehta',
    email: 'rohan.mehta@gmail.com',
    phone: '+91 90999 54102',
    dob: '2008-01-08',
    gender: 'Male',
    city: 'Surat',
    area: 'Adajan',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120',
    class: 'Class 12',
    stream: 'Science',
    school: 'L.P. Savani Academy',
    format: 'Offline',
    parents: {
      fatherName: 'Sanjay Mehta',
      motherName: 'Seema Mehta',
      parentPhone: '+91 90999 99281',
      channel: 'Email'
    },
    registrationDate: '2026-04-10',
    status: 'Active',
    attendanceRate: 91.0,
    averageGrade: 'A',
    performanceScore: 89
  },
  {
    id: 'VAC-2026-1290',
    name: 'Ananya Sharma',
    email: 'ananya.sharma@outlook.com',
    phone: '+91 81411 77319',
    dob: '2010-09-15',
    gender: 'Female',
    city: 'Surat',
    area: 'City Light',
    photoUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=120',
    class: 'Class 10',
    stream: 'Foundation',
    school: 'S.D. Jain Modern School',
    format: 'Offline',
    parents: {
      fatherName: 'Dinesh Sharma',
      motherName: 'Maya Sharma',
      parentPhone: '+91 81411 12345',
      channel: 'WhatsApp'
    },
    registrationDate: '2026-04-18',
    status: 'Active',
    attendanceRate: 98.5,
    averageGrade: 'A+',
    performanceScore: 97
  },
  {
    id: 'VAC-2026-1342',
    name: 'Kabir Shah',
    email: 'kabir.shah@gmail.com',
    phone: '+91 97234 45678',
    dob: '2009-02-18',
    gender: 'Male',
    city: 'Surat',
    area: 'Piplod',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120',
    class: 'Class 11',
    stream: 'VisionPreneur',
    school: 'Metas Adventist School',
    format: 'Online',
    parents: {
      fatherName: 'Parth Shah',
      motherName: 'Shruti Shah',
      parentPhone: '+91 97234 94711',
      channel: 'WhatsApp'
    },
    registrationDate: '2026-05-02',
    status: 'Active',
    attendanceRate: 94.0,
    averageGrade: 'B',
    performanceScore: 82
  },
  {
    id: 'VAC-2026-1402',
    name: 'Sneha Choksi',
    email: 'sneha.choksi@hotmail.com',
    phone: '+91 98795 98110',
    dob: '2007-12-05',
    gender: 'Female',
    city: 'Surat',
    area: 'Vesu',
    photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120',
    class: 'Class 12',
    stream: 'Commerce',
    school: 'Essar International School',
    format: 'Hybrid',
    parents: {
      fatherName: 'Kunal Choksi',
      motherName: 'Preeti Choksi',
      parentPhone: '+91 98795 02450',
      channel: 'SMS'
    },
    registrationDate: '2026-05-15',
    status: 'Active',
    attendanceRate: 95.0,
    averageGrade: 'A',
    performanceScore: 92
  },
  {
    id: 'VAC-2026-1456',
    name: 'Rishi Parikh',
    email: 'rishi.parikh@gmail.com',
    phone: '+91 99044 12389',
    dob: '2011-04-30',
    gender: 'Male',
    city: 'Surat',
    area: 'Pal',
    photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=120',
    class: 'Class 9',
    stream: 'Foundation',
    school: 'Ryan International School',
    format: 'Offline',
    parents: {
      fatherName: 'Amit Parikh',
      motherName: 'Komal Parikh',
      parentPhone: '+91 99044 87654',
      channel: 'WhatsApp'
    },
    registrationDate: '2026-05-20',
    status: 'Pending Approval',
    attendanceRate: 100.0,
    averageGrade: 'A',
    performanceScore: 95
  },
  {
    id: 'VAC-2026-1482',
    name: 'Meera Gajiwala',
    email: 'meera.gajiwala@gmail.com',
    phone: '+91 99742 81122',
    dob: '2008-07-25',
    gender: 'Female',
    city: 'Surat',
    area: 'Althan',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120',
    class: 'Class 12',
    stream: 'Humanities',
    school: 'Fountainhead School',
    format: 'Offline',
    parents: {
      fatherName: 'Nitin Gajiwala',
      motherName: 'Heena Gajiwala',
      parentPhone: '+91 99742 55990',
      channel: 'WhatsApp'
    },
    registrationDate: '2026-05-25',
    status: 'Active',
    attendanceRate: 85.4,
    averageGrade: 'C',
    performanceScore: 74
  }
];

export const INITIAL_CONFLICTS: ClassConflict[] = [
  {
    id: 'CF-001',
    classTitle: 'Class 10 Board Prep',
    details: 'Mathematics (Offline) conflicts with Science Practical sessions in Lab A at 4:30 PM on Thursdays.',
    severity: 'high',
    resolved: false
  },
  {
    id: 'CF-002',
    classTitle: 'Class 12 JEE Batch A',
    details: 'Physics Advanced lecture has overlapping room booking with Class 11 Chemistry in Room 204.',
    severity: 'medium',
    resolved: false
  }
];

export const INITIAL_ABSENTS: TeacherAbsent[] = [
  {
    id: 'AB-101',
    teacherName: 'Prof. S. K. Verma',
    fallbackTeacher: 'Prof. Rajesh Mehta',
    subject: 'Physics Extra Session',
    date: 'Today, 2:00 PM',
    resolved: false
  },
  {
    id: 'AB-102',
    teacherName: 'Dr. Neha Gajiwala',
    fallbackTeacher: 'Prof. Amrita Rao',
    subject: 'Organic Chemistry',
    date: 'Tomorrow, 10:30 AM',
    resolved: false
  }
];

export const ENROLLMENT_TRENDS: EnrollmentStat[] = [
  { month: 'Jan', registrations: 120, revenueInLakhs: 21 },
  { month: 'Feb', registrations: 155, revenueInLakhs: 28 },
  { month: 'Mar', registrations: 240, revenueInLakhs: 42 },
  { month: 'Apr', registrations: 310, revenueInLakhs: 56 },
  { month: 'May', registrations: 412, revenueInLakhs: 74 },
  { month: 'Jun', registrations: 512, revenueInLakhs: 92 }
];

export const STREAM_DISTRIBUTION: StreamStat[] = [
  { name: 'Science (JEE/NEET)', count: 680, color: '#0F172A' },
  { name: 'Commerce (CA Foundation)', count: 420, color: '#D4AF37' },
  { name: 'Humanities & Foundation', count: 260, color: '#172A45' },
  { name: 'VisionPreneur Track', count: 122, color: '#3066BE' }
];

export const SURAT_AREAS = [
  'Althan',
  'Vesu',
  'Adajan',
  'Piplod',
  'City Light',
  'Pal',
  'Bhatar',
  'Ghod Dod Road',
  'Udhna',
  'Varachha',
  'Katargam'
];

export const SURAT_SCHOOLS = [
  'Delhi Public School (DPS) Surat',
  'Fountainhead School',
  'L.P. Savani Academy',
  'S.D. Jain Modern School',
  'Metas Adventist School',
  'Essar International School',
  'Ryan International School',
  'TGB International School',
  'Lancers Army School',
  'St. Xavier’s High School'
];

export const TESTIMONIALS = [
  {
    quote: "VAC turned around my understanding of Physics completely. The conceptual lectures and personal mentorship by Vaibhav Sir gave me the confidence to score 98% in CBSE Boards and clear JEE Mains!",
    author: "Rohan Mehta",
    role: "DPS Surat (Class 12 Science)",
    achievement: "98% Boards, JEE Qualified",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120"
  },
  {
    quote: "The CA Foundation coaching is unmatched here. The test series mimics actual exam conditions perfectly, and teachers help clear doubts instantly over WhatsApp or Offline in the evening classes.",
    author: "Sanya Patel",
    role: "Fountainhead School (Class 11 Commerce)",
    achievement: "Rank 3 Surat Mock Tests",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120"
  },
  {
    quote: "I put my daughter in the Pre-Foundation class to secure her basics early. The analytical problem solving and monthly progress tracker are incredibly rigorous but supportive.",
    author: "Dr. Rajesh Kapoor",
    role: "Parent of Aryan (Class 12 Stud)",
    achievement: "Parent of 98.5% Performer",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=120"
  },
  {
    quote: "The unique VisionPreneur program at VAC taught me things normal schools don't — startup pitching, case studies of Indian entrepreneurs, and mental frameworks. Combined with Class 10 boards, it is amazing!",
    author: "Kabir Shah",
    role: "S.D. Jain Modern (Class 11 Student)",
    achievement: "VisionPreneur Pitch Winner",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120"
  }
];
