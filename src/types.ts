export interface ParentDetails {
  fatherName: string;
  motherName: string;
  parentPhone: string;
  channel: 'WhatsApp' | 'SMS' | 'Email';
}

export interface Student {
  id: string; // e.g. VAC-2026-0042
  name: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  city: string;
  area: string;
  photoUrl?: string;
  class: string; // e.g. "Class 12"
  stream: 'Science' | 'Commerce' | 'Humanities' | 'Foundation' | 'VisionPreneur';
  school: string;
  format: 'Offline' | 'Hybrid' | 'Online';
  parents: ParentDetails;
  registrationDate: string;
  status: 'Active' | 'Pending Approval' | 'Inactive';
  attendanceRate: number; // percentage
  averageGrade: 'A+' | 'A' | 'B' | 'C' | 'At Risk';
  performanceScore: number; // percentage e.g. 94
}

export interface ClassConflict {
  id: string;
  classTitle: string;
  details: string;
  severity: 'high' | 'medium';
  resolved: boolean;
}

export interface TeacherAbsent {
  id: string;
  teacherName: string;
  fallbackTeacher: string;
  subject: string;
  date: string;
  resolved: boolean;
}

export interface EnrollmentStat {
  month: string;
  registrations: number;
  revenueInLakhs: number;
}

export interface StreamStat {
  name: string;
  count: number;
  color: string;
}

export interface ScheduledClass {
  id: string;
  className: string;
  subject: string;
  teacher: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  startTime: string; // e.g. "14:00"
  endTime: string; // e.g. "15:30"
  room: string;
  format: 'Offline' | 'Hybrid' | 'Online';
  stream: 'Science' | 'Commerce' | 'Humanities' | 'Foundation' | 'VisionPreneur';
  grade: 'Class 9' | 'Class 10' | 'Class 11' | 'Class 12' | 'All';
  description?: string;
  capacity?: number;
  enrolledCount?: number;
}

