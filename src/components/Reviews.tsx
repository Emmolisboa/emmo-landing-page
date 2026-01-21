"use client";

import { Star } from "lucide-react";

interface Review {
  id: string;
  name: string;
  event: string;
  rating: number;
  comment: string;
  date?: string;
}

// Add your reviews here
const reviews: Review[] = [
  {
    id: "1",
    name: "Sarah & John",
    event: "Wedding Reception",
    rating: 5,
    comment: "Love love love! Emmo made our wedding reception absolutely perfect! His acoustic set during our drinks reception was beautiful, and then he really got the party started later in the evening. Professional, talented, and so easy to work with. Can't recommend enough!",
    date: "2024",
  },
  {
    id: "2",
    name: "The O'Sullivan Family",
    event: "Private Event",
    rating: 5,
    comment: "We hired Emmo for a family gathering and he was fantastic. He read the room perfectly, adjusting his set to match the mood. Great mix of songs and wonderful vocals. Everyone was asking where we found him! Honestly, couldn't have asked for better!",
    date: "2024",
  },
  {
    id: "5",
    name: "Emma & David",
    event: "Wedding Ceremony",
    rating: 5,
    comment: "Having Emmo perform at our wedding ceremony was one of the best decisions we made! His acoustic performance was beautiful - WHAT A VOICE!! created such a special atmosphere. There was no song he couldnt play when we were organsing the setlist - it really put us at ease when planning. All our guests commented on how wonderful he was. Thank you so much for making our day even more memorable!",
    date: "2025",
  },
  {
    id: "6",
    name: "The Murphy Family",
    event: "Birthday Celebration",
    rating: 5,
    comment: "Emmo performed at our 50th birthday celebration and he was absolutely brilliant! Great song selection, fantastic voice, and he really got everyone involved. The energy in the room was incredible. Would book again in a heartbeat - honestly, he made the night!",
    date: "2025",
  },
  {
    id: "4",
    name: "PWC Cork",
    event: "Summer BBQ",
    rating: 5,
    comment: "Emmo has played at several of our summer events and we keep booking him because he’s reliable and consistent. He understands the flow of the evening and adapts easily around schedules and networking. Always professional and easy to work with.",
    date: "2025",
  },
  {
    id: "7",
    name: "Claire & Jack",
    event: "Wedding Ceremony & Day 2",
    rating: 5,
    comment: "Emmo played at both our wedding ceremony and Day 2 celebrations, and he absolutely had the whole place rocking! He was incredible - such a talent! really got everyone up and dancing. We're sure we'll see him again for a future event! Can't recommend enough!",
    date: "2025",
  },
  // Add more reviews as needed
];

export default function Reviews() {
  // Helper function to escape HTML entities in review comments
  const escapeHtml = (text: string) => {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  };

  return (
    <section
      id="reviews"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white font-fingermade">
            WHAT PEOPLE SAY
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Reviews from past performances and events
          </p>
        </div>

        <div className="overflow-x-auto pb-4 -mx-4 px-4 scroll-smooth hide-scrollbar">
          <div className="flex gap-6 min-w-max md:min-w-0 md:grid md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 md:p-8 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex-shrink-0 w-80 md:w-auto md:flex-shrink"
              >
              {/* Rating Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < review.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-gray-200 dark:fill-gray-700 text-gray-200 dark:text-gray-700"
                    }`}
                  />
                ))}
              </div>

              {/* Review Comment */}
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                {'"'}{escapeHtml(review.comment)}{'"'}
              </p>

              {/* Reviewer Info */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <p className="font-semibold text-gray-900 dark:text-white">
                  {review.name}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {review.event}
                  {review.date && ` • ${review.date}`}
                </p>
              </div>
            </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Have you worked with Emmo? We{'\''}d love to hear from you!
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            Leave a Review
          </a>
        </div>
      </div>
    </section>
  );
}
