import { motion } from "framer-motion";
import { MapPin, ChevronLeft, Layers } from "lucide-react";

const typeLabels = {
  coastal: { label: "ساحلي", color: "from-blue-500/30 to-blue-400/30", border: "border-blue-500/40", text: "text-blue-400" },
  desert: { label: "صحراوي", color: "from-amber-500/30 to-amber-400/30", border: "border-amber-500/40", text: "text-amber-400" },
  sabkha: { label: "سبخة", color: "from-purple-500/30 to-purple-400/30", border: "border-purple-500/40", text: "text-purple-400" },
  rock_formation: { label: "تكوين صخري", color: "from-orange-500/30 to-orange-400/30", border: "border-orange-500/40", text: "text-orange-400" },
};

const ExplorationCard = ({ location }) => {
  const typeStyle = typeLabels[location.type] || typeLabels.desert;

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      className="
        glass-earth rounded-xl overflow-hidden
        border border-[#D4A574]/20 hover:border-[#D4A574]/50
        transition-all duration-400 cursor-pointer
        card-hover-earth group feature-card-shine
      "
      data-testid={`exploration-card-${location.id}`}
    >
      {/* Image */}
      <div className="relative h-32 overflow-hidden exploration-card-earth">
        <img
          src={location.image}
          alt={location.name_ar || location.name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1510] via-[#1A1510]/50 to-transparent" />
        
        {/* Type badge */}
        <div
          className={`
            absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium
            bg-gradient-to-r ${typeStyle.color} ${typeStyle.border} border
            backdrop-blur-sm ${typeStyle.text}
          `}
        >
          {typeStyle.label}
        </div>

        {/* Layers icon */}
        <div className="absolute bottom-3 left-3">
          <Layers size={16} className="text-[#D4A574]/60" />
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h4 className="font-bold text-[#F5E6D3] text-base mb-1">
          {location.name_ar || location.name}
        </h4>
        <p className="text-xs text-[#D4A574]/60 line-clamp-2 leading-relaxed">
          {location.geological_insight_ar || location.geological_insight}
        </p>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[#D4A574]/40 text-xs">
            <MapPin size={12} />
            <span>الكويت</span>
          </div>
          <button
            className="
              flex items-center gap-1 text-xs text-[#D4A574]
              hover:text-[#F5E6D3] transition-colors group/btn
            "
            data-testid={`explore-button-${location.id}`}
          >
            <span>استكشف</span>
            <ChevronLeft size={14} className="group-hover/btn:-translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ExplorationCard;
