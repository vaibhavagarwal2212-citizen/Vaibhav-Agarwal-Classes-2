// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  User, 
  Plus, 
  Search, 
  Filter, 
  CheckCircle2, 
  MapPin, 
  UserCheck, 
  ChevronRight, 
  Sparkles, 
  X, 
  Layers, 
  Monitor, 
  Users,
  Grid,
  List,
  AlertCircle,
  Clock3
} from 'lucide-react';
import { ScheduledClass } from '../types';

const INITIAL_CLASSES: ScheduledClass[] = [
  {
    id: 'VAC-SCH-001',
    className: 'Class 12 Physics: Gauss\'s Law & Capacitance',
    subject: 'Physics',
    teacher: 'Prof. S.K. Verma',
    day: 'Monday',
    startTime: '14:00',
    endTime: '15:30',
    room: 'Room 101 (Althan Campus)',
    format: 'Offline',
    stream: 'Science',
    grade: 'Class 12',
    description: 'Deep dive into Gauss’s Law, electric potential, and capacitance calculations with historical JEE Advanced numerical analysis.',
    capacity: 35,
    enrolledCount: 29
  },
  {
    id: 'VAC-SCH-002',
    className: 'Class 10 Math: Quadratic Equations',
    subject: 'Mathematics',
    teacher: 'Prof. Rajesh Mehta',
    day: 'Monday',
    startTime: '16:00',
    endTime: '17:30',
    room: 'Room 102 (Althan Campus)',
    format: 'Offline',
    stream: 'Foundation',
    grade: 'Class 10',
    description: 'Formulating and solving quadratic equations. Focusing on factorization and completing the square methods with boards-centric formulas.',
    capacity: 25,
    enrolledCount: 18
  },
  {
    id: 'VAC-SCH-004',
    className: 'Class 11 Commerce: Double Entry Ledger Systems',
    subject: 'Accountancy',
    teacher: 'Dr. Neha Gajiwala',
    day: 'Tuesday',
    startTime: '14:30',
    endTime: '16:00',
    room: 'Room 102 (Althan Campus)',
    format: 'Offline',
    stream: 'Commerce',
    grade: 'Class 11',
    description: 'Familiarization with ledger postings, asset-liability adjustments, and dual-aspect cash reconciliations with worksheet assessments.',
    capacity: 30,
    enrolledCount: 22
  },
  {
    id: 'VAC-SCH-005',
    className: 'Class 12 Chemistry: Organic Mechanisms',
    subject: 'Chemistry',
    teacher: 'Prof. Rajesh Mehta',
    day: 'Tuesday',
    startTime: '16:30',
    endTime: '18:00',
    room: 'Room 101 (Althan Campus)',
    format: 'Hybrid',
    stream: 'Science',
    grade: 'Class 12',
    description: 'Detailed analysis of nucleophilic substitution (SN1 vs SN2) mechanisms on alkyl halides, including stereochemical implications.',
    capacity: 35,
    enrolledCount: 31
  },
  {
    id: 'VAC-SCH-007',
    className: 'Class 12 Math: Calculus Definite Integrals',
    subject: 'Mathematics',
    teacher: 'Prof. S.K. Verma',
    day: 'Wednesday',
    startTime: '14:00',
    endTime: '15:30',
    room: 'Room 101 (Althan Campus)',
    format: 'Offline',
    stream: 'Science',
    grade: 'Class 12',
    description: 'Fundamental Theorem of Calculus, properties of definite integrals, and area under standard trigonometric curves.',
    capacity: 40,
    enrolledCount: 38
  },
  {
    id: 'VAC-SCH-008',
    className: 'Class 9 Foundation Science: Motion & Forces',
    subject: 'Science',
    teacher: 'Prof. Amrita Rao',
    day: 'Wednesday',
    startTime: '16:00',
    endTime: '17:30',
    room: 'Room 102 (Althan Campus)',
    format: 'Offline',
    stream: 'Foundation',
    grade: 'Class 9',
    description: 'Newton’s Laws of Motion, velocity-time graph derivation, and conceptual review of inertia alongside practical everyday examples.',
    capacity: 20,
    enrolledCount: 14
  },
  {
    id: 'VAC-SCH-010',
    className: 'Class 11 Physics: Chemical Bonding & State Laws',
    subject: 'Chemistry',
    teacher: 'Dr. Neha Gajiwala',
    day: 'Thursday',
    startTime: '14:30',
    endTime: '16:00',
    room: 'Room 101 (Althan Campus)',
    format: 'Offline',
    stream: 'Science',
    grade: 'Class 11',
    description: 'VSEPR Theory, hybridization modes in carbon molecules, and molecular orbital energy level schedules.',
    capacity: 35,
    enrolledCount: 28
  },
  {
    id: 'VAC-SCH-011',
    className: 'Class 12 Physics: Lab Doubt & Concept Clearing',
    subject: 'Physics Extra',
    teacher: 'Prof. S.K. Verma',
    day: 'Thursday',
    startTime: '16:30',
    endTime: '18:00',
    room: 'Experimental Lab A',
    format: 'Offline',
    stream: 'Science',
    grade: 'Class 12',
    description: 'Practical board exam preparation, error analysis in slide calipers & potentiometer experiments, and individual ledger clearances.',
    capacity: 20,
    enrolledCount: 19
  },
  {
    id: 'VAC-SCH-013',
    className: 'Class 12 Math: Vector & 3-Dimensional Workspace',
    subject: 'Mathematics',
    teacher: 'Prof. S.K. Verma',
    day: 'Friday',
    startTime: '14:00',
    endTime: '15:30',
    room: 'Room 101 (Althan Campus)',
    format: 'Offline',
    stream: 'Science',
    grade: 'Class 12',
    description: 'Vector products, direction cosines, and shortest distance coordinates between skew lines in three-dimensional space.',
    capacity: 35,
    enrolledCount: 30
  },
  {
    id: 'VAC-SCH-014',
    className: 'Class 10 Science: Carbon & Covalent Hydrocarbons',
    subject: 'Chemistry',
    teacher: 'Prof. Amrita Rao',
    day: 'Friday',
    startTime: '16:00',
    endTime: '17:30',
    room: 'Room 102 (Althan Campus)',
    format: 'Offline',
    stream: 'Foundation',
    grade: 'Class 10',
    description: 'Exploring homologous series, isomerism basics, and nomenclature of saturated vs unsaturated hydrocarbons following IUPAC directives.',
    capacity: 25,
    enrolledCount: 2
  },
];

