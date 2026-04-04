import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, MapPin, Clock, Compass, Info, Play } from "lucide-react";

const DiscoverMode = ({ locations, tours, onLocationClick, onStartChat }) => {
  const [activeTab, setActiveTab] = useState("locations");
  const [currentIndex, setCurrentIndex] = useState(0);

  const items = activeTab === "locations" ? locations : tours;
  const currentItem = items[currentIndex];

  const nextItem = () => setCurrentIndex((i) => (i + 1) % items.length);
  const prevItem = () => setCurrentIndex((i) => (i - 1 + items.length) % items.length);

  const typeLabels = {
    geopark: { label: "متنزه جيولوجي", color: "from-emerald-500/30 to-emerald-400/30" },
    escarpment: { label: "جرف", color: "from-amber-500/30 to-amber-400/30" },
    coastal: { label: "ساحلي", color: "from-blue-500/30 to-blue-400/30" },
    sabkha: { label: "سبخة", color: "from-purple-500/30 to-purple-400/30" },
    valley: { label: "وادي", color: "from-orange-500/30 to-orange-400/30" },
    structure: { label: "تركيب جيولوجي", color: "from-red-500/30 to-red-400/30" },
    coral: { label: "مرجاني", color: "from-cyan-500/30 to-cyan-400/30" },
    ridge: { label: "تلال", color: "from-yellow-500/30 to-yellow-400/30" },
  };

  return (
    <div className="h-full w-full flex flex-col" data-testid="discover-mode">
      {/* Header */}
      <div className="flex-shrink-0 px-3 sm:px-6 py-3 sm:py-4 border-b border-[#D4A574]/10 bg-[#1A1510]/90">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3">
            <Compass size={20} className="text-[#D4A574]" />
            <div>
              <h2 className="text-sm sm:text-lg font-bold text-[#F5E6D3]">وضع الاكتشاف</h2>
              <p className="text-[9px] sm:text-xs text-[#D4A574]/50 hidden sm:block">اكتشف المواقع والجولات</p>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="flex gap-1 p-1 rounded-lg bg-[#2D2318]/60 border border-[#D4A574]/10">
            <button
              onClick={() => { setActiveTab("locations"); setCurrentIndex(0); }}
              className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded text-[10px] sm:text-xs font-medium transition-all ${
                activeTab === "locations"
                  ? "bg-[#D4A574]/20 text-[#F5E6D3]"
                  : "text-[#D4A574]/60"
              }`}
            >
              المواقع
            </button>
            <button
              onClick={() => { setActiveTab("tours"); setCurrentIndex(0); }}
              className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded text-[10px] sm:text-xs font-medium transition-all ${
                activeTab === "tours"
                  ? "bg-[#D4A574]/20 text-[#F5E6D3]"
                  : "text-[#D4A574]/60"
              }`}
            >
              الجولات
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto flex items-center justify-center p-3 sm:p-6">
        <div className="w-full max-w-lg">
          {/* Navigation */}
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={prevItem}
              className="p-2 sm:p-3 rounded-full glass-earth active:bg-[#D4A574]/20"
            >
              <ChevronRight size={20} className="text-[#D4A574]" />
            </motion.button>
            
            <div className="flex gap-1">
              {items.slice(0, 8).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all ${
                    i === currentIndex ? "bg-[#D4A574] w-4 sm:w-5" : "bg-[#D4A574]/30"
                  }`}
                />
              ))}
            </div>
            
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={nextItem}
              className="p-2 sm:p-3 rounded-full glass-earth active:bg-[#D4A574]/20"
            >
              <ChevronLeft size={20} className="text-[#D4A574]" />
            </motion.button>
          </div>

          {/* Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex + activeTab}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.2 }}
              className="glass-earth rounded-xl sm:rounded-2xl overflow-hidden border border-[#D4A574]/20"
            >
              {/* Image */}
              <div className="relative h-40 sm:h-52">
                <img
                  src={currentItem?.image}
                  alt={currentItem?.name_ar}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1510] via-[#1A1510]/40 to-transparent" />
                
                {activeTab === "locations" && currentItem?.type && (
                  <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-[10px] font-medium bg-gradient-to-r ${typeLabels[currentItem.type]?.color || 'from-gray-500/30 to-gray-400/30'} backdrop-blur-sm border border-white/10`}>
                    {typeLabels[currentItem.type]?.label || currentItem.type}
                  </div>
                )}
                
                {currentItem?.difficulty && (
                  <div className="absolute top-3 right-3 px-2 py-1 rounded-full text-[10px] font-medium bg-[#1A1510]/70 backdrop-blur-sm text-[#D4A574]">
                    {currentItem.difficulty}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5">
                <h3 className="text-lg sm:text-xl font-bold text-[#F5E6D3] mb-1.5">
                  {currentItem?.name_ar}
                </h3>
                
                <p className="text-xs sm:text-sm text-[#D4A574]/70 mb-3 leading-relaxed line-clamp-2">
                  {currentItem?.description_ar}
                </p>

                {activeTab === "locations" && (
                  <div className="p-3 rounded-lg bg-[#D4A574]/10 border border-[#D4A574]/20 mb-3">
                    <p className="text-[10px] text-[#D4A574] font-semibold mb-1 flex items-center gap-1.5">
                      <Info size={12} />
                      المعلومة الجيولوجية
                    </p>
                    <p className="text-xs text-[#F5E6D3]/80 line-clamp-2">
                      {currentItem?.geological_insight_ar}
                    </p>
                  </div>
                )}

                {activeTab === "tours" && currentItem?.highlights_ar && (
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {currentItem.highlights_ar.slice(0, 3).map((h, i) => (
                      <span key={i} className="px-2 py-1 rounded-full bg-[#D4A574]/10 text-[10px] text-[#D4A574]">
                        {h}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-3 mb-3 text-[10px] text-[#D4A574]/50">
                  {currentItem?.best_time_ar && (
                    <span className="flex items-center gap-1">
                      <Clock size={10} />
                      {currentItem.best_time_ar}
                    </span>
                  )}
                  {currentItem?.duration_ar && (
                    <span className="flex items-center gap-1">
                      <Clock size={10} />
                      {currentItem.duration_ar}
                    </span>
                  )}
                </div>

                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onLocationClick(currentItem)}
                  className="w-full py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-[#B85C38] to-[#D4A574] text-[#1A1510] font-bold text-sm flex items-center justify-center gap-2"
                >
                  <Play size={16} />
                  اسأل جيوتور
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default DiscoverMode;
