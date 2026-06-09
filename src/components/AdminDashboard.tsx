import React, { useState } from 'react';
import { Search, SlidersHorizontal, UserPlus, FileText, CheckCircle2, AlertTriangle, CalendarRange, Clock, UserCheck, MessageSquare, Trash2, X, Download } from 'lucide-react';
import { Student, ClassConflict, TeacherAbsent } from '../types';
import { SURAT_AREAS, SURAT_SCHOOLS } from '../data';
import { DashboardCharts } from './DashboardCharts';
import { motion } from 'motion/react';

const VAC_ADMIN_DIRECTORY = [
  { name: "Vaibhav Agarwal (Director)", phone: "+919637716664" },
  { name: "Kajal Agarwal (Admissions)", phone: "+919586032030" },
  { name: "Jitendra Maurya (Desk Admin)", phone: "+917383123990" }
];

interface AdminDashboardProps {
  students: Student[];
  onRemoveStudent: (id: string) => void;
  onAddStudent: (student: Student) => void;
  onUpdateStudentAttendance: (id: string, newRate: number) => void;
  onNavigate: (view: 'landing' | 'register' | 'login' | 'admin' | 'schedule') => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  students,
  onRemoveStudent,
  onAddStudent,
  onUpdateStudentAttendance,
  onNavigate
}) => {
  // Database table state controls
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStream, setSelectedStream] = useState<string>('All');
  const [selectedFormat, setSelectedFormat] = useState<string>('All');
  const [selectedGrade, setSelectedGrade] = useState<string>('All');

  // Sub-navigation tab selector
  const [activeTab, setActiveTab] = useState<'database' | 'attendance'>('database');

  // Attendance Tracker specific states
  const [attendanceClass, setAttendanceClass] = useState<string>('Class 12');
  const [attendanceStream, setAttendanceStream] = useState<string>('All');
  const [attendanceDate, setAttendanceDate] = useState<string>(() => new Date().toISOString().split('T')[0]);
  const [attendanceMap, setAttendanceMap] = useState<Record<string, 'Present' | 'Absent' | 'Late'>>({});
  const [adminPhone, setAdminPhone] = useState<string>('+919637716664');
  const [customNote, setCustomNote] = useState<string>('All scholars performed exceptionally today. Direct interactive updates completed successfully.');
  const [attendanceStatusMsg, setAttendanceStatusMsg] = useState<string>('');

  // Interactive Local state for Conflicts and Substitution
  const [conflicts, setConflicts] = useState<ClassConflict[]>([
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
  ]);

  const [absents, setAbsents] = useState<TeacherAbsent[]>([
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
  ]);

  // Modal active states
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);
  const [activeProfileStudent, setActiveProfileStudent] = useState<Student | null>(null);

  // Quick Add Student Local Form
  const [quickStudent, setQuickStudent] = useState({
    name: '',
    email: '',
    phone: '',
    class: 'Class 12',
    stream: 'Science' as any,
    format: 'Offline' as any,
    school: 'Delhi Public School (DPS) Surat',
    area: 'Althan',
    grade: 'A+' as any
  });

  // Handle Quick Add Submit
  const handleQuickAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickStudent.name) return;

    const randomID = `VAC-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newStudent: Student = {
      id: randomID,
      name: quickStudent.name,
      email: quickStudent.email || `${quickStudent.name.toLowerCase().replace(' ', '')}@gmail.com`,
      phone: quickStudent.phone || '+91 98250 99421',
      dob: '2008-01-01',
      gender: 'Male',
      city: 'Surat',
      area: quickStudent.area,
      photoUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=120',
      class: quickStudent.class,
      stream: quickStudent.stream,
      school: quickStudent.school,
      format: quickStudent.format,
      parents: {
        fatherName: 'Parent of ' + quickStudent.name,
        motherName: 'Mother of ' + quickStudent.name,
        parentPhone: '+91 98250 88124',
        channel: 'WhatsApp'
      },
      registrationDate: new Date().toISOString().split('T')[0],
      status: 'Active',
      attendanceRate: 95.0,
      averageGrade: quickStudent.grade,
      performanceScore: 92
    };

    onAddStudent(newStudent);
    setIsQuickAddOpen(false);
    setQuickStudent({
      name: '',
      email: '',
      phone: '',
      class: 'Class 12',
      stream: 'Science',
      format: 'Offline',
      school: 'Delhi Public School (DPS) Surat',
      area: 'Althan',
      grade: 'A+'
    });
  };

  // Toggle conflict state
  const handleToggleConflict = (id: string) => {
    setConflicts(
      conflicts.map((c) => (c.id === id ? { ...c, resolved: !c.resolved } : c))
    );
  };

  // Toggle teacher coverage
  const handleToggleAbsent = (id: string) => {
    setAbsents(
      absents.map((a) => (a.id === id ? { ...a, resolved: !a.resolved } : a))
    );
  };

  // Simulate warning parent on WhatsApp via backend API gateway
  const handleWarnParent = async (student: Student) => {
    try {
      const isLow = student.attendanceRate < 75;
      const response = await fetch('/api/report/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          studentId: student.id,
          studentData: student,
          reportType: isLow ? 'low_attendance' : 'standard_progress',
          customMessage: `Scholar average performance grade is ${student.averageGrade} with current fortnightly attendance standing at ${student.attendanceRate}%.`
        })
      });

      const data = await response.json();
      if (response.ok && data.success && data.waUrl) {
        setAttendanceStatusMsg(`⚡ [WhatsApp Gateway] Triggered official dispatch for ${student.name}. Launching secure link...`);
        setTimeout(() => setAttendanceStatusMsg(''), 6000);
        window.open(data.waUrl, '_blank');
      } else {
        throw new Error(data.message || 'Gateway transmission failure');
      }
    } catch (err: any) {
      console.error("WhatsApp gateway error:", err);
      // Safe fallback
      const parentPhoneClean = student.parents.parentPhone.replace(/\D/g, '');
      const text = `Urgent administrative update. ${student.name} (Class ${student.class}) attendance: ${student.attendanceRate}%. Please contact VAC campus admissions immediately.`;
      const fallbackUrl = `https://wa.me/${parentPhoneClean.length === 10 ? '91' + parentPhoneClean : parentPhoneClean}?text=${encodeURIComponent(text)}`;
      window.open(fallbackUrl, '_blank');
    }
  };

  // Dispatch direct real-time action template for attendance below 75%
  const handleInterventionWhatsApp = async (st: Student) => {
    try {
      const response = await fetch('/api/report/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          studentId: st.id,
          studentData: st,
          reportType: 'low_attendance',
          customMessage: `Mandatory attendance benchmark intervention required immediately. overall fortnightly rate has dropped to ${st.attendanceRate}%.`
        })
      });

      const data = await response.json();
      if (response.ok && data.success && data.waUrl) {
        setAttendanceStatusMsg(`🚨 [Critical Safeguard] Attendance intervention dispatch triggered for ${st.name}.`);
        setTimeout(() => setAttendanceStatusMsg(''), 6000);
        window.open(data.waUrl, '_blank');
      } else {
        throw new Error(data.message || 'Intervention gateway failure');
      }
    } catch (err: any) {
      console.error("WhatsApp intervention error:", err);
      const parentName = st.parents.fatherName || 'Parent';
      const parentPhoneClean = st.parents.parentPhone.replace(/\D/g, '');
      let text = `🚨 *URGENT ATTENDANCE INTERVENTION REQUIRED*\n`;
      text += `*VAIBHAV AGARWAL CLASSES (VAC) — SESSIONS DESK*\n\n`;
      text += `Dear ${parentName},\n\nOur registry shows that overall fortnightly attendance rate for ${st.name} has dropped to ${st.attendanceRate}%, which is below our mandatory benchmark of 75%.\n\nRegards,\nVaibhav Agarwal Classes`;
      const fallbackUrl = `https://wa.me/${parentPhoneClean.length === 10 ? '91' + parentPhoneClean : parentPhoneClean}?text=${encodeURIComponent(text)}`;
      window.open(fallbackUrl, '_blank');
    }
  };

  // Attendance Tracker Helpers
  const getAttendanceStatus = (id: string) => {
    return attendanceMap[id] || 'Present';
  };

  const handleUpdateAttendanceStatus = (stId: string, status: 'Present' | 'Absent' | 'Late') => {
    setAttendanceMap((prev) => ({
      ...prev,
      [stId]: status
    }));
  };

  const matchedAttendanceStudents = students.filter((st) => {
    const matchesClass = attendanceClass === 'All' || st.class === attendanceClass;
    const matchesStream = attendanceStream === 'All' || st.stream === attendanceStream;
    return matchesClass && matchesStream;
  });

  const handleSyncAttendanceToProfiles = () => {
    if (matchedAttendanceStudents.length === 0) return;

    matchedAttendanceStudents.forEach((st) => {
      const status = getAttendanceStatus(st.id);
      let adjustment = 0;
      if (status === 'Present') adjustment = 1.0;
      else if (status === 'Late') adjustment = 0.2;
      else if (status === 'Absent') adjustment = -4.5;

      const updatedRate = Math.min(100, Math.max(15, Math.round((st.attendanceRate + adjustment) * 10) / 10));
      onUpdateStudentAttendance(st.id, updatedRate);
    });

    setAttendanceStatusMsg(`Local attendance entries compiled & propagated instantly: Rates adjusted for ${matchedAttendanceStudents.length} students.`);
    setTimeout(() => {
      setAttendanceStatusMsg('');
    }, 6000);
  };

  const handleSendAttendanceToAdminWhatsApp = () => {
    const total = matchedAttendanceStudents.length;
    if (total === 0) return;

    const presents = matchedAttendanceStudents.filter(s => getAttendanceStatus(s.id) === 'Present').length;
    const absentsCount = matchedAttendanceStudents.filter(s => getAttendanceStatus(s.id) === 'Absent').length;
    const lates = matchedAttendanceStudents.filter(s => getAttendanceStatus(s.id) === 'Late').length;
    const rate = Math.round(((presents + lates * 0.75) / total) * 100);

    let text = `📚 *VAIBHAV AGARWAL CLASSES (VAC)*\n`;
    text += `📅 *DAILY ATTENDANCE REPORT*\n`;
    text += `───────────────────\n`;
    text += `*Date:* ${attendanceDate}\n`;
    text += `*Cohort:* ${attendanceClass} (${attendanceStream === 'All' ? 'All Streams' : attendanceStream})\n`;
    text += `───────────────────\n\n`;

    text += `📈 *SESSION SUMMARY:*\n`;
    text += `• Total Students Scheduled: ${total}\n`;
    text += `• Present: ${presents} ✅\n`;
    text += `• Absent: ${absentsCount} ❌\n`;
    text += `• Late / Excused: ${lates} ⏳\n`;
    text += `• Group Presence Rate: *${rate}%*\n\n`;

    if (customNote) {
      text += `📝 *Admin Session Notes:*\n"${customNote}"\n\n`;
    }

    text += `📋 *STUDENT REGISTER STATUS:*\n`;
    matchedAttendanceStudents.forEach((st, idx) => {
      const status = getAttendanceStatus(st.id);
      const icon = status === 'Present' ? '✅' : status === 'Absent' ? '❌' : '⏳ (Late)';
      text += `${idx + 1}. *${st.name}* (${st.id}) - _${status}_ ${icon}\n`;
    });

    text += `\n───────────────────\n`;
    text += `_Report transmitted dynamically from VAC Command Center. Account email: vaibhav.agarwal2212@gmail.com_`;

    let cleanNum = adminPhone.replace(/\D/g, '');
    if (cleanNum.length === 10) {
      cleanNum = '91' + cleanNum;
    }
    const waUrl = `https://wa.me/${cleanNum}?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank');
  };

  const handleCopyToClipboardReport = () => {
    const total = matchedAttendanceStudents.length;
    if (total === 0) return;

    const presents = matchedAttendanceStudents.filter(s => getAttendanceStatus(s.id) === 'Present').length;
    const absentsCount = matchedAttendanceStudents.filter(s => getAttendanceStatus(s.id) === 'Absent').length;
    const lates = matchedAttendanceStudents.filter(s => getAttendanceStatus(s.id) === 'Late').length;
    const rate = Math.round(((presents + lates * 0.75) / total) * 100);

    let text = `📚 VAIBHAV AGARWAL CLASSES (VAC)\n`;
    text += `📅 DAILY ATTENDANCE REPORT\n`;
    text += `===============================\n`;
    text += `Date: ${attendanceDate}\n`;
    text += `Cohort: ${attendanceClass} (${attendanceStream === 'All' ? 'All Streams' : attendanceStream})\n`;
    text += `===============================\n\n`;

    text += `📈 SESSION SUMMARY:\n`;
    text += `• Total Students Checked: ${total}\n`;
    text += `• Present: ${presents} [Present]\n`;
    text += `• Absent: ${absentsCount} [Absent]\n`;
    text += `• Late: ${lates} [Late]\n`;
    text += `• Group Presence Rate: ${rate}%\n\n`;

    if (customNote) {
      text += `📝 Admin Session Notes:\n"${customNote}"\n\n`;
    }

    text += `📋 STUDENT REGISTER STATUS:\n`;
    matchedAttendanceStudents.forEach((st, idx) => {
      const status = getAttendanceStatus(st.id);
      text += `${idx + 1}. ${st.name} (ID: ${st.id}) - ${status}\n`;
    });

    text += `\n===============================\n`;
    text += `Report generated dynamically from VAC Command Center.`;

    navigator.clipboard.writeText(text);
    setAttendanceStatusMsg("Consolidated text report successfully copied to clipboard!");
    setTimeout(() => {
      setAttendanceStatusMsg('');
    }, 4500);
  };

  const handleWarnParentAbsent = (st: Student) => {
    const parentName = st.parents.fatherName || 'Parent';
    const parentPhoneClean = st.parents.parentPhone.replace(/\D/g, '');

    let text = `✉️ *OFFICIAL ATTENDANCE NOTICE*\n`;
    text += `*VAIBHAV AGARWAL CLASSES (VAC) — SURAT*\n\n`;
    text += `Dear ${parentName},\n\nThis is to notify you that your ward, *${st.name}* (ID: ${st.id}), was marked *ABSENT* ❌ from their daily coaching class (*${st.class}* - ${st.stream}) on *${attendanceDate}*.\n\nRegular class presence is vital for academic excellence and board exam preparation. Please ensure they catch up with current assignments.\n\nRegards,\n*Director Team*\n*Vaibhav Agarwal Classes*`;

    const waUrl = `https://wa.me/${parentPhoneClean}?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank');
  };

  const handleDownloadCSV = () => {
    // Columns to export
    const headers = [
      'Scholar ID',
      'Full Name',
      'Email',
      'Phone Number',
      'Date of Birth',
      'Gender',
      'City',
      'Area',
      'Standard/Class',
      'Academic Stream',
      'School Name',
      'Delivery Format',
      'Father Name',
      'Mother Name',
      'Parent Contact',
      'Notification Channel',
      'Admission Date',
      'Account Status',
      'Fortnightly Attendance (%)',
      'Average Grade Letter',
      'Performance Score (%)'
    ];

    const rows = filteredStudents.map(st => [
      st.id,
      st.name,
      st.email,
      st.phone,
      st.dob || '2008-01-01',
      st.gender || 'Male',
      st.city || 'Surat',
      st.area,
      st.class,
      st.stream,
      st.school,
      st.format,
      st.parents?.fatherName || '',
      st.parents?.motherName || '',
      st.parents?.parentPhone || '',
      st.parents?.channel || 'WhatsApp',
      st.registrationDate || '',
      st.status || 'Active',
      st.attendanceRate,
      st.averageGrade,
      st.performanceScore || 0
    ]);

    // Format as CSV content
    const csvContent = [
      headers.join(','),
      ...rows.map(r => r.map(val => {
        const str = String(val === null || val === undefined ? '' : val);
        if (str.includes(',') || str.includes('"') || str.includes('\n')) {
          return `"${str.replace(/"/g, '""')}"`;
        }
        return str;
      }).join(','))
    ].join('\n');

    // Create a blob and download it
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    
    const dateFormatted = new Date().toISOString().split('T')[0];
    const isFiltered = filteredStudents.length !== students.length;
    const suffix = isFiltered ? `filtered_${filteredStudents.length}` : `full_${students.length}`;
    link.setAttribute('download', `vac_student_list_${suffix}_${dateFormatted}.csv`);
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter student dataset
  const filteredStudents = students.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.school.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStream = selectedStream === 'All' || s.stream === selectedStream;
    const matchesFormat = selectedFormat === 'All' || s.format === selectedFormat;
    const matchesGrade = selectedGrade === 'All' || s.averageGrade === selectedGrade;

    return matchesSearch && matchesStream && matchesFormat && matchesGrade;
  });

  // Stats Metrics calculated dynamic from actual live items list for real coherence
  const totalStudentsMetric = 1474 + students.length; // Start baseline 1474 with live reactive scaling
  const averageAttendance = Math.round(students.reduce((sum, s) => sum + s.attendanceRate, 0) / students.length || 94.8);
  const atRiskStudents = students.filter((s) => s.attendanceRate < 75);

  const mockTrends = [
    { month: 'Jan', registrations: 120, revenueInLakhs: 21 },
    { month: 'Feb', registrations: 155, revenueInLakhs: 28 },
    { month: 'Mar', registrations: 240, revenueInLakhs: 42 },
    { month: 'Apr', registrations: 310, revenueInLakhs: 56 },
    { month: 'May', registrations: 412, revenueInLakhs: 74 },
    { month: 'Jun', registrations: totalStudentsMetric, revenueInLakhs: 92 }
  ];

  const mockStreams = [
    { name: 'Science (JEE/NEET)', count: students.filter((s) => s.stream === 'Science').length * 80 + 340, color: '#0A192F' },
    { name: 'Commerce (CA Prep)', count: students.filter((s) => s.stream === 'Commerce').length * 40 + 260, color: '#D4AF37' },
    { name: 'Humanities & Found', count: students.filter((s) => s.stream === 'Foundation' || s.stream === 'Humanities').length * 50 + 210, color: '#172A45' },
    { name: 'VisionPreneur Track', count: students.filter((s) => s.stream === 'VisionPreneur').length * 30 + 90, color: '#3066BE' }
  ];

  return (
    <div className="bg-[#FAF9F6] text-slate-800 min-h-screen pb-16">
      
      {/* Top Admin Dashboard Control Bar */}
      <section className="bg-brand-blue text-white py-5 px-6 border-b border-[#D4AF37]/20 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <span className="text-xs font-mono font-bold tracking-widest text-brand-gold uppercase">VAC Central Secretariat</span>
            <div className="flex items-center gap-2 mt-1">
              <h2 className="text-xl sm:text-2xl font-display font-black text-brand-cream">Admin Command Center</h2>
              <span className="text-[10px] bg-emerald-500 text-white font-mono px-2 py-0.5 rounded-full font-bold uppercase animate-pulse">
                Live Data Synchronized
              </span>
            </div>
            <p className="text-xs text-slate-350 font-light mt-0.5">Oversee class conflict logs, substitution records, and scholar spreadsheet registries.</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleDownloadCSV}
              className="py-2.5 px-4 bg-[#112240] hover:bg-[#1b345e] text-[#D4AF37] border border-[#D4AF37]/30 text-xs font-display font-bold rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
              title="Download current filtered student entries as standard CSV"
            >
              <Download className="w-3.5 h-3.5" /> Download CSV
            </button>
            <button
              onClick={() => setIsQuickAddOpen(true)}
              className="py-2.5 px-4 bg-brand-gold hover:bg-brand-gold-dark text-brand-blue text-xs font-display font-bold rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <UserPlus className="w-3.5 h-3.5" /> Admid Quick Scholar
            </button>
            <button
              onClick={() => onNavigate('landing')}
              className="py-2.5 px-3.5 bg-white/10 hover:bg-white/20 text-white text-xs font-display font-medium rounded-xl border border-white/20 transition-all cursor-pointer"
            >
              Public Home
            </button>
          </div>
        </div>
      </section>

      {/* Main Container Layout split */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left 9-Cols: Metrics grid, Custom Tab Switcher, Charts, Scholar Sheet */}
        <div className="lg:col-span-9 flex flex-col gap-8">
          
          {/* Section Action Selector Hub */}
          <div className="bg-[#112240]/5 p-1.5 rounded-2xl border border-slate-200 flex gap-1.5 shadow-2xs">
            <button
              type="button"
              onClick={() => setActiveTab('database')}
              className={`flex-1 py-2.5 px-4 rounded-xl font-display text-xs font-bold transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'database'
                  ? 'bg-[#0A192F] text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/50'
              }`}
            >
              📁 Scholar Records & Analytics
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('attendance')}
              className={`flex-1 py-2.5 px-4 rounded-xl font-display text-xs font-bold transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'attendance'
                  ? 'bg-[#0A192F] text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/50'
              }`}
            >
              📅 Attendance Tracker & WhatsApp Broadcasting
            </button>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            
            {/* Metric 1 */}
            <div className="bg-white p-4 rounded-2xl border border-[#cbd5e1]/40 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-brand-slate uppercase font-semibold">Total Students</span>
                <h3 className="text-2xl font-mono font-bold text-brand-blue mt-1">{totalStudentsMetric.toLocaleString()}</h3>
              </div>
              <div className="text-[10px] text-emerald-600 font-semibold mt-3 flex items-center gap-1">
                <span>↑ 12% vs last month</span>
              </div>
            </div>

            {/* Metric 2 */}
            <div className="bg-white p-4 rounded-2xl border border-[#cbd5e1]/40 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-brand-slate uppercase font-semibold">Monthly Revenue</span>
                <h3 className="text-2xl font-mono font-bold text-brand-blue mt-1">₹4.2M</h3>
              </div>
              <div className="text-[10px] text-brand-gold-dark font-mono font-semibold mt-3">
                Target achievement: 98.4%
              </div>
            </div>

            {/* Metric 3 */}
            <div className="bg-white p-4 rounded-2xl border border-[#cbd5e1]/40 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-brand-slate uppercase font-semibold">Active Teachers</span>
                <h3 className="text-2xl font-mono font-bold text-brand-blue mt-1">42</h3>
              </div>
              <div className="text-[10px] text-slate-500 font-light mt-3">
                Offices: Althan & Vesu
              </div>
            </div>

            {/* Metric 4 */}
            <div className="bg-white p-4 rounded-2xl border border-[#cbd5e1]/40 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-brand-slate uppercase font-semibold">Attendance Rate</span>
                <h3 className="text-2xl font-mono font-bold text-emerald-600 mt-1">{averageAttendance}%</h3>
              </div>
              <div className="text-[10px] text-brand-slate font-medium mt-3">
                Bi-weekly tracking range
              </div>
            </div>

          </div>

          {/* Automated Attendance Intervention watch alert banner */}
          {atRiskStudents.length > 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-rose-50/90 border-2 border-rose-500/30 rounded-2xl p-5 shadow-sm flex flex-col gap-4 font-sans relative overflow-hidden"
              id="vac-attendance-intervention-alert"
            >
              <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 w-28 h-28 bg-rose-500/5 rounded-full blur-2xl"></div>
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-rose-500 text-white rounded-xl animate-pulse shadow-sm flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-[#9F1239] uppercase tracking-wide flex items-center gap-1.5">
                      🚨 Critical Attendance Threshold Interventions ({atRiskStudents.length})
                    </h4>
                    <p className="text-xs text-rose-800 font-medium mt-0.5">
                      The registered scholars below have fallen below the mandatory <span className="font-bold text-[#4C0519] underline underline-offset-2">75% attendance rate requirement</span>. Attendance tracking must be immediately rectified.
                    </p>
                  </div>
                </div>
                
                <span className="text-[10px] font-mono font-bold text-rose-700 bg-rose-100 border border-rose-200 px-2.5 py-1 rounded-lg">
                  Action Required: WhatsApp Escalation Enabled
                </span>
              </div>

              {/* Grid representation of all at risk students */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 mt-1">
                {atRiskStudents.map((st) => (
                  <div 
                    key={st.id} 
                    className="bg-white border border-rose-200 rounded-xl p-3.5 shadow-2xs hover:border-rose-400 hover:shadow-xs transition-all flex flex-col justify-between gap-3 relative"
                    id={`at-risk-scholar-${st.id}`}
                  >
                    <div className="flex items-start gap-3 justify-between">
                      <div className="flex items-start gap-2.5 min-w-0">
                        <img 
                          src={st.photoUrl || "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=120"} 
                          alt={st.name} 
                          className="w-10 h-10 rounded-full object-cover border border-rose-200 shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="min-w-0">
                          <span className="text-[10px] uppercase font-mono font-bold text-slate-400 block">{st.id}</span>
                          <h5 className="font-bold text-slate-900 text-sm truncate leading-snug">{st.name}</h5>
                          <p className="text-[10px] text-slate-500 mt-0.5 truncate">{st.class} • {st.stream}</p>
                        </div>
                      </div>
                      
                      {/* Critical Rate Indicator Badge */}
                      <div className="text-right shrink-0">
                        <span className="inline-block font-mono font-black text-rose-600 bg-rose-50 border border-rose-100 rounded-lg px-2 py-0.5 text-xs">
                          {st.attendanceRate}%
                        </span>
                        <span className="block text-[9px] text-rose-400 font-semibold font-mono mt-0.5">Critical</span>
                      </div>
                    </div>

                    {/* Progress tracking line */}
                    <div>
                      <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono mb-1">
                        <span>Engagement Rate</span>
                        <span className="font-bold text-rose-600">{st.attendanceRate}% / 75% Target</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200 font-sans">
                        <div 
                          className="bg-rose-500 h-full rounded-full transition-all duration-300" 
                          style={{ width: `${Math.min(100, (st.attendanceRate / 75) * 100)}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Action buttons footer */}
                    <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-[11px] gap-2">
                      <div className="truncate min-w-0">
                        <span className="text-[9px] text-slate-400 block">Parent Guardian</span>
                        <strong className="text-slate-700 truncate block text-[10.5px]">
                          {st.parents.fatherName}
                        </strong>
                      </div>
                      
                      <button
                        type="button"
                        onClick={() => handleInterventionWhatsApp(st)}
                        className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-lg text-[10.5px] transition-all flex items-center justify-center gap-1 cursor-pointer shrink-0"
                      >
                        📞 Alert Parent
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <div className="bg-emerald-50/50 border border-emerald-200/60 rounded-2xl p-4 flex items-center justify-between font-sans text-xs shadow-3xs hover:shadow-2xs transition-all duration-300" id="vac-attendance-perfect-status">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 bg-emerald-500 text-white rounded-lg shadow-2xs flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-emerald-950 block font-display">Excelling Attendance Safeguards Check</span>
                  <span className="text-slate-500 block mt-0.5">All registered scholars are currently pacing above the mandatory 75% attendance rate benchmark. No interventions required.</span>
                </div>
              </div>
              <span className="text-[10px] font-mono text-emerald-600 bg-emerald-100/60 px-2.5 py-1 rounded-lg font-bold">
                Status: Secure
              </span>
            </div>
          )}

          {activeTab === 'database' ? (
            <>
              {/* Dynamic Interactive SVG Charts component */}
              <DashboardCharts trends={mockTrends} streams={mockStreams} />

              {/* Scholar Database spreadsheet Grid panel */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <div>
                    <h3 className="text-lg font-display font-extrabold text-brand-blue">Active Academic Database</h3>
                    <p className="text-xs text-slate-500">Search student profile history, and instantly toggles real-time metrics.</p>
                  </div>
                  
                  {/* Reset Filters Option */}
                  {(selectedStream !== 'All' || selectedFormat !== 'All' || selectedGrade !== 'All' || searchTerm) && (
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedStream('All');
                        setSelectedFormat('All');
                        setSelectedGrade('All');
                        setSearchTerm('');
                      }}
                      className="text-xs text-brand-cyan hover:text-brand-blue font-semibold underline underline-offset-2"
                    >
                      Clear all filters
                    </button>
                  )}
                </div>

                {/* Complex Search and Segmented Filters Row */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-5 p-4 bg-slate-50 rounded-xl border border-slate-150">
                  
                  {/* Search text box */}
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="Query Name, ID or School..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:ring-1 focus:ring-brand-gold bg-white focus:outline-none"
                    />
                  </div>

                  {/* Stream filter select */}
                  <div>
                    <select
                      value={selectedStream}
                      onChange={(e) => setSelectedStream(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs focus:ring-1 focus:ring-brand-gold bg-white focus:outline-none"
                    >
                      <option value="All">All Streams</option>
                      <option value="Science">Science (JEE/NEET)</option>
                      <option value="Commerce">Commerce (CA)</option>
                      <option value="Humanities">Humanities</option>
                      <option value="Foundation">Foundation</option>
                      <option value="VisionPreneur">VisionPreneur</option>
                    </select>
                  </div>

                  {/* Deliver format Filter */}
                  <div>
                    <select
                      value={selectedFormat}
                      onChange={(e) => setSelectedFormat(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs focus:ring-1 focus:ring-brand-gold bg-white focus:outline-none"
                    >
                      <option value="All">All Formats</option>
                      <option value="Offline">Offline Surat</option>
                      <option value="Hybrid">Hybrid Model</option>
                      <option value="Online">Pure Online</option>
                    </select>
                  </div>

                  {/* Performance standing selector */}
                  <div>
                    <select
                      value={selectedGrade}
                      onChange={(e) => setSelectedGrade(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs focus:ring-1 focus:ring-brand-gold bg-white focus:outline-none"
                    >
                      <option value="All">All Grades</option>
                      <option value="A+">Rank A+ (95%+)</option>
                      <option value="A">Rank A (90%+)</option>
                      <option value="B">Rank B (80%+)</option>
                      <option value="C">Rank C (70%+)</option>
                      <option value="At Risk">At Risk (Below 70%)</option>
                    </select>
                  </div>

                </div>

                {/* Excel spreadsheet Database grid body */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left font-sans text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-100/85 border-b border-slate-200 text-brand-slate uppercase font-mono tracking-wider text-[10px]">
                        <th className="py-2.5 px-4 font-bold">Scholar Portrait / Name</th>
                        <th className="py-2.5 px-3 font-bold">Admission ID</th>
                        <th className="py-2.5 px-3 font-bold">Standard school</th>
                        <th className="py-2.5 px-3 font-bold">Stream Pathway</th>
                        <th className="py-2.5 px-3 font-bold text-center">FORTNIGHTLY PRESENCE</th>
                        <th className="py-2.5 px-3 font-bold text-center">Grade Score</th>
                        <th className="py-2.5 px-4 text-right font-bold">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredStudents.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="text-center py-10 text-slate-400 font-light text-xs italic">
                            No scholar entries match search filters. Click 'Add Quick Scholar' to manually file an entry.
                          </td>
                        </tr>
                      ) : (
                        filteredStudents.map((st) => {
                          // Dynamically calculate grades colors
                          const gradeColor = st.averageGrade === 'A+'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-100'
                            : st.averageGrade === 'A'
                            ? 'bg-indigo-50 text-indigo-800 border-indigo-100'
                            : st.averageGrade === 'B'
                            ? 'bg-amber-50 text-amber-805 border-amber-100'
                            : 'bg-rose-50 text-rose-800 border-rose-100';

                          return (
                            <tr key={st.id} className="hover:bg-stone-50/50 transition-colors duration-150">
                              {/* Portrait & Profile Name */}
                              <td className="py-3 px-4 flex items-center gap-3">
                                <img
                                  src={st.photoUrl}
                                  alt={st.name}
                                  className="w-8 h-8 rounded-full object-cover border border-slate-200"
                                  referrerPolicy="no-referrer"
                                />
                                <div>
                                  <strong className="text-brand-blue text-[13px]">{st.name}</strong>
                                  <span className="block text-[10px] text-slate-400 mt-0.5">{st.phone}</span>
                                </div>
                              </td>

                              {/* ID badge */}
                              <td className="py-3 px-3">
                                <span className="font-mono bg-slate-100 border border-slate-200 text-slate-700 px-2 py-0.5 rounded text-[11px] font-semibold">
                                  {st.id}
                                </span>
                              </td>

                              {/* Class / School */}
                              <td className="py-3 px-3">
                                <span className="font-medium text-slate-700">{st.class}</span>
                                <span className="block text-[10px] text-slate-400 truncate max-w-[150px] mt-0.5" title={st.school}>
                                  {st.school}
                                </span>
                              </td>

                              {/* Stream / Format */}
                              <td className="py-3 px-3">
                                <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full ${
                                  st.stream === 'Science'
                                    ? 'bg-[#0f172a]/10 text-brand-blue'
                                    : st.stream === 'Commerce'
                                    ? 'bg-[#D4AF37]/15 text-brand-gold-dark'
                                    : 'bg-slate-100 text-slate-750'
                                }`}>
                                  {st.stream}
                                </span>
                                <span className="block text-[10px] text-slate-500 mt-1 pl-1">
                                  {st.format === 'Offline' ? '📍 Offline' : st.format === 'Hybrid' ? '⚡ Hybrid' : '🌐 Online'}
                                </span>
                              </td>

                              {/* Dynamic Attendance field */}
                              <td className="py-3 px-3 text-center">
                                <button
                                  onClick={() => {
                                    const toggledRate = st.attendanceRate > 90 ? 68.2 : 98.5;
                                    onUpdateStudentAttendance(st.id, toggledRate);
                                  }}
                                  title="Click to toggle quick attendance simulation mock!"
                                  className={`font-mono text-[13px] font-bold px-3 py-1 rounded-xl transition-all cursor-pointer ${
                                    st.attendanceRate >= 90
                                      ? 'bg-emerald-50 text-emerald-700 hover:bg-rose-50 hover:text-rose-700'
                                      : 'bg-rose-50 text-rose-700 hover:bg-emerald-50 hover:text-emerald-700'
                                  }`}
                                >
                                  {st.attendanceRate}%
                                </button>
                                <span className="text-[9px] text-slate-400 block mt-1 hover:underline">Click to toggle</span>
                              </td>

                              {/* Grade metrics */}
                              <td className="py-3 px-3 text-center">
                                <span className={`px-2 py-0.5 rounded border font-mono font-bold text-[11px] ${gradeColor}`}>
                                  {st.averageGrade}
                                </span>
                              </td>

                              {/* Actions menu */}
                              <td className="py-3 px-4 text-right">
                                <div className="inline-flex gap-1.5">
                                  <button
                                    onClick={() => setActiveProfileStudent(st)}
                                    className="px-2 py-1 text-[10px] font-display font-semibold transition bg-slate-100 hover:bg-brand-blue hover:text-white rounded text-slate-700 cursor-pointer"
                                  >
                                    View File
                                  </button>
                                  <button
                                    onClick={() => handleWarnParent(st)}
                                    title="Warn Parent WhatsApp"
                                    className="px-1.5 py-1 text-[10px] bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded transition-all cursor-pointer"
                                  >
                                    💬 WhatsApp
                                  </button>
                                  <button
                                    onClick={() => onRemoveStudent(st.id)}
                                    className="p-1 text-slate-350 hover:text-rose-600 rounded transition-all cursor-pointer"
                                    title="Delete/Expel Student"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          ) : (
            /* Student Attendance Tracker View Space */
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 animate-fade-in flex flex-col gap-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-lg font-display font-black text-brand-blue flex items-center gap-2">
                    <CalendarRange className="w-5 h-5 text-brand-gold" /> Student Attendance Tracker
                  </h3>
                  <p className="text-xs text-slate-500">Log student sessions, update record state, and report on WhatsApp.</p>
                </div>
                <button
                  type="button"
                  onClick={handleSyncAttendanceToProfiles}
                  className="py-2.5 px-4 bg-[#0A192F] hover:bg-brand-blue text-white text-xs font-display font-bold rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  Save & Sync to Profiles
                </button>
              </div>

              {/* Status Indicator banner */}
              {attendanceStatusMsg && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-850 rounded-xl text-xs flex justify-between items-center transition-all animate-pulse-subtle">
                  <span className="font-semibold">{attendanceStatusMsg}</span>
                  <button type="button" onClick={() => setAttendanceStatusMsg('')} className="font-bold cursor-pointer text-slate-500 hover:text-black px-1">×</button>
                </div>
              )}

              {/* Session Filter configurations */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-stone-50 border border-slate-150 rounded-xl">
                <div>
                  <label className="block text-slate-500 font-mono text-[9px] uppercase font-bold mb-1">Standard Class</label>
                  <select
                    value={attendanceClass}
                    onChange={(e) => setAttendanceClass(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white focus:ring-1 focus:ring-brand-gold outline-none text-xs font-semibold text-slate-700 font-sans"
                  >
                    <option value="All">All Classes</option>
                    <option value="Class 9">Class 9</option>
                    <option value="Class 10">Class 10</option>
                    <option value="Class 11">Class 11</option>
                    <option value="Class 12">Class 12</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-500 font-mono text-[9px] uppercase font-bold mb-1">Stream Pathway</label>
                  <select
                    value={attendanceStream}
                    onChange={(e) => setAttendanceStream(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white focus:ring-1 focus:ring-brand-gold outline-none text-xs font-semibold text-slate-700 font-sans"
                  >
                    <option value="All">All Streams</option>
                    <option value="Science">Science (JEE/NEET)</option>
                    <option value="Commerce">Commerce (CA Prep)</option>
                    <option value="Humanities">Humanities</option>
                    <option value="Foundation">Foundation</option>
                    <option value="VisionPreneur">VisionPreneur</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-500 font-mono text-[9px] uppercase font-bold mb-1">Session Date</label>
                  <input
                    type="date"
                    value={attendanceDate}
                    onChange={(e) => setAttendanceDate(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white focus:ring-1 focus:ring-brand-gold outline-none text-xs font-mono text-slate-705"
                  />
                </div>
              </div>

              {/* Status metrics summary row */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-205 text-center">
                  <span className="text-[9px] font-mono uppercase text-slate-400 block font-semibold">Matched</span>
                  <span className="text-base font-mono font-bold text-slate-800 block mt-0.5">{matchedAttendanceStudents.length}</span>
                </div>
                <div className="bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-150 text-center">
                  <span className="text-[9px] font-mono uppercase text-emerald-600 block font-semibold">Present</span>
                  <span className="text-base font-mono font-bold text-emerald-700 block mt-0.5">
                    {matchedAttendanceStudents.filter((s) => getAttendanceStatus(s.id) === 'Present').length}
                  </span>
                </div>
                <div className="bg-rose-50/50 p-2.5 rounded-xl border border-rose-150 text-center flex-1">
                  <span className="text-[9px] font-mono uppercase text-rose-600 block font-semibold">Absent</span>
                  <span className="text-base font-mono font-bold text-rose-700 block mt-0.5">
                    {matchedAttendanceStudents.filter((s) => getAttendanceStatus(s.id) === 'Absent').length}
                  </span>
                </div>
                <div className="bg-amber-50/50 p-2.5 rounded-xl border border-amber-150 text-center">
                  <span className="text-[9px] font-mono uppercase text-amber-600 block font-semibold">Late</span>
                  <span className="text-base font-mono font-bold text-amber-700 block mt-0.5">
                    {matchedAttendanceStudents.filter((s) => getAttendanceStatus(s.id) === 'Late').length}
                  </span>
                </div>
                <div className="bg-[#0A192F]/5 p-2.5 rounded-xl border border-[#0A192F]/15 text-center col-span-2 sm:col-span-1">
                  <span className="text-[9px] font-mono uppercase text-[#0A192F] block font-semibold">Presence Rate</span>
                  <span className="text-base font-mono font-bold text-[#0A192F] block mt-0.5">
                    {matchedAttendanceStudents.length > 0
                      ? Math.round((matchedAttendanceStudents.filter(s => getAttendanceStatus(s.id) === 'Present' || getAttendanceStatus(s.id) === 'Late').length / matchedAttendanceStudents.length) * 100)
                      : 0}%
                  </span>
                </div>
              </div>

              {/* Toggable Student list container */}
              <div className="overflow-x-auto border border-slate-150 rounded-xl">
                <table className="w-full text-left font-sans text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-150 text-brand-slate uppercase font-mono tracking-wider text-[10px]">
                      <th className="py-2.5 px-4 font-black">Scholar Name / Portrait</th>
                      <th className="py-2.5 px-3 font-black">Standard</th>
                      <th className="py-2.5 px-3 font-black text-center">Coaching Type</th>
                      <th className="py-2.5 px-4 text-center font-black flex items-center justify-center h-full">Status Selector</th>
                      <th className="py-2.5 px-4 text-center font-black">Parent Notification</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-sans text-xs">
                    {matchedAttendanceStudents.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="text-center py-10 text-slate-400 font-light italic">
                          No students currently logged under chosen standard ({attendanceClass}) / stream ({attendanceStream}).
                        </td>
                      </tr>
                    ) : (
                      matchedAttendanceStudents.map((st) => {
                        const status = getAttendanceStatus(st.id);
                        return (
                          <tr key={st.id} className="hover:bg-slate-50/20 transition-all">
                            {/* General Name / ID Info */}
                            <td className="py-3 px-4 flex items-center gap-2.5">
                              <img
                                src={st.photoUrl}
                                alt={st.name}
                                className="w-7 h-7 rounded-full object-cover border border-slate-200"
                                referrerPolicy="no-referrer"
                              />
                              <div>
                                <strong className="text-brand-blue text-[13px]">{st.name}</strong>
                                <span className="block text-[10px] text-slate-400 font-mono mt-0.5">{st.id}</span>
                              </div>
                            </td>

                            {/* Class Standard info */}
                            <td className="py-3 px-3">
                              <span className="font-semibold text-slate-700 block">{st.class}</span>
                              <span className="text-[10px] text-brand-slate/80 mt-0.5 block">{st.stream}</span>
                            </td>

                            {/* Form / Carriage type status badge */}
                            <td className="py-3 px-3 text-center">
                              <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full ${
                                st.format === 'Offline'
                                  ? 'bg-[#0f172a]/10 text-brand-blue'
                                  : 'bg-emerald-55 text-emerald-805'
                              }`}>
                                {st.format}
                              </span>
                            </td>

                            {/* Interactive Radio Indicators */}
                            <td className="py-3 px-4">
                              <div className="flex items-center justify-center gap-1.5 h-full">
                                <button
                                  type="button"
                                  onClick={() => handleUpdateAttendanceStatus(st.id, 'Present')}
                                  className={`py-1 px-2.5 rounded-lg border text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
                                    status === 'Present'
                                      ? 'bg-emerald-600 border-emerald-600 text-white shadow-3xs'
                                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                                  }`}
                                >
                                  Present
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleUpdateAttendanceStatus(st.id, 'Absent')}
                                  className={`py-1 px-2.5 rounded-lg border text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
                                    status === 'Absent'
                                      ? 'bg-rose-600 border-rose-600 text-white shadow-3xs'
                                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                                  }`}
                                >
                                  Absent
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleUpdateAttendanceStatus(st.id, 'Late')}
                                  className={`py-1 px-2.5 rounded-lg border text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
                                    status === 'Late'
                                      ? 'bg-amber-500 border-amber-500 text-white shadow-3xs'
                                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                                  }`}
                                >
                                  Late
                                </button>
                              </div>
                            </td>

                            {/* Sub actions warning parent personal WhatsApp template */}
                            <td className="py-3 px-4 text-center">
                              {status === 'Absent' ? (
                                <button
                                  type="button"
                                  onClick={() => handleWarnParentAbsent(st)}
                                  className="w-full py-1 px-2 flex bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 font-semibold rounded-lg text-[10px] transition-all items-center justify-center gap-1 cursor-pointer"
                                  title="Draft quick WhatsApp trigger warning to parent details"
                                >
                                  💬 Warn Parent
                                </button>
                              ) : (
                                <span className="text-[10px] text-slate-400 font-light italic">No Actions</span>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {/* REPORT CODES BROADCAST BOX FOR ADMIN */}
              <div className="bg-[#FAF9F6] border border-slate-150 rounded-2xl p-5 mt-4">
                <div className="flex items-center gap-1.5 mb-2.5 border-b border-slate-200 pb-2">
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <h4 className="text-xs font-display font-black text-brand-blue uppercase">Dynamic WhatsApp Reporting Module</h4>
                </div>
                <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                  Export session attendance reports directly to the administrator's WhatsApp thread. Select an official Administrator shortcut below to pre-populate, or enter any custom target number.
                </p>

                {/* Official Directory Selection Pills */}
                <div className="mb-4 bg-white/70 border border-slate-200/60 rounded-xl p-3">
                  <span className="block text-slate-500 font-mono text-[9px] uppercase font-bold mb-2">VAC Official Admin Recipient Directory</span>
                  <div className="flex flex-wrap gap-2">
                    {VAC_ADMIN_DIRECTORY.map((adm) => {
                      const isActive = adminPhone.replace(/\D/g, '') === adm.phone.replace(/\D/g, '');
                      return (
                        <button
                          key={adm.phone}
                          type="button"
                          onClick={() => setAdminPhone(adm.phone)}
                          className={`text-[10.5px] px-3 py-1.5 rounded-lg border font-bold transition-all flex items-center gap-1 cursor-pointer ${
                            isActive
                              ? 'bg-[#0A192F] text-white border-transparent shadow-xs'
                              : 'bg-stone-50 hover:bg-stone-100 text-slate-700 border-slate-220'
                          }`}
                        >
                          👥 {adm.name}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-slate-500 font-mono text-[9px] uppercase font-bold mb-1">Admin Phone (With Country Code)</label>
                    <input
                      type="text"
                      value={adminPhone}
                      onChange={(e) => setAdminPhone(e.target.value)}
                      placeholder="+91 96377 16664"
                      className="w-full px-3 py-2 border border-slate-250 bg-white rounded-lg focus:ring-1 focus:ring-brand-gold outline-none font-mono text-xs text-slate-700"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[#0A192F] font-mono text-[9px] uppercase font-bold mb-1">Session Notes / Core Remarks</label>
                    <input
                      type="text"
                      value={customNote}
                      onChange={(e) => setCustomNote(e.target.value)}
                      placeholder="e.g. Mathematics chapter 1 revision conducted. Outstanding engagement."
                      className="w-full px-3 py-2 border border-slate-250 bg-white rounded-lg focus:ring-1 focus:ring-brand-gold outline-none text-xs text-slate-750"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 mt-5 justify-end">
                  <button
                    type="button"
                    onClick={handleCopyToClipboardReport}
                    className="py-1.5 px-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs transition-all border border-slate-200 cursor-pointer"
                  >
                    📋 Copy Text Report Clipboard
                  </button>
                  <button
                    type="button"
                    onClick={handleSendAttendanceToAdminWhatsApp}
                    disabled={matchedAttendanceStudents.length === 0}
                    className="py-1.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Send to Admin WhatsApp
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Right 3-Cols: Class Conflict & Substitution panel */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          
          {/* Calendar Clock Info Box */}
          <div className="bg-[#172a45] text-white p-4 rounded-2xl border border-white/5 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-brand-gold/15 rounded-lg border border-brand-gold/30">
                <Clock className="w-5 h-5 text-brand-gold" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-brand-gold uppercase tracking-wider font-bold">Academic Session</span>
                <h4 className="text-sm font-display font-bold text-white mt-0.5">Mocking Term 2026</h4>
              </div>
            </div>
          </div>

          {/* Conflict List Section */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200">
            <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
              <span className="text-xs font-mono font-bold text-brand-blue uppercase tracking-wide">Class Conflicts</span>
              <span className="bg-rose-50 text-rose-700 rounded-full text-[10px] font-mono px-2 py-0.5 font-bold">
                {conflicts.filter(c => !c.resolved).length} Pending
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {conflicts.map((conf) => (
                <div
                  key={conf.id}
                  className={`p-3.5 rounded-xl border transition-all ${
                    conf.resolved
                      ? 'bg-slate-50 border-slate-200 opacity-60'
                      : conf.severity === 'high'
                      ? 'bg-rose-50/50 border-rose-200'
                      : 'bg-amber-50/50 border-amber-200'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <strong className="text-xs font-display font-semibold text-brand-blue">{conf.classTitle}</strong>
                    {conf.resolved ? (
                      <span className="bg-emerald-500 text-white font-mono font-bold text-[8px] px-1.5 py-0.5 rounded">
                        SOLVED
                      </span>
                    ) : (
                      <span className="text-[10px] text-rose-600 font-serif">⚠️</span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-550 mt-1 leading-relaxed">{conf.details}</p>
                  
                  <button
                    onClick={() => handleToggleConflict(conf.id)}
                    className="w-full mt-2.5 py-1 rounded bg-white hover:bg-slate-150 text-[10px] font-display font-bold text-slate-705 border border-slate-200 shadow-3xs cursor-pointer transition-all"
                  >
                    {conf.resolved ? 'Reopen Conflict' : 'Assign Alternate Room / Fix'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Teacher Attendance & Substutition rail */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200">
            <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
              <span className="text-xs font-mono font-bold text-brand-blue uppercase tracking-wide">Absent Substitution</span>
              <span className="bg-amber-50 text-amber-700 rounded-full text-[10px] font-mono px-2 py-0.5 font-bold">
                {absents.filter(a => !a.resolved).length} Coverages
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {absents.map((abs) => (
                <div
                  key={abs.id}
                  className={`p-3 border rounded-xl transition-all ${
                    abs.resolved ? 'bg-slate-50 border-slate-200 opacity-50' : 'bg-stone-50 border-slate-202'
                  }`}
                >
                  <div className="flex defend items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <strong className="text-xs text-brand-blue font-display font-semibold">{abs.teacherName}</strong>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1.5 font-light">
                    Subject: <strong>{abs.subject}</strong><br />
                    Session Date: <strong>{abs.date}</strong><br />
                    Assigned Substitute: <strong>{abs.fallbackTeacher}</strong>
                  </div>

                  <button
                    onClick={() => handleToggleAbsent(abs.id)}
                    className={`w-full py-1 mt-3 rounded text-[10px] font-bold border transition-all cursor-pointer ${
                      abs.resolved
                        ? 'bg-slate-50 border-slate-200 text-slate-500'
                        : 'bg-brand-blue hover:bg-brand-cyan border-brand-blue text-white shadow-3xs'
                    }`}
                  >
                    {abs.resolved ? 'Duties Assigned ✓' : 'Confirm Substitute Coverage'}
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Slide-over Profile Details Overlay Modal */}
      {activeProfileStudent && (
        <div className="fixed inset-0 bg-brand-blue/65 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-lg w-full overflow-hidden shadow-2xl">
            <div className="bg-brand-blue text-white p-5 flex justify-between items-center">
              <h4 className="font-display font-bold">Scholar Dossier History</h4>
              <button
                onClick={() => setActiveProfileStudent(null)}
                className="p-1 text-slate-300 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 flex flex-col gap-4 font-sans text-xs">
              <div className="flex gap-4 items-center border-b border-slate-100 pb-4">
                <img
                  src={activeProfileStudent.photoUrl}
                  alt={activeProfileStudent.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-brand-gold shadow-md"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <span className="font-mono bg-brand-gold/15 text-brand-gold-dark px-2 py-0.5 rounded text-[10px] font-semibold">
                    {activeProfileStudent.id}
                  </span>
                  <h3 className="text-base font-display font-bold text-brand-blue mt-1">{activeProfileStudent.name}</h3>
                  <p className="text-slate-500">{activeProfileStudent.school}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-y-3.5 gap-x-4 border-b border-slate-100 pb-4">
                <div>
                  <span className="text-slate-400 block text-[9px] uppercase font-mono">Date of Birth</span>
                  <strong>{activeProfileStudent.dob}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[9px] uppercase font-mono">GSEB/CBSE Class</span>
                  <strong>{activeProfileStudent.class}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[9px] uppercase font-mono">Mobile Number</span>
                  <strong>{activeProfileStudent.phone}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[9px] uppercase font-mono">Surat Area Location</span>
                  <strong>{activeProfileStudent.area}</strong>
                </div>
              </div>

              <div>
                <span className="text-slate-400 block text-[9px] uppercase font-mono mb-1.5">Family Guard Records</span>
                <div className="p-3 bg-stone-50 border border-slate-150 rounded-xl">
                  <div>Father Name: <strong>{activeProfileStudent.parents.fatherName}</strong></div>
                  <div className="mt-1">Mother Name: <strong>{activeProfileStudent.parents.motherName}</strong></div>
                  <div className="mt-1">Emergency Ph: <strong>{activeProfileStudent.parents.parentPhone}</strong> (Channel: {activeProfileStudent.parents.channel})</div>
                </div>
              </div>

              <div className="flex gap-2 w-full mt-2">
                <button
                  onClick={() => handleWarnParent(activeProfileStudent)}
                  className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-display font-bold transition shadow-xs cursor-pointer"
                >
                  💬 Dynamic Reports Link (WhatsApp)
                </button>
                <button
                  onClick={() => setActiveProfileStudent(null)}
                  className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-display font-semibold transition cursor-pointer"
                >
                  Back Dossier
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Add Scholar Modal popup */}
      {isQuickAddOpen && (
        <div className="fixed inset-0 bg-brand-blue/65 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-md w-full overflow-hidden shadow-2xl">
            <div className="bg-brand-blue text-white p-5 flex justify-between items-center">
              <h4 className="font-display font-bold text-sm">Add New Scholar Registry</h4>
              <button onClick={() => setIsQuickAddOpen(false)} className="p-1 text-slate-300 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleQuickAdd} className="p-6 flex flex-col gap-4 text-xs font-sans">
              <div>
                <label className="block text-slate-500 font-mono text-[10px] uppercase mb-1">Scholar Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Divyesh Vashishth"
                  value={quickStudent.name}
                  onChange={(e) => setQuickStudent({ ...quickStudent, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-brand-gold bg-stone-50/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-500 font-mono text-[10px] uppercase mb-1">Custom Standard *</label>
                  <select
                    value={quickStudent.class}
                    onChange={(e) => setQuickStudent({ ...quickStudent, class: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-stone-50/50"
                  >
                    <option>Class 9</option>
                    <option>Class 10</option>
                    <option>Class 11</option>
                    <option>Class 12</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-500 font-mono text-[10px] uppercase mb-1">Stream Pathway *</label>
                  <select
                    value={quickStudent.stream}
                    onChange={(e) => setQuickStudent({ ...quickStudent, stream: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-stone-50/50"
                  >
                    <option value="Science">Science (JEE/NEET)</option>
                    <option value="Commerce">Commerce (CA)</option>
                    <option value="Humanities">Humanities</option>
                    <option value="Foundation">Foundation</option>
                    <option value="VisionPreneur">VisionPreneur</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-500 font-mono text-[10px] uppercase mb-1">Surat Base School *</label>
                <select
                  value={quickStudent.school}
                  onChange={(e) => setQuickStudent({ ...quickStudent, school: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-stone-50/50"
                >
                  {SURAT_SCHOOLS.map((sch) => (
                    <option key={sch} value={sch}>{sch}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-500 font-mono text-[10px] uppercase mb-1">Coaching Format *</label>
                  <select
                    value={quickStudent.format}
                    onChange={(e) => setQuickStudent({ ...quickStudent, format: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-stone-50/50"
                  >
                    <option value="Offline">Offline Surat</option>
                    <option value="Hybrid">Hybrid Model</option>
                    <option value="Online">Pure Online</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-500 font-mono text-[10px] uppercase mb-1">Grade Score *</label>
                  <select
                    value={quickStudent.grade}
                    onChange={(e) => setQuickStudent({ ...quickStudent, grade: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-stone-50/50"
                  >
                    <option>A+</option>
                    <option>A</option>
                    <option>B</option>
                    <option>C</option>
                    <option value="At Risk">At Risk</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-2 w-full mt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#172a45] hover:bg-brand-blue text-white rounded-xl font-display font-bold transition shadow-xs cursor-pointer"
                >
                  Verify & Register Scholar Entry
                </button>
                <button
                  type="button"
                  onClick={() => setIsQuickAddOpen(false)}
                  className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-display font-semibold transition cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