const DAYS_OF_WEEK: ('Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday')[] = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

export const BatchSchedule: React.FC = () => {
  const [classes, setClasses] = useState<ScheduledClass[]>(() => {
    const saved = localStorage.getItem('vac_batch_classes');
    return saved ? JSON.parse(saved) : INITIAL_CLASSES;
  });

  const [mySchedule, setMySchedule] = useState<string[]>(() => {
    const saved = localStorage.getItem('vac_my_schedule');
    return saved ? JSON.parse(saved) : [];
  });

  const [viewMode, setViewMode] = useState<'grid' | 'timeline'>('grid');
  
  // Filtering States
  const [streamFilter, setStreamFilter] = useState<string>('All');
  const [gradeFilter, setGradeFilter] = useState<string>('All');
  const [formatFilter, setFormatFilter] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedDayMobile, setSelectedDayMobile] = useState<'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday'>('Monday');
  const [showMyScheduleOnly, setShowMyScheduleOnly] = useState<boolean>(false);

  // Modal / Detail States
  const [selectedClass, setSelectedClass] = useState<ScheduledClass | null>(null);
  const [showExtraSessionForm, setShowExtraSessionForm] = useState<boolean>(false);
  const [bookingSuccessMsg, setBookingSuccessMsg] = useState<string>('');

  // Form States for creating a batch class
  const [newTitle, setNewTitle] = useState('');
  const [newSubject, setNewSubject] = useState('');
  const [newTeacher, setNewTeacher] = useState('Vaibhav Agarwal (Founder)');
  const [newDay, setNewDay] = useState<'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'>('Monday');
  const [newStart, setNewStart] = useState('14:00');
  const [newEnd, setNewEnd] = useState('15:30');
  const [newRoom, setNewRoom] = useState('Room 101');
  const [newFormat, setNewFormat] = useState<'Offline' | 'Hybrid' | 'Online'>('Offline');
  const [newStream, setNewStream] = useState<'Science' | 'Commerce' | 'Humanities' | 'Foundation' | 'VisionPreneur'>('Science');
  const [newGrade, setNewGrade] = useState<'Class 9' | 'Class 10' | 'Class 11' | 'Class 12' | 'All'>('Class 12');
  const [newDesc, setNewDesc] = useState('');
  const [newCapacity, setNewCapacity] = useState('30');

  useEffect(() => {
    localStorage.setItem('vac_batch_classes', JSON.stringify(classes));
  }, [classes]);

  useEffect(() => {
    localStorage.setItem('vac_my_schedule', JSON.stringify(mySchedule));
  }, [mySchedule]);

  // Handle seating reservation
  const handleToggleMySchedule = (classId: string) => {
    if (mySchedule.includes(classId)) {
      setMySchedule(prev => prev.filter(id => id !== classId));
      // Release seat
      setClasses(prev => prev.map(c => {
        if (c.id === classId) {
          return { ...c, enrolledCount: Math.max((c.enrolledCount || 0) - 1, 0) };
        }
        return c;
      }));
      setBookingSuccessMsg('');
    } else {
      // Check capacity
      const c = classes.find(curr => curr.id === classId);
      if (c && c.capacity && (c.enrolledCount || 0) >= c.capacity) {
        alert("This batch has reached maximum safety compliance seating capacity! Please schedule a direct demo request or wait for seat reallocation.");
        return;
      }
      setMySchedule(prev => [...prev, classId]);
      // Occupy seat
      setClasses(prev => prev.map(c => {
        if (c.id === classId) {
          return { ...c, enrolledCount: (c.enrolledCount || 0) + 1 };
        }
        return c;
      }));
      setBookingSuccessMsg(`★ Brilliant choice! You are officially registered for "${c?.className}". See you on ${c?.day}!`);
      setTimeout(() => setBookingSuccessMsg(''), 5000);
    }
  };

  // Add extra schedule class
  const handleCreateClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newSubject || !newRoom) {
      alert("Please specify the class title, core subject, and physical/virtual room.");
      return;
    }

    const createdClass: ScheduledClass = {
      id: `VAC-SCH-${Date.now().toString().slice(-4)}`,
      className: newTitle,
      subject: newSubject,
      teacher: newTeacher,
      day: newDay,
      startTime: newStart,
      endTime: newEnd,
      room: newRoom,
      format: newFormat,
      stream: newStream,
      grade: newGrade,
      description: newDesc || 'Special extra batch arranged by VAC mentors for boards optimization and doubt clarification.',
      capacity: parseInt(newCapacity) || 30,
      enrolledCount: 1
    };

    setClasses(prev => [createdClass, ...prev]);
    setShowExtraSessionForm(false);
    
    // Reset Form
    setNewTitle('');
    setNewSubject('');
    setNewDesc('');
    setNewCapacity('30');
    
    // Auto-view newly added
    setSelectedDayMobile(newDay as any);
  };

  // Filter Logic
  const filteredClasses = classes.filter(c => {
    const matchesSearch = c.className.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          c.teacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.room.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStream = streamFilter === 'All' || c.stream === streamFilter;
    const matchesGrade = gradeFilter === 'All' || c.grade === gradeFilter || c.grade === 'All';
    const matchesFormat = formatFilter === 'All' || c.format === formatFilter;
    const matchesMySchedule = !showMyScheduleOnly || mySchedule.includes(c.id);

    return matchesSearch && matchesStream && matchesGrade && matchesFormat && matchesMySchedule;
  });

  const sortedTimelineClasses = [...filteredClasses].sort((a, b) => {
    const dayIndexA = DAYS_OF_WEEK.indexOf(a.day as any);
    const dayIndexB = DAYS_OF_WEEK.indexOf(b.day as any);
    if (dayIndexA !== dayIndexB) return dayIndexA - dayIndexB;
    return a.startTime.localeCompare(b.startTime);
  });

  const getStreamColor = (stream: string) => {
    switch (stream) {
      case 'Science': return { bg: 'bg-slate-900', text: 'text-[#D4AF37]', border: 'border-[#D4AF37]/20', badge: 'bg-[#D4AF37]/10 text-[#D4AF37]' };
      case 'Commerce': return { bg: 'bg-emerald-950', text: 'text-emerald-400', border: 'border-emerald-500/20', badge: 'bg-emerald-500/10 text-emerald-400' };
      case 'Foundation': return { bg: 'bg-indigo-950', text: 'text-indigo-300', border: 'border-indigo-500/20', badge: 'bg-indigo-500/10 text-indigo-400' };
      case 'VisionPreneur': return { bg: 'bg-amber-950', text: 'text-amber-400', border: 'border-amber-500/20', badge: 'bg-amber-500/10 text-amber-400' };
      default: return { bg: 'bg-slate-900', text: 'text-slate-300', border: 'border-slate-500/20', badge: 'bg-slate-500/10 text-slate-400' };
    }
  };

  return (
    <div className="py-10 px-6 max-w-7xl mx-auto animate-fade-in" id="vac-batch-schedule-section">
      
      {/* Upper Information Deck */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 border-b border-slate-200/50 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#AA7C11] bg-amber-50 px-3 py-1 rounded-full border border-amber-200/50">
              Timetable & Batch Slots
            </span>
            <div className="flex items-center gap-1 text-[10px] font-mono text-[#D4AF37] bg-slate-900 px-2 py-0.5 rounded">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Surat Batches Active
            </div>
          </div>
          <h1 className="text-3xl font-display font-extrabold text-slate-900 tracking-tight">
            VAC Batch Schedule
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Browse upcoming offline classes at our Althan Campus or stream high-definition hybrid sessions remotely.
          </p>
        </div>

        {/* Top Control CTA Desk */}
        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          {/* My Classes Filter Toggle */}
          <button
            onClick={() => setShowMyScheduleOnly(!showMyScheduleOnly)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-semibold tracking-wide transition-all cursor-pointer ${
              showMyScheduleOnly 
                ? 'bg-[#0A192F] text-white border-slate-800 shadow-md' 
                : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
            }`}
          >
            <UserCheck className={`w-4 h-4 ${showMyScheduleOnly ? 'text-[#D4AF37]' : 'text-slate-400'}`} />
            <span>{showMyScheduleOnly ? 'Showing My Saved List' : 'Filter My Classes Only'}</span>
            {mySchedule.length > 0 && (
              <span className="bg-[#D4AF37] text-[#0A192F] rounded-full w-5 h-5 flex items-center justify-center font-bold text-[10px]">
                {mySchedule.length}
              </span>
            )}
          </button>

          {/* Add extra lecture button */}
          <button
            onClick={() => setShowExtraSessionForm(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#D4AF37] hover:bg-[#AA7C11] text-[#0A192F] hover:shadow-lg rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Schedule Extra Session</span>
          </button>
        </div>
      </div>

      {bookingSuccessMsg && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start gap-3 text-emerald-800 text-xs font-medium animate-pulse">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">Reservation Logged Successfully</p>
            <p className="opacity-95 mt-1">{bookingSuccessMsg}</p>
          </div>
        </div>
      )}

      {/* Advanced Filter Deck */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5 mb-8 flex flex-col gap-4">
        
        {/* Core controls Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          
          {/* Search bar */}
          <div className="md:col-span-4 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by topic, mentor, room..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37] transition-all"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Category Dropdowns */}
          <div className="md:col-span-8 flex flex-wrap gap-2 justify-end">
            
            {/* Stream Filter */}
            <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-400 font-bold uppercase font-mono">Stream:</span>
              <select
                value={streamFilter}
                onChange={(e) => setStreamFilter(e.target.value)}
                className="bg-transparent text-xs font-bold text-slate-800 outline-none cursor-pointer pr-1"
              >
                <option value="All">All Streams</option>
                <option value="Science">Science (JEE/NEET)</option>
                <option value="Commerce">Commerce (CA Foundation)</option>
                <option value="Foundation">Class 9/10 Foundation</option>
                <option value="VisionPreneur">VisionPreneur Track</option>
              </select>
            </div>

            {/* Grade level Filter */}
            <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-400 font-bold uppercase font-mono">Grade:</span>
              <select
                value={gradeFilter}
                onChange={(e) => setGradeFilter(e.target.value)}
                className="bg-transparent text-xs font-bold text-slate-800 outline-none cursor-pointer pr-1"
              >
                <option value="All">All Grades</option>
                <option value="Class 1">Class 1</option>
                <option value="Class 2">Class 2</option>
                <option value="Class 3">Class 3</option>
                <option value="Class 4">Class 4</option>
                <option value="Class 5">Class 5</option>
                <option value="Class 6">Class 6</option>
                <option value="Class 7">Class 7</option>
                <option value="Class 8">Class 8</option>
                <option value="Class 9">Class 9</option>
                <option value="Class 10">Class 10</option>
                <option value="Class 11">Class 11</option>
                <option value="Class 12">Class 12</option>
              </select>
            </div>

            {/* Format filter */}
            <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-400 font-bold uppercase font-mono">Format:</span>
              <select
                value={formatFilter}
                onChange={(e) => setFormatFilter(e.target.value)}
                className="bg-transparent text-xs font-bold text-slate-800 outline-none cursor-pointer pr-1"
              >
                <option value="All">All Formats</option>
                <option value="Offline">Offline At Campus</option>
              </select>
            </div>

            {/* View Mode Switcher */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => setViewMode('grid')}
                title="Grid Weekly Column Board"
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${viewMode === 'grid' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('timeline')}
                title="Chronological List View"
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${viewMode === 'timeline' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

        {/* Highlight Stats sub row */}
        <div className="flex flex-wrap gap-4 pt-1.5 text-[11px] text-slate-500 border-t border-slate-100">
          <div>
            Showing <strong className="text-slate-800">{filteredClasses.length}</strong> available lecture slots
          </div>
          <span>•</span>
          <div>
            Active physical locations: <span className="bg-amber-100 text-[#AA7C11] font-mono px-1.5 py-0.5 rounded font-bold">Surat (Althan & Adajan)</span>
          </div>
          <span>•</span>
          <div>
            Class capacity standard deviation: <span className="text-slate-800 font-semibold">Max 35 seats for high offline interactive quality</span>
          </div>
        </div>

      </div>

      {/* Main Timetable Board (GRID VIEW) */}
      {viewMode === 'grid' && (
        <>
          {/* Day selection tabs ONLY visible on mobile to keep column width perfectly readable */}
          <div className="md:hidden flex gap-1 mb-4 overflow-x-auto pb-2 scrollbar-none">
            {DAYS_OF_WEEK.map((day) => {
              const dayClassesCount = filteredClasses.filter(c => c.day === day).length;
              return (
                <button
                  key={day}
                  onClick={() => setSelectedDayMobile(day)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide whitespace-nowrap shrink-0 transition-all border ${
                    selectedDayMobile === day 
                      ? 'bg-[#0A192F] text-white border-transparent shadow' 
                      : 'bg-white text-slate-600 border-slate-200'
                  }`}
                >
                  <span>{day}</span>
                  {dayClassesCount > 0 && (
                    <span className="ml-1.5 px-1.5 py-0.5 bg-[#D4AF37] text-slate-950 rounded-full text-[9px] font-black">
                      {dayClassesCount}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Desktop Responsive Multicolumn Horizontal Grid */}
          <div className="hidden md:grid md:grid-cols-6 gap-4 items-start">
            
            {DAYS_OF_WEEK.map((day) => {
              const classesForDay = filteredClasses.filter(c => c.day === day);
              
              // Sort day classes on StartTime for timeline correctness
              const sortedClasses = [...classesForDay].sort((a,b) => a.startTime.localeCompare(b.startTime));

              return (
                <div 
                  key={day} 
                  className={`bg-slate-50/50 border rounded-2.5xl p-3 flex flex-col gap-3 min-h-[500px] transition-all hover:bg-slate-50/80 ${
                    selectedDayMobile === day ? 'border-[#D4AF37]/40 ring-1 ring-[#D4AF37]/10' : 'border-slate-200/60'
                  }`}
                >
                  {/* Day Header */}
                  <div className="flex justify-between items-center bg-white p-2.5 rounded-xl border border-slate-200/40 shadow-sm">
                    <span className="font-display font-black text-xs text-slate-900 tracking-wide uppercase">
                      {day}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-100 rounded px-1.5 py-0.5">
                      {sortedClasses.length}
                    </span>
                  </div>

                  {/* Day List */}
                  <div className="flex flex-col gap-3">
                    {sortedClasses.length === 0 ? (
                      <div className="text-center py-12 px-2 text-[10px] text-slate-400 font-medium">
                        No batch schedules aligned or matches filter parameters today.
                      </div>
                    ) : (
                      sortedClasses.map((c) => {
                        const colors = getStreamColor(c.stream);
                        const isEnrolled = mySchedule.includes(c.id);

                        return (
                          <div
                            key={c.id}
                            onClick={() => setSelectedClass(c)}
                            className={`group relative bg-white border rounded-xl p-3 shadow-sm hover:shadow-md transition-all cursor-pointer text-left ${
                              isEnrolled ? 'border-[#D4AF37] ring-1 ring-[#D4AF37]/20 bg-amber-50/10' : 'border-slate-100 hover:border-slate-300'
                            }`}
                          >
                            {/* Joined highlight corner strip */}
                            {isEnrolled && (
                              <div className="absolute top-0 right-0 w-3 h-3 bg-[#D4AF37] rounded-bl" title="Registered Session" />
                            )}

                            {/* Timeline header */}
                            <div className="flex justify-between items-center gap-1.5 mb-1.5">
                              <span className="text-[9px] font-mono text-slate-400 bg-slate-100 rounded px-1 py-0.5">
                                {c.stream}
                              </span>
                              <div className="flex items-center gap-1 text-[9px] text-[#AA7C11] font-bold">
                                <Clock className="w-2.5 h-2.5" />
                                <span>{c.startTime}</span>
                              </div>
                            </div>

                            {/* Title */}
                            <h4 className="text-xs font-bold text-slate-800 line-clamp-2 leading-snug group-hover:text-amber-700 transition-colors">
                              {c.className}
                            </h4>

                            {/* Subtitle Details */}
                            <div className="mt-2 flex flex-col gap-1 text-[10px] text-slate-500">
                              <div className="flex items-center gap-1">
                                <User className="w-3 h-3 text-slate-400 shrink-0" />
                                <span className="truncate">{c.teacher}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="w-3 h-3 text-[#3066BE] shrink-0" />
                                <span className="truncate text-[9px] font-medium">{c.room}</span>
                              </div>
                            </div>

                            {/* Capacity status line */}
                            {c.capacity && (
                              <div className="mt-2.5 pt-2 border-t border-slate-100 flex justify-between items-center text-[9px]">
                                <span className="text-slate-400">Seats:</span>
                                <span className={`font-mono font-bold ${
                                  (c.enrolledCount || 0) >= c.capacity 
                                    ? 'text-red-500' 
                                    : (c.enrolledCount || 0) > c.capacity * 0.8 
                                      ? 'text-amber-600 animate-pulse' 
                                      : 'text-emerald-600'
                                }`}>
                                  {c.enrolledCount}/{c.capacity} occupied
                                </span>
                              </div>
                            )}

                            {/* Hover prompt */}
                            <div className="mt-2 hidden group-hover:flex items-center justify-end text-[9px] text-[#AA7C11] font-bold">
                              <span>Click for details</span>
                              <ChevronRight className="w-3 h-3" />
                            </div>

                          </div>
                        );
                      })
                    )}
                  </div>

                </div>
              );
            })}

          </div>

          {/* Mobile Calendar Grid Fallback (Single Column Day Board) */}
          <div className="block md:hidden">
            <div className="bg-slate-50 border border-slate-200/60 rounded-2.5xl p-4 flex flex-col gap-3">
              
              <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-slate-100 shadow-sm mb-1">
                <span className="font-display font-black text-sm text-slate-900 uppercase tracking-wide">
                  {selectedDayMobile} Lectures
                </span>
                <span className="text-xs font-mono font-black text-slate-500 bg-slate-100 rounded-full px-2.5 py-0.5">
                  {filteredClasses.filter(c => c.day === selectedDayMobile).length} slots
                </span>
              </div>

              <div className="flex flex-col gap-3">
                {filteredClasses.filter(c => c.day === selectedDayMobile).length === 0 ? (
                  <div className="text-center py-20 text-slate-400 text-xs font-medium bg-white rounded-2xl border border-dashed border-slate-200 p-6">
                    <Clock3 className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                    No batches scheduled for {selectedDayMobile} aligning with chosen tags.
                  </div>
                ) : (
                  [...filteredClasses.filter(c => c.day === selectedDayMobile)]
                    .sort((a,b) => a.startTime.localeCompare(b.startTime))
                    .map((c) => {
                      const colors = getStreamColor(c.stream);
                      const isEnrolled = mySchedule.includes(c.id);

                      return (
                        <div
                          key={c.id}
                          onClick={() => setSelectedClass(c)}
                          className={`relative bg-white border rounded-2xl p-4 shadow-sm hover:shadow active:scale-[0.99] transition-all cursor-pointer text-left ${
                            isEnrolled ? 'border-[#D4AF37] ring-1 ring-[#D4AF37]/10 bg-amber-50/5' : 'border-slate-100'
                          }`}
                        >
                          <div className="flex justify-between items-center gap-2 mb-2">
                            <span className={`text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border ${colors.badge}`}>
                              {c.stream} • {c.grade}
                            </span>
                            <div className="flex items-center gap-1 text-[11px] font-mono text-[#AA7C11] font-bold">
                              <Clock className="w-3.5 h-3.5" />
                              <span>{c.startTime} - {c.endTime}</span>
                            </div>
                          </div>

                          <h4 className="text-sm font-bold text-slate-900 mb-2">
                            {c.className}
                          </h4>

                          <p className="text-xs text-slate-500 line-clamp-2 mb-3 leading-relaxed">
                            {c.description}
                          </p>

                          <div className="flex flex-wrap gap-x-4 gap-y-2 items-center text-xs text-slate-500 border-t border-slate-100 pt-3">
                            <div className="flex items-center gap-1">
                              <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                              <span className="font-medium text-slate-700">{c.teacher}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5 text-[#3066BE] shrink-0" />
                              <span className="font-mono text-[11px] text-slate-600">{c.room}</span>
                            </div>
                          </div>

                          {/* Seating & Join Status Indicator Button */}
                          <div className="mt-4 flex justify-between items-center gap-4">
                            <div className="text-[10px] text-slate-400">
                              <span>Seats: </span>
                              <strong className="text-slate-700 font-mono">{(c.enrolledCount || 0)}/{c.capacity}</strong>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleToggleMySchedule(c.id);
                              }}
                              className={`px-3 py-1.5 rounded-lg text-[10px] font-display font-medium tracking-wide transition-all cursor-pointer ${
                                isEnrolled 
                                  ? 'bg-[#D4AF37] text-[#0A192F] font-bold' 
                                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                              }`}
                            >
                              {isEnrolled ? '✓ Registered' : 'Add to My List'}
                            </button>
                          </div>

                        </div>
                      );
                    })
                )}
              </div>

            </div>
          </div>
        </>
      )}

      {/* Structured Chronological list (TIMELINE VIEW) */}
      {viewMode === 'timeline' && (
        <div className="flex flex-col gap-4">
          {filteredClasses.length === 0 && (
            <div className="text-center py-20 text-slate-400 text-sm font-medium bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
              <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p>No lectures match your filters or query parameters.</p>
              <button 
                onClick={() => {
                  setStreamFilter('All');
                  setGradeFilter('All');
                  setFormatFilter('All');
                  setSearchTerm('');
                  setShowMyScheduleOnly(false);
                }} 
                className="mt-4 text-[#D4AF37] font-bold text-xs"
              >
                Clear All Search Filters
              </button>
            </div>
          )}

          {filteredClasses.length > 0 && sortedTimelineClasses.map((c) => {
            const colors = getStreamColor(c.stream);
            const isEnrolled = mySchedule.includes(c.id);

            return (
              <div
                key={c.id}
                onClick={() => setSelectedClass(c)}
                className={`group bg-white border rounded-2.5xl p-5 shadow-sm hover:shadow-md transition-all cursor-pointer text-left flex flex-col md:flex-row gap-6 justify-between items-start md:items-center ${
                  isEnrolled ? 'border-[#D4AF37] ring-1 ring-[#D4AF37]/10' : 'border-slate-100 hover:border-slate-200'
                }`}
              >
                
                {/* Left segment: Time & Day slot */}
                <div className="md:w-44 shrink-0 flex flex-row md:flex-col gap-2 items-center md:items-start text-left border-b md:border-b-0 md:border-r border-slate-100 pb-3 md:pb-0 md:pr-6 md:h-full">
                  <span className="font-display font-black text-sm text-[#0A192F] tracking-wide uppercase">
                    {c.day}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-[#AA7C11] font-bold font-mono">
                    <Clock className="w-3.5 h-3.5 shrink-0" />
                    <span>{c.startTime} - {c.endTime}</span>
                  </div>
                </div>

                {/* Mid Segment: Core Lecture info */}
                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`text-[9px] uppercase font-black tracking-widest px-2 py-0.5 rounded border font-mono ${colors.badge}`}>
                      {c.stream} Track
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold">• {c.grade} Program</span>
                    <span className="text-[10px] text-slate-400 font-semibold">({c.format})</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-950 group-hover:text-amber-700 transition-colors">
                    {c.className}
                  </h3>

                  <p className="text-xs text-slate-500 leading-relaxed max-w-2xl line-clamp-2">
                    {c.description}
                  </p>

                  {/* Metadata details */}
                  <div className="flex flex-wrap gap-x-4 gap-y-1 items-center text-xs text-slate-500 pt-1">
                    <span className="flex items-center gap-1 font-medium text-slate-700">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      {c.teacher}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#3066BE]" />
                      <span className="font-mono text-[11px] text-slate-600">{c.room}</span>
                    </span>
                  </div>
                </div>

                {/* Right actions segment */}
                <div className="shrink-0 flex flex-col items-end gap-2.5 w-full md:w-auto border-t md:border-t-0 border-slate-100 pt-3 md:pt-0">
                  <div className="text-[11px] text-slate-400 font-mono w-full md:text-right flex md:block justify-between">
                    <span>Seats Enrolled:</span>
                    <strong className="text-slate-800 ml-1">{(c.enrolledCount || 0)} / {c.capacity}</strong>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleMySchedule(c.id);
                    }}
                    className={`w-full md:w-auto px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all shadow-sm active:scale-97 cursor-pointer ${
                      isEnrolled 
                        ? 'bg-[#D4AF37] hover:bg-[#AA7C11] text-[#0A192F]' 
                        : 'bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    {isEnrolled ? '✓ Registered' : 'Register Seat'}
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Class Details Modal (Single-view safe absolute popup) */}
      {selectedClass && (
        <div id="class-detail-modal" className="fixed inset-0 z-50 bg-[#0A192F]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden border border-slate-100 shadow-2xl flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="p-6 bg-slate-900 text-white relative">
              <button 
                onClick={() => setSelectedClass(null)}
                className="absolute top-5 right-5 text-slate-400 hover:text-white transition-colors cursor-pointer bg-white/10 hover:bg-white/15 p-1.5 rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
              
              <div className="flex gap-2 items-center mb-2">
                <span className="px-2 py-0.5 bg-[#D4AF37] text-slate-950 text-[9px] uppercase font-black font-mono tracking-widest rounded">
                  {selectedClass.stream}
                </span>
                <span className="text-xs text-slate-300/95 font-mono">
                  {selectedClass.grade} Batch
                </span>
              </div>

              <h2 className="text-xl font-display font-extrabold tracking-tight leading-snug">
                {selectedClass.className}
              </h2>
            </div>

            {/* Modal Contents */}
            <div className="p-6 overflow-y-auto space-y-6 text-sm text-[#1e293b]">
              
              <div>
                <h4 className="text-[10px] uppercase tracking-widest font-bold text-slate-400 font-mono mb-1.5">
                  Lecure Syllabus & Subject Note
                </h4>
                <p className="text-slate-600 text-xs leading-relaxed font-sans">
                  {selectedClass.description}
                </p>
              </div>

              {/* Grid specification cards */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-2xl flex gap-3 text-left">
                  <Clock className="w-5 h-5 text-[#AA7C11] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 block uppercase leading-snug">Scheduled Time</span>
                    <strong className="text-[#0A192F] text-xs font-bold">{selectedClass.day}s</strong>
                    <span className="text-[10px] block text-slate-500 font-medium font-mono">{selectedClass.startTime} - {selectedClass.endTime}</span>
                  </div>
                </div>

                <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-2xl flex gap-3 text-left">
                  <MapPin className="w-5 h-5 text-[#3066BE] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 block uppercase leading-snug">Delivery Room</span>
                    <strong className="text-[#0A192F] text-xs font-bold leading-normal">{selectedClass.room}</strong>
                    <span className="text-[10px] block font-mono text-slate-500 font-bold uppercase">{selectedClass.format} Mode</span>
                  </div>
                </div>

                <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-2xl flex gap-3 text-left">
                  <User className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 block uppercase leading-snug">Subject Mentor</span>
                    <strong className="text-[#0A192F] text-xs font-bold block truncate">{selectedClass.teacher}</strong>
                    <span className="text-[10px] text-[#AA7C11] font-bold font-mono">★★★★★ Star Class</span>
                  </div>
                </div>

                <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-2xl flex gap-3 text-left">
                  <Users className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 block uppercase leading-snug">Seating Allotment</span>
                    <strong className="text-[#0A192F] text-xs font-bold font-mono">{(selectedClass.enrolledCount || 0)} / {selectedClass.capacity || 30} Enrolled</strong>
                    <span className="text-[9px] text-[#AA7C11] font-sans font-semibold block uppercase">
                      {Math.max((selectedClass.capacity || 30) - (selectedClass.enrolledCount || 0), 0)} Seats Available
                    </span>
                  </div>
                </div>
              </div>

              {/* Location Trust card if Offline */}
              {selectedClass.format !== 'Online' && (
                <div className="p-4 bg-[#FAF9F6] border border-[#cbd5e1]/10 rounded-2xl flex gap-3 items-center text-xs">
                  <div className="bg-[#D4AF37] text-[#0A192F] p-2 rounded-xl text-center text-[10px] font-black shrink-0">
                    SURAT
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">Direct Althan Center Landmark</p>
                    <p className="text-slate-500 text-[11px] mt-0.5">Located at 2nd Floor, Siddhi Vinayak Arcade, opposite Althan Community Hall, Surat.</p>
                  </div>
                </div>
              )}

              {/* Materials segment */}
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-black text-slate-400 font-mono tracking-widest block">Batch Inclusions & Pre-requisites</span>
                <ul className="text-xs text-slate-600 space-y-1 text-left list-disc list-inside">
                  <li>Original math/science homework ledger notebook must be carried.</li>
                  <li>Complementary test series worksheet copies are downloadable at the classroom doors.</li>
                  <li>High-definition recorded playback remains accessible on the VAC Student Portal within 4 hours.</li>
                </ul>
              </div>

            </div>

            {/* Modal Actions */}
            <div className="p-6 bg-slate-50 border-t border-slate-100 flex gap-3">
              <button
                onClick={() => setSelectedClass(null)}
                className="flex-1 py-3 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all cursor-pointer"
              >
                Close Details
              </button>
              
              <button
                onClick={() => {
                  handleToggleMySchedule(selectedClass.id);
                  setSelectedClass(null);
                }}
                className={`flex-1 py-3 text-xs font-bold rounded-xl transition-all shadow-md cursor-pointer ${
                  mySchedule.includes(selectedClass.id)
                    ? 'bg-red-50 hover:bg-red-100 text-red-600 border border-red-200'
                    : 'bg-[#0A192F] hover:bg-slate-900 text-white'
                }`}
              >
                {mySchedule.includes(selectedClass.id) ? 'Deregister Seat' : 'Register Secure Seat'}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Propose/Create Extra Batch Session Form (Absolute Dialog) */}
      {showExtraSessionForm && (
        <div id="extra-session-dialog" className="fixed inset-0 z-50 bg-[#0A192F]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full overflow-hidden border border-slate-100 shadow-2xl flex flex-col max-h-[92vh]">
            
            {/* Dialog Header */}
            <div className="p-6 bg-[#0A192F] text-white flex justify-between items-center">
              <div>
                <h2 className="text-xl font-display font-extrabold tracking-tight">
                  Arrange Extra Lecture Slot
                </h2>
                <p className="text-xs text-slate-300 mt-0.5">
                  Authorize and propose emergency, doubt, or feedback batches for the Surat centre.
                </p>
              </div>
              
              <button 
                onClick={() => setShowExtraSessionForm(false)}
                className="text-slate-400 hover:text-white bg-white/10 hover:bg-white/15 p-1.5 rounded-full cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Dialog Form */}
            <form onSubmit={handleCreateClass} className="p-6 overflow-y-auto space-y-4 text-xs text-slate-700 flex-1">
              
              <div className="grid grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Subject Stream
                  </label>
                  <select
                    value={newStream}
                    onChange={(e) => setNewStream(e.target.value as any)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:ring-1 focus:ring-[#D4AF37]"
                  >
                    <option value="Science">Science (JEE/NEET)</option>
                    <option value="Commerce">Commerce (CA Foundation)</option>
                    <option value="Foundation">Class 9/10 Foundation</option>
                    <option value="VisionPreneur">VisionPreneur Track</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Grade Target
                  </label>
                  <select
                    value={newGrade}
                    onChange={(e) => setNewGrade(e.target.value as any)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:ring-1 focus:ring-[#D4AF37]"
                  >
                    <option value="Class 12">Class 12</option>
                    <option value="Class 11">Class 11</option>
                    <option value="Class 10">Class 10</option>
                    <option value="Class 9">Class 9</option>
                    <option value="All">All Batches</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Subject Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Physics Double Refraction"
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Class Room & Campus Location
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Room 102 (Althan Campus, Surat)"
                  value={newRoom}
                  onChange={(e) => setNewRoom(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Full Session Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Class 12 Boards Mock Examination Correction"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Select Day
                  </label>
                  <select
                    value={newDay}
                    onChange={(e) => setNewDay(e.target.value as any)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none text-slate-950 focus:ring-1 focus:ring-[#D4AF37]"
                  >
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                    <option value="Sunday">Sunday</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Start Time
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 14:00"
                    value={newStart}
                    onChange={(e) => setNewStart(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    End Time
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 15:30"
                    value={newEnd}
                    onChange={(e) => setNewEnd(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Delivery Mode
                  </label>
                  <select
                    value={newFormat}
                    onChange={(e) => setNewFormat(e.target.value as any)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none text-slate-950"
                  >
                    <option value="Offline">Offline At Campus</option>
                    <option value="Online">Online Livestream</option>
                    <option value="Hybrid">Hybrid Broadcast</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Allotted Seat Capacity
                  </label>
                  <input
                    type="number"
                    value={newCapacity}
                    onChange={(e) => setNewCapacity(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Responsible Instructor / Mentor
                </label>
                <select
                  value={newTeacher}
                  onChange={(e) => setNewTeacher(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900"
                >
                  <option value="Vaibhav Agarwal (Founder)">Vaibhav Agarwal (Founder)</option>
                  <option value="Prof. S.K. Verma">Prof. S.K. Verma (Physics Lead)</option>
                  <option value="Prof. Rajesh Mehta">Prof. Rajesh Mehta (Math & Chem)</option>
                  <option value="Prof. Amrita Rao">Prof. Amrita Rao (Law & Biology)</option>
                  <option value="Dr. Neha Gajiwala">Dr. Neha Gajiwala (Surat Org Lead)</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Topic Description & Preparation Prerequisites (Optional)
                </label>
                <textarea
                  placeholder="Include specific formulas, homework chapters reference, and instructions..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-1 focus:ring-[#D4AF37] focus:outline-none resize-none"
                />
              </div>

              {/* Action Buttons inside footer box */}
              <div className="pt-4 border-t border-slate-100 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowExtraSessionForm(false)}
                  className="flex-1 py-3 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-700 font-bold rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-[#0A192F] hover:bg-slate-900 text-white font-bold rounded-xl transition-all shadow-md"
                >
                  Publish Session
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* Master Batch Schedule Section for Class 1 to 12 */}
      <section className="bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 font-sans rounded-3xl border border-slate-200/50 mt-12" id="master-batch-class-schedules">
        <div className="max-w-6xl mx-auto">
          
          {/* Header Block */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
              Academic Timelines
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-3 tracking-tight">
              Class 1–12 Master Batch Schedules
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Carefully synchronized batches to ensure rigorous personal tracking, conceptual depth, and stress-free school balancing.
            </p>
          </div>

          {/* Schedule Cards Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Tier 1: Class 1 to 5 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] uppercase tracking-wider font-bold bg-blue-50 text-blue-600 px-2.5 py-1 rounded">Primary Tier</span>
                  <span className="text-xs font-mono text-slate-400 font-bold">3 Days / Wk</span>
                </div>
                <h3 className="text-base font-black text-slate-900">Class 1 to 5 Foundations</h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Eliminating mathematics anxiety early using physical visuals, number-based logic games, and language comprehension drills.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center">
                <div>
                  <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Time Slot</span>
                  <strong className="text-xs font-mono text-slate-900">04:00 PM - 05:30 PM</strong>
                </div>
                <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">MWF</span>
              </div>
            </div>

            {/* Tier 2: Class 6 to 8 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] uppercase tracking-wider font-bold bg-amber-50 text-amber-600 px-2.5 py-1 rounded">Middle Tier</span>
                  <span className="text-xs font-mono text-slate-400 font-bold">5 Days / Wk</span>
                </div>
                <h3 className="text-base font-black text-slate-900">Class 6 to 8 Core</h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Transitioning students smoothly from basic memorization into deep analytical thinking across structural algebra and daily science fundamentals.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center">
                <div>
                  <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Time Slot</span>
                  <strong className="text-xs font-mono text-slate-900">04:30 PM - 06:15 PM</strong>
                </div>
                <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">MON-FRI</span>
              </div>
            </div>

            {/* Tier 3: Class 9 & 10 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] uppercase tracking-wider font-bold bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded">High School</span>
                  <span className="text-xs font-mono text-slate-400 font-bold">6 Days / Wk</span>
                </div>
                <h3 className="text-base font-black text-slate-900">Class 9 & 10 Board Prep</h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Rigorous full syllabus mapping, intensive 100% textbook compliance, combined with customized mistake log tracking before official boards.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center">
                <div>
                  <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Time Slot</span>
                  <strong className="text-xs font-mono text-slate-900">05:00 PM - 07:00 PM</strong>
                </div>
                <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">MON-SAT</span>
              </div>
            </div>

            {/* Tier 4: Class 11 & 12 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] uppercase tracking-wider font-bold bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded">Senior Higher</span>
                  <span className="text-xs font-mono text-slate-400 font-bold">6 Days / Wk</span>
                </div>
                <h3 className="text-base font-black text-slate-900">Class 11 & 12 Academics</h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Advanced academic streaming with absolute focus on double-entry corporate Accountancy ledger structures, complex physics derivations, and calculus tracking.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center">
                <div>
                  <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Time Slot</span>
                  <strong className="text-xs font-mono text-slate-900">04:00 PM - 07:30 PM</strong>
                </div>
                <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">MON-SAT</span>
              </div>
            </div>

          </div>

          {/* Campus Address Footer Callout */}
          <div className="mt-12 text-center text-xs text-slate-400 border-t border-slate-200/60 pt-6">
            📍 <strong>Campus Location:</strong> Office No. 101-102, JMD Excellence Business Space Hub, Bhimrad-Althan Road, Surat - 395017.
          </div>

        </div>
      </section>

    </div>
  );
};
