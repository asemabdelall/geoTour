import { motion } from "framer-motion";
import { Home, Map, Compass, Route, Plus } from "lucide-react";

const navItems = [
  { id: "welcome", icon: Home, label: "الرئيسية" },
  { id: "map", icon: Map, label: "الخريطة" },
  { id: "discover", icon: Compass, label: "اكتشف" },
  { id: "planner", icon: Route, label: "رحلتك" },
];

const BottomNav = ({ currentView, onNavigate, onNewChat }) => {
  return (
    <div className="lg:hidden flex-shrink-0 bottom-nav safe-area-bottom relative z-[9997]">
      <div className="px-4 py-2">
        <div className="flex items-center justify-around glass-card rounded-2xl p-2">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <motion.button
                key={item.id}
                whileTap={{ scale: 0.9 }}
                onClick={() => onNavigate(item.id)}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-300 ${
                  isActive ? "nav-item-active" : ""
                }`}
                data-testid={`nav-${item.id}`}
              >
                <item.icon
                  size={22}
                  className={`transition-colors ${
                    isActive ? "text-[#D4A574]" : "text-[#D4A574]/40"
                  }`}
                />
                <span
                  className={`text-[10px] font-medium transition-colors ${
                    isActive ? "text-[#D4A574]" : "text-[#D4A574]/40"
                  }`}
                >
                  {item.label}
                </span>
              </motion.button>
            );
          })}
          
          {/* New Chat Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onNewChat}
            className="flex flex-col items-center gap-1 px-3 py-2"
            data-testid="nav-new-chat"
          >
            <div className="w-10 h-10 rounded-xl gradient-premium flex items-center justify-center shadow-lg glow-premium">
              <Plus size={20} className="text-[#12100E]" />
            </div>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default BottomNav;
