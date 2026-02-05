"use server";

export async function getGoogleReviews() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.NEXT_PUBLIC_PLACE_ID;

  if (!apiKey || !placeId) {
    console.error("Missing Google Places API Key or Place ID");
    return { error: "Configuration missing" };
  }

  try {
    // https://developers.google.com/maps/documentation/places/web-service/place-details
    const response = await fetch(
      `https://places.googleapis.com/v1/places/${placeId}?fields=reviews,rating,userRatingCount,displayName&key=${apiKey}`,
      { next: { revalidate: 3600 } } // Revalidate every hour
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Google Places API functionality failed:", response.status, errorText);
      throw new Error(`Failed to fetch reviews: ${response.status}`);
    }

    const data = await response.json();
    return {
      reviews: data.reviews,
      rating: data.rating,
      total: data.userRatingCount,
      displayName: data.displayName?.text
    };
  } catch (error) {
    console.error("Error fetching Google reviews:", error);
    return { error: "Failed to fetch reviews" };
  }
}
