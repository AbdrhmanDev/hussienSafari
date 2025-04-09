import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface ReviewPhoto {
  id: number;
  url: string;
  caption?: string;
  uploadedBy: string;
  uploadDate: string;
}

export interface Review {
  id: number;
  tripId: number;
  userId: string;
  userName: string;
  userAvatar?: string;
  date: string;
  rating: number;
  comment: string;
  helpful: number;
  notHelpful: number;
  photos?: ReviewPhoto[];
}

export interface RatingDistribution {
  rating: number;
  count: number;
  percentage: number;
}

@Injectable({
  providedIn: 'root',
})
export class ReviewsService {
  private mockReviews: Review[] = [
    {
      id: 1,
      tripId: 1,
      userId: 'user1',
      userName: 'John Doe',
      userAvatar: 'assets/sliderimages/image1.jpg',
      date: '2024-01-15',
      rating: 5,
      comment:
        'Amazing safari experience! The guides were knowledgeable and we saw incredible wildlife. Would definitely recommend this trip to anyone looking for an authentic safari adventure.',
      helpful: 24,
      notHelpful: 2,
      photos: [
        {
          id: 1,
          url: 'assets/sliderimages/image1.jpg',
          caption: 'Spotted a lion!',
          uploadedBy: 'John Doe',
          uploadDate: '2024-01-15',
        },
        {
          id: 2,
          url: 'assets/sliderimages/image2.jpg',
          caption: 'Beautiful sunset',
          uploadedBy: 'John Doe',
          uploadDate: '2024-01-15',
        },
      ],
    },
    {
      id: 2,
      tripId: 1,
      userId: 'user2',
      userName: 'Jane Smith',
      userAvatar: 'assets/sliderimages/image2.jpg',
      date: '2024-01-10',
      rating: 4,
      comment:
        'Great trip overall. The accommodations were comfortable and the scenery was breathtaking. The only downside was that the trip felt a bit rushed at times.',
      helpful: 18,
      notHelpful: 3,
      photos: [
        {
          id: 3,
          url: 'assets/sliderimages/image3.jpg',
          caption: 'Amazing landscape',
          uploadedBy: 'Jane Smith',
          uploadDate: '2024-01-10',
        },
      ],
    },
    {
      id: 3,
      tripId: 1,
      userId: 'user3',
      userName: 'Mike Johnson',
      userAvatar: 'assets/sliderimages/image3.jpg',
      date: '2024-01-05',
      rating: 5,
      comment:
        'Once in a lifetime experience! The staff was professional and the wildlife sightings were spectacular. Our guide was extremely knowledgeable about the local ecosystem.',
      helpful: 32,
      notHelpful: 1,
      photos: [
        {
          id: 4,
          url: 'assets/sliderimages/image1.jpg',
          caption: 'Elephants at the watering hole',
          uploadedBy: 'Mike Johnson',
          uploadDate: '2024-01-05',
        },
        {
          id: 5,
          url: 'assets/sliderimages/image2.jpg',
          caption: 'Our safari vehicle',
          uploadedBy: 'Mike Johnson',
          uploadDate: '2024-01-05',
        },
      ],
    },
    {
      id: 4,
      tripId: 1,
      userId: 'user4',
      userName: 'Sarah Wilson',
      userAvatar: 'assets/sliderimages/image2.jpg',
      date: '2024-01-01',
      rating: 4,
      comment:
        'Wonderful adventure with great attention to detail. Would highly recommend! The food was excellent and the accommodations exceeded my expectations.',
      helpful: 15,
      notHelpful: 2,
      photos: [],
    },
    {
      id: 5,
      tripId: 1,
      userId: 'user5',
      userName: 'David Brown',
      userAvatar: 'assets/sliderimages/image1.jpg',
      date: '2023-12-28',
      rating: 3,
      comment:
        'The safari itself was good, but there were some organizational issues. Our pickup was late and the schedule changed without notice.',
      helpful: 8,
      notHelpful: 4,
      photos: [
        {
          id: 6,
          url: 'assets/sliderimages/image3.jpg',
          caption: 'Beautiful scenery despite the issues',
          uploadedBy: 'David Brown',
          uploadDate: '2023-12-28',
        },
      ],
    },
    {
      id: 6,
      tripId: 2,
      userId: 'user6',
      userName: 'Emily Davis',
      userAvatar: 'assets/sliderimages/image3.jpg',
      date: '2023-12-20',
      rating: 5,
      comment:
        'Absolutely fantastic experience from start to finish! Our guide was exceptional and went above and beyond to ensure we had the best safari experience possible.',
      helpful: 27,
      notHelpful: 0,
      photos: [
        {
          id: 7,
          url: 'assets/sliderimages/image2.jpg',
          caption: 'Giraffes at sunset',
          uploadedBy: 'Emily Davis',
          uploadDate: '2023-12-20',
        },
      ],
    },
  ];

