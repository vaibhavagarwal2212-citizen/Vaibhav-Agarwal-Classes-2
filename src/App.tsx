/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/// <reference types="react" />
/// <reference types="react/jsx-runtime" />

import React, { useState, useEffect } from 'react';
import { LandingPage } from './components/LandingPage';
import { RegistrationForm } from './components/RegistrationForm';
import { LoginPortal } from './components/LoginPortal';
import { AdminDashboard } from './components/AdminDashboard';
import { BatchSchedule } from './components/BatchSchedule';
import { AttendanceTerminal } from './components/AttendanceTerminal';
import { AssistantWidget } from './components/AssistantWidget';
import { Student } from './types';
import { INITIAL_STUDENTS } from './data';
import { Compass, GraduationCap, Users, UserCheck, Moon, Sun, Laptop } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProtectedRouteProps {
  isAuthorized: boolean;
  onRedirect: () => void;
  children: React.ReactNode;
}

function ProtectedRoute({ isAuthorized, onRedirect, children }: ProtectedRouteProps) {
  useEffect(() => {
    if (!isAuthorized) {
      alert("Access Denied: You must be logged in as a Teacher (Faculty)/Director to view the Admin Control Center.");
      onRedirect();
    }
  }, [isAuthorized, onRedirect]);

  if (!isAuthorized) {
    return <h1>NOT AUTHORIZED</h1>;
  }

  return <>{children}</>;
}

