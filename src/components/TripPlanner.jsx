import { useState } from "react";
import { motion } from "framer-motion";
import { Route, Clock, Mountain, Waves, Compass, Sparkles, ChevronLeft, Loader2 } from "lucide-react";
import geminiClient from "../lib/geminiClient";

const interests = [
  { id: "desert", icon: Mountain, label: "صحراء وجروف" },
  { id: "coastal", icon: Waves, label: "سواحل وجزر" },
  { id: "sabkha", icon: Compass, label: "سبخات" },
  { id: "geopark", icon: Sparkles, label: "متنزه جيولوجي" },
];

const durations = [
  { value: 4, label: "نصف يوم (4 ساعات)" },
  { value: 6, label: "يوم قصير (6 ساعات)" },
  { value: 8, label: "يوم كامل (8 ساعات)" },
];

const difficulties = [
  { value: "سهل", label: "سهل - للعائلات" },
  { value: "متوسط", label: "متوسط - للمغامرين" },
  { value: "صعب", label: "صعب - للخبراء" },
];

const TripPlanner = ({ locations, onPlanComplete }) => {
  const [step, setStep] = useState(1);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [duration, setDuration] = useState(6);
  const [difficulty, setDifficulty] = useState("سهل");
  const [isPlanning, setIsPlanning] = useState(false);
  const [plan, setPlan] = useState(null);
  const [planLocations, setPlanLocations] = useState([]);

  const toggleInterest = (id) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const generatePlan = async () => {
    setIsPlanning(true);
    try {
      const response = await geminiClient.planTrip({ interests: selectedInterests, duration_hours: duration, difficulty });
      setPlan(response.plan);
      setPlanLocations(response.locations || []);
      setStep(4);
    } catch (error) {
      console.error("Planning error:", error);
    } finally {
      setIsPlanning(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4 sm:space-y-6"
          >
            <div className="text-center mb-4 sm:mb-6">
              <h3 className="text-base sm:text-xl font-bold text-[#F5E6D3] mb-1">ما الذي يثير اهتمامك؟</h3>
              <p className="text-xs text-[#D4A574]/60">اختر نوع واحد أو أكثر</p>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {interests.map((interest) => (
                <motion.button
                  key={interest.id}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => toggleInterest(interest.id)}
                  className={`p-4 sm:p-5 rounded-lg sm:rounded-xl border-2 transition-all duration-200 ${
                    selectedInterests.includes(interest.id)
                      ? "bg-[#D4A574]/20 border-[#D4A574] text-[#F5E6D3]"
                      : "glass-earth border-[#D4A574]/20 text-[#D4A574]/70"
                  }`}
                >
                  <interest.icon size={28} className="mx-auto mb-2" />
                  <p className="text-xs sm:text-sm font-semibold">{interest.label}</p>
                </motion.button>
              ))}
            </div>
            <button
              onClick={() => setStep(2)}
              disabled={selectedInterests.length === 0}
              className="w-full py-3 sm:py-4 rounded-lg sm:rounded-xl bg-gradient-to-r from-[#B85C38] to-[#D4A574] text-[#1A1510] font-bold text-sm disabled:opacity-50 flex items-center justify-center gap-2"
            >
              التالي
              <ChevronLeft size={18} />
            </button>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4 sm:space-y-6"
          >
            <div className="text-center mb-4 sm:mb-6">
              <h3 className="text-base sm:text-xl font-bold text-[#F5E6D3] mb-1">كم من الوقت لديك؟</h3>
              <p className="text-xs text-[#D4A574]/60">اختر مدة الرحلة</p>
            </div>
            <div className="space-y-2">
              {durations.map((d) => (
                <motion.button
                  key={d.value}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setDuration(d.value)}
                  className={`w-full p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 transition-all duration-200 flex items-center gap-3 ${
                    duration === d.value
                      ? "bg-[#D4A574]/20 border-[#D4A574] text-[#F5E6D3]"
                      : "glass-earth border-[#D4A574]/20 text-[#D4A574]/70"
                  }`}
                >
                  <Clock size={20} />
                  <span className="text-sm font-medium">{d.label}</span>
                </motion.button>
              ))}
            </div>
            <div className="flex gap-2 sm:gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 py-3 rounded-lg glass-earth border border-[#D4A574]/20 text-[#D4A574] font-bold text-sm"
              >
                السابق
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-1 py-3 rounded-lg bg-gradient-to-r from-[#B85C38] to-[#D4A574] text-[#1A1510] font-bold text-sm flex items-center justify-center gap-1"
              >
                التالي
                <ChevronLeft size={16} />
              </button>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4 sm:space-y-6"
          >
            <div className="text-center mb-4 sm:mb-6">
              <h3 className="text-base sm:text-xl font-bold text-[#F5E6D3] mb-1">ما مستوى الصعوبة؟</h3>
              <p className="text-xs text-[#D4A574]/60">اختر حسب خبرتك</p>
            </div>
            <div className="space-y-2">
              {difficulties.map((d) => (
                <motion.button
                  key={d.value}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setDifficulty(d.value)}
                  className={`w-full p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 transition-all duration-200 flex items-center gap-3 ${
                    difficulty === d.value
                      ? "bg-[#D4A574]/20 border-[#D4A574] text-[#F5E6D3]"
                      : "glass-earth border-[#D4A574]/20 text-[#D4A574]/70"
                  }`}
                >
                  <Mountain size={20} />
                  <span className="text-sm font-medium">{d.label}</span>
                </motion.button>
              ))}
            </div>
            <div className="flex gap-2 sm:gap-3">
              <button
                onClick={() => setStep(2)}
                className="flex-1 py-3 rounded-lg glass-earth border border-[#D4A574]/20 text-[#D4A574] font-bold text-sm"
              >
                السابق
              </button>
              <button
                onClick={generatePlan}
                disabled={isPlanning}
                className="flex-1 py-3 rounded-lg bg-gradient-to-r from-[#B85C38] to-[#D4A574] text-[#1A1510] font-bold text-sm flex items-center justify-center gap-1.5 disabled:opacity-70"
              >
                {isPlanning ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    جاري التخطيط
                  </>
                ) : (
                  <>
                    <Sparkles size={16} />
                    إنشاء الخطة
                  </>
                )}
              </button>
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-4"
          >
            <div className="text-center mb-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto rounded-full bg-gradient-to-br from-[#6B7B3C] to-[#C9A227] flex items-center justify-center mb-3">
                <Route size={24} className="text-[#1A1510]" />
              </div>
              <h3 className="text-base sm:text-xl font-bold text-[#F5E6D3] mb-1">خطة رحلتك جاهزة!</h3>
              <p className="text-xs text-[#D4A574]/60">{duration} ساعات • {difficulty}</p>
            </div>

            {planLocations.length > 0 && (
              <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
                {planLocations.map((loc) => (
                  <div key={loc.id} className="flex-shrink-0 w-24 sm:w-28">
                    <img
                      src={loc.image}
                      alt={loc.name_ar}
                      className="w-full h-16 sm:h-18 object-cover rounded-lg mb-1"
                    />
                    <p className="text-[10px] text-[#F5E6D3]/80 truncate">{loc.name_ar}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="p-3 rounded-lg glass-earth border border-[#D4A574]/20 max-h-48 sm:max-h-56 overflow-y-auto">
              <div className="text-[#F5E6D3]/80 whitespace-pre-wrap text-xs leading-relaxed">
                {plan}
              </div>
            </div>

            <div className="flex gap-2 sm:gap-3">
              <button
                onClick={() => { setStep(1); setPlan(null); setSelectedInterests([]); }}
                className="flex-1 py-3 rounded-lg glass-earth border border-[#D4A574]/20 text-[#D4A574] font-bold text-sm"
              >
                خطة جديدة
              </button>
              <button
                onClick={() => onPlanComplete(plan)}
                className="flex-1 py-3 rounded-lg bg-gradient-to-r from-[#B85C38] to-[#D4A574] text-[#1A1510] font-bold text-sm"
              >
                مناقشة مع جيوتور
              </button>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="h-full w-full flex flex-col" data-testid="trip-planner">
      {/* Header */}
      <div className="flex-shrink-0 px-3 sm:px-6 py-3 sm:py-4 border-b border-[#D4A574]/10 bg-[#1A1510]/90">
        <div className="flex items-center gap-2 sm:gap-3">
          <Route size={20} className="text-[#D4A574]" />
          <div>
            <h2 className="text-sm sm:text-lg font-bold text-[#F5E6D3]">مخطط الرحلات الذكي</h2>
            <p className="text-[9px] sm:text-xs text-[#D4A574]/50 hidden sm:block">خطط رحلتك الجيولوجية</p>
          </div>
        </div>
        
        {step < 4 && (
          <div className="flex gap-1.5 mt-3">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`flex-1 h-1 rounded-full transition-all ${
                  s <= step ? "bg-[#D4A574]" : "bg-[#D4A574]/20"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto flex items-center justify-center p-3 sm:p-6">
        <div className="w-full max-w-sm">
          {renderStep()}
        </div>
      </div>
    </div>
  );
};

export default TripPlanner;
