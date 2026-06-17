import React, { useState } from 'react';
import { User, BookOpen, Heart, CheckCircle, ArrowRight, ArrowLeft, UploadCloud, School, ShieldCheck } from 'lucide-react';
import { Student } from '../types';
import { SURAT_AREAS, SURAT_SCHOOLS } from '../data';
import { motion } from 'motion/react';
import { supabase } from '../lib/supabase';
interface RegistrationFormProps {
  onRegisterStudent: (student: Student) => void;
  onNavigate: (view: 'landing' | 'register' | 'login' | 'admin' | 'schedule') => void;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({ onRegisterStudent, onNavigate }) => {
  const [step, setStep] = useState(1);
  const [successID, setSuccessID] = useState<string | null>(null);

  // Form Fields State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dob: '',
    gender: 'Female',
    area: 'Althan',
    school: 'Delhi Public School (DPS) Surat',
    class: 'Class 12',
    stream: 'Science' as any,
    format: 'Offline' as any,
    fatherName: '',
    motherName: '',
    parentPhone: '',
    channel: 'WhatsApp' as any,
    conductChecked: false,
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120',
  });

  // Predefined student avatar options for ease of use
  const AVATARS = [
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120', // Female student
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=120', // Male student
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120', // Female student 2
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120', // Male student 2
  ];

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 4) return;
    if (!formData.conductChecked) {
      alert('Please read and agree to the VAC Academic Code of Conduct to finalize enrollment.');
      return;
    }

    // Assign randomized unique ID
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const assignedID = `VAC-2026-${randomNum}`;

    const newStudent: Student = {
      id: assignedID,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      dob: formData.dob,
      gender: formData.gender,
      city: 'Surat',
      area: formData.area,
      photoUrl: formData.avatarUrl,
      class: formData.class,
      stream: formData.stream,
      school: formData.school,
      format: formData.format,
      parents: {
        fatherName: formData.fatherName,
        motherName: formData.motherName,
        parentPhone: formData.parentPhone,
        channel: formData.channel,
      },
      registrationDate: new Date().toISOString().split('T')[0],
      status: 'Pending Approval',
      attendanceRate: 100.0,
      averageGrade: 'A',
      performanceScore: 92,
    };
const { error } = await supabase
  .from('students')
  .insert([
    {
      student_id: assignedID,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      class: formData.class,
      stream: formData.stream,
      school: formData.school,
      father_name: formData.fatherName,
      mother_name: formData.motherName,
      parent_phone: formData.parentPhone,
      password: 'VAC@1234'
    }
  ]);

