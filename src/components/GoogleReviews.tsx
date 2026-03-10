"use client";
import { useEffect, useState, useRef } from "react";
import { Star, User, Quote, ExternalLink } from "lucide-react";
import { getGoogleReviews } from "@/app/actions";

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
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

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
    <section ref={sectionRef} id="reviews" className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-background to-muted/20" />
      
      <div className="relative max-w-[1100px] mx-auto px-4">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            What Our <span className="text-gradient">Customers Say</span>
          </h2>
          <div className="flex items-center justify-center gap-1 mb-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} size={24} className="text-yellow-500 fill-yellow-500" />
            ))}
          </div>
          <p className="text-muted-foreground">Based on Google Reviews</p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review, idx) => (
            <div
              key={idx}
              className={`group relative bg-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-all duration-500 hover-lift ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${idx * 150}ms` }}
            >
              {/* Quote Icon */}
              <div className="absolute -top-3 -left-3 w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg">
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
        <div className={`mt-12 text-center transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: "450ms" }}>
          <a
            href="https://www.google.com/search?q=NSS+Auto+Engineers+reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-6 py-3 bg-card border border-border rounded-xl text-foreground font-medium hover:border-primary/50 hover:text-primary transition-all"
          >
            <span>See all reviews on Google</span>
            <ExternalLink size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
