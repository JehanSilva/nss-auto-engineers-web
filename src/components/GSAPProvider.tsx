"use client";
import { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useGSAP() {
  useEffect(() => {
    // Initialize smooth scroll behavior
    ScrollTrigger.defaults({
      toggleActions: "play none none reverse"
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
}

export function AnimatedSection({ 
  children, 
  className = "",
  animation = "fadeUp",
  delay = 0,
  duration = 1,
  stagger = 0.1
}: { 
  children: ReactNode;
  className?: string;
  animation?: "fadeUp" | "fadeIn" | "slideLeft" | "slideRight" | "scale" | "rotate";
  delay?: number;
  duration?: number;
  stagger?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    const children = element.children;
    
    const animations: Record<string, gsap.TweenVars> = {
      fadeUp: { y: 60, opacity: 0 },
      fadeIn: { opacity: 0 },
      slideLeft: { x: -100, opacity: 0 },
      slideRight: { x: 100, opacity: 0 },
      scale: { scale: 0.8, opacity: 0 },
      rotate: { rotation: -10, opacity: 0, y: 30 }
    };

    const fromVars = animations[animation] || animations.fadeUp;

    gsap.set(children.length > 0 ? children : element, fromVars);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        end: "bottom 20%",
      }
    });

    tl.to(children.length > 0 && stagger > 0 ? children : element, {
      ...Object.fromEntries(Object.keys(fromVars).map(k => [k, k === 'opacity' ? 1 : 0])),
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      rotation: 0,
      duration,
      delay,
      stagger: children.length > 0 ? stagger : 0,
      ease: "power3.out"
    });

    return () => {
      tl.kill();
    };
  }, [animation, delay, duration, stagger]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export function ParallaxSection({
  children,
  className = "",
  speed = 0.5
}: {
  children: ReactNode;
  className?: string;
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    gsap.to(element, {
      y: () => -100 * speed,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  }, [speed]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export function TextReveal({
  children,
  className = "",
  delay = 0
}: {
  children: string;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    const words = children.split(" ");
    
    element.innerHTML = words
      .map(word => `<span class="inline-block overflow-hidden"><span class="inline-block">${word}</span></span>`)
      .join(" ");

    const spans = element.querySelectorAll("span > span");
    
    gsap.set(spans, { y: "100%", opacity: 0 });

    gsap.to(spans, {
      y: "0%",
      opacity: 1,
      duration: 0.8,
      stagger: 0.05,
      delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 85%"
      }
    });
  }, [children, delay]);

  return <div ref={ref} className={className} />;
}

export function MagneticButton({
  children,
  className = ""
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(element, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)"
      });
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export function CountUp({
  end,
  duration = 2,
  suffix = "",
  className = ""
}: {
  end: number;
  duration?: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    const obj = { value: 0 };

    gsap.to(obj, {
      value: end,
      duration,
      ease: "power2.out",
      scrollTrigger: {
        trigger: element,
        start: "top 85%"
      },
      onUpdate: () => {
        element.textContent = Math.round(obj.value) + suffix;
      }
    });
  }, [end, duration, suffix]);

  return <span ref={ref} className={className}>0{suffix}</span>;
}

export function SplitText({
  children,
  className = "",
  type = "chars"
}: {
  children: string;
  className?: string;
  type?: "chars" | "words" | "lines";
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    
    if (type === "chars") {
      element.innerHTML = children
        .split("")
        .map(char => char === " " ? " " : `<span class="inline-block">${char}</span>`)
        .join("");
    } else if (type === "words") {
      element.innerHTML = children
        .split(" ")
        .map(word => `<span class="inline-block">${word}</span>`)
        .join(" ");
    }

    const spans = element.querySelectorAll("span");
    
    gsap.set(spans, { y: 20, opacity: 0, rotateX: -90 });

    gsap.to(spans, {
      y: 0,
      opacity: 1,
      rotateX: 0,
      duration: 0.6,
      stagger: type === "chars" ? 0.02 : 0.1,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: element,
        start: "top 85%"
      }
    });
  }, [children, type]);

  return <div ref={ref} className={className} />;
}
