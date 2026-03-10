"use client";
import { useEffect, useState, useRef } from "react";
import { Star, User, Quote, ExternalLink } from "lucide-react";
import { getGoogleReviews } from "@/app/actions";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AuthorAttribution {
  displayName: string;
  photoUri: string;
}

interface Review {
  name?: string;
  relativePublishTimeDescription: string;
  rating: number;
  text: { text: string };
  authorAttribution: AuthorAttribution;
}

const mockReviews = [
  {
    authorAttribution: { displayName: "Sanath Perera", photoUri: "" },
    relativePublishTimeDescription: "2 months ago",
    rating: 5,
    text: { text: "Excellent service! They identified the issue with my hybrid battery quickly and fixed it at a reasonable cost. Highly recommended for hybrid repairs." },
  },
  {
    authorAttribution: { displayName: "Mohamed Riaz", photoUri: "" },
    relativePublishTimeDescription: "1 month ago",
    rating: 5,
    text: { text: "One of the best places in the area for auto parts. They have a wide range of genuine spare parts for Toyota and Honda. Very helpful staff." },
  },
  {
    authorAttribution: { displayName: "Kasun Jayasuriya", photoUri: "" },
    relativePublishTimeDescription: "3 weeks ago",
    rating: 5,
    text: { text: "Great experience. Professional mechanics and transparent pricing. My car runs perfectly now after the full service." },
  },
];

export default function GoogleReviews() {
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [isLoading, setIsLoading] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

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

      // Stars rating animation
      const stars = headerRef.current?.querySelectorAll(".star-icon");
      if (stars) {
        gsap.from(stars, {
          scale: 0,
          rotation: -180,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%"
          }
        });
      }

      // Cards animation with 3D flip
      const cards = cardsRef.current?.children;
      if (cards) {
        gsap.set(cards, {
          opacity: 0,
          rotateY: -45,
          y: 60,
          transformPerspective: 1000,
          transformOrigin: "center center"
        });

        gsap.to(cards, {
          opacity: 1,
          rotateY: 0,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%"
          }
        });

        // Hover effects
        Array.from(cards).forEach((card) => {
          const el = card as HTMLElement;
          const quoteIcon = el.querySelector(".quote-icon");
          
          el.addEventListener("mouseenter", () => {
            gsap.to(el, {
              y: -10,
              scale: 1.02,
              duration: 0.3,
              ease: "power2.out"
            });
            if (quoteIcon) {
              gsap.to(quoteIcon, {
                scale: 1.2,
                rotation: 15,
                duration: 0.3,
                ease: "back.out(1.7)"
              });
            }
          });
          
          el.addEventListener("mouseleave", () => {
            gsap.to(el, {
              y: 0,
              scale: 1,
              duration: 0.3,
              ease: "power2.out"
            });
            if (quoteIcon) {
              gsap.to(quoteIcon, {
                scale: 1,
                rotation: 0,
                duration: 0.3,
                ease: "power2.out"
              });
            }
          });
        });
      }

      // CTA animation
      gsap.from(ctaRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 90%"
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reviews]);

  useEffect(() => {
    async function loadReviews() {
      try {
        const data = await getGoogleReviews();
        if (data && data.reviews && Array.isArray(data.reviews)) {
          setReviews(data.reviews.slice(0, 3));
        }
      } catch (err) {
        console.error("Failed to load reviews:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadReviews();
  }, []);

  return (
    <section ref={sectionRef} id="reviews" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-background to-muted/20" />
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -translate-y-1/2" />
      
      <div className="relative max-w-[1100px] mx-auto px-4">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            What Our <span className="text-gradient">Customers Say</span>
          </h2>
          <div className="flex items-center justify-center gap-1 mb-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} size={24} className="star-icon text-yellow-500 fill-yellow-500" />
            ))}
          </div>
          <p className="text-muted-foreground text-lg">Based on Google Reviews</p>
        </div>

        {/* Reviews Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6" style={{ perspective: "1000px" }}>
          {reviews.map((review, idx) => (
            <div
              key={idx}
              className="group relative bg-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-colors duration-300 cursor-pointer"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Quote Icon */}
              <div className="quote-icon absolute -top-3 -left-3 w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg">
                <Quote size={18} className="text-primary-foreground" />
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3 mb-4 pt-2">
                {review.authorAttribution?.photoUri ? (
                  <img 
                    src={review.authorAttribution.photoUri} 
                    alt={review.authorAttribution.displayName}
                    className="w-12 h-12 rounded-full object-cover border-2 border-border"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center border-2 border-border">
                    <User size={24} className="text-muted-foreground" />
                  </div>
                )}
                
                <div>
                  <h4 className="font-bold text-foreground">{review.authorAttribution?.displayName || "Google User"}</h4>
                  <p className="text-xs text-muted-foreground">{review.relativePublishTimeDescription}</p>
                </div>
              </div>
              
              {/* Rating Stars */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={16} className="text-yellow-500 fill-yellow-500" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-muted-foreground text-sm leading-relaxed line-clamp-4">
                &ldquo;{review.text?.text}&rdquo;
              </p>

              {/* Hover Glow */}
              <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>
          ))}
        </div>
        
        {/* CTA */}
        <div ref={ctaRef} className="mt-12 text-center">
          <a
            href="https://www.google.com/search?q=NSS+Auto+Engineers+reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-6 py-3 bg-card border border-border rounded-xl text-foreground font-medium hover:border-primary/50 hover:text-primary transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10"
          >
            <span>See all reviews on Google</span>
            <ExternalLink size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
