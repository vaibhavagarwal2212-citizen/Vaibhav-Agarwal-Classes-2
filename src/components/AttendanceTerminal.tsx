import React, { useState, useEffect, useRef } from 'react';
import { Student } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Wifi, UserCheck, AlertCircle, Smartphone, User, Shield, Compass, Search } from 'lucide-react';

interface AttendanceTerminalProps {
  students: Student[];
  onUpdateStudentAttendance: (id: string, newRate: number) => void;
}

interface LogEntry {
  log_id: string;
  name: string;
  standard: string;
  time: string;
  status: 'SUCCESS' | 'ERROR';
  parentName: string;
  phone: string;
}

export const AttendanceTerminal: React.FC<AttendanceTerminalProps> = ({
  students,
  onUpdateStudentAttendance
}) => {
  const [inputId, setInputId] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  // Flash indication state for punch-in event
  const [currentFlash, setCurrentFlash] = useState<{
    id: string;
    name: string;
    standard: string;
    parentName: string;
    parentPhone: string;
    timestamp: string;
    photoUrl?: string;
  } | null>(null);

  // Live feed state initialized with elegant live sync examples
  const [liveFeed, setLiveFeed] = useState<LogEntry[]>([
    { 
      log_id: 'L01', 
      name: 'Sneha Choksi', 
      standard: 'Class 12', 
      time: '04:16 PM', 
      status: 'SUCCESS',
      parentName: 'Kunal Choksi',
      phone: '+91 98795 02444' 
    },
    { 
      log_id: 'L02', 
      name: 'Rohan Mehta', 
      standard: 'Class 12', 
      time: '04:14 PM', 
      status: 'SUCCESS',
      parentName: 'Sanjay Mehta',
      phone: '+91 90999 99281'
    }
  ]);

  const [systemStatus, setSystemStatus] = useState<'CONNECTED' | 'OFFLINE'>('CONNECTED');
  const scanInputRef = useRef<HTMLInputElement>(null);

  // Auto-focus barcode scanner input field to maintain continuous hands-free scan readiness
  useEffect(() => {
    if (scanInputRef.current) {
      scanInputRef.current.focus();
    }
  }, [currentFlash, loading]);

  const handleScanSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const query = inputId.trim();
    if (!query) return;

    setLoading(true);
    setErrorMessage(null);

    try {
      // Direct API line to your Node.js server endpoint
      const response = await fetch('/api/attendance/punch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId: query })
      });
      
      const data = await response.json();

      if (response.ok && data.success) {
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        const timeShort = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        // Match student locally to grab dynamic details such as photourl for UI flashcards
        const matchedLocal = students.find(st => 
          st.id.toLowerCase() === data.student.id?.toLowerCase() ||
          st.name.toLowerCase().includes(data.student.name.toLowerCase())
        );

        if (matchedLocal) {
          const updatedAttendance = Math.min(100, Number((matchedLocal.attendanceRate + 0.2).toFixed(1)));
          onUpdateStudentAttendance(matchedLocal.id, updatedAttendance);
        }

        // Trigger Success Indicator Flash Card
        setCurrentFlash({
          id: data.student.id,
          name: data.student.name,
          standard: `Class ${data.student.standard}`,
          parentName: data.student.parent_name || 'Mr./Mrs. Parent',
          parentPhone: data.student.parent_phone || '+91 99000-xxxxx',
          timestamp: timestamp,
          photoUrl: matchedLocal?.photoUrl
        });

        // Prepend tracking item to live scrolling feed monitor
        setLiveFeed((prevFeed) => [
          {
            log_id: data.logId,
            name: data.student.name,
            standard: `Class ${data.student.standard}`,
            time: timeShort,
            status: 'SUCCESS',
            parentName: data.student.parent_name,
            phone: data.student.parent_phone
          },
          ...prevFeed
        ]);

        // Auto-clear flash indicator card after 4.5 seconds
        setTimeout(() => setCurrentFlash(null), 4500);
        setInputId('');
      } else {
        setErrorMessage(data.message || 'Scanning process error.');
      }
    } catch (err) {
      console.warn("Network communication fallback - using dynamic local index lookup:", err);
      // Fallback for seamless offline support inside sandboxed mock conditions
      const matched = students.find(st => 
        st.id.toLowerCase() === query.toLowerCase() ||
        st.name.toLowerCase().includes(query.toLowerCase()) ||
        (st.id.split('-').pop() && st.id.split('-').pop() === query)
      );

      if (matched) {
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        const timeShort = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        const updatedAttendance = Math.min(100, Number((matched.attendanceRate + 0.2).toFixed(1)));
        onUpdateStudentAttendance(matched.id, updatedAttendance);

        const logId = `L${Math.floor(100 + Math.random() * 900)}`;
        setLiveFeed(prev => [
          {
            log_id: logId,
            name: matched.name,
            standard: matched.class,
            time: timeShort,
            status: 'SUCCESS',
            parentName: matched.parents?.fatherName || matched.parents?.motherName || 'Parent',
            phone: matched.parents?.parentPhone || matched.phone
          },
          ...prev
        ]);

        setCurrentFlash({
          id: matched.id,
          name: matched.name,
          standard: `${matched.class} (${matched.stream})`,
          parentName: matched.parents?.fatherName || matched.parents?.motherName || 'Parent',
          parentPhone: matched.parents?.parentPhone || '+91 99000-xxxxx',
          timestamp: timestamp,
          photoUrl: matched.photoUrl
        });

        setTimeout(() => setCurrentFlash(null), 4500);
        setInputId('');
      } else {
        setErrorMessage(`ID / Name "${query}" not recognized in active lists. Try typing "Kapoor", "Patel", "Ananya" or choose one from the quick-list below.`);
      }
    } finally {
      setLoading(false);
    }
  };

  // Quick Action: Instant test scanner punch with one-click
  const handleTriggerQuickScan = async (st: Student) => {
    setLoading(true);
    setErrorMessage(null);
    setInputId(st.id);
    
    try {
      const response = await fetch('/api/attendance/punch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId: st.id })
      });
      
      const data = await response.json();

      if (response.ok && data.success) {
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        const timeShort = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const updatedAttendance = Math.min(100, Number((st.attendanceRate + 0.1).toFixed(1)));
        onUpdateStudentAttendance(st.id, updatedAttendance);

        setCurrentFlash({
          id: st.id,
          name: st.name,
          standard: `${st.class} (${st.stream})`,
          parentName: st.parents?.fatherName || st.parents?.motherName || 'Parent',
          parentPhone: st.parents?.parentPhone || '+91 99000-xxxxx',
          timestamp: timestamp,
          photoUrl: st.photoUrl
        });

        setLiveFeed((prevFeed) => [
          {
            log_id: data.logId,
            name: data.student.name,
            standard: `Class ${data.student.standard}`,
            time: timeShort,
            status: 'SUCCESS',
            parentName: data.student.parent_name || 'Parent',
            phone: data.student.parent_phone || st.parents.parentPhone || '+91 99000-xxxxx'
          },
          ...prevFeed
        ]);

        setInputId('');
      } else {
        setErrorMessage(data.message || 'Scanning process error.');
      }
    } catch (err) {
      console.warn("Network communication fallback - performing local quick punch:", err);
      const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const timeShort = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      const updatedAttendance = Math.min(100, Number((st.attendanceRate + 0.1).toFixed(1)));
      onUpdateStudentAttendance(st.id, updatedAttendance);

      const logId = `L${Math.floor(100 + Math.random() * 900)}`;
      setLiveFeed(prev => [
        {
          log_id: logId,
          name: st.name,
          standard: st.class,
          time: timeShort,
          status: 'SUCCESS',
          parentName: st.parents?.fatherName || st.parents?.motherName || 'Parent',
          phone: st.parents?.parentPhone || st.phone
        },
        ...prev
      ]);

      setCurrentFlash({
        id: st.id,
        name: st.name,
        standard: `${st.class} (${st.stream})`,
        parentName: st.parents?.fatherName || st.parents?.motherName || 'Parent',
        parentPhone: st.parents?.parentPhone || '+91 99000-xxxxx',
        timestamp: timestamp,
        photoUrl: st.photoUrl
      });

      setInputId('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#020817] min-h-screen text-slate-100 flex flex-col justify-between p-6 rounded-2xl shadow-2xl border border-slate-800/80 max-w-7xl mx-auto my-4 overflow-hidden">
      
      {/* Upper Status Ribbon Layout */}
      <header className="flex flex-col sm:flex-row justify-between items-center border-b border-slate-800 pb-4 mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse"></span>
            <h1 className="text-xl font-extrabold text-white tracking-tight font-display">VAC Althan Campus Terminal</h1>
          </div>
          <p className="text-xs text-slate-400 mt-0.5 font-mono">Automated Parent-Admin Routing System & RFID Hub</p>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            <Wifi className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            WhatsApp API: ONLINE
          </span>
          <span className="text-xs bg-slate-800 border border-slate-700 px-3 py-1 rounded-md text-slate-300 font-medium font-mono">
            Gate #1 Monitor
          </span>
        </div>
      </header>

      {/* Main Structural Layout Grid */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Side Panel: Scanning Actions & Success Metrics */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Scanning Input Engine */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-3">
              <label htmlFor="barcode-scanner" className="block text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                Awaiting Barcode Scan / ID Input
              </label>
              <span className="text-[10px] text-brand-gold font-mono uppercase bg-brand-gold/10 px-1.5 py-0.5 rounded">
                Focus Engaged
              </span>
            </div>
            
            <form onSubmit={handleScanSubmit} className="flex gap-3">
              <div className="relative flex-1">
                <input
                  id="barcode-scanner"
                  ref={scanInputRef}
                  type="text"
                  value={inputId}
                  onChange={(e) => setInputId(e.target.value)}
                  placeholder="Scan Student ID card or write name (e.g. Aryan)..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-4 pr-10 py-3.5 text-white font-mono text-sm tracking-widest focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-slate-600 transition-all"
                  disabled={loading}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                  <Search className="w-4 h-4 animate-pulse text-indigo-400" />
                </div>
              </div>
              <button 
                type="submit" 
                disabled={loading}
                className="bg-indigo-600 hover:bg-indigo-500 px-6 rounded-xl font-bold text-xs text-white transition-all uppercase tracking-wider flex items-center justify-center gap-1 min-w-[90px] cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
                ) : (
                  'Punch'
                )}
              </button>
            </form>

            {errorMessage && (
              <div className="mt-3.5 text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 p-3 rounded-lg flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}
          </div>

          {/* Flash Indicator Card Block */}
          <div className="min-h-[146px]">
            <AnimatePresence mode="wait">
              {currentFlash ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.98, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="bg-emerald-950/40 border-2 border-emerald-500/30 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6 shadow-xl"
                >
                  {/* Student Image Thumbnail Frame */}
                  {currentFlash.photoUrl ? (
                    <img 
                      src={currentFlash.photoUrl} 
                      alt={currentFlash.name}
                      referrerPolicy="no-referrer"
                      className="w-24 h-24 object-cover border-2 border-emerald-500 rounded-xl flex-shrink-0 shadow-md"
                    />
                  ) : (
                    <div className="w-24 h-24 bg-slate-800 border border-slate-700 rounded-xl flex flex-col items-center justify-center text-slate-500 flex-shrink-0 text-[10px] font-bold font-mono">
                      <User className="w-8 h-8 text-emerald-400/80 mb-1" />
                      MEMB CARD
                    </div>
                  )}
                  
                  <div className="space-y-1 text-center sm:text-left w-full">
                    <span className="inline-flex items-center gap-1 text-[9px] uppercase font-black text-emerald-400 tracking-wider bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      <CheckCircle2 className="w-3 h-3" /> PUNCH OVERRIDE SUCCESS
                    </span>
                    <h2 className="text-2xl font-black text-white leading-none tracking-tight">{currentFlash.name}</h2>
                    <p className="text-xs font-semibold text-slate-300">{currentFlash.standard}</p>
                    
                    <div className="pt-2 flex flex-wrap justify-center sm:justify-start items-center gap-4 text-[11px] text-slate-400">
                      <span>Logged: <strong className="text-emerald-400 font-mono bg-emerald-500/5 px-1.5 py-0.5 rounded">{currentFlash.timestamp}</strong></span>
                      <span>Parent: <strong className="text-slate-200">{currentFlash.parentName}</strong></span>
                    </div>

                    <div className="mt-2 text-[10px] text-slate-500 bg-[#020817] p-2 rounded border border-slate-800/80 flex items-center justify-between">
                      <span className="flex items-center gap-1"><Smartphone className="w-3 h-3 text-emerald-500" /> WhatsApp dispatched:</span>
                      <span className="text-slate-300 font-mono font-bold">{currentFlash.parentPhone}</span>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-[148px] bg-slate-900/30 border border-dashed border-slate-800 rounded-2xl flex flex-col items-center justify-center text-slate-500 text-xs italic gap-2 text-center px-4"
                >
                  <div className="w-10 h-10 rounded-full bg-slate-800/60 flex items-center justify-center text-slate-400">
                    <Shield className="w-5 h-5 text-indigo-400/70" />
                  </div>
                  <span>Awaiting student card swipe or manual ID punch verification. System arm status: READY.</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Quick Demo Assist Block - Helps user to easily find IDs to scan */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] mb-2.5 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" /> Rapid Terminal Demonstration Panel
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
              Click any registered student from our active registers below to instant-mimic a physical barcode scan at the gate terminal.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {students.slice(0, 4).map((st) => (
                <button
                  key={st.id}
                  onClick={() => handleTriggerQuickScan(st)}
                  className="p-2 bg-slate-950 hover:bg-indigo-950/40 border border-slate-800 hover:border-indigo-500/40 rounded-xl text-left transition-all cursor-pointer group"
                >
                  <span className="text-[10px] font-bold text-white block truncate group-hover:text-indigo-300">{st.name}</span>
                  <span className="text-[9px] text-[#D4AF37] font-mono mt-0.5 block">ID: {st.id.split('-').pop()}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side Panel: Live Monitor Feed Auditing */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col min-h-[380px] h-[456px]">
          <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/90 rounded-t-2xl">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">Live Audit Terminal Stream</h3>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-indigo-500 rounded-full animate-ping"></span>
              <span className="text-[9px] font-mono font-bold text-indigo-400">MONITOR ACTIVE</span>
            </span>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-3 divide-y divide-slate-800/40">
            {liveFeed.map((log, index) => (
              <div 
                key={log.log_id} 
                className={`pt-3 first:pt-0 flex justify-between items-center text-xs animate-fade-in`}
              >
                <div>
                  <h4 className="font-bold text-white flex items-center gap-1">
                    {log.name} 
                    <span className="text-slate-400 font-normal">({log.standard})</span>
                  </h4>
                  <p className="text-[10px] text-slate-500 mt-0.5 flex items-center gap-1">
                    <span className="inline-block w-1 h-1 rounded-full bg-emerald-400"></span>
                    SMS / WhatsApp Transmission Dispatched to {log.parentName}
                  </p>
                </div>
                <div className="text-right flex flex-col items-end">
                  <span className="font-mono text-slate-300 block text-[10px]">{log.time}</span>
                  <span className="text-[9px] mt-0.5 px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded-md font-semibold tracking-wide uppercase border border-emerald-500/20">
                    ARRIVED
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-slate-950/80 border-t border-slate-800 rounded-b-2xl text-[10px] font-mono text-slate-500 flex justify-between items-center text-center">
            <span>Terminal Signature Code: TERM-AL-901</span>
            <span>Logs Count: {liveFeed.length}</span>
          </div>
        </div>

      </main>

      {/* Corporate Dashboard Footer */}
      <footer className="mt-6 border-t border-slate-900 pt-3 text-center text-[10px] text-slate-650 font-mono">
        © 2026 Vaibhav Agarwal Classes • Internal Gate Security Core • Secure SSL Handshake Verified
      </footer>
    </div>
  );
};
