import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import {
  ReviewPhoto,
  RatingDistribution,
  ReviewsService,
  Review,
} from '../../services/reviews.service';
import { AddReviewsComponent } from './add-reviews/add-reviews.component';
import { GalleriaModule } from 'primeng/galleria';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [
    CommonModule,
    RatingModule,
    FormsModule,
    ButtonModule,
    DropdownModule,
    AddReviewsComponent,
    GalleriaModule,
  ],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss',
})
export class ReviewsComponent implements OnInit {
  @Input() tripId: number = 0;

  reviews: Review[] = [];
  travelerPhotos: ReviewPhoto[] = [];
  selectedPhoto: ReviewPhoto | null = null;
  showAddReviewForm: boolean = false;
  ratingDistribution: RatingDistribution[] = [];
  averageRating: number = 0;

  // Filter options
  ratingFilterOptions = [
    { label: 'All Ratings', value: null },
    { label: '5 Stars', value: 5 },
    { label: '4 Stars', value: 4 },
    { label: '3 Stars', value: 3 },
    { label: '2 Stars', value: 2 },
    { label: '1 Star', value: 1 },
  ];

  timeFilterOptions = [
    { label: 'Any Time', value: null },
    { label: 'Jan-Mar', value: 'Q1' },
    { label: 'Apr-Jun', value: 'Q2' },
    { label: 'Jul-Sep', value: 'Q3' },
    { label: 'Oct-Dec', value: 'Q4' },
  ];

  travelerFilterOptions = [
    { label: 'All Travelers', value: null },
    { label: 'Families', value: 'family' },
    { label: 'Couples', value: 'couple' },
    { label: 'Solo', value: 'solo' },
    { label: 'Business', value: 'business' },
    { label: 'Friends', value: 'friends' },
  ];

  galleriaResponsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 5,
    },
    {
      breakpoint: '768px',
      numVisible: 3,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
    },
  ];

  constructor(private reviewsService: ReviewsService) {}

  ngOnInit(): void {
    if (this.tripId) {
      this.loadReviews();
    }
  }

  loadReviews(): void {
    this.reviewsService.getReviewsByTripId(this.tripId).subscribe((reviews) => {
      this.reviews = reviews;
      this.updateRatings();
    });
  }

  private updateRatings(): void {
    this.reviewsService
      .getRatingDistribution(this.tripId)
      .subscribe((distribution) => {
        this.ratingDistribution = distribution;
      });

    this.reviewsService.getAverageRating(this.tripId).subscribe((rating) => {
      this.averageRating = rating;
    });
  }

  // Open photo viewer
  openPhotoViewer(photo: ReviewPhoto): void {
    this.selectedPhoto = photo;
  }

  // Toggle add review form
  toggleAddReviewForm(): void {
    this.showAddReviewForm = !this.showAddReviewForm;
  }

  // Handle new review added
  onReviewAdded(newReview: Review): void {
    // Refresh the entire reviews list
    this.loadReviews();

    // Update traveler photos if new photos were added
    if (newReview.photos?.length) {
      this.reviewsService
        .getAllTravelerPhotos(this.tripId)
        .subscribe((photos) => {
          this.travelerPhotos = photos;
        });
    }
  }

  // Close photo viewer
  closePhotoViewer(): void {
    this.selectedPhoto = null;
  }

  // Mark review as helpful or not helpful
  markHelpful(reviewId: number | string, isHelpful: boolean): void {
    const review = this.reviews.find((r) => r.id === reviewId);
    if (!review) return;

    // If user already voted, remove the previous vote
    if (review.userVote) {
      if (review.userVote === 'helpful') {
        review.helpful = (review.helpful || 1) - 1;
      } else {
        review.notHelpful = (review.notHelpful || 1) - 1;
      }
    }

    // Toggle vote if clicking the same button
    if (review.userVote === (isHelpful ? 'helpful' : 'not-helpful')) {
      review.userVote = undefined;
      return;
    }

    // Apply new vote
    if (isHelpful) {
      review.helpful = (review.helpful || 0) + 1;
      review.userVote = 'helpful';
    } else {
      review.notHelpful = (review.notHelpful || 0) + 1;
      review.userVote = 'not-helpful';
    }
  }
}
