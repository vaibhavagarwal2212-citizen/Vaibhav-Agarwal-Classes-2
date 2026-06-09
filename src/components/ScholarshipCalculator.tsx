import React, { useState } from 'react';
import { Calendar, Phone, ArrowRight, Clock, Sparkles, Check, PhoneCall, Gift, BookOpen, ChevronRight, CheckCircle2 } from 'lucide-react';

interface ScholarshipDetails {
  tier: string;
  discount: string;
  message: string;
  badgeColor: string;
  progressColor: string;
}

export default function ScholarshipCalculator() {
  const [selectedCourse, setSelectedCourse] = useState('class-10');
  const [percentage, setPercentage] = useState(85);
  const [step, setStep] = useState<1 | 2 | 3>(1); // 1 = Config/Calculate, 2 = Booking/Gateway, 3 = Confirmed
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('Wed 4:00 PM');
  const [preferredGateway, setPreferredGateway] = useState<'calendar' | 'sms'>('calendar');

  // Trial Lecture Slots for the Interactive Calendar Gateway
  const UPCOMING_SLOTS = [
    { id: 'slot-1', day: 'Wednesday', date: 'June 10', time: '4:00 PM - 5:30 PM', label: 'Maths Demo' },
    { id: 'slot-2', day: 'Friday', date: 'June 12', time: '5:00 PM - 6:30 PM', label: 'Science Trial' },
    { id: 'slot-3', day: 'Saturday', date: 'June 13', time: '10:00 AM - 11:30 AM', label: 'Board Strategy' }
  ];

  // Dynamic Scholarship Logic Matrix matching calculated discount badges exactly
  const getScholarshipDetails = (pct: number): ScholarshipDetails => {
    if (pct > 95) {
      return {
        tier: '50% Mega-Scholarship',
        discount: '50% Tuition Waiver',
        message: 'Masterclass eligible! Free printed board books + premier mentorship access.',
        badgeColor: 'bg-emerald-50 text-emerald-600 border-emerald-200/60',
        progressColor: 'bg-emerald-500'
      };
    } else if (pct >= 85 && pct <= 95) {
      return {
        tier: '25% Merit',
        discount: '25% Course Concession',
        message: 'Excellent merit performance! Priority seat allocation authorized.',
        badgeColor: 'bg-amber-50 text-amber-600 border-[#D4AF37]/35',
        progressColor: 'bg-amber-500'
      };
    } else if (pct >= 75 && pct < 85) {
      return {
        tier: '10% Early Bird',
        discount: '10% Early Bird Reward',
        message: 'Concession valid for registrations initiated this week.',
        badgeColor: 'bg-indigo-50 text-indigo-600 border-indigo-200/60',
        progressColor: 'bg-indigo-500'
      };
    } else {
      return {
        tier: 'Standard Admission',
        discount: 'Standard Batch Bracket',
        message: "Build core fundamentals. Reserve seat to freeze standard batch rates.",
        badgeColor: 'bg-slate-50 text-slate-600 border-slate-200',
        progressColor: 'bg-slate-400'
      };
    }
  };

  const reward = getScholarshipDetails(percentage);

  const handleCalculateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadPhone) {
      // Basic validation
      return;
    }
    setStep(2); // Go to interactive booking / phone confirmation gateway
  };

  const handleBookingConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3); // Go to final confirmation screen
  };

  const getCourseLabel = (value: string) => {
    switch (value) {
      case 'class-10': return 'Class 10 Board Prep';
      case 'class-12-comm': return 'Class 12 Boards + Commerce';
      case 'ca-foundation': return 'CA Foundation Comprehensive';
      case 'visionpreneur': return 'VisionPreneur Leadership';
      default: return value;
    }
  };

  return (
    <div id="vac-scholarship-calc" className="w-full max-w-[480px] min-h-[640px] mx-auto bg-white rounded-3xl border border-slate-100 shadow-2xl overflow-hidden flex flex-col justify-between p-6 sm:p-7 font-sans transition-all duration-300">
      
      {/* Header Container */}
      <div className="text-center relative">
        <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold text-[#AA7C11] bg-amber-50/70 px-3 py-1 rounded-full border border-amber-100/50">
          <Sparkles className="w-3 h-3 text-[#D4AF37]" />
          <span>Vaibhav Agarwal Classes</span>
        </span>
        <h3 className="mt-2 text-2xl font-black text-slate-900 tracking-tight font-display">
          Scholarship Calculator
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Calculate your score-based concession and book your seat instantly.
        </p>

        {/* Dynamic Progress indicator step tracker */}
        <div className="flex items-center justify-center gap-4 mt-4 text-[10px] font-mono font-bold text-slate-400">
          <span className={`transition-colors ${step >= 1 ? 'text-[#D4AF37]' : ''}`}>1. Score Input</span>
          <span className="text-slate-200">/</span>
          <span className={`transition-colors ${step >= 2 ? 'text-[#D4AF37]' : ''}`}>2. Secure Reward & Trial</span>
          <span className="text-slate-200">/</span>
          <span className={`transition-colors ${step >= 3 ? 'text-[#D4AF37]' : ''}`}>3. Verified</span>
        </div>
      </div>

      {step === 1 && (
        /* Step 1: Input details and test slider percentage */
        <form onSubmit={handleCalculateSubmit} className="flex-1 flex flex-col justify-center space-y-4 my-4">
          
          {/* Quick Lead Capture Fields */}
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="lead-name" className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Student Name *
                </label>
                <input
                  id="lead-name"
                  type="text"
                  required
                  placeholder="e.g. Aryan"
                  value={leadName}
                  onChange={(e) => setLeadName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 hover:bg-slate-100/50 focus:bg-white border border-slate-200 rounded-xl text-slate-900 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#D4AF37] transition-all"
                />
              </div>
              <div>
                <label htmlFor="lead-phone" className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Contact Number *
                </label>
                <input
                  id="lead-phone"
                  type="tel"
                  required
                  placeholder="+91 Mobile"
                  value={leadPhone}
                  onChange={(e) => setLeadPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 hover:bg-slate-100/50 focus:bg-white border border-slate-200 rounded-xl text-slate-900 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#D4AF37] transition-all"
                />
              </div>
            </div>
          </div>

          {/* Targeted Course Dropdown */}
          <div>
            <label htmlFor="course-select" className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Targeted Program Track
            </label>
            <div className="relative">
              <select
                id="course-select"
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100/50 border border-slate-200 rounded-xl text-slate-950 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#D4AF37] transition-all appearance-none cursor-pointer"
              >
                <option value="class-10">Class 10 Board Prep (Maths & Science)</option>
                <option value="class-12-comm">Class 12 Boards + Foundation Commerce</option>
                <option value="ca-foundation">CA Foundation Comprehensive Track</option>
                <option value="visionpreneur">VisionPreneur Leadership Incubator</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>

          {/* Dynamic Percentage Range Slider */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label htmlFor="percentage-slider" className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Previous Academic / Mock Score
              </label>
              <span className="text-sm font-mono font-black text-[#AA7C11] bg-amber-50 px-2.5 py-0.5 rounded-lg border border-[#D4AF37]/25">
                {percentage}%
              </span>
            </div>
            
            <input
              id="percentage-slider"
              type="range"
              min="50"
              max="100"
              value={percentage}
              onChange={(e) => setPercentage(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#D4AF37] transition-all duration-150"
            />
            <div className="flex justify-between text-[9px] text-slate-400 font-bold px-0.5 mt-1">
              <span>50% Marks</span>
              <span>75% (Early Bird Gate)</span>
              <span>85% (Merit Gate)</span>
              <span>95% (Mega)</span>
            </div>
          </div>

          {/* Calculated Output Badge & Concession View Window */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 relative overflow-hidden transition-all duration-300 min-h-[90px] flex flex-col justify-center">
            {/* Dynamic visual slider progress line overlay */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-slate-200">
              <div 
                className={`h-full transition-all duration-300 ${reward.progressColor}`}
                style={{ width: `${(percentage - 50) * 2}%` }}
              ></div>
            </div>

            <div className="flex justify-between items-start gap-2 mb-1">
              <span className="text-xs font-black text-slate-900 tracking-tight uppercase">
                {reward.discount}
              </span>
              <span className={`text-[10px] uppercase font-black tracking-wider px-2 py-0.5 rounded-md border transition-colors duration-300 ${reward.badgeColor}`}>
                {reward.tier}
              </span>
            </div>
            <p className="text-[11px] font-medium text-slate-500 leading-relaxed transition-all duration-150">
              {reward.message}
            </p>
          </div>

          {/* Submit Action */}
          <div>
            <button
              type="submit"
              className="w-full bg-[#0A192F] hover:bg-[#122A4E] text-white font-bold text-xs py-3.5 px-6 rounded-xl transition-all duration-150 transform active:scale-[0.98] shadow-md hover:shadow-lg flex items-center justify-center gap-2 group border border-slate-800 cursor-pointer"
            >
              <span>Verify Score & Book Free Trial</span>
              <ArrowRight className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </form>
      )}

      {step === 2 && (
        /* Step 2: High-conversion gateway selection (Book Calendar Slot vs Phone Instant Pin Confirmation) */
        <form onSubmit={handleBookingConfirm} className="flex-1 flex flex-col justify-center space-y-4 my-2 animate-fade-in">
          
          <div className="bg-[#AA7C11]/5 border border-[#D4AF37]/20 rounded-2xl p-3.5 flex justify-between items-center text-xs">
            <div>
              <span className="block text-[9px] uppercase tracking-wider font-bold text-[#AA7C11]">Active Concession Secured</span>
              <span className="font-extrabold text-slate-900">{reward.tier} ({reward.discount})</span>
            </div>
            <button 
              type="button" 
              onClick={() => setStep(1)} 
              className="text-[10px] text-slate-400 hover:text-slate-600 underline font-semibold cursor-pointer"
            >
              Edit Score
            </button>
          </div>

          {/* Toggle Gateway options inside bottom container */}
          <div className="grid grid-cols-2 gap-2 bg-slate-50 p-1 rounded-xl border border-slate-200/50">
            <button
              type="button"
              onClick={() => setPreferredGateway('calendar')}
              className={`py-2 text-[11px] font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                preferredGateway === 'calendar' 
                  ? 'bg-white shadow-xs text-slate-900' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>1. Booking Calendar</span>
            </button>
            <button
              type="button"
              onClick={() => setPreferredGateway('sms')}
              className={`py-2 text-[11px] font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                preferredGateway === 'sms' 
                  ? 'bg-white shadow-xs text-slate-900' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-500" />
              <span>2. Phone Fast-Track</span>
            </button>
          </div>

          {preferredGateway === 'calendar' ? (
            /* Gateway option A: Calendar date slots picker */
            <div className="space-y-3">
              <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 text-left">
                Choose Scheduled Trial Lecture Slot:
              </span>
              <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
                {UPCOMING_SLOTS.map((slot) => {
                  const isSelected = selectedSlot === `${slot.day} ${slot.time}`;
                  return (
                    <div
                      key={slot.id}
                      onClick={() => setSelectedSlot(`${slot.day} ${slot.time}`)}
                      className={`group border rounded-xl p-3 cursor-pointer text-left transition-all ${
                        isSelected 
                          ? 'bg-amber-50/40 border-[#D4AF37] ring-1 ring-[#D4AF37]/10 shadow-xs' 
                          : 'border-slate-100 hover:border-slate-200 bg-white'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-[11px] font-bold text-slate-950 group-hover:text-amber-800 transition-colors">
                            {slot.label} — {slot.day}, {slot.date}
                          </p>
                          <p className="text-[10px] text-slate-400 font-mono mt-0.5">{slot.time}</p>
                        </div>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          isSelected ? 'border-[#D4AF37] bg-[#D4AF37]' : 'border-slate-200 bg-white'
                        }`}>
                          {isSelected && <Check className="w-3 h-3 text-[#0A192F] stroke-[4]" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Gateway option B: Phone confirmation micro form */
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2 text-left">
              <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">
                Phone Verification Details
              </span>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                We will dispatch an academic coordinator call to <strong>{leadPhone}</strong> in less than 15 minutes to verify details and lock your batch seat.
              </p>
              <div className="pt-1.5 flex items-center gap-2 text-[11px] font-bold text-emerald-600">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Instant Callback Hotline Ready</span>
              </div>
            </div>
          )}

          {/* Secure appointment final CTA */}
          <button
            type="submit"
            className="w-full bg-[#D4AF37] hover:bg-[#AA7C11] text-[#0A192F] font-black text-xs py-3.5 px-6 rounded-xl transition-all duration-150 transform active:scale-[0.98] shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Confirm Trial Booking & Lock Concession</span>
          </button>

        </form>
      )}

      {step === 3 && (
        /* Confirmed layout state */
        <div className="flex-1 flex flex-col justify-center items-center text-center space-y-5 my-4 animate-scale-up">
          <div className="w-14 h-14 rounded-full bg-emerald-500 text-white flex items-center justify-center text-2xl font-bold shadow-md shadow-emerald-500/10 animate-bounce">
            ✓
          </div>
          <div>
            <h4 className="text-xl font-extrabold text-slate-900 font-display">Concession Reserved!</h4>
            <p className="text-xs text-[#AA7C11] font-mono mt-0.5 tracking-wider uppercase font-extrabold">
              Verified: {reward.tier}
            </p>

            <div className="mt-4 p-4 bg-slate-50 border border-slate-100 rounded-2xl text-left text-xs text-slate-600 space-y-3">
              <div className="flex justify-between border-b border-slate-200/50 pb-2">
                <div>
                  <span className="text-slate-400 block text-[9px] uppercase font-mono tracking-widest">Candidate</span>
                  <span className="font-bold text-slate-800">{leadName}</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 block text-[9px] uppercase font-mono tracking-widest">Phone Link</span>
                  <span className="font-mono text-slate-700">{leadPhone}</span>
                </div>
              </div>
              <div>
                <span className="text-slate-400 block text-[9px] uppercase font-mono tracking-widest">Trial Placement</span>
                <span className="font-bold text-brand-blue flex items-center gap-1.5 mt-0.5">
                  <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{preferredGateway === 'calendar' ? selectedSlot : 'Instant Callback Scheduled'}</span>
                </span>
                <span className="text-[10px] text-slate-400 block mt-1">{getCourseLabel(selectedCourse)}</span>
              </div>
              <div className="bg-emerald-50 text-emerald-800 px-3 py-2 rounded-xl text-[10px] font-bold border border-emerald-100 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                <span>Admission concession locked under Reference: #VAC-2026-{Math.floor(Math.random() * 9000 + 1000)}</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 mt-4 leading-relaxed px-1">
              Please present your confirmation SMS or academic marks sheet to counselor Vaibhav Agarwal inside our physical <strong>Althan Campus, Surat</strong> to finalize batch enrollment.
            </p>
          </div>

          <button
            onClick={() => {
              setStep(1);
              setLeadName('');
              setLeadPhone('');
            }}
            className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
          >
            Calculate Another Grade Score
          </button>
        </div>
      )}

      {/* Extreme Bottom High-Conversion Gateway / Direct Hotline */}
      <div className="text-center border-t border-slate-100/80 pt-4 mt-2">
        <div className="bg-slate-50/50 rounded-xl p-2.5 border border-slate-100 flex items-center justify-between gap-3 text-left">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-[#AA7C11] flex items-center justify-center shrink-0">
              <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
            </div>
            <div>
              <span className="text-[9px] block text-slate-400 font-bold uppercase tracking-wider">Fast-Track hotline</span>
              <span className="text-[11px] font-black text-slate-950 font-mono">+91 98252 12345</span>
            </div>
          </div>
          <a
            href="tel:+919825212345"
            className="px-2.5 py-1.5 bg-[#0A192F] hover:bg-[#D4AF37] text-white hover:text-[#0A192F] rounded-lg text-[10px] font-black transition-all font-mono uppercase tracking-wider text-center cursor-pointer"
          >
            Call Now
          </a>
        </div>
        <p className="text-[9px] text-slate-400 mt-2 font-medium">
          * Direct consultation active from 8:00 AM - 8:00 PM at Althan Campus, Surat.
        </p>
      </div>

    </div>
  );
}
