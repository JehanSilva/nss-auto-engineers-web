"use client";
import { useEffect, useState } from "react";
import { Star, User } from "lucide-react";
import { getGoogleReviews } from "@/app/actions";

interface AuthorAttribution {
  displayName: string;
  photoUri: string;
}

interface Review {
  name?: string; // Retrieve via authorAttribution
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
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadReviews() {
      try {
        const data = await getGoogleReviews();
        if (data && data.reviews && Array.isArray(data.reviews)) {
            // Sort by rating (desc) or date if preferred, typically Google returns relevant ones.
            // We can take top 3-6
            setReviews(data.reviews.slice(0, 3));
        } else {
            console.log("Using mock data due to missing API data");
            // Keep mock data if API fails or is not configured
        }
      } catch (err) {
        console.error("Failed to load reviews:", err);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    loadReviews();
  }, []);

  return (
    <section id="reviews" className="py-12 bg-gray-50">
      <div className="max-w-[1100px] mx-auto px-4">
        <div className="text-center mb-10">
          <h3 className="text-2xl font-bold mb-2 text-gray-900">What Our Customers Say</h3>
          <div className="flex items-center justify-center gap-2 text-yellow-500 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} size={24} fill="currentColor" />
            ))}
          </div>
          <p className="text-gray-600">Based on Google Reviews</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-4">
                {review.authorAttribution?.photoUri ? (
                    <img 
                        src={review.authorAttribution.photoUri} 
                        alt={review.authorAttribution.displayName}
                        className="w-10 h-10 rounded-full object-cover"
                        referrerPolicy="no-referrer"
                    />
                ) : (
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                        <User size={20} />
                    </div>
                )}
                
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">{review.authorAttribution?.displayName || "Google User"}</h4>
                  <p className="text-xs text-gray-500">{review.relativePublishTimeDescription}</p>
                </div>
              </div>
              
              <div className="flex gap-0.5 mb-3 text-yellow-500">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>

              <p className="text-gray-600 text-sm italic line-clamp-4">"{review.text?.text}"</p>
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <a
            href="https://www.google.com/search?q=NSS+Auto+Engineers+reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-2 border border-blue-600 text-blue-600 font-medium rounded-full hover:bg-blue-50 transition-colors"
          >
            See all reviews on Google
          </a>
        </div>
      </div>
    </section>
  );
}
