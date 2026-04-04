import { motion, AnimatePresence } from "framer-motion";
import { Plus, MessageSquare, Trash2, Mountain, X, Home, Map, Compass, Route, Sparkles } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";

const navItems = [
  { id: "welcome", icon: Home, label: "الرئيسية" },
  { id: "map", icon: Map, label: "الخريطة" },
  { id: "discover", icon: Compass, label: "اكتشف" },
  { id: "planner", icon: Route, label: "رحلتك" },
];

const Sidebar = ({
  sessions,
  activeSessionId,
  currentView,
  onSelectSession,
  onNewChat,
  onDeleteSession,
  onNavigate,
  isOpen,
  onClose,
  isMobile,
}) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return "اليوم";
    if (diffDays === 1) return "أمس";
    if (diffDays < 7) return `منذ ${diffDays} أيام`;
    return date.toLocaleDateString("ar-KW", { month: "short", day: "numeric" });
  };

  return (
    <div className={`h-full flex flex-col ${isMobile ? 'bg-[#12100E]' : 'bg-[#12100E]/40 backdrop-blur-3xl'} border-r border-[#D4A574]/5`} data-testid="sidebar">
      {/* Header */}
      <div className="flex-shrink-0 p-6 strata-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{ rotate: 5, scale: 1.05 }}
              className="relative w-11 h-11 rounded-2xl gradient-premium flex items-center justify-center shadow-2xl glow-premium"
            >
              <Mountain size={22} className="text-[#12100E]" />
              <motion.div
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-2xl bg-white/20"
              />
            </motion.div>
            <div>
              <h1 className="text-xl font-black tracking-tight gradient-text-premium leading-none">جيوتور</h1>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4A574] animate-pulse" />
                <p className="text-[10px] font-bold text-[#D4A574]/60 uppercase tracking-widest">Geology Hub</p>
              </div>
            </div>
          </div>
          {isMobile && (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="p-2.5 rounded-2xl glass-button border-[#D4A574]/20"
            >
              <X size={20} className="text-[#D4A574]" />
            </motion.button>
          )}
        </div>
      </div>

      {/* Navigation - Only on Desktop */}
      {!isMobile && (
        <div className="flex-shrink-0 p-4">
          <div className="grid grid-cols-2 gap-2 relative">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate(item.id)}
                className={`relative flex items-center gap-2.5 px-4 py-3 rounded-2xl text-[13px] font-bold transition-all duration-300 z-10 ${currentView === item.id
                    ? "text-[#12100E]"
                    : "text-[#D4A574]/50 hover:text-[#D4A574]/80"
                  }`}
              >
                {currentView === item.id && (
                  <motion.div
                    layoutId="nav-bg"
                    className="absolute inset-0 gradient-premium rounded-2xl shadow-lg -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <item.icon size={18} className={currentView === item.id ? "text-[#12100E]" : "text-[#D4A574]/40"} />
                <span>{item.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* New Chat Button */}
      <div className="flex-shrink-0 p-4">
        <motion.button
          whileHover={{ y: -2, scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={onNewChat}
          className="w-full py-4 rounded-2xl bg-[#D4A574]/10 hover:bg-[#D4A574]/15 border border-[#D4A574]/20 text-[#D4A574] font-black text-sm flex items-center justify-center gap-3 transition-all shadow-xl group"
          data-testid="new-chat-button"
        >
          <div className="p-1.5 rounded-lg bg-[#D4A574]/20 group-hover:bg-[#D4A574]/30 transition-colors">
            <Plus size={18} />
          </div>
          محادثة جديدة
          <Sparkles size={14} className="opacity-40 animate-pulse" />
        </motion.button>
      </div>

      {/* Sessions List */}
      <ScrollArea className="flex-1 px-3">
        <div className="py-4 space-y-4">
          <div className="flex items-center justify-between px-3">
            <p className="text-[11px] text-[#D4A574]/40 font-black uppercase tracking-widest">سجل الاستكشاف</p>
            <div className="h-[1px] flex-1 bg-gradient-to-l from-[#D4A574]/20 to-transparent mr-4" />
          </div>

          <div className="space-y-2">
            <AnimatePresence mode="popLayout">
              {sessions.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="px-4 py-12 text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-3xl bg-[#D4A574]/5 flex items-center justify-center border border-[#D4A574]/10">
                    <MessageSquare size={24} className="text-[#D4A574]/20" />
                  </div>
                  <p className="text-sm font-bold text-[#D4A574]/40">ابدأ استكشافاً جديداً</p>
                  <p className="text-[10px] text-[#D4A574]/20 mt-1 max-w-[150px] mx-auto">ذكاء Gemini الاصطناعي جاهز لمساعدتك</p>
                </motion.div>
              ) : (
                sessions.slice(0, 25).map((session, index) => (
                  <motion.div
                    key={session.id}
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.03 }}
                    layout
                  >
                    <div
                      onClick={() => onSelectSession(session.id)}
                      className={`w-full px-4 py-3.5 rounded-2xl flex items-center gap-4 group cursor-pointer transition-all relative overflow-hidden backdrop-blur-sm ${activeSessionId === session.id
                          ? "bg-[#D4A574]/15 border border-[#D4A574]/30 shadow-inner"
                          : "hover:bg-[#D4A574]/5 border border-transparent hover:border-[#D4A574]/10"
                        }`}
                      data-testid={`session-item-${session.id}`}
                    >
                      {activeSessionId === session.id && (
                        <motion.div
                          layoutId="active-session-glow"
                          className="absolute inset-0 bg-gradient-to-r from-[#D4A574]/5 to-transparent pointer-events-none"
                        />
                      )}

                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${activeSessionId === session.id ? "bg-[#D4A574]/20" : "bg-[#D4A574]/5 group-hover:bg-[#D4A574]/10"
                        }`}>
                        <MessageSquare size={16} className={activeSessionId === session.id ? "text-[#D4A574]" : "text-[#D4A574]/40"} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-bold truncate leading-tight ${activeSessionId === session.id ? "text-[#F5E6D3]" : "text-[#F5E6D3]/60 group-hover:text-[#F5E6D3]/80"}`}>
                          {session.title || "استكشاف جيولوجي"}
                        </p>
                        <p className="text-[10px] font-medium text-[#D4A574]/30 mt-0.5">{formatDate(session.updated_at)}</p>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.1, backgroundColor: "rgba(184, 92, 56, 0.2)" }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteSession(session.id);
                        }}
                        className="opacity-0 group-hover:opacity-100 p-2 rounded-xl transition-all"
                      >
                        <Trash2 size={14} className="text-[#D4A574]/40 group-hover:text-[#B85C38]" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>
      </ScrollArea>

      {/* Footer */}

    </div>
  );
};

export default Sidebar;
