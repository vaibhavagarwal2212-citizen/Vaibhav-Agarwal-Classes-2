import React, { useState } from 'react';
import { BookOpen, Trophy, Award, GraduationCap, Calendar, MessageSquare, ArrowRight, Compass, ShieldCheck, Sun, Moon } from 'lucide-react';
import { TESTIMONIALS } from '../data';
import { motion } from 'motion/react';
import ScholarshipCalculator from './ScholarshipCalculator';
import { INSTITUTE_DETAILS } from '../utils/vacConfig';

interface LandingPageProps {
  onNavigate: (view: 'landing' | 'register' | 'login' | 'admin' | 'schedule') => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [selectedDemoClass, setSelectedDemoClass] = useState('Science');
  const [demoSubmitted, setDemoSubmitted] = useState(false);
  const [demoData, setDemoData] = useState({ name: '', phone: '', currentClass: 'Class 10' });

  // Handle Demo submission
  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!demoData.name || !demoData.phone) return;
    setDemoSubmitted(true);
    setTimeout(() => {
      setDemoSubmitted(false);
      setDemoData({ name: '', phone: '', currentClass: 'Class 10' });
    }, 4000);
  };

  const courseTracks = [
    {
      title: 'Foundation Program',
      grades: 'Class 1 - 5',
      desc: 'Nurturing cognitive skills, mathematical logic, and scientific curiosity from early years. Balanced layout with non-straining workloads.',
      highlight: 'Analytical skill drills & Olympiad groundwork',
      color: 'bg-emerald-50 text-emerald-900 border-emerald-100',
      badgeColor: 'bg-emerald-500'
    },
    {
      title: 'Pre-Foundation Division',
      grades: 'Class 6 - 8',
      desc: 'Rigorous preparatory model reinforcing textbook fundamentals with application-level depth. Seamless transition from base theories.',
      highlight: 'Olympiad (NTSE, NSTSE) prep + IIT-JEE building blocks',
      color: 'bg-indigo-50 text-indigo-900 border-indigo-100',
      badgeColor: 'bg-indigo-500'
    },
    {
      title: 'Secondary Board Prep',
      grades: 'Class 9 - 10',
      desc: 'Double-track teaching for exemplary Board examination results and sound mastery of scientific & financial formulas.',
      highlight: 'Weekly chapter-wise assessment & model papers',
      color: 'bg-amber-50 text-amber-900 border-amber-100',
      badgeColor: 'bg-amber-500'
    },
    {
      title: 'Senior Secondary Board & Compete',
      grades: 'Class 11 - 12',
      desc: 'Targeted separate tracks for JEE Mains & Advanced, NEET, CA Foundation, or CBSE/GSEB Board topper targets.',
      highlight: 'Led by seasoned engineers & CA professors',
      color: 'bg-[#172a45]/5 text-[#172a45] border-slate-200',
      badgeColor: 'bg-[#172a45]'
    },
    {
      title: 'VisionPreneur Incubator',
      grades: 'Unique Youth Program',
      desc: 'India’s pioneer school entrepreneurship training at VAC. Teaches youth case studies, financial literacy, pitch deck building, and critical thinking.',
      highlight: 'Mentored pitches & micro-startup funding mock program',
      color: 'bg-rose-50 text-rose-900 border-rose-100',
      badgeColor: 'bg-rose-500'
    }
  ];

  return (
    <div className="bg-[#FAF9F6] text-slate-800 min-h-screen">
      {/* High-visibility Top Toast Banner detailing centres */}
      <div className="bg-brand-blue text-brand-gold text-center py-2 px-4 text-xs font-mono font-medium tracking-wide border-b border-brand-gold/20">
        ✨ VAC OFFLINE ADVANTAGE: Visit our State-of-the-art campus in **Althan, Surat, Gujarat** for interactive live sessions.
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0A192F] via-[#172A45] to-[#1f3657] text-white pt-10 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Copy */}
          <div className="lg:col-span-7 flex flex-col items-start gap-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gold/15 border border-brand-gold/35 text-brand-gold text-xs font-display font-medium tracking-wider uppercase">
              <Trophy className="w-3.5 h-3.5" /> 15+ years of academic premium standards
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight text-white leading-tight">
              Building Academic Excellence & <span className="text-brand-gold text-shadow-sm">Future Leaders</span>
            </h1>

            <p className="text-slate-300 text-base md:text-lg max-w-2xl font-light leading-relaxed">
              Welcome to <strong>Vaibhav Agarwal Classes (VAC)</strong>. We cultivate deep theoretical expertise combined with elite intellectual discipline. Specialized academic tracks are paired with India’s leading <strong>VisionPreneur Entrepreneurship Incubator</strong>.
            </p>

            <div className="flex flex-wrap gap-4 mt-2">
              <button
                id="btn-hero-enroll"
                onClick={() => onNavigate('register')}
                className="px-6 py-3 rounded-xl bg-brand-gold hover:bg-brand-gold-dark text-brand-blue font-display font-bold text-sm tracking-wide transition-all shadow-md active:scale-98 flex items-center gap-2 cursor-pointer"
              >
                Enroll Now <ArrowRight className="w-4 h-4" />
              </button>
              <button
                id="btn-hero-schedule"
                onClick={() => onNavigate('schedule')}
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-[#D4AF37] hover:text-white font-display font-semibold text-sm border border-[#D4AF37]/35 transition-all active:scale-98 cursor-pointer flex items-center gap-1.5"
              >
                <Calendar className="w-4 h-4" />
                <span>Weekly Schedule</span>
              </button>
              <button
                id="btn-hero-login"
                onClick={() => onNavigate('login')}
                className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/15 text-slate-300 font-display font-semibold text-sm transition-all active:scale-98 cursor-pointer"
              >
                Access Portal
              </button>
            </div>

            {/* High Impact Core Statistics Block */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-8 pt-8 border-t border-white/10 w-full">
              {[
                { count: '5000+', label: 'Students Enrolled' },
                { count: '98%', label: 'Board Success Rate' },
                { count: '25+', label: 'Expert Faculty' },
                { count: '15+', label: 'Years Excellence' }
              ].map((stat, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="text-2xl md:text-3xl font-mono font-bold text-brand-gold tracking-tight">{stat.count}</span>
                  <span className="text-xs text-slate-300 font-display mt-0.5 font-medium leading-tight">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Hero Visual Frame */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-[400px] lg:max-w-none rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-brand-cyan p-2">
              <div className="absolute top-4 left-4 z-10 bg-emerald-500 text-white text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full font-bold shadow-sm animate-pulse">
                ● SURAT CAMPUS LIVE
              </div>
              <img
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=600"
                alt="Vaibhav Agarwal Classes Classroom study group Surat"
                className="w-full h-[320px] md:h-[400px] object-cover rounded-xl filter brightness-95 hover:scale-101 transition-all duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-4 right-4 left-4 bg-brand-blue/95 backdrop-blur-xs p-3.5 rounded-lg border border-[#cbd5e1]/10 flex justify-between items-center text-xs">
                <div>
                  <div className="text-brand-gold font-mono font-bold">Classroom Batch 2026</div>
                  <div className="text-[11px] text-slate-300 mt-0.5">Admissions active for GSEB, CBSE & Olympiads</div>
                </div>
                <button
                  onClick={() => onNavigate('register')}
                  className="px-2.5 py-1.5 rounded-md bg-brand-gold text-[11px] font-bold text-brand-blue shadow-sm hover:scale-102 active:scale-95 transition-all cursor-pointer"
                >
                  Apply
                </button>
              </div>
            </div>
            {/* Ambient Background decoration */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-brand-gold/10 rounded-full blur-xl pointer-events-none" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-brand-cyan-light/20 rounded-full blur-2xl pointer-events-none" />
          </div>

        </div>
      </section>

      {/* Course curriculum & program matrix */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-wider text-brand-gold-dark font-bold bg-[#D4AF37]/10 px-3 py-1 rounded-full">Academic Portfolio</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-blue mt-3">
            Custom-Tailored Academic Pathways
          </h2>
          <p className="text-slate-600 mt-3 text-base">
            From cognitive base foundations to elite technical entrance training, find your track at Vaibhav Agarwal Classes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courseTracks.map((track, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-2xl border ${track.color} shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between`}
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-mono uppercase font-bold tracking-wider text-slate-500 bg-white/80 py-1 px-2.5 rounded-md border border-slate-200/50">
                    {track.grades}
                  </span>
                  <span className={`w-2 h-2 rounded-full ${track.badgeColor}`} />
                </div>
                <h3 className="text-lg font-display font-bold text-brand-blue mb-2">{track.title}</h3>
                <p className="text-xs text-slate-700 leading-relaxed font-light mb-4">{track.desc}</p>
              </div>

              <div className="pt-4 border-t border-slate-200/40">
                <span className="text-[11px] font-mono uppercase tracking-wider text-brand-slate block mb-1">PROGRAM EXCLUSIVE</span>
                <span className="text-xs font-display font-semibold text-brand-blue flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-gold" /> {track.highlight}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Targeted Class 1-12 Framework Section */}
      <section className="pb-20 px-6 max-w-7xl mx-auto">
        <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl border border-slate-100 shadow-xl overflow-hidden">
          {/* Section Header */}
          <div className="bg-slate-900 p-6 text-center">
            <h3 className="text-xl font-bold text-white font-display">Our Targeted Class 1–12 Framework</h3>
            <p className="text-xs text-slate-400 mt-1 font-sans">Tailored teaching styles mapped directly to your child's developmental stage.</p>
          </div>

          {/* Grid Container */}
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100 bg-slate-50">
            
            {/* Segment 1: Primary */}
            <div className="p-6 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full font-mono">Classes 1 - 5</span>
                <h4 className="text-base font-bold text-slate-900 mt-3 font-display">Building Core Foundations</h4>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed font-sans">Focuses on building a love for learning. We eliminate math anxiety early using visual logic games and reading comprehension drills.</p>
              </div>
              <ul className="mt-4 space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-3">
                <li className="flex items-center gap-2">🔹 Mental Arithmetic Basics</li>
                <li className="flex items-center gap-2">🔹 Science Concept Visuals</li>
              </ul>
            </div>

            {/* Segment 2: Middle School */}
            <div className="p-6 flex flex-col justify-between bg-white">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full font-mono">Classes 6 - 8</span>
                <h4 className="text-base font-bold text-slate-900 mt-3 font-display">Conceptual Deep-Dives</h4>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed font-sans">Transitioning from basic memorization to analytical thinking. Preparing students for the sudden jump in structural complexity in math and science themes.</p>
              </div>
              <ul className="mt-4 space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-3">
                <li className="flex items-center gap-2">🔸 Structured Problem Solving</li>
                <li className="flex items-center gap-2">🔸 Logic & Analytical Reasoning</li>
              </ul>
            </div>

            {/* Segment 3: High School */}
            <div className="p-6 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full font-mono">Classes 9 - 12</span>
                <h4 className="text-base font-bold text-slate-900 mt-3 font-display">Board Exam Rigor</h4>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed font-sans">Pure, conversion-focused strategy. Intensive test-series blueprints, rigorous performance tracking, and deep subject mastery in Accountancy, Mathematics, and Science.</p>
              </div>
              <ul className="mt-4 space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-3">
                <li className="flex items-center gap-2">🔺 100% Board Syllabus Sync</li>
                <li className="flex items-center gap-2">🔺 Speed & Answer Writing Drills</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Runs Like a Clock Timeline Section */}
      <section className="py-16 bg-[#faf9f6]/95 border-y border-slate-200/50 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] bg-[#0A192F] px-4 py-1.5 rounded-full font-bold">
              Parent Peace of Mind
            </span>
            <h2 className="text-3xl font-display font-bold text-brand-blue mt-4">
              Our Operational Chronology: Running Like a Clock
            </h2>
            <p className="text-xs text-slate-500 mt-2 font-sans max-w-lg mx-auto">
              For parents of school-aged children, school security and consistent academic tracking are paramount. Here is how our daily cycle guarantees a safe, high-engagement outcome for every student.
            </p>
          </div>

          <div className="relative border-l-2 border-slate-200 ml-4 md:ml-32 pl-6 md:pl-8 space-y-12 pb-4">
            
            {/* Step 1 */}
            <div className="relative group">
              {/* Timeline marker/pill showing time */}
              <div className="absolute -left-[31px] md:-left-[128px] top-1.5 flex items-center md:justify-end w-[20px] md:w-[100px]">
                <span className="hidden md:inline text-[11px] font-mono font-bold text-[#D4AF37] bg-[#0A192F] px-2 py-1 rounded border border-[#D4AF37]/30">04:15 PM</span>
                <div className="w-3.5 h-3.5 rounded-full bg-[#D4AF37] border-4 border-white shadow-sm ml-2 group-hover:scale-120 transition-transform"></div>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                <span className="md:hidden inline-block text-[10px] font-mono font-bold text-[#D4AF37] bg-[#0A192F] px-2.5 py-0.5 rounded mb-2">04:15 PM</span>
                <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-[#D4AF37] block">Arrival & Safety Scan</span>
                <h4 className="text-base font-display font-bold text-slate-900 mt-0.5">Instant Punch-In Notification</h4>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed font-sans">
                  The student arrives at the Althan center. They scan their smart card, automatically sending a secure WhatsApp or SMS notification straight to the parent's phone confirming safe arrival.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative group">
              <div className="absolute -left-[31px] md:-left-[128px] top-1.5 flex items-center md:justify-end w-[20px] md:w-[100px]">
                <span className="hidden md:inline text-[11px] font-mono font-bold text-[#D4AF37] bg-[#0A192F] px-2 py-1 rounded border border-[#D4AF37]/30">04:30 PM</span>
                <div className="w-3.5 h-3.5 rounded-full bg-[#0A192F] border-4 border-white shadow-sm ml-2 group-hover:scale-120 transition-transform"></div>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                <span className="md:hidden inline-block text-[10px] font-mono font-bold text-[#D4AF37] bg-[#0A192F] px-2.5 py-0.5 rounded mb-2">04:30 PM</span>
                <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-indigo-600 block">Classroom Rigor</span>
                <h4 className="text-base font-display font-bold text-slate-900 mt-0.5">Rigorous Classroom Engagement</h4>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed font-sans">
                  A 90-minute core learning block focused entirely on textbook principles, conceptual interactive blackboard breakdowns, and zero-distraction focus environments.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative group">
              <div className="absolute -left-[31px] md:-left-[128px] top-1.5 flex items-center md:justify-end w-[20px] md:w-[100px]">
                <span className="hidden md:inline text-[11px] font-mono font-bold text-[#D4AF37] bg-[#0A192F] px-2 py-1 rounded border border-[#D4AF37]/30">06:00 PM</span>
                <div className="w-3.5 h-3.5 rounded-full bg-[#D4AF37] border-4 border-white shadow-sm ml-2 group-hover:scale-120 transition-transform"></div>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                <span className="md:hidden inline-block text-[10px] font-mono font-bold text-[#D4AF37] bg-[#0A192F] px-2.5 py-0.5 rounded mb-2">06:00 PM</span>
                <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-emerald-600 block">Exit Assessment</span>
                <h4 className="text-base font-display font-bold text-slate-900 mt-0.5">Daily Micro-Quiz Assessment</h4>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed font-sans">
                  Before leaving, every student completes a quick 5-question review worksheet. This ensures they understood the day's lesson before heading home.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="relative group">
              <div className="absolute -left-[31px] md:-left-[128px] top-1.5 flex items-center md:justify-end w-[20px] md:w-[100px]">
                <span className="hidden md:inline text-[11px] font-mono font-bold text-[#D4AF37] bg-[#0A192F] px-2 py-1 rounded border border-[#D4AF37]/30">06:30 PM</span>
                <div className="w-3.5 h-3.5 rounded-full bg-[#0A192F] border-4 border-white shadow-sm ml-2 group-hover:scale-120 transition-transform"></div>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                <span className="md:hidden inline-block text-[10px] font-mono font-bold text-[#D4AF37] bg-[#0A192F] px-2.5 py-0.5 rounded mb-2">06:30 PM</span>
                <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-orange-600 block">Performance Tracking</span>
                <h4 className="text-base font-display font-bold text-slate-900 mt-0.5">Weekly Performance Portal Sync</h4>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed font-sans">
                  Every weekend, digital progress profiles showing test matrices, average class standings, and explicit tutor feedback are uploaded for parents to review.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2026 Batch Timelines Section */}
      <section className="bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 font-sans border-b border-slate-200/50">
        <div className="max-w-6xl mx-auto">
          
          {/* Section Headline Context */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
              2026 Batch Timelines
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-3 tracking-tight">
              Class 1–12 & VisionPreneur Schedules
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Carefully structured hours engineered to balance academic rigor with real-world confidence frameworks.
            </p>
          </div>

          {/* Main Grid Array */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Card 1: Primary Foundations */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] uppercase tracking-wider font-bold bg-blue-50 text-blue-600 px-2.5 py-1 rounded">Primary</span>
                  <span className="text-xs font-mono text-slate-400 font-bold">3 Days / Wk</span>
                </div>
                <h3 className="text-base font-black text-slate-900">Class 1 to 5 Foundations</h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">Eliminating math anxiety early using visual structural logic and reading comprehension drills.</p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center">
                <div>
                  <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Active Slot</span>
                  <strong className="text-xs font-mono text-indigo-950">04:00 PM - 05:30 PM</strong>
                </div>
                <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">MWF</span>
              </div>
            </div>

            {/* Card 2: Middle School Core */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] uppercase tracking-wider font-bold bg-amber-50 text-amber-600 px-2.5 py-1 rounded">Middle School</span>
                  <span className="text-xs font-mono text-slate-400 font-bold">5 Days / Wk</span>
                </div>
                <h3 className="text-base font-black text-slate-900">Class 6 to 8 Analytics</h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">Transitioning from simple memorization to complex structural mathematics and science derivation tracks.</p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center">
                <div>
                  <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Active Slot</span>
                  <strong className="text-xs font-mono text-indigo-950">04:30 PM - 06:15 PM</strong>
                </div>
                <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">MON-FRI</span>
              </div>
            </div>

            {/* Card 3: High School Boards */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] uppercase tracking-wider font-bold bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded">High School</span>
                  <span className="text-xs font-mono text-slate-400 font-bold">6 Days / Wk</span>
                </div>
                <h3 className="text-base font-black text-slate-900">Class 9 & 10 Board Prep</h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">Intensive text-series mock cycles, 100% textbook execution, and specialized weekly error-tracking analytics reviews.</p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center">
                <div>
                  <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Active Slot</span>
                  <strong className="text-xs font-mono text-indigo-950">05:00 PM - 07:00 PM</strong>
                </div>
                <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">MON-SAT</span>
              </div>
            </div>

            {/* Card 4: Senior Higher Secondary */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] uppercase tracking-wider font-bold bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded">Senior Batch</span>
                  <span className="text-xs font-mono text-slate-400 font-bold">6 Days / Wk</span>
                </div>
                <h3 className="text-base font-black text-slate-900">Class 11 & 12 Commerce/Sci</h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">Advanced academic deep-dives focusing on final Accountancy ledgers, complex physics formulas, and calculus benchmarks.</p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center">
                <div>
                  <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Active Slot</span>
                  <strong className="text-xs font-mono text-indigo-950">04:00 PM - 07:30 PM</strong>
                </div>
                <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">MON-SAT</span>
              </div>
            </div>

            {/* FEATURED SPECIAL CARD 5: VisionPreneur Elite Breakout */}
            <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-950 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between md:col-span-2 lg:col-span-1 relative overflow-hidden">
              {/* Accent decorative corner flash background */}
              <div className="absolute -top-12 -right-12 w-24 h-24 bg-orange-500/10 rounded-full blur-xl"></div>
              
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] uppercase tracking-wider font-black bg-orange-500/20 text-orange-400 px-2.5 py-1 rounded border border-orange-500/20">Elite Feature Track</span>
                  <span className="text-xs font-mono text-orange-400 font-black">Open Enrollment</span>
                </div>
                <h3 className="text-base font-black text-white">VisionPreneur Skill Program</h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Our exclusive breakout track focusing on Public Speaking, Personality Development, Negotiation Frameworks, and Strategic Confidence.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800 flex justify-between items-center">
                <div>
                  <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Special Active Slot</span>
                  <strong className="text-xs font-mono text-orange-400">06:15 PM - 07:15 PM</strong>
                </div>
                <span className="text-[10px] font-bold text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20">TUE • THU • SAT</span>
              </div>
            </div>

          </div>

          {/* General Administrative Notice Footnote Anchor */}
          <div className="mt-8 text-center text-xs text-slate-400">
            📍 Location Reference: All batches run synchronously out of our primary facility at <strong>Office 101-102, JMD Excellence Hub, Althan</strong>.
          </div>

        </div>
      </section>

      {/* Interactive Scholarship Calculator Section */}
      <section className="bg-brand-blue py-16 px-6 text-white border-y border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Section info / Copy */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <span className="text-xs font-mono uppercase tracking-wider text-brand-gold font-bold bg-white/5 w-fit px-3 py-1 rounded-full border border-white/10">
              ⚡ Exclusive Merit Rewards
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold leading-tight">
              Honoring Academic Excellence with Direct Concessions
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              At Vaibhav Agarwal Classes, we believe that high-achieving students deserve specialized resources. Use our real-time <strong>Scholarship Fee Concession Calculator</strong> to check which award tier you qualify for based on your prior school exams or mock assessments.
            </p>

            <div className="flex flex-col gap-3 mt-2">
              <div className="flex gap-3 px-4 py-3 bg-white/5 border border-white/15 rounded-xl text-xs items-center">
                <span className="text-brand-gold font-bold font-mono whitespace-nowrap">✨ Mega-Scholarship Tier:</span>
                <span className="text-slate-300">Scores &gt; 95% receive 50% tuition waiver + Free advanced textbook sets.</span>
              </div>
              <div className="flex gap-3 px-4 py-3 bg-white/5 border border-white/15 rounded-xl text-xs items-center">
                <span className="text-emerald-400 font-bold font-mono whitespace-nowrap">⚡ Merit Scholarship Tier:</span>
                <span className="text-slate-300">Scores from 85% to 95% qualify for 25% course discount.</span>
              </div>
              <div className="flex gap-3 px-4 py-3 bg-white/5 border border-white/15 rounded-xl text-xs items-center">
                <span className="text-[#3066BE] font-bold font-mono whitespace-nowrap">🎯 Early Bird Reward Tier:</span>
                <span className="text-slate-300">Register early with scores ≥ 75% for 10% concessions.</span>
              </div>
            </div>

            <p className="text-[11px] font-mono text-brand-slate">
              * Concession claims must be verified with original marksheets during the physical onboarding interview at our Althan center.
            </p>
          </div>

          {/* Calculator Container */}
          <div className="lg:col-span-6">
            <ScholarshipCalculator />
          </div>

        </div>
      </section>

      {/* Trial Booking scheduler mock interface & Map description */}
      <section id="demo-section" className="bg-[#cbd5e1]/10 py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Informative Block describing campus */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <span className="text-xs font-mono uppercase tracking-wider text-brand-gold-dark font-bold">VAC Surat Centres</span>
            <h2 className="text-3xl font-display font-bold text-brand-blue leading-tight">
              State-of-The-Art Learning Premises & Labs
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Our campus boasts custom smart classrooms, advanced computer training facilities, Physics/Chemistry labs, and a fully stocked educational library. Managed entirely in-house to guarantee distraction-free study blocks.
            </p>

            <div className="flex flex-col gap-4 mt-2">
              <div className="flex gap-3.5 items-start">
                <div className="p-2.5 rounded-lg bg-white shadow-xs text-brand-cyan border border-slate-100">
                  <Calendar className="w-5 h-5 text-brand-gold" />
                </div>
                <div>
                  <h4 className="text-sm font-display font-semibold text-brand-blue">Interactive Practice Board Schedules</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Students can book dynamic weekend mock series and clear doubts one-on-one with specialized teachers.</p>
                </div>
              </div>

              <div className="flex gap-3.5 items-start">
                <div className="p-2.5 rounded-lg bg-white shadow-xs text-brand-cyan border border-slate-100">
                  <GraduationCap className="w-5 h-5 text-brand-cyan" />
                </div>
                <div>
                  <h4 className="text-sm font-display font-semibold text-brand-blue">Verified Scholarship Benefit Scheme</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Scholarships worth up to ₹50,000 for board exam top scorers and merit track results.</p>
                </div>
              </div>
            </div>

            {/* Geographic Althan contact info box */}
            <div className="p-5 bg-gradient-to-br from-[#0F233B] to-[#182F4E] text-white rounded-xl border border-white/10 shadow-lg text-xs mt-4 flex flex-col gap-3.5">
              <div>
                <p className="font-mono text-brand-gold uppercase tracking-widest text-[9.5px] mb-1.5 font-bold">📍 OFFICIALLY REGISTERED CAMPUS</p>
                <p className="text-slate-100 font-medium text-sm">
                  {INSTITUTE_DETAILS.name} ({INSTITUTE_DETAILS.address.office})
                </p>
                <p className="text-slate-300 mt-1 leading-relaxed">
                  {INSTITUTE_DETAILS.address.building}, {INSTITUTE_DETAILS.address.landmark}, {INSTITUTE_DETAILS.address.cityStatePin}
                </p>
              </div>

              <div className="border-t border-white/10 pt-3 flex flex-col gap-2">
                <p className="font-mono text-brand-gold uppercase tracking-widest text-[9.5px] font-bold">📞 MULTI-ADMIN SECURE DIRECTORY</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-1">
                  {INSTITUTE_DETAILS.contacts.map((contact, idx) => (
                    <a
                      key={idx}
                      href={`https://wa.me/91${contact.phone}`}
                      target="_blank"
                      rel="referrer"
                      className="bg-white/5 hover:bg-white/10 border border-white/5 hover:border-brand-gold/30 p-2.5 rounded-lg transition-all flex flex-col gap-0.5 group"
                    >
                      <span className="font-display font-semibold text-white text-[11px] group-hover:text-brand-gold transition-colors">{contact.name}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{contact.role}</span>
                      <span className="text-[9.5px] text-[#D4AF37] font-mono mt-0.5">💬 Click to Chat: +91 {contact.phone}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Scheduling Form */}
          <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200/50 shadow-md">
            <h3 className="text-xl font-display font-bold text-brand-blue mb-1">Book a Free Session</h3>
            <p className="text-xs text-slate-500 mb-6">Select a track and time, the VAC registry team will contact you to confirm.</p>
            
            {demoSubmitted ? (
              <div className="bg-emerald-50 text-emerald-800 p-6 rounded-xl border border-emerald-100/80 flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xl font-bold animate-bounce shadow-xs">
                  ✓
                </div>
                <div>
                  <h4 className="font-display font-bold text-emerald-950">Trial Session Booked!</h4>
                  <p className="text-xs text-emerald-700 mt-1">We have sent a confirmation prompt to <strong>{demoData.phone}</strong>.</p>
                  <p className="text-xs text-slate-400 mt-2 font-mono">Our student counselor will follow up via WhatsApp for syllabus mapping within 2 hours.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleDemoSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-500 uppercase tracking-wider mb-1.5">Student Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aryan Kapoor"
                    value={demoData.name}
                    onChange={(e) => setDemoData({ ...demoData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-1 focus:ring-brand-gold focus:border-brand-gold bg-stone-50/50"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-500 uppercase tracking-wider mb-1.5">WhatsApp / Contact Mobile</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 XXXXX XXXXX"
                      value={demoData.phone}
                      onChange={(e) => setDemoData({ ...demoData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-1 focus:ring-brand-gold focus:border-brand-gold bg-stone-50/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-500 uppercase tracking-wider mb-1.5">Target Academic Grade</label>
                    <select
                      value={demoData.currentClass}
                      onChange={(e) => setDemoData({ ...demoData, currentClass: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-1 focus:ring-brand-gold bg-stone-50/50"
                    >
                      <option>Class 8</option>
                      <option>Class 9</option>
                      <option>Class 10</option>
                      <option>Class 11</option>
                      <option>Class 12</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-500 uppercase tracking-wider mb-2">Academic Core Interest</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Science', 'Commerce', 'VisionPreneur'].map((trackOption) => {
                      const isSelected = selectedDemoClass === trackOption;
                      return (
                        <button
                          key={trackOption}
                          type="button"
                          onClick={() => setSelectedDemoClass(trackOption)}
                          className={`py-2 px-3 rounded-lg border text-center text-xs font-display font-medium transition-all ${
                            isSelected
                              ? 'bg-brand-blue border-brand-blue text-white shadow-xs'
                              : 'bg-stone-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          {trackOption}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button
                  type="submit"
                  id="btn-submit-demo"
                  className="w-full py-3 mt-2 rounded-xl bg-brand-gold hover:bg-brand-gold-dark text-brand-blue font-display font-bold text-sm tracking-wide transition-all shadow-xs active:scale-98 cursor-pointer"
                >
                  Schedule Demo Slot (Free)
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* Testimonials Slider */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="text-center max-w-2xl mb-12">
            <span className="text-xs font-mono uppercase tracking-wider text-brand-gold-dark font-bold bg-[#D4AF37]/10 px-3 py-1 rounded-full">Alumni Stories</span>
            <h2 className="text-3xl font-display font-bold text-brand-blue mt-3">What Our Scholars Say</h2>
          </div>

          <div className="w-full max-w-4xl relative min-h-[220px]">
            {TESTIMONIALS.map((testi, idx) => {
              if (idx !== activeTestimonial) return null;
              return (
                <div key={idx} className="flex flex-col items-center text-center gap-6 animate-fade-in px-4">
                  <div className="relative">
                    <img
                      src={testi.avatar}
                      alt={testi.author}
                      className="w-16 h-16 rounded-full object-cover border-2 border-brand-gold shadow-md"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute -bottom-1 -right-1 bg-brand-blue text-brand-gold rounded-full p-1 text-[10px] font-bold">
                      ★
                    </span>
                  </div>
                  <blockquote className="text-slate-700 italic text-base md:text-lg max-w-3xl leading-relaxed">
                    “{testi.quote}”
                  </blockquote>
                  <div>
                    <h5 className="font-display font-bold text-brand-blue text-sm">{testi.author}</h5>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">{testi.role}</p>
                    <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-mono font-semibold uppercase tracking-wider">
                      🎯 {testi.achievement}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Testimonial Select Toggles */}
          <div className="flex gap-2 mt-8">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTestimonial(idx)}
                className={`w-3.5 h-3.5 rounded-full transition-all cursor-pointer ${
                  idx === activeTestimonial ? 'bg-brand-gold scale-125' : 'bg-slate-200 hover:bg-slate-300'
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Main Footer */}
      <footer className="bg-slate-900 text-white py-12 px-4 border-t border-slate-800">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Column 1: Core Campus Information */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-orange-400">Our Althan Campus</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Vaibhav Agarwal Classes <br />
              Office no 101, 102, JMD Exclluses Business Space hub, <br />
              Bhimrad, Althan, Surat - 395017
            </p>
          </div>

          {/* Column 2: Emergency Administrative Inquiries */}
          <div className="space-y-2 text-xs text-slate-300">
            <h4 className="text-sm font-bold uppercase tracking-wider text-orange-400">Admissions & Helplines</h4>
            <p>📞 <strong className="text-white">Vaibhav Agarwal:</strong> +91 96377 16664</p>
            <p>📞 <strong className="text-white">Kajal Agarwal:</strong> +91 95860 32030</p>
            <p>📞 <strong className="text-white">Jitendra Maurya:</strong> +91 73831 23990</p>
          </div>

          {/* Column 3: Digital Communications Core */}
          <div className="space-y-2 text-xs text-slate-300">
            <h4 className="text-sm font-bold uppercase tracking-wider text-orange-400">Official Correspondence</h4>
            <p>✉️ vaclasses2018@gmail.com</p>
            <p>✉️ kajal.agr23june@gmail.com</p>
            <p>✉️ mauryajitendra853@gmail.com</p>
          </div>

        </div>

        <div className="max-w-6xl mx-auto border-t border-slate-800 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500 font-light">
          <p>© 2026 Vaibhav Agarwal Classes. All Academic and VisionPreneur Materials Reserved.</p>
          <div className="flex gap-4">
            <span className="hover:text-stone-300 cursor-pointer">Terms of Conduct</span>
            <span className="hover:text-stone-300 cursor-pointer">Surat Registration Policies</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