if (error) {
  console.error('Supabase Error Full:', JSON.stringify(error, null, 2));
alert(JSON.stringify(error));
  return;
}
    onRegisterStudent(newStudent);
    setSuccessID(assignedID);
  };

  // Helper step details
  const stepTitles = [
    { title: 'Personal', icon: User },
    { title: 'Academic', icon: School },
    { title: 'Parents', icon: Heart },
    { title: 'Finalize', icon: CheckCircle },
  ];

  return (
    <div className="bg-[#FAF9F6] text-slate-805 py-12 px-4 sm:px-6 min-h-[calc(100vh-64px)] flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white rounded-3xl border border-[#cbd5e1]/40 shadow-xl overflow-hidden">
        
        {/* Registration Header decoration */}
        <div className="bg-brand-blue text-white p-6 sm:p-8 relative">
          <button
            onClick={() => onNavigate('landing')}
            className="absolute top-6 left-6 text-xs font-mono tracking-wider text-brand-gold hover:text-white flex items-center gap-1.5 cursor-pointer"
          >
            ← Cancel
          </button>
          <div className="text-center">
            <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] font-bold">Launch Your Future</span>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold mt-1">Premium Scholar Portal</h2>
            <p className="text-xs text-slate-300 mt-2">Submit this form to reserve your study track at VAC Surat.</p>
          </div>
        </div>

        {/* Progress Timeline Header */}
        <div className="p-4 bg-stone-50/80 border-b border-slate-100 flex justify-between items-center px-6 sm:px-12">
          {stepTitles.map((item, idx) => {
            const stepNum = idx + 1;
            const StepIcon = item.icon;
            const isActive = step === stepNum;
            const isCompleted = step > stepNum;

            return (
              <div key={idx} className="flex flex-col items-center">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-brand-blue text-white ring-4 ring-brand-blue/10 scale-105'
                      : isCompleted
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  {isCompleted ? '✓' : stepNum}
                </div>
                <span className="text-[10px] sm:text-xs font-display font-medium text-slate-600 mt-1.5 hidden sm:block">
                  {item.title}
                </span>
              </div>
            );
          })}
        </div>

        {/* Form Area or Success Screen container */}
        <div className="p-6 sm:p-8">
          {successID ? (
            /* Success confirmation screen */
            <div className="flex flex-col items-center text-center gap-5 animate-fade-in py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 text-3xl font-bold flex items-center justify-center animate-bounce shadow-xs">
                ✓
              </div>
              <div>
                <span className="text-xs font-semibold uppercase text-emerald-600 tracking-wider font-mono">Admission Pre-Registered</span>
                <h3 className="text-2xl font-display font-extrabold text-brand-blue mt-0.5">Welcome to VAC, {formData.name}!</h3>
                <p className="text-xs text-slate-500 mt-2 max-w-md mx-auto">
                  Your academic record has been saved and synced directly into our local student database list. Present your assigned ID at the Althan centre receptionist to confirm slot assignment.
                </p>
              </div>

              {/* Unique Scholar Receipt Panel */}
              <div className="w-full bg-[#172a45]/5 border border-slate-200 rounded-2xl p-5 text-left flex flex-col gap-3 font-sans my-2">
                <div className="flex justify-between items-center border-b border-slate-200/50 pb-2">
                  <span className="text-xs font-mono font-bold text-brand-slate uppercase">OFFicial Scholar Receipt</span>
                  <span className="text-xs font-mono font-bold bg-brand-blue text-brand-gold py-0.5 px-2.5 rounded-md">
                    {successID}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-y-2.5 gap-x-4 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-mono">Student Track</span>
                    <strong className="text-brand-blue">{formData.stream} (Grade: {formData.class})</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-mono">Coaching Mode</span>
                    <strong className="text-brand-blue">{formData.format} Session</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-mono">Main School</span>
                    <strong className="text-brand-blue block truncate">{formData.school}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-mono">Area Residence</span>
                    <strong className="text-brand-blue">{formData.area}, Surat</strong>
                  </div>
                </div>
                <div className="border-t border-dashed border-slate-300 pt-2.5 mt-1 flex justify-between items-center text-[11px] font-mono font-semibold text-brand-gold-dark">
                  <span>ESTIMATED TUITION FEE</span>
                  <span>₹42,500 / Term</span>
                </div>
              </div>

              <div className="flex gap-3 w-full mt-4">
                <button
                  onClick={() => onNavigate('admin')}
                  className="flex-1 py-3 bg-brand-cyan hover:bg-brand-blue text-white rounded-xl text-xs font-display font-bold transition-all cursor-pointer"
                >
                  Open Admin Command Center
                </button>
                <button
                  onClick={() => {
                    // Reset
                    setSuccessID(null);
                    setStep(1);
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      dob: '',
                      gender: 'Female',
                      area: 'Althan',
                      school: 'Delhi Public School (DPS) Surat',
                      class: 'Class 12',
                      stream: 'Science',
                      format: 'Offline',
                      fatherName: '',
                      motherName: '',
                      parentPhone: '',
                      channel: 'WhatsApp',
                      conductChecked: false,
                      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120',
                    });
                  }}
                  className="py-3 px-5 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl text-xs font-display font-medium transition-all cursor-pointer"
                >
                  Register Another
                </button>
              </div>
            </div>
          ) : (
            /* Multi step interactive form form */
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              
              {/* Step 1: Personal Details */}
              {step === 1 && (
                <div className="flex flex-col gap-4 animate-fade-in">
                  <h4 className="text-base font-display font-bold text-brand-blue border-b border-slate-100 pb-2">Student Personal Details</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-500 uppercase tracking-wider mb-1">Student Full Name *</label>
                      <input
                        type="text"
                        required
                        minLength={3}
                        pattern="^[A-Za-z ]+$"
                        title="Enter valid name using letters only"
                        placeholder="Aryan Kapoor"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-xs focus:ring-1 focus:ring-brand-gold focus:outline-none bg-stone-50/50"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-500 uppercase tracking-wider mb-1">Date of Birth *</label>
                      <input
                        type="date"
                        required
                        value={formData.dob}
                        onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-xs focus:ring-1 focus:ring-brand-gold focus:outline-none bg-stone-50/50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-500 uppercase tracking-wider mb-1">Core Contact Mobile *</label>
                      <input
                        type="tel"
                        required
                        pattern="[6-9]{1}[0-9]{9}"
                        maxLength={10}
                        title="Enter valid 10 digit mobile number"
                        placeholder="+91 XXXXX XXXXX"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-xs focus:ring-1 focus:ring-brand-gold focus:outline-none bg-stone-50/50"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-500 uppercase tracking-wider mb-1">Gender</label>
                      <select
                        value={formData.gender}
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-xs focus:ring-1 focus:ring-brand-gold focus:outline-none bg-stone-50/50"
                      >
                        <option>Female</option>
                        <option>Male</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-500 uppercase tracking-wider mb-1">Email ID</label>
                      <input
                        type="email"
                        required
                        pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                        title="Enter valid email address"
                        placeholder="student@gmail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-xs focus:ring-1 focus:ring-brand-gold focus:outline-none bg-stone-50/50"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-500 uppercase tracking-wider mb-1">City Region (Surat Areas) *</label>
                      <select
                        value={formData.area}
                        onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-xs focus:ring-1 focus:ring-brand-gold focus:outline-none bg-stone-50/50"
                      >
                        {SURAT_AREAS.map((a) => (
                          <option key={a} value={a}>{a}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Avatar selection instead of messy upload */}
                  <div>
                    <label className="block text-xs font-mono text-slate-500 uppercase tracking-wider mb-2">Select Portrait Persona Avatar</label>
                    <div className="flex gap-4 items-center">
                      <div className="relative">
                        <img
                          src={formData.avatarUrl}
                          alt="Chosen Portrait"
                          className="w-12 h-12 rounded-full object-cover border-2 border-brand-gold shadow-xs"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex gap-2">
                        {AVATARS.map((av, avIdx) => (
                          <button
                            key={avIdx}
                            type="button"
                            onClick={() => setFormData({ ...formData, avatarUrl: av })}
                            className={`w-9 h-9 rounded-full overflow-hidden border-2 transition-all cursor-pointer ${
                              formData.avatarUrl === av ? 'border-brand-gold scale-110 shadow-xs' : 'border-transparent opacity-60 hover:opacity-100'
                            }`}
                          >
                            <img src={av} alt="Avatar option" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Academic Profile */}
              {step === 2 && (
                <div className="flex flex-col gap-4 animate-fade-in">
                  <h4 className="text-base font-display font-bold text-brand-blue border-b border-slate-100 pb-2">Academic & Stream Profile</h4>
                  
                  <div>
                    <label className="block text-xs font-mono text-slate-500 uppercase tracking-wider mb-1">Target School / Institution (Surat list) *</label>
                    <select
                      value={formData.school}
                      onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-xs focus:ring-1 focus:ring-brand-gold focus:outline-none bg-stone-50/50"
                    >
                      {SURAT_SCHOOLS.map((sch) => (
                        <option key={sch} value={sch}>{sch}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-500 uppercase tracking-wider mb-1">Core Class Standard *</label>
                      <select
                        value={formData.class}
                        onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-xs focus:ring-1 focus:ring-brand-gold focus:outline-none bg-stone-50/50"
                      >
                        <option>Class 9</option>
                        <option>Class 10</option>
                        <option>Class 11</option>
                        <option>Class 12</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-500 uppercase tracking-wider mb-1">Academic Stream Elective *</label>
                      <select
                        value={formData.stream}
                        onChange={(e) => setFormData({ ...formData, stream: e.target.value as any })}
                        className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-xs focus:ring-1 focus:ring-brand-gold focus:outline-none bg-stone-50/50"
                      >
                        <option value="Science">Science (JEE/NEET Prep)</option>
                        <option value="Commerce">Commerce (CA Foundation Target)</option>
                        <option value="Humanities">Humanities Track</option>
                        <option value="Foundation">Foundation Division</option>
                        <option value="VisionPreneur">VisionPreneur Track</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-500 uppercase tracking-wider mb-2">Preferred Study Delivery Format *</label>
                    <div className="grid grid-cols-3 gap-3">
                      {['Offline', 'Hybrid', 'Online'].map((fmt) => {
                        const isChosen = formData.format === fmt;
                        return (
                          <button
                            key={fmt}
                            type="button"
                            onClick={() => setFormData({ ...formData, format: fmt as any })}
                            className={`py-3 px-3 rounded-xl border text-center text-xs font-display font-bold transition-all cursor-pointer ${
                              isChosen
                                ? 'bg-[#172a45]/10 border-[#172a45]/30 text-[#172a45] shadow-2xs'
                                : 'bg-stone-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                            }`}
                          >
                            {fmt === 'Offline' ? '📍 Offline Surat' : fmt === 'Hybrid' ? '⚡ Hybrid Model' : '🌐 Pure Online'}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Parents Information */}
              {step === 3 && (
                <div className="flex flex-col gap-4 animate-fade-in">
                  <h4 className="text-base font-display font-bold text-brand-blue border-b border-slate-100 pb-2">Parent / Guardian Information</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-500 uppercase tracking-wider mb-1">Father's Name *</label>
                      <input
                        type="text"
                        required
                        minLength={3}
                        pattern="^[A-Za-z ]+$"
                        title="Enter valid name using letters only"
                        placeholder="e.g. Rajesh Kapoor"
                        value={formData.fatherName}
                        onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-xs focus:ring-1 focus:ring-brand-gold focus:outline-none bg-stone-50/50"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-500 uppercase tracking-wider mb-1">Mother's Name *</label>
                      <input
                        type="text"
                        required
                        minLength={3}
                        pattern="^[A-Za-z ]+$"
                        title="Enter valid name using letters only"
                        placeholder="e.g. Meera Kapoor"
                        value={formData.motherName}
                        onChange={(e) => setFormData({ ...formData, motherName: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-xs focus:ring-1 focus:ring-brand-gold focus:outline-none bg-stone-50/50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-500 uppercase tracking-wider mb-1">Parent's Contact Mobile *</label>
                      <input
                        type="tel"
                        required
                        minLength={10}
                        maxLength={10}
                        pattern="[6-9]{1}[0-9]{9}"
                        title="Enter valid 10 digit mobile number"
                        placeholder="+91 98250 XXXXX"
                        value={formData.parentPhone}
                        onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-xs focus:ring-1 focus:ring-brand-gold focus:outline-none bg-stone-50/50"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-500 uppercase tracking-wider mb-1">Report Transmission Channel</label>
                      <select
                        value={formData.channel}
                        onChange={(e) => setFormData({ ...formData, channel: e.target.value as any })}
                        className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-xs focus:ring-1 focus:ring-brand-gold focus:outline-none bg-stone-50/50"
                      >
                        <option>WhatsApp</option>
                        <option>SMS</option>
                        <option>Email</option>
                      </select>
                    </div>
                  </div>

                  <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 text-emerald-800 text-[11px] leading-relaxed">
                    💡 <strong>Real-time communication benefit:</strong> Selected reports, bi-weekly chapter attendance grades, and student status reminders are pushed strictly to raw contact channels with zero third-party spam.
                  </div>
                </div>
              )}

              {/* Step 4: Finalize & Signature */}
              {step === 4 && (
                <div className="flex flex-col gap-4 animate-fade-in">
                  <h4 className="text-base font-display font-bold text-brand-blue border-b border-slate-100 pb-2">Final Review & Sign-Off</h4>
                  
                  {/* Summary card */}
                  <div className="bg-slate-50 border border-slate-150 p-4 rounded-2xl text-xs flex flex-col gap-2 font-sans">
                    <span className="text-[10px] uppercase tracking-wider font-mono text-brand-slate block">Review typed data summary:</span>
                    <div>• <strong>Student Candidate:</strong> {formData.name} ({formData.gender}, DoB: {formData.dob})</div>
                    <div>• <strong>Syllabus Pathway:</strong> {formData.stream} track for {formData.class} ({formData.format})</div>
                    <div>• <strong>Academic Base school:</strong> {formData.school}</div>
                    <div>• <strong>Filing Parent contact:</strong> Rajesh Kapoor / {formData.parentPhone} (Prefers {formData.channel})</div>
                  </div>

                  <div className="flex flex-col gap-1 mt-1">
                    <label className="text-xs font-mono text-slate-500 uppercase tracking-wider">Mock Student Signature verification</label>
                    <div className="h-20 bg-slate-100 rounded-xl border border-dashed border-slate-300 flex items-center justify-center p-2 text-slate-400 text-xs text-center select-none">
                      ✍️ {formData.name ? `${formData.name} verified online` : 'Waiting for Name...'}
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 mt-2.5">
                    <input
                      type="checkbox"
                      id="checkbox-conduct"
                      required
                      checked={formData.conductChecked}
                      onChange={(e) => setFormData({ ...formData, conductChecked: e.target.checked })}
                      className="mt-0.5 w-4 h-4 text-brand-gold focus:ring-brand-gold Accent-brand-blue rounded border-slate-300 cursor-pointer"
                    />
                    <label id="lbl-conduct" htmlFor="checkbox-conduct" className="text-[11px] text-slate-505 leading-relaxed cursor-pointer select-none">
                      I certify that the candidate agrees to abide by the premium code of academic discipline, daily exam protocols, and anti-bullying guidelines established by <strong>Vaibhav Agarwal Classes Surat</strong>.
                    </label>
                  </div>
                </div>
              )}

              {/* Bottom Buttons */}
              <div className="flex justify-between items-center mt-6 pt-5 border-t border-slate-100">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-5 py-2.5 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl text-xs font-display font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back Step
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => onNavigate('landing')}
                    className="px-5 py-2.5 text-slate-400 hover:text-slate-600 rounded-xl text-xs font-display font-medium transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                )}

                {step < 4 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={
                     step === 1 &&
                     (
                       formData.name.length < 3 ||
                       !/^[A-Za-z ]+$/.test(formData.name) ||
                       !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) ||
                       !/^[6-9][0-9]{9}$/.test(formData.phone)
                      )
                    }
                    className="px-5 py-2.5 bg-brand-cyan hover:bg-brand-blue text-white disabled:opacity-50 rounded-xl text-xs font-display font-bold transition-all flex items-center gap-1.5 cursor-pointer ml-auto"
                  >
                    Next Step <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-brand-gold hover:bg-brand-gold-dark text-brand-blue rounded-xl text-xs font-display font-extrabold tracking-wide transition-all shadow-xs flex items-center gap-1.5 cursor-pointer ml-auto"
                  >
                    Finalize Admissions <CheckCircle className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