export default function App() {
  const [view, setView] = useState<'landing' | 'register' | 'login' | 'admin' | 'schedule' | 'terminal'>('landing');
  const [students, setStudents] = useState<Student[]>(() => {
    // Attempt local storage sync for added persistency value!
    const stored = localStorage.getItem('vac_students_data');
    return stored ? JSON.parse(stored) : INITIAL_STUDENTS;
  });

  const [isTeacherLoggedIn, setIsTeacherLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('vac_teacher_logged_in') === 'true';
  });

  const handleSetTeacherLoggedIn = (val: boolean) => {
    setIsTeacherLoggedIn(val);
    if (val) {
      localStorage.setItem('vac_teacher_logged_in', 'true');
    } else {
      localStorage.removeItem('vac_teacher_logged_in');
    }
  };

  const [darkMode, setDarkMode] = useState(false);

  // Synchronize student data state directly with local storage
  useEffect(() => {
    localStorage.setItem('vac_students_data', JSON.stringify(students));
  }, [students]);

  // Handler functions for global live sync
  const handleAddStudent = (newStudent: Student) => {
    setStudents((prev) => [newStudent, ...prev]);
  };

  const handleRemoveStudent = (id: string) => {
    if (confirm(`Are you certain you wish to expel/remove scholarship ID ${id} from VAC active database registers?`)) {
      setStudents((prev) => prev.filter((s) => s.id !== id));
    }
  };

  const handleUpdateStudentAttendance = (id: string, newRate: number) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, attendanceRate: newRate } : s))
    );
  };

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-[#FAF9F6] text-slate-800'}`}>
      
      {/* Primary Global Navigation Header */}
      <header className="sticky top-0 z-40 bg-[#0A192F] text-white border-b border-white/5 backdrop-blur-md bg-opacity-95 shadow-md py-3.5 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          {/* Brand Logo */}
          <div
            onClick={() => setView('landing')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="bg-[#D4AF37] text-[#0A192F] font-mono font-black text-xs px-2.5 py-1 rounded transition-all group-hover:scale-105">
              VAC
            </div>
            <div>
              <span className="font-display font-black text-sm tracking-tight text-white uppercase block leading-tight">
                Vaibhav Agarwal Classes
              </span>
              <span className="text-[9px] font-mono tracking-widest text-[#D4AF37] uppercase block mt-0.5">
                Surat Coaching Academy
              </span>
            </div>
          </div>

          {/* Tab Selection Navigation */}
          <nav className="hidden md:flex gap-1 items-center bg-white/5 p-1 rounded-xl border border-white/10 text-xs">
            <button
              onClick={() => setView('landing')}
              className={`px-4.5 py-1.5 rounded-lg font-display font-medium transition-all cursor-pointer ${
                view === 'landing' ? 'bg-[#D4AF37] text-[#0A192F] font-bold shadow-sm' : 'text-slate-300 hover:text-white'
              }`}
            >
              Academic Home
            </button>
            <button
              onClick={() => setView('schedule')}
              className={`px-4.5 py-1.5 rounded-lg font-display font-medium transition-all cursor-pointer ${
                view === 'schedule' ? 'bg-[#D4AF37] text-[#0A192F] font-bold shadow-sm' : 'text-slate-300 hover:text-white'
              }`}
            >
              Batch Schedule
            </button>
            <button
              onClick={() => setView('register')}
              className={`px-4.5 py-1.5 rounded-lg font-display font-medium transition-all cursor-pointer ${
                view === 'register' ? 'bg-[#D4AF37] text-[#0A192F] font-bold shadow-sm' : 'text-slate-300 hover:text-white'
              }`}
            >
              Enroll Track
            </button>
            <button
              onClick={() => setView('login')}
              className={`px-4.5 py-1.5 rounded-lg font-display font-medium transition-all cursor-pointer ${
                view === 'login' ? 'bg-[#D4AF37] text-[#0A192F] font-bold shadow-sm' : 'text-slate-300 hover:text-white'
              }`}
            >
              Access Portal
            </button>
            <button
              onClick={() => setView('terminal')}
              className={`px-4.5 py-1.5 rounded-lg font-display font-medium transition-all cursor-pointer ${
                view === 'terminal' ? 'bg-[#D4AF37] text-[#0A192F] font-bold shadow-sm' : 'text-slate-300 hover:text-white'
              }`}
            >
              Gate Terminal
            </button>
            <button
              onClick={() => setView('admin')}
              className={`px-4.5 py-1.5 rounded-lg font-display font-medium transition-all cursor-pointer ${
                view === 'admin' ? 'bg-[#D4AF37] text-[#0A192F] font-bold shadow-sm' : 'text-slate-300 hover:text-white'
              }`}
            >
              Admin Control Center
            </button>
          </nav>

          {/* Quick Action elements */}
          <div className="flex gap-2.5 items-center">
            
    
            <button
              onClick={() => setView('register')}
              className="hidden lg:flex px-4 py-2 bg-[#D4AF37] hover:bg-[#AA7C11] text-[#0A192F] font-display font-bold text-xs tracking-wide rounded-xl shadow-md transition-all active:scale-98 cursor-pointer"
            >
              Book Free Trial
            </button>

            {/* Hamburger fallback text indicator for mobile */}
            <div className="md:hidden flex gap-1.5 text-[11px] font-mono text-slate-300 font-semibold uppercase bg-white/5 py-1 px-2.5 rounded border border-white/10">
              <button onClick={() => setView('landing')} className="hover:text-brand-gold">Home</button>
              <span>•</span>
              <button onClick={() => setView('schedule')} className="hover:text-brand-gold">Schedule</button>
              <span>•</span>
              <button onClick={() => setView('register')} className="hover:text-brand-gold">Enroll</button>
              <span>•</span>
              <button onClick={() => setView('terminal')} className="hover:text-brand-gold">Terminal</button>
              <span>•</span>
              <button onClick={() => setView('admin')} className="hover:text-brand-gold">Admin</button>
            </div>

          </div>

        </div>
      </header>

      {/* Main View routing implementation */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15, ease: 'easeInOut' }}
            className="w-full h-full"
          >
            {view === 'landing' && <LandingPage onNavigate={setView} />}
            {view === 'schedule' && <BatchSchedule />}
            {view === 'register' && (
              <RegistrationForm onRegisterStudent={handleAddStudent} onNavigate={setView} />
            )}
            {view === 'login' && (
              <LoginPortal
                onNavigate={setView}
                students={students}
                isTeacherLoggedIn={isTeacherLoggedIn}
                setIsTeacherLoggedIn={handleSetTeacherLoggedIn}
              />
            )}
            {view === 'terminal' && (
              <AttendanceTerminal
                students={students}
                onUpdateStudentAttendance={handleUpdateStudentAttendance}
              />
            )}
            {view === 'admin' && (
              <ProtectedRoute isAuthorized={isTeacherLoggedIn} onRedirect={() => setView('login')}>
                <AdminDashboard
                  students={students}
                  onRemoveStudent={handleRemoveStudent}
                  onAddStudent={handleAddStudent}
                  onUpdateStudentAttendance={handleUpdateStudentAttendance}
                  onNavigate={setView}
                />
              </ProtectedRoute>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Floating Dynamic AI Assistant Advisor Widget */}
      <AssistantWidget />
    </div>
  );
}

