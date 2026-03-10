"use client";
import { useState, FormEvent, useRef, useEffect } from "react";
import { Phone, MapPin, Clock, CheckCircle, Send, Mail, MessageSquare } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.from(headerRef.current, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%"
        }
      });

      // Form animation with 3D flip
      gsap.from(formRef.current, {
        x: -100,
        opacity: 0,
        rotateY: -15,
        transformPerspective: 1000,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 80%"
        }
      });

      // Info cards stagger
      const cards = cardsRef.current?.children;
      if (cards) {
        gsap.from(cards, {
          x: 100,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%"
          }
        });
      }

      // Form input focus animations
      const inputs = formRef.current?.querySelectorAll("input, textarea");
      inputs?.forEach(input => {
        input.addEventListener("focus", () => {
          gsap.to(input, {
            scale: 1.02,
            duration: 0.2,
            ease: "power2.out"
          });
        });
        input.addEventListener("blur", () => {
          gsap.to(input, {
            scale: 1,
            duration: 0.2,
            ease: "power2.out"
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // Button animation
    const button = e.currentTarget.querySelector("button[type='submit']");
    if (button) {
      gsap.to(button, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1
      });
    }

    try {
      const response = await fetch("https://formsubmit.co/ajax/info@nssauto.lk", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setIsSuccess(true);
        // Success animation
        gsap.fromTo(formRef.current,
          { scale: 1 },
          { 
            scale: 0.95, 
            duration: 0.2, 
            yoyo: true, 
            repeat: 1,
            onComplete: () => {
              gsap.from(".success-content", {
                scale: 0.8,
                opacity: 0,
                duration: 0.5,
                ease: "back.out(1.7)"
              });
            }
          }
        );
      } else {
        alert("Something went wrong. Please try again later.");
      }
    } catch {
      alert("Something went wrong. Please check your internet connection.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section ref={sectionRef} id="contact" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-[100px]" />
      
      <div className="relative max-w-[1100px] mx-auto px-4">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-4">
            <MessageSquare size={16} className="text-primary" />
            <span className="text-sm font-medium text-primary">Get In Touch</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Contact <span className="text-gradient">Us</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Ready to service your vehicle? Reach out to us for expert assistance
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-8">
          {/* Form Area */}
          <div 
            ref={formRef} 
            className="bg-card border border-border rounded-2xl p-8"
            style={{ transformStyle: "preserve-3d" }}
          >
            {isSuccess ? (
              <div className="success-content flex flex-col items-center justify-center h-full text-center py-10 space-y-4">
                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-2">
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h4 className="text-2xl font-bold text-foreground">Message Sent!</h4>
                <p className="text-muted-foreground max-w-sm">
                  Thank you for contacting us. We will get back to you soon. For a faster response, please call us at 071 618 8187 or WhatsApp us.
                </p>
                <button 
                  onClick={() => setIsSuccess(false)}
                  className="mt-4 inline-flex items-center gap-2 bg-card border border-border hover:border-primary/50 text-foreground px-6 py-3 rounded-xl font-medium transition-all"
                >
                  <Send className="w-4 h-4" />
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <input type="hidden" name="_subject" value="New Contact Form Submission - NSS Auto Web" />
                <input type="hidden" name="_captcha" value="false" />
                
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="form-group">
                    <label className="block text-sm font-medium text-foreground mb-2">Name</label>
                    <input 
                      name="name" 
                      type="text" 
                      required 
                      placeholder="Your name"
                      className="w-full px-4 py-3 bg-muted border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all origin-center" 
                    />
                  </div>
                  <div className="form-group">
                    <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                    <input 
                      name="email" 
                      type="email" 
                      required 
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 bg-muted border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all origin-center" 
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                  <input 
                    name="phone" 
                    type="tel" 
                    placeholder="Your phone number"
                    className="w-full px-4 py-3 bg-muted border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all origin-center" 
                  />
                </div>
                
                <div className="form-group">
                  <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                  <textarea 
                    name="message" 
                    rows={5} 
                    required 
                    placeholder="Tell us about your vehicle and what service you need..."
                    className="w-full px-4 py-3 bg-muted border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none origin-center"
                  />
                </div>
                
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full bg-primary text-primary-foreground py-4 px-6 rounded-xl font-semibold hover:bg-primary/90 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Info Cards */}
          <div ref={cardsRef} className="space-y-4">
            {[
              {
                icon: MapPin,
                title: "Location",
                content: "Negombo - Colombo Main Rd, Ja-Ela"
              },
              {
                icon: Phone,
                title: "Phone",
                content: "+94 71 618 8187",
                href: "tel:+94716188187"
              },
              {
                icon: Mail,
                title: "Email",
                content: "info@nssauto.lk",
                href: "mailto:info@nssauto.lk"
              },
              {
                icon: Clock,
                title: "Working Hours",
                content: "Mon - Sat: 8:30am - 6:00pm",
                subContent: "Sunday: Closed"
              }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div 
                  key={idx}
                  className="group bg-card border border-border rounded-xl p-5 hover:border-primary/50 transition-all duration-300 cursor-pointer hover:-translate-x-2 hover:shadow-lg hover:shadow-primary/10"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                      <Icon size={22} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{item.title}</h4>
                      {item.href ? (
                        <a href={item.href} className="text-muted-foreground hover:text-primary transition-colors font-medium">
                          {item.content}
                        </a>
                      ) : (
                        <p className="text-muted-foreground">{item.content}</p>
                      )}
                      {item.subContent && (
                        <p className="text-sm text-muted-foreground/70 mt-0.5">{item.subContent}</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
