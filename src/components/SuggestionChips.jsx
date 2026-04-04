import { motion } from "framer-motion";
import { Mountain, Waves, Compass, MapPin, Layers, Gem } from "lucide-react";

const suggestions = [
  {
    icon: Mountain,
    text: "ما هي التكوينات الصخرية في الكويت؟",
  },
  {
    icon: Waves,
    text: "أخبرني عن جيولوجيا السواحل الكويتية",
  },
  {
    icon: Compass,
    text: "ما هي السبخات وكيف تتكون؟",
  },
  {
    icon: MapPin,
    text: "أفضل أماكن الاستكشاف الجيولوجي",
  },
  {
    icon: Layers,
    text: "تاريخ الكويت الجيولوجي",
  },
  {
    icon: Gem,
    text: "ما أنواع الصخور في الكويت؟",
  },
];

const SuggestionChips = ({ onSuggestionClick }) => {
  return (
    <div className="flex flex-wrap justify-center gap-2" data-testid="suggestion-chips">
      {suggestions.map((suggestion, index) => (
        <motion.button
          key={suggestion.text}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.08 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onSuggestionClick(suggestion.text)}
          className="
            px-4 py-2.5 rounded-full
            bg-[#2D2318]/60 border border-[#D4A574]/20
            text-sm text-[#D4A574]/80
            hover:bg-[#D4A574]/15 hover:text-[#F5E6D3] hover:border-[#B85C38]/40
            transition-all duration-300
            flex items-center gap-2
            chip-hover-earth
            backdrop-blur-sm
          "
          data-testid={`suggestion-chip-${index}`}
        >
          <suggestion.icon size={14} className="text-[#B85C38]/70" />
          <span>{suggestion.text}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default SuggestionChips;
