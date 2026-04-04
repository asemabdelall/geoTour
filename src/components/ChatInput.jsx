import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Send, Sparkles, Camera, X, Image } from "lucide-react";

const ChatInput = ({ onSendMessage, isSending, placeholder }) => {
  const [message, setMessage] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if ((message.trim() || uploadedImage) && !isSending) {
      onSendMessage(message.trim(), uploadedImage?.url);
      setMessage("");
      setUploadedImage(null);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      // Convert image to data URL for local preview and storage
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage({
          id: `local-${Date.now()}`,
          url: reader.result,
          name: file.name
        });
        setIsUploading(false);
      };
      reader.onerror = () => {
        console.error('Failed to read file');
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Upload error:", error);
      setIsUploading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="w-full"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Uploaded image preview */}
      {uploadedImage && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mb-2 flex items-center gap-3 p-3 rounded-xl glass-card"
        >
          <div className="relative">
            <img
              src={uploadedImage.url}
              alt="صورة مرفوعة"
              className="w-14 h-14 object-cover rounded-lg"
            />
            <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#6B7B3C] flex items-center justify-center">
              <Image size={10} className="text-white" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-[#F5E6D3]/80 truncate">{uploadedImage.name}</p>
            <p className="text-[10px] text-[#D4A574]/50">جاهز للتحليل</p>
          </div>
          <motion.button
            type="button"
            whileTap={{ scale: 0.9 }}
            onClick={() => setUploadedImage(null)}
            className="p-2 rounded-lg hover:bg-[#B85C38]/20 transition-colors"
          >
            <X size={16} className="text-[#D4A574]" />
          </motion.button>
        </motion.div>
      )}

      <div
        className={`relative flex items-end gap-2 glass-input rounded-2xl px-3 py-2.5 input-focus transition-all duration-300 ${
          isSending || isUploading ? "opacity-70" : ""
        }`}
        data-testid="chat-input-container"
      >
        {/* Image upload button */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageUpload}
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
        />
        <motion.button
          type="button"
          whileTap={{ scale: 0.9 }}
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="flex-shrink-0 p-2 rounded-xl hover:bg-[#D4A574]/10 transition-colors"
          data-testid="upload-image-button"
        >
          <Camera size={18} className={isUploading ? "text-[#D4A574]/30 animate-pulse" : "text-[#D4A574]/50"} />
        </motion.button>

        {/* AI indicator */}
        <div className="flex-shrink-0 p-1">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#C9A227]/20 to-[#B85C38]/20 flex items-center justify-center">
            <Sparkles size={12} className="text-[#C9A227]" />
          </div>
        </div>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            e.target.style.height = 'auto';
            e.target.style.height = Math.min(e.target.scrollHeight, 100) + 'px';
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder || "اسأل عن جيولوجيا الكويت..."}
          disabled={isSending}
          rows={1}
          dir="rtl"
          className="flex-1 bg-transparent resize-none text-[#F5E6D3] placeholder-[#D4A574]/30 focus:outline-none text-sm leading-relaxed max-h-[100px] min-h-[28px] py-1"
          data-testid="chat-input"
        />

        {/* Send button */}
        <motion.button
          type="submit"
          disabled={(!message.trim() && !uploadedImage) || isSending}
          whileTap={{ scale: 0.9 }}
          className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
            (message.trim() || uploadedImage) && !isSending
              ? "gradient-premium shadow-lg glow-premium"
              : "bg-[#D4A574]/10 cursor-not-allowed"
          }`}
          data-testid="send-message-button"
        >
          <Send size={18} className={`rotate-180 ${(message.trim() || uploadedImage) && !isSending ? "text-[#12100E]" : "text-[#D4A574]/30"}`} />
        </motion.button>
      </div>

      <p className="text-[9px] text-[#D4A574]/25 text-center mt-2">
        ارفع صورة صخرة للتعرف عليها
      </p>
    </motion.form>
  );
};

export default ChatInput;
