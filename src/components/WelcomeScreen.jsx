import { motion } from "framer-motion";
import { Mountain, Map, Compass, Route, Sparkles, Layers, ArrowLeft } from "lucide-react";
import ChatInput from "./ChatInput";

const features = [
  { id: "map", icon: Map, label: "الخريطة", desc: "استكشف المواقع", gradient: "from-blue-500/20 to-cyan-500/20" },
  { id: "discover", icon: Compass, label: "اكتشف", desc: "تعرف على الأماكن", gradient: "from-purple-500/20 to-pink-500/20" },
  { id: "planner", icon: Route, label: "خطط رحلتك", desc: "رحلة مخصصة لك", gradient: "from-orange-500/20 to-amber-500/20" },
];

const quickQuestions = [
  "ما هو المتنزه الجيولوجي؟",
  "أخبرني عن جال الزور",
  "ما هي السبخات؟",
  "أين أستكشف؟",
];

const WelcomeScreen = ({ onSendMessage, onNavigate, isSending }) => {
  return (
    <div className="h-full w-full overflow-y-auto hide-scrollbar" data-testid="welcome-screen">
      <div className="min-h-full flex flex-col px-4 sm:px-6 py-6 sm:py-10">
        {/* Hero Section */}
        <div className="flex-1 flex flex-col items-center justify-center max-w-lg mx-auto w-full">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="mb-6 relative"
          >
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl sm:text-5xl font-black gradient-text-premium mb-2">جيوتور</h1>
            <p className="text-sm sm:text-base text-[#D4A574]/70">دليلك الذكي للسياحة الجيولوجية</p>
            <div className="flex items-center justify-center gap-2 mt-2 text-xs text-[#D4A574]/40">
              <span>اكتشف</span>
              <span className="w-1 h-1 rounded-full bg-[#D4A574]/40" />
              <span>تعلم</span>
              <span className="w-1 h-1 rounded-full bg-[#D4A574]/40" />
              <span>استكشف</span>
            </div>
          </motion.div>

          {/* Feature Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full grid grid-cols-3 gap-3 mb-8"
          >
            {features.map((feature, index) => (
              <motion.button
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + index * 0.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate(feature.id)}
                className={`relative p-4 rounded-2xl glass-card card-premium overflow-hidden group`}
                data-testid={`feature-${feature.id}`}
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-active:opacity-100 transition-opacity`} />

                <div className="relative z-10">
                  <div className="w-11 h-11 mx-auto mb-2 rounded-xl bg-[#D4A574]/10 flex items-center justify-center">
                    <feature.icon size={22} className="text-[#D4A574]" />
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-[#F5E6D3]">{feature.label}</p>
                  <p className="text-[9px] text-[#D4A574]/50 mt-0.5 hidden sm:block">{feature.desc}</p>
                </div>
              </motion.button>
            ))}
          </motion.div>

          {/* Quick Questions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="w-full mb-6"
          >
            <p className="text-[10px] text-[#D4A574]/40 text-center mb-3">جرّب السؤال</p>
            <div className="flex flex-wrap justify-center gap-2">
              {quickQuestions.map((q, index) => (
                <motion.button
                  key={q}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 + index * 0.03 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onSendMessage(q)}
                  className="px-3 py-2 rounded-full glass-button text-xs text-[#D4A574]/80 active:bg-[#D4A574]/15 transition-all duration-200 flex items-center gap-1.5"
                  data-testid={`quick-q-${index}`}
                >
                  <Sparkles size={10} className="text-[#C9A227]" />
                  <span>{q}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Chat Input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="w-full"
          >
            <ChatInput
              onSendMessage={onSendMessage}
              isSending={isSending}
              placeholder="اسأل عن جيولوجيا الكويت..."
            />
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#C9A227]/10 border border-[#C9A227]/15">
              <Layers size={11} className="text-[#C9A227]" />
              <span className="text-[10px] text-[#C9A227]/80">مشروع السياحة الجيولوجية</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
