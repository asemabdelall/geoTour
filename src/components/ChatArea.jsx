import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";
import { isGeminiAvailable } from "../lib/geminiClient";

const ChatArea = ({ session, isLoading, isSending, onSendMessage, locations }) => {
  const messagesEndRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const geminiReady = isGeminiAvailable();

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [session?.messages, isSending]);

  return (
    <div className="relative flex flex-col h-full w-full" data-testid="chat-area">
      {/* Header */}
      {!geminiReady && (
        <div className="absolute top-[64px] left-0 right-0 z-30 px-4 py-2 bg-amber-500/10 border-b border-amber-500/20 backdrop-blur-sm">
          <p className="text-[10px] text-amber-200/80 text-center flex items-center justify-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            تنبيه: مفتاح Gemini API غير مهيأ. يتم استخدام الوضع المحلي المحدود.
          </p>
        </div>
      )}
      <div className="absolute top-0 left-0 right-0 z-20 px-4 py-3 border-b border-[#D4A574]/10 bg-[#12100E]/95 backdrop-blur-md">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#B85C38]/20 to-[#D4A574]/20 flex items-center justify-center border border-[#D4A574]/10">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4A574" strokeWidth="2">
              <path d="M8 3v4l-4 2 4 2v4M16 3v4l4 2-4 2v4M12 3v18"/>
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-sm font-bold text-[#F5E6D3]/90 truncate">
              {session?.title || "استكشاف جديد"}
            </h2>
            <p className="text-[10px] text-[#D4A574]/40">محادثة مع جيوتور</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div 
        ref={scrollContainerRef}
        className="absolute inset-0 top-[64px] bottom-[90px] lg:bottom-[100px] overflow-y-auto hide-scrollbar px-4"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        <div className="max-w-2xl mx-auto py-4 space-y-4">
          <AnimatePresence mode="popLayout">
            {session?.messages?.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <MessageBubble
                  message={message}
                  locations={locations}
                />
              </motion.div>
            ))}
          </AnimatePresence>

          <AnimatePresence>
            {isSending && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <TypingIndicator />
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={messagesEndRef} className="h-1" />
        </div>
      </div>

      {/* Input */}
      <div className="absolute bottom-0 left-0 right-0 z-20 px-4 pb-3 pt-2 bg-gradient-to-t from-[#12100E] via-[#12100E] to-transparent">
        <div className="max-w-2xl mx-auto">
          <ChatInput onSendMessage={onSendMessage} isSending={isSending} />
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
