"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { X, MessageCircle } from "lucide-react";
import gsap from "gsap";

export default function WhatsAppFloat() {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!buttonRef.current) return;

    // Initial entrance animation
    gsap.fromTo(buttonRef.current,
      { scale: 0, rotation: -180, opacity: 0 },
      { 
        scale: 1, 
        rotation: 0, 
        opacity: 1, 
        duration: 0.8, 
        delay: 1.5,
        ease: "back.out(1.7)"
      }
    );

    // Attention-grabbing bounce every 5 seconds
    const interval = setInterval(() => {
      if (!isTooltipVisible && buttonRef.current) {
        gsap.to(buttonRef.current, {
          y: -10,
          duration: 0.3,
          yoyo: true,
          repeat: 1,
          ease: "power2.out"
        });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isTooltipVisible]);

  // Tooltip animation
  useEffect(() => {
    if (tooltipRef.current) {
      if (isTooltipVisible) {
        gsap.fromTo(tooltipRef.current,
          { opacity: 0, y: 10, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "back.out(1.7)" }
        );
      } else {
        gsap.to(tooltipRef.current, {
          opacity: 0, y: 10, scale: 0.9, duration: 0.2
        });
      }
    }
  }, [isTooltipVisible]);

  const handleMouseEnter = () => {
    setIsTooltipVisible(true);
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        scale: 1.1,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  const handleMouseLeave = () => {
    setIsTooltipVisible(false);
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Tooltip */}
      <div 
        ref={tooltipRef}
        className={`absolute bottom-full right-0 mb-3 ${
          isTooltipVisible ? "pointer-events-auto" : "pointer-events-none"
        }`}
        style={{ opacity: 0 }}
      >
        <div className="bg-card border border-border rounded-xl p-4 shadow-2xl min-w-[220px] backdrop-blur-sm">
          <button 
            onClick={() => setIsTooltipVisible(false)}
            className="absolute top-2 right-2 text-muted-foreground hover:text-foreground transition-colors hover:rotate-90 duration-300"
          >
            <X size={14} />
          </button>
          <p className="text-sm text-foreground font-medium mb-1">Need assistance?</p>
          <p className="text-xs text-muted-foreground mb-3">Chat with our team on WhatsApp</p>
          <a
            href="https://wa.me/94716188187"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-[#25d366] text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-[#20bd5a] transition-all hover:shadow-lg hover:shadow-[#25d366]/30"
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
        ref={buttonRef}
        href="https://wa.me/94716188187"
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="group relative flex items-center justify-center w-14 h-14 bg-[#25d366] rounded-full shadow-lg shadow-[#25d366]/30 transition-shadow duration-300"
        aria-label="Chat on WhatsApp"
        style={{ opacity: 0 }}
      >
        {/* Pulse Rings */}
        <span className="absolute inset-0 rounded-full bg-[#25d366] animate-ping opacity-20" />
        <span className="absolute inset-[-4px] rounded-full border-2 border-[#25d366]/30 animate-pulse" />
        
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
