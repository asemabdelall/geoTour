import { useEffect, useState, useRef, useMemo, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapContainer, TileLayer, Marker, useMap, ZoomControl } from "react-leaflet";
import { divIcon } from "leaflet";
import { MapPin, X, Clock, Compass, ChevronLeft, Sparkles, Navigation, Layers } from "lucide-react";
import "leaflet/dist/leaflet.css";

const colors = {
  geopark: "#10C981",
  escarpment: "#F59E0B",
  coastal: "#3B82F6",
  sabkha: "#8B5CF6",
  valley: "#F97316",
  structure: "#EF4444",
  coral: "#06B6D4",
  ridge: "#EAB308",
};

// SiteCard Component - Wrapped in memo for high performance
const SiteCard = memo(({ location, isActive, onClick }) => {
  const typeLabels = {
    geopark: { label: "متنزه جيولوجي", color: "text-emerald-400" },
    escarpment: { label: "جرف صخري", color: "text-amber-400" },
    coastal: { label: "منطقة ساحلية", color: "text-blue-400" },
    sabkha: { label: "سبخة ملحية", color: "text-purple-400" },
    valley: { label: "وادي سحيق", color: "text-orange-400" },
    structure: { label: "تركيب تكتوني", color: "text-red-400" },
    coral: { label: "شعاب مرجانية", color: "text-cyan-400" },
    ridge: { label: "تلال رملية", color: "text-yellow-400" },
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(location)}
      className={`flex-shrink-0 w-72 h-36 rounded-3xl overflow-hidden glass-card p-4 flex gap-4 cursor-pointer transition-all border-2 snap-center ${
        isActive 
        ? "border-[#D4A574]/50 shadow-2xl bg-[#D4A574]/10" 
        : "border-transparent hover:border-[#D4A574]/20"
      }`}
    >
       <div className="w-24 h-full rounded-2xl overflow-hidden relative bg-black/40">
          <img 
            src={location.image} 
            alt={location.name_ar} 
            className="w-full h-full object-cover opacity-80" 
            loading="lazy" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
       </div>
       <div className="flex-1 flex flex-col justify-between py-1">
          <div>
            <div className={`text-[9px] font-black uppercase tracking-widest ${typeLabels[location.type]?.color} mb-1`}>
               {typeLabels[location.type]?.label}
            </div>
            <h3 className="text-sm font-black text-[#F5E6D3] leading-tight line-clamp-2" dir="rtl">
               {location.name_ar}
            </h3>
          </div>
          <div className="flex items-center justify-between text-[10px] text-[#D4A574]/40 font-bold">
             <span className="flex items-center gap-1"><Clock size={10}/> {location.best_time_ar}</span>
             <Navigation size={12} className="opacity-40" />
          </div>
       </div>
    </motion.div>
  );
});

const MapController = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, zoom || 14, { 
        duration: 1.5, // Faster duration
        easeLinearity: 0.25,
        animate: true 
      });
    }
  }, [center, zoom, map]);
  return null;
};

