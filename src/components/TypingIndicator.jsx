const TypingIndicator = () => {
  return (
    <div className="flex gap-3" data-testid="typing-indicator">
      {/* Avatar */}
      <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-gradient-to-br from-[#1F1C18] to-[#2A2520] border border-[#D4A574]/15 flex items-center justify-center">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D4A574" strokeWidth="2">
          <path d="M8 3v4l-4 2 4 2v4M16 3v4l4 2-4 2v4M12 3v18"/>
        </svg>
      </div>

      {/* Typing dots */}
      <div className="glass-card rounded-2xl rounded-tr-md px-4 py-3">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-[#D4A574] typing-dot-1" />
          <div className="w-2 h-2 rounded-full bg-[#B85C38] typing-dot-2" />
          <div className="w-2 h-2 rounded-full bg-[#C9A227] typing-dot-3" />
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
