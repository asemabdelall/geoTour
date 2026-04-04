import { motion } from "framer-motion";
import { User, MapPin, ChevronLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const typeLabels = {
  geopark: { label: "متنزه", color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
  escarpment: { label: "جرف", color: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
  coastal: { label: "ساحلي", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  sabkha: { label: "سبخة", color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
  valley: { label: "وادي", color: "bg-orange-500/20 text-orange-400 border-orange-500/30" },
  structure: { label: "تركيب", color: "bg-red-500/20 text-red-400 border-red-500/30" },
  coral: { label: "مرجاني", color: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30" },
  ridge: { label: "تلال", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
};

const markdownComponents = {
  h1: ({ children }) => <h1 className="text-lg font-bold text-[#D4A574] mt-4 mb-2">{children}</h1>,
  h2: ({ children }) => <h2 className="text-base font-bold text-[#D4A574] mt-3 mb-2">{children}</h2>,
  h3: ({ children }) => <h3 className="text-sm font-bold text-[#D4A574] mt-3 mb-1">{children}</h3>,
  p: ({ children }) => <p className="text-[#F5E6D3]/85 leading-relaxed text-sm mb-2">{children}</p>,
  strong: ({ children }) => <strong className="font-bold text-[#D4A574]">{children}</strong>,
  em: ({ children }) => <em className="italic text-[#F5E6D3]/90">{children}</em>,
  ul: ({ children }) => <ul className="my-2 space-y-1">{children}</ul>,
  ol: ({ children }) => <ol className="my-2 space-y-1 list-decimal list-inside">{children}</ol>,
  li: ({ children }) => (
    <li className="text-[#F5E6D3]/85 flex items-start gap-2 text-sm">
      <span className="w-1.5 h-1.5 rounded-full bg-[#D4A574] mt-2 flex-shrink-0" />
      <span>{children}</span>
    </li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-r-2 border-[#D4A574]/40 pr-3 my-2 text-[#F5E6D3]/70 italic text-sm">{children}</blockquote>
  ),
  code: ({ inline, children }) =>
    inline ? (
      <code className="bg-[#D4A574]/15 px-1.5 py-0.5 rounded text-[#D4A574] text-xs">{children}</code>
    ) : (
      <pre className="bg-[#1A1714] rounded-xl p-3 my-2 overflow-x-auto border border-[#D4A574]/10">
        <code className="text-[#F5E6D3]/80 text-xs">{children}</code>
      </pre>
    ),
  table: ({ children }) => (
    <div className="my-3 overflow-x-auto rounded-xl border border-[#D4A574]/15">
      <table className="w-full text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-[#D4A574]/10">{children}</thead>,
  tbody: ({ children }) => <tbody className="divide-y divide-[#D4A574]/10">{children}</tbody>,
  tr: ({ children }) => <tr>{children}</tr>,
  th: ({ children }) => <th className="px-3 py-2 text-right font-semibold text-[#D4A574] text-xs">{children}</th>,
  td: ({ children }) => <td className="px-3 py-2 text-[#F5E6D3]/80 text-xs">{children}</td>,
};

const MessageBubble = ({ message, locations }) => {
  const isUser = message.role === "user";

  return (
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`} data-testid={`message-${message.role}`}>
      {/* Avatar */}
      <div className={`flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center ${
        isUser 
          ? "gradient-premium shadow-md" 
          : "bg-gradient-to-br from-[#1F1C18] to-[#2A2520] border border-[#D4A574]/15"
      }`}>
        {isUser ? (
          <User size={14} className="text-[#12100E]" />
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D4A574" strokeWidth="2">
            <path d="M8 3v4l-4 2 4 2v4M16 3v4l4 2-4 2v4M12 3v18"/>
          </svg>
        )}
      </div>

      {/* Content */}
      <div className={`flex-1 min-w-0 max-w-[85%] ${isUser ? "flex flex-col items-end" : ""}`}>
        {/* Image if attached */}
        {message.image_url && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-2">
            <img src={message.image_url} alt="صورة" className="max-w-[180px] rounded-xl border border-[#D4A574]/15" />
          </motion.div>
        )}

        {/* Message bubble */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`px-4 py-3 rounded-2xl ${
            isUser
              ? "bg-gradient-to-br from-[#B85C38]/25 to-[#D4A574]/20 border border-[#D4A574]/20 rounded-tl-md"
              : "glass-card rounded-tr-md"
          }`}
        >
          {isUser ? (
            <p className="text-[#F5E6D3] text-sm leading-relaxed">{message.content}</p>
          ) : (
            <div className="prose prose-sm max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                {message.content}
              </ReactMarkdown>
            </div>
          )}
        </motion.div>

        {/* Location cards */}
        {!isUser && message.locations && message.locations.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-3 space-y-2"
          >
            {message.locations.map((location) => {
              const style = typeLabels[location.type] || typeLabels.escarpment;
              return (
                <div key={location.id} className="glass-card rounded-xl overflow-hidden card-premium">
                  <div className="flex">
                    <div className="w-24 h-20 flex-shrink-0 relative">
                      <img src={location.image} alt={location.name_ar} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-l from-[#1F1C18] to-transparent" />
                    </div>
                    <div className="flex-1 p-3 flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-medium border ${style.color}`}>
                          {style.label}
                        </span>
                      </div>
                      <h4 className="font-bold text-[#F5E6D3] text-sm">{location.name_ar}</h4>
                      <div className="flex items-center justify-between mt-1">
                        <span className="flex items-center gap-1 text-[10px] text-[#D4A574]/40">
                          <MapPin size={10} /> الكويت
                        </span>
                        <span className="flex items-center gap-0.5 text-[10px] text-[#D4A574]">
                          استكشف <ChevronLeft size={12} />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        )}

        {/* Timestamp */}
        <p className={`text-[9px] text-[#D4A574]/25 mt-1.5 ${isUser ? "text-left" : "text-right"}`}>
          {new Date(message.timestamp).toLocaleTimeString("ar-KW", { hour: "numeric", minute: "2-digit" })}
        </p>
      </div>
    </div>
  );
};

export default MessageBubble;