  constructor() {}

  getReviewsByTripId(tripId: number): Observable<Review[]> {
    const reviews = this.mockReviews.filter(
      (review) => review.tripId === tripId
    );
    return of(reviews);
  }

  getAllTravelerPhotos(tripId: number): Observable<ReviewPhoto[]> {
    const photos: ReviewPhoto[] = [];
    this.mockReviews
      .filter((review) => review.tripId === tripId && review.photos)
      .forEach((review) => {
        if (review.photos) {
          photos.push(...review.photos);
        }
      });
    return of(photos);
  }

  getRatingDistribution(tripId: number): Observable<RatingDistribution[]> {
    const reviews = this.mockReviews.filter(
      (review) => review.tripId === tripId
    );
    const totalReviews = reviews.length;

    // Initialize distribution with 0 counts for all ratings
    const distribution: RatingDistribution[] = [
      { rating: 5, count: 0, percentage: 0 },
      { rating: 4, count: 0, percentage: 0 },
      { rating: 3, count: 0, percentage: 0 },
      { rating: 2, count: 0, percentage: 0 },
      { rating: 1, count: 0, percentage: 0 },
    ];

    // Count reviews for each rating
    reviews.forEach((review) => {
      const ratingIndex = 5 - review.rating;
      if (ratingIndex >= 0 && ratingIndex < 5) {
        distribution[ratingIndex].count++;
      }
    });

    // Calculate percentages
    distribution.forEach((item) => {
      item.percentage =
        totalReviews > 0 ? (item.count / totalReviews) * 100 : 0;
    });

    return of(distribution);
  }

  getAverageRating(tripId: number): Observable<number> {
    const reviews = this.mockReviews.filter(
      (review) => review.tripId === tripId
    );
    if (reviews.length === 0) return of(0);

    const sum = reviews.reduce((total, review) => total + review.rating, 0);
    return of(parseFloat((sum / reviews.length).toFixed(1)));
  }

  markReviewHelpful(reviewId: number, helpful: boolean): Observable<boolean> {
    const reviewIndex = this.mockReviews.findIndex((r) => r.id === reviewId);
    if (reviewIndex === -1) return of(false);

    if (helpful) {
      this.mockReviews[reviewIndex].helpful++;
    } else {
      this.mockReviews[reviewIndex].notHelpful++;
    }

    return of(true);
  }

  addReview(
    review: Omit<Review, 'id' | 'helpful' | 'notHelpful'>
  ): Observable<Review> {
    // Generate a new ID (highest ID + 1)
    const newId = Math.max(...this.mockReviews.map((r) => r.id), 0) + 1;

    // Create the new review object
    const newReview: Review = {
      ...review,
      id: newId,
      helpful: 0,
      notHelpful: 0,
      date: new Date().toISOString().split('T')[0], // Format as YYYY-MM-DD
    };

    // Add to the mock reviews array
    this.mockReviews.push(newReview);

    return of(newReview);
  }

  addReviewPhoto(
    reviewId: number,
    photo: Omit<ReviewPhoto, 'id'>
  ): Observable<ReviewPhoto> {
    const reviewIndex = this.mockReviews.findIndex((r) => r.id === reviewId);
    if (reviewIndex === -1) return of(null as unknown as ReviewPhoto);

    // Initialize photos array if it doesn't exist
    if (!this.mockReviews[reviewIndex].photos) {
      this.mockReviews[reviewIndex].photos = [];
    }

    // Generate a new photo ID
    const newPhotoId = this.mockReviews[reviewIndex].photos?.length
      ? Math.max(...this.mockReviews[reviewIndex].photos!.map((p) => p.id), 0) +
        1
      : 1;

    const newPhoto: ReviewPhoto = {
      ...photo,
      id: newPhotoId,
    };

    // Add the photo to the review
    this.mockReviews[reviewIndex].photos!.push(newPhoto);

    return of(newPhoto);
  }
}
