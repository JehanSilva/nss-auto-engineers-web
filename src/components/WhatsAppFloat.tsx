"use client";
import { useState } from "react";
import Image from "next/image";
import { X, MessageCircle } from "lucide-react";

export default function WhatsAppFloat() {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Tooltip */}
      <div 
        className={`absolute bottom-full right-0 mb-3 transition-all duration-300 ${
          isTooltipVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
        }`}
      >
        <div className="bg-card border border-border rounded-xl p-4 shadow-2xl min-w-[200px]">
          <button 
            onClick={() => setIsTooltipVisible(false)}
            className="absolute top-2 right-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={14} />
          </button>
          <p className="text-sm text-foreground font-medium mb-1">Need help?</p>
          <p className="text-xs text-muted-foreground mb-3">Chat with us on WhatsApp</p>
          <a
            href="https://wa.me/94716188187"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#25d366] text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-[#20bd5a] transition-colors"
          >
            <MessageCircle size={16} />
            Start Chat
          </a>
        </div>
        {/* Arrow */}
        <div className="absolute -bottom-2 right-6 w-4 h-4 bg-card border-r border-b border-border rotate-45" />
      </div>

      {/* Main Button */}
      <a
        href="https://wa.me/94716188187"
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsTooltipVisible(true)}
        onMouseLeave={() => setIsTooltipVisible(false)}
        className="group relative flex items-center justify-center w-14 h-14 bg-[#25d366] rounded-full shadow-lg shadow-[#25d366]/30 hover:shadow-xl hover:shadow-[#25d366]/40 transition-all duration-300 hover:scale-110"
        aria-label="Chat on WhatsApp"
      >
        {/* Pulse Ring */}
        <span className="absolute inset-0 rounded-full bg-[#25d366] animate-ping opacity-30" />
        
        {/* Icon */}
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="WhatsApp"
          width={28}
          height={28}
          className="relative z-10"
        />
      </a>
    </div>
  );
}