const InteractiveMap = ({ locations, onLocationClick, selectedLocation }) => {
  const [activeLocation, setActiveLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState([29.3759, 47.9774]);
  const scrollRef = useRef(null);

  // CRITICAL: Efficient Marker Cache
  const markers = useMemo(() => {
    return locations.map((location) => {
      const isSelected = activeLocation?.id === location.id;
      const color = colors[location.type] || "#D4A574";
      const size = isSelected ? 44 : 32; // Smaller markers for performance
      
      const icon = divIcon({
        className: "custom-marker-simple",
        html: `
          <div class="relative flex items-center justify-center">
            ${isSelected ? `
              <div class="absolute inset-0 rounded-full bg-[${color}] opacity-20" style="width: ${size*1.3}px; height: ${size*1.3}px; margin: -${size*0.15}px; animation: pulse 2s infinite"></div>
            ` : ''}
            <div style="
              width: ${size}px; height: ${size}px;
              background: ${color};
              border: 2px solid ${isSelected ? '#F5E6D3' : 'rgba(255,255,255,0.4)'};
              border-radius: 12px;
              box-shadow: 0 4px 12px rgba(0,0,0,0.3);
              display: flex; align-items: center; justify-content: center;
              transform: ${isSelected ? 'scale(1.1)' : 'scale(1)'};
              transition: transform 0.3s ease;
            ">
              <svg width="${size/2}" height="${size/2}" viewBox="0 0 24 24" fill="none" stroke="#12100E" stroke-width="3">
                 <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              </svg>
            </div>
          </div>
        `,
        iconSize: [size, size],
        iconAnchor: [size/2, size/2],
      });

      return { ...location, icon };
    });
  }, [locations, activeLocation?.id]);

  const handleMarkerClick = (location) => {
    setActiveLocation(location);
    setMapCenter([location.lat, location.lng]);
    
    // Smooth scroll with check
    if (scrollRef.current) {
      const index = locations.findIndex(l => l.id === location.id);
      if (index !== -1) {
        scrollRef.current.scrollTo({
          left: index * 280,
          behavior: 'smooth'
        });
      }
    }
  };

  const handleExplore = (location) => {
    onLocationClick(location);
    setActiveLocation(null);
  };

  const typeLabels = {
    geopark: { label: "متنزه جيولوجي", color: "text-emerald-400" },
    escarpment: { label: "جرف صخري", color: "text-amber-400" },
    coastal: { label: "منطقة ساحلية", color: "text-blue-400" },
    sabkha: { label: "سبخة ملحية", color: "text-purple-400" },
    valley: { label: "وادي سحيق", color: "text-orange-400" },
    structure: { label: "تركيب تكتوني", color: "text-red-400" },
    coral: { label: "شعاب مرجانية", color: "text-cyan-400" },
    ridge: { label: "تلال رملية", color: "text-yellow-400" },
  };

  return (
    <div className="h-full w-full flex flex-col relative overflow-hidden bg-[#12100E]" data-testid="interactive-map">
      {/* Optimized Header */}
      <div className="flex-shrink-0 px-6 py-4 glass-deep border-b border-white/5 flex items-center justify-between z-20">
        <div className="flex items-center gap-4">
          <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 shadow-lg">
            <Compass size={18} className="text-[#D4A574]" />
          </div>
          <div>
            <h2 className="text-base font-black tracking-tight text-[#F5E6D3] leading-none">مستكشف جيوتور</h2>
          </div>
        </div>
        <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-white/5 border border-white/5">
                <MapPin size={10} className="text-[#D4A574]" />
                <span className="text-[10px] font-bold text-[#F5E6D3]/40">{locations.length} موقع</span>
            </div>
        </div>
      </div>

      {/* Map Engine - No CSS Filters (Critical Fix) */}
      <div className="flex-1 relative">
        <MapContainer
          center={mapCenter}
          zoom={9}
          className="w-full h-full"
          zoomControl={false}
          attributionControl={false}
          style={{ background: '#12100E' }}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            subdomains='abcd'
          />
          
          <MapController center={activeLocation ? [activeLocation.lat, activeLocation.lng] : mapCenter} />
          
          {markers.map((location) => (
            <Marker
              key={location.id}
              position={[location.lat, location.lng]}
              icon={location.icon}
              eventHandlers={{ click: () => handleMarkerClick(location) }}
            />
          ))}
          <ZoomControl position="topright" />
        </MapContainer>

        {/* Optimized Carousel */}
        <div className="absolute bottom-6 left-0 right-0 z-[1000] px-6">
           <div 
             ref={scrollRef}
             className="flex gap-4 overflow-x-auto hide-scrollbar pb-4"
           >
              {locations.map((location) => (
                <SiteCard
                  key={location.id}
                  location={location}
                  isActive={activeLocation?.id === location.id}
                  onClick={handleMarkerClick}
                />
              ))}
           </div>
        </div>

        {/* Side Panel */}
        <AnimatePresence>
          {activeLocation && (
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              className="absolute top-6 right-6 w-80 lg:w-96 z-[1001] rounded-[28px] overflow-hidden glass-card shadow-2xl"
              dir="rtl"
            >
              <div className="relative h-40">
                <img src={activeLocation.image} alt={activeLocation.name_ar} className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12100E] to-transparent" />
                <button
                  onClick={() => setActiveLocation(null)}
                  className="absolute top-4 left-4 w-9 h-9 rounded-xl bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-center"
                >
                  <X size={18} className="text-white" />
                </button>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-black text-[#F5E6D3] mb-2">{activeLocation.name_ar}</h3>
                <p className="text-xs text-[#D4A574]/60 mb-4 line-clamp-2">{activeLocation.description_ar}</p>
                
                <div className="p-4 rounded-xl bg-white/5 border border-white/5 mb-6">
                  <p className="text-[10px] text-[#D4A574] font-black mb-1 flex items-center gap-2 uppercase">
                    <Sparkles size={11} /> التحليل الجيولوجي
                  </p>
                  <p className="text-xs text-[#F5E6D3]/80 italic font-medium">
                    "{activeLocation.geological_insight_ar}"
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleExplore(activeLocation)}
                  className="w-full py-3.5 rounded-xl gradient-premium text-[#12100E] font-black text-sm flex items-center justify-center gap-3"
                >
                  استكشاف الموقع
                  <ChevronLeft size={18} />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default InteractiveMap;
