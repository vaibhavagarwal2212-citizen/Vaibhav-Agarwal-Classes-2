import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, User, Users, GraduationCap, Sparkles, Bot, Clock } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: string;
}

export const AssistantWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userRole, setUserRole] = useState<'student' | 'parent' | 'teacher'>('student');
  const [messages, setMessages] = useState<Record<'student' | 'parent' | 'teacher', Message[]>>({
    student: [
      { 
        id: 'init-st', 
        text: "Hello! I am 'The Concept Coach' for Vaibhav Agarwal Classes. Let's make this term smooth! Tell me what concept is challenging you today, and we'll break it down together step-by-step with helpful metaphors and stress-free advice.", 
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ],
    parent: [
      { 
        id: 'init-pt', 
        text: "Greetings. I am 'The Transparency Partner' for Vaibhav Agarwal Classes. I can help resolve any anxieties regarding curriculum tracking, fee updates, safety, or mock test results. Ask how our Saturday micro-testing system and Althan Campus tracking desk elevate your child's success!", 
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ],
    teacher: [
      { 
        id: 'init-tc', 
        text: "Welcome, Instructor. As 'The Teacher's Copilot', I'm here to optimize your workload. Feel free to ask me to craft board-exam pattern questions, plan complex syllabus structures, or suggest custom student remediation frameworks.", 
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]
  });
  
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages or typing state updates
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen, userRole]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const query = inputMessage.trim();
    if (!query) return;

    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: Message = {
      id: `msg-${Date.now()}`,
      text: query,
      sender: 'user',
      timestamp: timeString
    };

    // Prepend user message in the active tab history
    setMessages(prev => ({
      ...prev,
      [userRole]: [...prev[userRole], userMsg]
    }));

    setInputMessage('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/assistant/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query, role: userRole })
      });
      
      const data = await response.json();
      
      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        text: data.reply || "I apologize, I wasn't able to process that correctly. Let's try again.",
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => ({
        ...prev,
        [userRole]: [...prev[userRole], aiMsg]
      }));
    } catch (err) {
      console.error("AI chat assistant fail:", err);
      const errMsg: Message = {
        id: `err-${Date.now()}`,
        text: "I am having temporary trouble connecting to the VAC artificial intelligence core servers. Please check your network and retry.",
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => ({
        ...prev,
        [userRole]: [...prev[userRole], errMsg]
      }));
    } finally {
      setIsTyping(false);
    }
  };

  const getRoleIcon = (role: 'student' | 'parent' | 'teacher') => {
    switch (role) {
      case 'student': return <GraduationCap className="w-3.5 h-3.5" />;
      case 'parent': return <Users className="w-3.5 h-3.5" />;
      case 'teacher': return <User className="w-3.5 h-3.5" />;
    }
  };

  const activeHistory = messages[userRole];

  return (
    <div id="vac-ai-assistant-root" className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[99999] font-sans text-slate-100">
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            key="chat-trigger-btn"
            id="chat-trigger-button"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="bg-[#0A192F] hover:bg-[#112240] text-[#D4AF37] border-2 border-[#D4AF37]/80 p-4 rounded-full shadow-2xl transition-all duration-200 flex items-center justify-center cursor-pointer group relative"
            title="Ask VAC Intelligent AI Guide"
          >
            <Bot className="w-6 h-6 group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#D4AF37]"></span>
            </span>
          </motion.button>
        )}

        {isOpen && (
          <motion.div
            key="chat-panel-container"
            id="chat-panel-container"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: 'spring', damping: 20, stiffness: 260 }}
            className="w-[320px] sm:w-[410px] h-[580px] max-h-[calc(100vh-40px)] bg-[#0c1524] rounded-2xl border border-slate-800 shadow-2xl flex flex-col overflow-hidden text-sm transition-all duration-200"
          >
            {/* Header Layout */}
            <div className="bg-[#0A192F] p-4 text-white flex justify-between items-center border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
                  <Sparkles className="w-4 h-4 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-extrabold text-xs uppercase tracking-wider text-[#D4AF37] leading-none">VAC Intelligent Advisor</h3>
                  <p className="text-[10px] text-slate-400 mt-1 font-mono">Class 1-12 Responsive Core</p>
                </div>
              </div>
              {/* FIXED: Re-styled Close (Cut) Button with clear padding and structural visibility weights */}
              <button 
                onClick={() => setIsOpen(false)} 
                type="button"
                aria-label="Close Assistant"
                className="p-2 -mr-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Persona Indicator & Role Switch Tab */}
            <div className="bg-[#0c1524]/60 border-b border-slate-800 p-2">
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2 text-center">
                Configure Assistant Persona Profile
              </p>
              <div className="grid grid-cols-3 gap-1.5 px-1">
                {(['student', 'parent', 'teacher'] as const).map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setUserRole(role)}
                    className={`text-[10.5px] uppercase font-bold py-1.5 px-2 rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer border ${
                      userRole === role 
                        ? 'bg-[#D4AF37] text-[#0A192F] font-extrabold border-[#D4AF37] shadow-md' 
                        : 'bg-[#112240]/40 text-slate-400 hover:text-white border-slate-800 hover:bg-[#112240]/80'
                    }`}
                  >
                    {getRoleIcon(role)}
                    <span>{role}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Message Tray Viewport */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-950/40">
              {activeHistory.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className={`text-xs px-3.5 py-2.5 rounded-2xl shadow-sm leading-relaxed ${
                      msg.sender === 'user' 
                        ? 'bg-[#112240] text-slate-100 rounded-br-none border border-slate-800' 
                        : 'bg-[#0A192F]/85 text-slate-200 border border-slate-800/80 rounded-bl-none'
                    }`}>
                      {msg.text}
                    </div>
                    <span className="text-[9px] text-slate-500 font-mono mt-0.5 px-1 flex items-center gap-0.5">
                      <Clock className="w-2.5 h-2.5 text-slate-600" />
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))}
              
              {/* Animated Bot Typing Loader */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-[#0A192F] border border-slate-800 px-4 py-3 rounded-2xl rounded-bl-none shadow-sm flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Form actions panel footer */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-800 flex gap-2 bg-[#0A192F]">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={`Ask as ${userRole}... (e.g., Althan timings, syllabus, tips)`}
                className="flex-1 bg-[#020817] border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37] placeholder-slate-500 font-sans"
              />
              <button 
                type="submit" 
                className="bg-[#D4AF37] hover:bg-[#bfa032] text-[#0A192F] font-bold p-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center self-center"
                title="Send message to AI Guide"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Micro disclaimer note targeting branding */}
            <div className="bg-[#020817] py-1.5 px-3 border-t border-slate-900 text-center text-[9px] font-mono text-slate-500 uppercase tracking-widest flex items-center justify-between">
              <span>Althan AI Node (A_ID: 104)</span>
              <span>Online Handshake</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
