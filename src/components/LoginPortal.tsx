import React, { useState } from 'react';
import { KeyRound, Shield, Users, Award, Landmark, PhoneCall, CheckCircle, HelpCircle, Lock } from 'lucide-react';
import { Student } from '../types';
import { motion } from 'motion/react';

interface LoginPortalProps {
  onNavigate: (view: 'landing' | 'register' | 'login' | 'admin' | 'schedule') => void;
  students: Student[];
  isTeacherLoggedIn: boolean;
  setIsTeacherLoggedIn: (val: boolean) => void;
}

type Role = 'Student' | 'Parent' | 'Teacher' | 'Admin';

export const LoginPortal: React.FC<LoginPortalProps> = ({
  onNavigate,
  students,
  isTeacherLoggedIn,
  setIsTeacherLoggedIn,
}) => {
  const [activeRole, setActiveRole] = useState<Role>('Admin');
  
  // Standard Login credentials
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [otpMode, setOtpMode] = useState(false);
  const [phoneInput, setPhoneInput] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  // Forgot Password Simulation States
  const [isForgotPasswordMode, setIsForgotPasswordMode] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [forgotPasswordStatus, setForgotPasswordStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [generatedResetLink, setGeneratedResetLink] = useState<string | null>(null);

  // States for logged-in Student, Parent or Teacher views
  const [loggedInSimObject, setLoggedInSimObject] = useState<Student | null>(null);
  const [teacherClass, setTeacherClass] = useState('Class 12');
  const [teacherSubject, setTeacherSubject] = useState('Physics');
  const [teacherQuizPosted, setTeacherQuizPosted] = useState(false);
  const [teacherAttendanceStatus, setTeacherAttendanceStatus] = useState<'idle' | 'scanning' | 'completed'>('idle');
  const [teacherSyncStatus, setTeacherSyncStatus] = useState<string | null>(null);
  const [localStudentScores, setLocalStudentScores] = useState<Record<string, number>>({});

  const handleStandardLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (activeRole === 'Admin') {
      // Allow testing bypass easily as well as checks
      if (credentials.username === 'admin@vac' || credentials.username === 'admin') {
        setIsTeacherLoggedIn(true);
        onNavigate('admin');
        return;
      }
      // If student search matches name block:
      const match = students.find((s) => s.email.toLowerCase() === credentials.username.toLowerCase());
      if (match) {
        setLoggedInSimObject(match);
        return;
      }
      // Fallback
      setIsTeacherLoggedIn(true);
      onNavigate('admin');
    } else if (activeRole === 'Student' || activeRole === 'Parent') {
      // Dynamically locate student from our database so progress numbers match!
      const userLower = credentials.username.toLowerCase();
      // Find matches by name or mail
      const match = students.find(
        (s) => s.email.toLowerCase().includes(userLower) || s.name.toLowerCase().includes(userLower)
      ) || students[0];
      setLoggedInSimObject(match);
    } else {
      // Teacher mode
      setIsTeacherLoggedIn(true);
    }
  };

  const handleSendOtp = () => {
    if (!phoneInput) return;
    setOtpSent(true);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeRole === 'Admin') {
      setIsTeacherLoggedIn(true);
      onNavigate('admin');
    } else if (activeRole === 'Teacher') {
      setIsTeacherLoggedIn(true);
    } else {
      setLoggedInSimObject(students[0]);
    }
  };

  return (
    <div className="bg-[#FAF9F6] text-slate-800 py-12 px-4 sm:px-6 min-h-[calc(100vh-64px)] flex items-center justify-center">
      <div className="w-full max-w-xl bg-white rounded-3xl border border-[#cbd5e1]/40 shadow-xl overflow-hidden">
        
        {/* Portal Cover */}
        <div className="bg-brand-blue text-white p-6 sm:p-8 text-center relative">
          <button
            onClick={() => onNavigate('landing')}
            className="absolute top-6 left-6 text-xs font-mono tracking-wider text-brand-gold hover:text-white cursor-pointer"
          >
            ← Back
          </button>
          <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] font-bold">Secure Access Gateway</span>
          <h2 className="text-2xl font-display font-extrabold mt-1">Unified Login Portal</h2>
          <p className="text-xs text-slate-300 mt-1 max-w-sm mx-auto">Access grades, tracking calendars, and faculty communications.</p>
        </div>

        {/* Role Segmented Toggles */}
        <div className="p-1 px-4 bg-slate-100 flex gap-1 justify-between border-b border-slate-200">
          {(['Student', 'Parent', 'Teacher', 'Admin'] as Role[]).map((role) => {
            const isSelected = activeRole === role;
            return (
              <button
                key={role}
                onClick={() => {
                  setActiveRole(role);
                  setLoggedInSimObject(null);
                  setIsTeacherLoggedIn(false);
                  setOtpMode(false);
                  setOtpSent(false);
                  setIsForgotPasswordMode(false);
                }}
                className={`flex-1 py-2 text-center text-xs font-display font-bold rounded-lg transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-brand-blue text-white shadow-2xs'
                    : 'text-slate-500 hover:text-brand-blue hover:bg-slate-200/50'
                }`}
              >
                {role}
              </button>
            );
          })}
        </div>

        {/* Dynamic Logged-in Simulation views to make the platform extremely real! */}
        {isTeacherLoggedIn ? (
          /* Teacher Portal Interactive Interface */
          <div className="p-6 sm:p-8 flex flex-col gap-5 animate-fade-in">
            {/* Header section */}
            <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
              <div className="w-14 h-14 rounded-full bg-[#0A192F] border-2 border-brand-gold flex items-center justify-center text-white text-lg font-bold font-display">
                RK
              </div>
              <div className="flex-1">
                <span className="text-[9px] font-mono font-bold bg-[#D4AF37]/20 text-brand-gold-dark px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                  Senior Faculty & Director
                </span>
                <h4 className="text-lg font-display font-bold text-brand-blue mt-1">Prof. R. K. Verma</h4>
                <p className="text-xs text-slate-500">Directorate Department • Althan Surat Center</p>
              </div>
              <button
                type="button"
                onClick={() => setIsTeacherLoggedIn(false)}
                className="text-xs font-mono text-slate-400 hover:text-slate-650 bg-slate-50 hover:bg-slate-100 px-2.5 py-1.5 rounded transition-all cursor-pointer"
              >
                Sign Out
              </button>
            </div>

            {/* Teaching Context Selectors */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-mono text-indigo-700 uppercase tracking-wider font-bold mb-1">Active Batch Control</label>
                <select
                  value={teacherClass}
                  onChange={(e) => setTeacherClass(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg py-1.5 px-2 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-brand-gold font-sans text-slate-700"
                >
                  <option value="Class 12">Class 12 (Board Prep)</option>
                  <option value="Class 11">Class 11 (Adv Foundations)</option>
                  <option value="Class 10">Class 10 (Secondary Boards)</option>
                  <option value="Class 8">Class 8 (Middle Core)</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-mono text-brand-gold hover:text-brand-gold-dark uppercase tracking-wider font-bold mb-1">Department Subject</label>
                <select
                  value={teacherSubject}
                  onChange={(e) => setTeacherSubject(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg py-1.5 px-2 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-brand-gold font-sans text-slate-700"
                >
                  <option value="Physics">Physics Mechanics</option>
                  <option value="Mathematics">Calculus & Geometry</option>
                  <option value="Accountancy">Financial Accounting</option>
                  <option value="Science">Comprehensive Science</option>
                </select>
              </div>
            </div>

            {/* Smart Classroom Actions */}
            <div className="flex flex-col gap-3 bg-stone-50 border border-slate-200 rounded-xl p-4">
              <div className="flex items-center justify-between border-b border-slate-200/50 pb-2">
                <span className="text-xs font-mono font-bold text-brand-blue uppercase tracking-wider">Active Classroom Triggers</span>
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1.5">
                {/* Action 1: Smart Card Attendance */}
                <button
                  type="button"
                  onClick={() => {
                    if (teacherAttendanceStatus === 'idle') {
                      setTeacherAttendanceStatus('scanning');
                      setTimeout(() => {
                        setTeacherAttendanceStatus('completed');
                      }, 1500);
                    } else if (teacherAttendanceStatus === 'completed') {
                      setTeacherAttendanceStatus('idle');
                    }
                  }}
                  className={`py-2 px-3 rounded-lg text-xs font-display font-medium text-left transition-all border flex flex-col justify-between h-18 cursor-pointer ${
                    teacherAttendanceStatus === 'scanning'
                      ? 'bg-amber-50 border-amber-300 text-amber-800'
                      : teacherAttendanceStatus === 'completed'
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-[9px] uppercase font-mono tracking-wider text-slate-400 block font-semibold">Arrival Scanning</span>
                  {teacherAttendanceStatus === 'scanning' && (
                    <span className="text-xs font-semibold flex items-center gap-1.5 mt-1 text-amber-700">
                      <span className="animate-spin rounded-full h-3 w-3 border-b-2 border-amber-800"></span>
                      Awaiting RFID Scans...
                    </span>
                  )}
                  {teacherAttendanceStatus === 'completed' && (
                    <span className="text-xs font-bold text-emerald-700 mt-1">
                      ✓ 18 Scans. parent SMS Sent!
                    </span>
                  )}
                  {teacherAttendanceStatus === 'idle' && (
                    <span className="text-[11px] font-bold text-brand-blue mt-1">
                      ⚡ Start RFID Attendance Scan
                    </span>
                  )}
                </button>

                {/* Action 2: Post Daily Quiz */}
                <button
                  type="button"
                  onClick={() => setTeacherQuizPosted(!teacherQuizPosted)}
                  className={`py-2 px-3 rounded-lg text-xs font-display font-medium text-left transition-all border flex flex-col justify-between h-18 cursor-pointer ${
                    teacherQuizPosted
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-850'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-[9px] uppercase font-mono tracking-wider text-slate-400 block font-semibold">Daily Assessment</span>
                  {teacherQuizPosted ? (
                    <span className="text-xs font-bold text-emerald-700 mt-1">
                      ✓ Micro-Class Quiz is Live!
                    </span>
                  ) : (
                    <span className="text-[11px] font-bold text-brand-blue mt-1">
                      📝 Publish Daily Micro-Quiz
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Interactive Grading Spreadsheet desk */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono font-bold text-brand-blue uppercase tracking-wider">
                  Interactive Gradebook Setup ({teacherClass})
                </span>
                <span className="text-[9px] font-mono text-slate-400">Select student to adjust performance score</span>
              </div>

              {/* List filtered students */}
              <div className="flex flex-col gap-1.5 max-h-[170px] overflow-y-auto border border-slate-200/60 rounded-xl p-1.5 bg-white scrollbar-thin">
                {students
                  .filter((s) => s.class === teacherClass || !['Class 12', 'Class 11', 'Class 10'].includes(s.class) && teacherClass === 'Class 12')
                  .map((student) => {
                    const currentScore = localStudentScores[student.id] ?? student.performanceScore;
                    return (
                      <div key={student.id} className="flex justify-between items-center p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-100">
                        <div className="flex items-center gap-2">
                          <img
                            src={student.photoUrl}
                            alt={student.name}
                            className="w-7 h-7 rounded-full object-cover border border-[#cbd5e1]/40"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <span className="text-[12px] font-display font-bold text-brand-blue block leading-tight">{student.name}</span>
                            <span className="text-[9px] font-mono text-slate-400 font-semibold">{student.id} • {student.stream} Track</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          {/* Adjustment buttons */}
                          <div className="flex items-center bg-white border border-slate-200/85 rounded-md p-1 shadow-2xs">
                            <button
                              type="button"
                              onClick={() => {
                                setLocalStudentScores((prev) => ({
                                  ...prev,
                                  [student.id]: Math.max(0, currentScore - 5),
                                }));
                              }}
                              className="w-5 h-5 flex items-center justify-center text-xs font-bold text-slate-500 hover:text-red-500 hover:bg-slate-150 rounded cursor-pointer"
                              title="Decrease score by 5"
                            >
                              -
                            </button>
                            <span className="min-w-[30px] text-center font-mono text-xs font-bold text-brand-blue">
                              {currentScore}%
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                setLocalStudentScores((prev) => ({
                                  ...prev,
                                  [student.id]: Math.min(100, currentScore + 5),
                                }));
                              }}
                              className="w-5 h-5 flex items-center justify-center text-xs font-bold text-slate-500 hover:text-emerald-500 hover:bg-slate-150 rounded cursor-pointer"
                              title="Increase score by 5"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>

              {/* Sync Controls */}
              <div className="mt-1 flex flex-col gap-2">
                {teacherSyncStatus && (
                  <div className="text-xs bg-emerald-50 border border-emerald-300 text-emerald-800 px-3.5 py-2 rounded-xl font-bold animate-fade-in text-center">
                    {teacherSyncStatus}
                  </div>
                )}
                
                <button
                  type="button"
                  onClick={() => {
                    setTeacherSyncStatus(`Grades successfully synchronized! Parents notified via SMS.`);
                    setTimeout(() => {
                      setTeacherSyncStatus(null);
                    }, 4000);
                  }}
                  className="w-full py-2.5 bg-[#D4AF37] hover:bg-[#AA7C11] text-[#0A192F] font-display font-bold text-xs tracking-wide rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  🚀 Sync Marks to Parent Portals & Dispatch SMS Alerts
                </button>
              </div>
            </div>

          </div>
        ) : loggedInSimObject ? (
          /* Student & Parent Interactive Profile Dashboard overlay */
          <div className="p-6 sm:p-8 flex flex-col gap-5 animate-fade-in">
            <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
              <img
                src={loggedInSimObject.photoUrl}
                alt={loggedInSimObject.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-brand-gold"
                referrerPolicy="no-referrer"
              />
              <div className="flex-1">
                <span className="text-[9px] font-mono font-bold bg-brand-gold/20 text-brand-gold-dark px-2 py-0.5 rounded-md">
                  {loggedInSimObject.id}
                </span>
                <h4 className="text-lg font-display font-bold text-brand-blue mt-1">{loggedInSimObject.name}</h4>
                <p className="text-xs text-slate-550">{loggedInSimObject.class} • {loggedInSimObject.stream} Track</p>
              </div>
              <button
                onClick={() => setLoggedInSimObject(null)}
                className="text-xs font-mono text-slate-400 hover:text-slate-600 bg-slate-50 px-2 py-1 rounded"
              >
                Sign Out
              </button>
            </div>

            {/* Quick Metrics Widgets of student */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex flex-col">
                <span className="text-[10px] font-mono text-brand-slate uppercase tracking-wider">Attendance</span>
                <strong className="text-sm font-mono text-slate-800 mt-0.5">{loggedInSimObject.attendanceRate}%</strong>
                <span className="text-[9px] text-emerald-600 mt-0.5">● Excellent</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-101 flex flex-col">
                <span className="text-[10px] font-mono text-brand-slate uppercase tracking-wider">Perf. Score</span>
                <strong className="text-sm font-mono text-brand-blue mt-0.5">{loggedInSimObject.performanceScore}%</strong>
                <span className="text-[9px] text-brand-gold-dark font-medium mt-0.5">Ranked A+</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-101 flex flex-col">
                <span className="text-[10px] font-mono text-brand-slate uppercase tracking-wider">Coaching</span>
                <strong className="text-xs font-display text-slate-700 mt-1 truncate">{loggedInSimObject.format}</strong>
                <span className="text-[9px] text-slate-400 mt-0.5">Surat Center</span>
              </div>
            </div>

            {/* Simulated Academic Performance Checklist */}
            <div className="flex flex-col gap-2 bg-stone-50 border border-slate-200 rounded-xl p-4">
              <span className="text-xs font-mono font-bold text-brand-blue uppercase tracking-wider">Monthly Exams Standing</span>
              <div className="flex flex-col gap-2 mt-2">
                <div className="flex justify-between items-center text-xs text-slate-705">
                  <span>Mathematics Mock (Algebra/Trig)</span>
                  <strong className="font-mono text-brand-blue">94 / 100</strong>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-705 pt-1.5 border-t border-slate-100">
                  <span>Physics Subject Test (Kinetics)</span>
                  <strong className="font-mono text-brand-blue">91 / 100</strong>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-705 pt-1.5 border-t border-slate-100">
                  <span>VisionPreneur Case Analysis</span>
                  <strong className="font-mono text-emerald-600">Passed (Grade A)</strong>
                </div>
              </div>
            </div>

            {/* Call Action or WhatsApp Faculty Link */}
            <div className="flex gap-2">
              <a
                href="https://wa.me/919825014832"
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-center text-xs font-display font-bold tracking-wide transition-all shadow-xs flex items-center justify-center gap-1.5"
              >
                💬 WhatsApp Faculty HelpDesk
              </a>
              <button
                onClick={() => onNavigate('admin')}
                className="py-2.5 px-4 bg-brand-cyan hover:bg-brand-blue text-white rounded-xl text-xs font-display font-medium transition-all cursor-pointer"
              >
                Open Admin Center
              </button>
            </div>
          </div>
        ) : (
          /* Normal Sign-In Inputs Form */
          <div className="p-6 sm:p-8">
            
            {/* Display easily copyable credentials bypasses to delight inspectors */}
            <div className="mb-6 p-3 bg-brand-gold/10 border border-brand-gold/30 rounded-xl flex items-start gap-2.5 text-xs text-slate-800">
              <span className="text-sm">💡</span>
              <div>
                <span className="font-mono font-bold text-brand-gold-dark uppercase tracking-wider">TEST DEMO SECURE CREDITS:</span>
                <p className="mt-1 text-[11px] leading-relaxed text-slate-705">
                  {activeRole === 'Teacher' ? (
                    <span>Select the <strong>Teacher</strong> mode option above and click <strong className="text-brand-blue font-bold">Verify Credentials & Sign In</strong> (using any dummy value) to open the interactive <strong>Teacher Control Portal</strong>!</span>
                  ) : activeRole === 'Admin' ? (
                    <span>Type <strong className="font-mono bg-brand-gold/20 px-1 py-0.2 rounded text-brand-blue">admin</strong> to bypass instantly to the <strong>Admin Command Center Dashboard</strong>.</span>
                  ) : (
                    <span>For Student profile preview, select Student/Parent and type <strong className="font-mono bg-brand-gold/20 px-1 py-0.2 rounded text-brand-blue">aryan</strong> as username.</span>
                  )}
                </p>
              </div>
            </div>

            {isForgotPasswordMode ? (
              /* Forgot Password Recovery UI Simulation */
              <div className="flex flex-col gap-4 animate-fade-in">
                <span className="text-[10px] font-mono tracking-wider text-[#D4AF37] uppercase font-bold">Credential Recovery Control</span>
                <h3 className="text-lg font-display font-bold text-brand-blue">Reset Faculty Code & Password</h3>
                
                {forgotPasswordStatus === 'sent' ? (
                  <div className="flex flex-col gap-3.5 bg-emerald-50 border border-emerald-200 p-4 rounded-xl">
                    <div className="flex items-center gap-2 text-emerald-800">
                      <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                      <span className="text-xs font-bold font-display">Secure Reset Vector Dispatched!</span>
                    </div>
                    <p className="text-[11px] text-emerald-700 leading-relaxed font-sans">
                      A faculty verification signature link was successfully dispatched to <strong className="font-mono text-emerald-900 bg-emerald-100/50 px-1 py-0.5 rounded">{forgotPasswordEmail}</strong>. Under our active student safety guidelines, this token is valid for 15 minutes.
                    </p>
                    {generatedResetLink && (
                      <div className="bg-white border border-emerald-150 p-2.5 rounded-lg mt-1 text-center shadow-2xs">
                        <span className="text-[9px] font-mono tracking-wider uppercase text-slate-400 block font-bold mb-1.5">SIMULATED RECOVERY LINK FOR FACULTY RESET:</span>
                        <a 
                          href={generatedResetLink} 
                          className="font-mono text-[10px] text-indigo-650 hover:text-indigo-850 break-all font-semibold underline"
                          onClick={(e) => {
                            e.preventDefault();
                            alert("Bypassing simulation: Secure Faculty signature hash accepted! Simulating bypass login directly as Teacher Verma to facilitate rapid testing.");
                            setIsTeacherLoggedIn(true);
                            setIsForgotPasswordMode(false);
                            onNavigate('admin');
                          }}
                        >
                          {generatedResetLink}
                        </a>
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => setIsForgotPasswordMode(false)}
                      className="w-full mt-2 py-2 bg-[#0A192F] hover:bg-slate-800 text-white text-xs font-display font-semibold rounded-lg cursor-pointer"
                    >
                      Return to Sign In Portal
                    </button>
                  </div>
                ) : (
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    setForgotPasswordStatus('sending');
                    setTimeout(() => {
                      const hash = Math.random().toString(36).substring(2, 10).toUpperCase();
                      const url = `${window.location.origin}/reset-auth?token=VAC_RESET_${hash}_SF&role=${activeRole}&email=${encodeURIComponent(forgotPasswordEmail || 'faculty@vaibhavagarwal.com')}`;
                      setGeneratedResetLink(url);
                      setForgotPasswordStatus('sent');
                    }, 1200);
                  }} className="flex flex-col gap-4">
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Faculty and Directors can query the classes active database register by typing their work email address below to receive a secure, simulated recovery payload instantly.
                    </p>
                    <div>
                      <label className="block text-xs font-mono text-slate-500 uppercase tracking-wider mb-1.5">Registered Faculty Email *</label>
                      <input
                        type="email"
                        required
                        placeholder={activeRole === 'Teacher' ? 'verma@vaibhavagarwal.com' : 'admin@vaibhavagarwal.com'}
                        value={forgotPasswordEmail}
                        onChange={(e) => setForgotPasswordEmail(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-xs focus:ring-1 focus:ring-brand-gold focus:outline-none bg-stone-50/50"
                      />
                    </div>
                    
                    <button
                      type="submit"
                      disabled={forgotPasswordStatus === 'sending'}
                      className="w-full py-2.5 bg-[#D4AF37] hover:bg-[#AA7C11] text-[#0A192F] text-xs font-display font-bold rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                    >
                      {forgotPasswordStatus === 'sending' ? (
                        <>
                          <span className="animate-spin rounded-full h-3.5 w-3.5 border-b-2 border-[#0A192F]"></span>
                          Generating Secure Code...
                        </>
                      ) : (
                        `Send Reset Link to ${activeRole === 'Student' || activeRole === 'Parent' ? 'Parent' : 'Faculty'} Email`
                      )}
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setIsForgotPasswordMode(false)}
                      className="text-xs text-slate-550 hover:text-slate-750 font-semibold font-mono"
                    >
                      ← Back to Standard Credentials
                    </button>
                  </form>
                )}
              </div>
            ) : otpMode ? (
              /* Mobile OTP Authenticator View */
              <div className="flex flex-col gap-4 animate-fade-in">
                <span className="text-[10px] font-mono tracking-wider text-brand-slate uppercase font-bold">2-Factor Authentication</span>
                <h3 className="text-lg font-display font-bold text-brand-blue">Sign In with OTP Code</h3>

                {otpSent ? (
                  <form onSubmit={handleVerifyOtp} className="flex flex-col gap-4">
                    <div>
                      <p className="text-xs text-slate-500 mb-2">We have dispatched a six-digit verification PIN to your mobile. Type <strong className="font-mono text-brand-blue bg-slate-100 px-1.5 py-0.5 rounded">123456</strong> for testing bypass.</p>
                      <input
                        type="text"
                        required
                        maxLength={6}
                        placeholder="Type Code: 123456"
                        value={otpInput}
                        onChange={(e) => setOtpInput(e.target.value)}
                        className="w-full text-center tracking-widest font-mono text-lg px-4 py-3 rounded-lg border border-slate-200 focus:ring-1 focus:ring-brand-gold focus:outline-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 bg-brand-blue text-white text-xs font-display font-bold rounded-xl transition-all shadow-xs cursor-pointer"
                    >
                      Verify & Access Gateway
                    </button>
                    <button
                      type="button"
                      onClick={() => setOtpSent(false)}
                      className="text-xs text-slate-450 hover:text-slate-650 font-medium"
                    >
                      ← Edit Phone Number
                    </button>
                  </form>
                ) : (
                  <div className="flex flex-col gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-500 uppercase tracking-wider mb-1.5">Registered Student Mobile *</label>
                      <input
                        type="tel"
                        placeholder="+91 98250 14832"
                        value={phoneInput}
                        onChange={(e) => setPhoneInput(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-xs focus:ring-1 focus:ring-brand-gold focus:outline-none bg-stone-50/50"
                      />
                    </div>
                    <button
                      onClick={handleSendOtp}
                      disabled={!phoneInput}
                      className="w-full py-3 bg-brand-gold hover:bg-brand-gold-dark text-brand-blue text-xs font-display font-bold rounded-xl disabled:opacity-50 transition-all shadow-xs cursor-pointer"
                    >
                      Generate Mock OTP Code
                    </button>
                    <button
                      onClick={() => setOtpMode(false)}
                      className="text-xs text-slate-550 hover:text-slate-750 font-medium font-mono"
                    >
                      ← Standard Password Login
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Standard ID & Pass Form */
              <form onSubmit={handleStandardLogin} className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-500 uppercase tracking-wider mb-1.5">{activeRole} ID or Email Adress *</label>
                  <input
                    type="text"
                    required
                    placeholder={activeRole === 'Admin' ? 'admin' : 'aryan.kapoor@gmail.com'}
                    value={credentials.username}
                    onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-xs focus:ring-1 focus:ring-brand-gold focus:outline-none bg-stone-50/50"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-mono text-slate-500 uppercase tracking-wider">Security Password *</label>
                    <button
                      type="button"
                      onClick={() => {
                        setIsForgotPasswordMode(true);
                        setForgotPasswordEmail(credentials.username || '');
                        setForgotPasswordStatus('idle');
                        setGeneratedResetLink(null);
                      }}
                      className="text-[10px] text-brand-gold-dark hover:text-[#0A192F] font-bold underline cursor-pointer"
                    >
                      Forgot?
                    </button>
                  </div>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-xs focus:ring-1 focus:ring-brand-gold focus:outline-none bg-stone-50/50"
                  />
                </div>

                <button
                  type="submit"
                  id="btn-login-submit"
                  className="w-full py-3 mt-2 bg-brand-blue hover:bg-brand-cyan text-white text-xs font-display font-bold rounded-xl transition-all shadow-md cursor-pointer"
                >
                  Verify Credentials & Sign In
                </button>

                <div className="flex justify-between items-center mt-3 pt-3 border-t border-slate-100 text-xs">
                  <button
                    type="button"
                    onClick={() => setOtpMode(true)}
                    className="text-brand-slate hover:text-brand-blue font-semibold font-mono"
                  >
                    ⚡ Secure Sign In with Mobile OTP
                  </button>
                  <span className="text-slate-400">GSEB, CBSE, & CA Tracks</span>
                </div>
              </form>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
