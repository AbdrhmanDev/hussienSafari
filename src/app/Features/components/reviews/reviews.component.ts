import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import {
  Review,
  ReviewPhoto,
  RatingDistribution,
  ReviewsService,
} from '../../services/reviews.service';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [
    CommonModule,
    RatingModule,
    FormsModule,
    ButtonModule,
    DropdownModule,
  ],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss',
})
export class ReviewsComponent implements OnInit {
  @Input() tripId: number = 0;

  reviews: Review[] = [];
  travelerPhotos: ReviewPhoto[] = [];
  selectedPhoto: ReviewPhoto | null = null;
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

  constructor(private reviewsService: ReviewsService) {}

  ngOnInit(): void {
    if (this.tripId) {
      this.loadReviews();
    }
  }

  loadReviews(): void {
    // Get reviews for this trip
    this.reviewsService.getReviewsByTripId(this.tripId).subscribe((reviews) => {
      this.reviews = reviews;
    });

    // Get traveler photos
    this.reviewsService
      .getAllTravelerPhotos(this.tripId)
      .subscribe((photos) => {
        this.travelerPhotos = photos;
      });

    // Get rating distribution
    this.reviewsService
      .getRatingDistribution(this.tripId)
      .subscribe((distribution) => {
        this.ratingDistribution = distribution;
      });

    // Get average rating
    this.reviewsService.getAverageRating(this.tripId).subscribe((rating) => {
      this.averageRating = rating;
    });
  }

  // Open photo viewer
  openPhotoViewer(photo: ReviewPhoto): void {
    this.selectedPhoto = photo;
  }

  // Close photo viewer
  closePhotoViewer(): void {
    this.selectedPhoto = null;
  }

  // Mark review as helpful or not helpful
  markHelpful(reviewId: number, isHelpful: boolean): void {
    this.reviewsService
      .markReviewHelpful(reviewId, isHelpful)
      .subscribe((success) => {
        if (success) {
          // Reload reviews to get updated helpful counts
          this.loadReviews();
        }
      });
  }
}
