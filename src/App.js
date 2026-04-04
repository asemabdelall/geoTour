import { useState, useEffect, useCallback } from "react";
import "@/App.css";
import { AnimatePresence, motion } from "framer-motion";
import Sidebar from "./components/Sidebar";
import ChatArea from "./components/ChatArea";
import WelcomeScreen from "./components/WelcomeScreen";
import InteractiveMap from "./components/InteractiveMap";
import DiscoverMode from "./components/DiscoverMode";
import TripPlanner from "./components/TripPlanner";
import BottomNav from "./components/BottomNav";
import { Menu, X, Mountain } from "lucide-react";

import { getSessions, getSession, createSession as storageCreateSession, deleteSession as storageDeleteSession, updateSession as storageUpdateSession, appendMessages } from "./lib/storage";
import { LOCATIONS, TOURS } from "./lib/localData";
import geminiClient from "./lib/geminiClient";

function App() {
  const [sessions, setSessions] = useState([]);
  const [activeSessionId, setActiveSessionId] = useState(null);
  const [activeSession, setActiveSession] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [locations, setLocations] = useState([]);
  const [tours, setTours] = useState([]);
  const [currentView, setCurrentView] = useState("welcome");
  const [selectedLocation, setSelectedLocation] = useState(null);

  const fetchInitialData = useCallback(async () => {
    // Load sessions from localStorage and static data
    try {
      const sessions = getSessions();
      setSessions(sessions);
      setLocations(LOCATIONS);
      setTours(TOURS);
    } catch (error) {
      console.error("Error initializing data:", error);
    }
  }, []);

  const fetchSession = useCallback(async (sessionId) => {
    if (!sessionId) return;
    setIsLoading(true);
    try {
      const s = getSession(sessionId);
      setActiveSession(s);
    } catch (error) {
      console.error("Error fetching session:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createSession = useCallback(async () => {
    try {
      const newSession = storageCreateSession();
      setSessions((prev) => [newSession, ...prev]);
      setActiveSessionId(newSession.id);
      setActiveSession(newSession);
      setCurrentView("chat");
      setSidebarOpen(false);
      return newSession;
    } catch (error) {
      console.error("Error creating session:", error);
      return null;
    }
  }, []);

  const deleteSession = useCallback(async (sessionId) => {
    try {
      storageDeleteSession(sessionId);
      setSessions((prev) => prev.filter((s) => s.id !== sessionId));
      if (activeSessionId === sessionId) {
        setActiveSessionId(null);
        setActiveSession(null);
        setCurrentView("welcome");
      }
    } catch (error) {
      console.error("Error deleting session:", error);
    }
  }, [activeSessionId]);

  const sendMessage = useCallback(async (content, imageUrl = null) => {
    if (!content.trim() || isSending) return;

    let currentSessionId = activeSessionId;

    if (!currentSessionId) {
      const newSession = await createSession();
      if (!newSession) return;
      currentSessionId = newSession.id;
    }

    setIsSending(true);
    setCurrentView("chat");

    const tempUserMessage = {
      id: `temp-${Date.now()}`,
      role: "user",
      content: content,
      timestamp: new Date().toISOString(),
      image_url: imageUrl
    };

    setActiveSession((prev) => ({
      ...prev,
      messages: [...(prev?.messages || []), tempUserMessage],
    }));

    try {
      // Use client-side Gemini wrapper (fallbacks if no real API configured)
      const response = await geminiClient.sendMessage({ session_id: currentSessionId, content, image_url: imageUrl });

      const { user_message, assistant_message } = response;

      // Persist messages
      const updatedSession = appendMessages(currentSessionId, [user_message, assistant_message]);

      setActiveSession(updatedSession);
      setSessions(getSessions());
    } catch (error) {
      console.error("Error sending message:", error);
      setActiveSession((prev) => ({
        ...prev,
        messages: prev?.messages?.filter((m) => m.id !== tempUserMessage.id) || [],
      }));
    } finally {
      setIsSending(false);
    }
  }, [activeSessionId, isSending, createSession]);

  const selectSession = useCallback((sessionId) => {
    setActiveSessionId(sessionId);
    fetchSession(sessionId);
    setCurrentView("chat");
    setSidebarOpen(false);
  }, [fetchSession]);

  const handleLocationClick = useCallback((location) => {
    setSelectedLocation(location);
    sendMessage(`أخبرني بالتفصيل عن ${location.name_ar} من الناحية الجيولوجية`);
  }, [sendMessage]);

  const navigateTo = useCallback((view) => {
    setCurrentView(view);
    setSidebarOpen(false);
  }, []);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  useEffect(() => {
    if (activeSessionId && currentView === "chat") {
      fetchSession(activeSessionId);
    }
  }, [activeSessionId, currentView, fetchSession]);

  const renderMainContent = () => {
    switch (currentView) {
      case "map":
        return <InteractiveMap locations={locations} onLocationClick={handleLocationClick} selectedLocation={selectedLocation} />;
      case "discover":
        return <DiscoverMode locations={locations} tours={tours} onLocationClick={handleLocationClick} />;
      case "planner":
        return <TripPlanner locations={locations} onPlanComplete={(plan) => sendMessage(`لقد خططت رحلة: ${plan}`)} />;
      case "chat":
        return activeSession && activeSession.messages?.length > 0 ? (
          <ChatArea session={activeSession} isLoading={isLoading} isSending={isSending} onSendMessage={sendMessage} locations={locations} />
        ) : (
          <WelcomeScreen onSendMessage={sendMessage} onNavigate={navigateTo} isSending={isSending} />
        );
      default:
        return <WelcomeScreen onSendMessage={sendMessage} onNavigate={navigateTo} isSending={isSending} />;
    }
  };

  return (
    <div className="h-[100dvh] flex flex-col lg:flex-row overflow-hidden app-container" dir="rtl" data-testid="app-container">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-72 flex-shrink-0 border-l border-[#D4A574]/10 relative z-[9990]">
        <Sidebar
          sessions={sessions}
          activeSessionId={activeSessionId}
          currentView={currentView}
          onSelectSession={selectSession}
          onNewChat={createSession}
          onDeleteSession={deleteSession}
          onNavigate={navigateTo}
          isOpen={true}
        />
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="lg:hidden fixed top-0 right-0 bottom-0 w-[85%] max-w-sm z-[9999]"
            >
              <Sidebar
                sessions={sessions}
                activeSessionId={activeSessionId}
                currentView={currentView}
                onSelectSession={selectSession}
                onNewChat={createSession}
                onDeleteSession={deleteSession}
                onNavigate={navigateTo}
                isOpen={true}
                onClose={() => setSidebarOpen(false)}
                isMobile={true}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main className="flex-1 flex flex-col min-w-0 relative overflow-hidden">
        {/* Mobile Header - High Performance z-index & Safe Area Breathing Room */}
        <div className="lg:hidden flex-shrink-0 px-6 pt-10 pb-5 flex items-center justify-between glass-deep safe-area-top z-[9997] overflow-hidden relative strata-border-top">
          {/* Animated Background Element */}
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.05, 0.1, 0.05]
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute -top-10 -right-10 w-40 h-40 bg-[#D4A574] rounded-full blur-[60px] pointer-events-none"
          />

          <div className="flex items-center gap-4 relative z-10">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="relative w-10 h-10 rounded-2xl gradient-premium flex items-center justify-center shadow-xl glow-premium cursor-pointer"
            >
              <Mountain size={20} className="text-[#12100E]" />
              <motion.div 
                animate={{ opacity: [0, 0.4, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 rounded-2xl bg-white"
              />
            </motion.div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-black tracking-tight gradient-text-premium leading-none">جيوتور</h1>
                <motion.div 
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-1.5 h-1.5 rounded-full bg-[#B85C38]"
                />
              </div>
              <p className="text-[10px] font-bold text-[#D4A574]/40 uppercase tracking-widest mt-1">Geology Explorer</p>
            </div>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-3 rounded-2xl glass-button border-[#D4A574]/20 shadow-lg relative z-10 overflow-hidden"
            data-testid="sidebar-toggle"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={sidebarOpen ? "close" : "menu"}
                initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 45, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                {sidebarOpen ? <X size={20} className="text-[#D4A574]" /> : <Menu size={20} className="text-[#D4A574]" />}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0"
            >
              {renderMainContent()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile Bottom Navigation */}
        <BottomNav currentView={currentView} onNavigate={navigateTo} onNewChat={createSession} />
      </main>
    </div>
  );
}

export default App;
