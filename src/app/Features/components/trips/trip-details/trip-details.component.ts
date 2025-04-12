import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleriaModule } from 'primeng/galleria';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { TagModule } from 'primeng/tag';
import { ActivatedRoute } from '@angular/router';
import { Trip, TripsService } from '../../../services/trips.service';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DropdownModule } from 'primeng/dropdown';
import { ReviewsComponent } from '../../reviews/reviews.component';
import { AddReviewsComponent } from '../../reviews/add-reviews/add-reviews.component';
import { Review } from '../../../services/reviews.service';
import 'primeicons/primeicons.css';

@Component({
  selector: 'app-trip-details',
  standalone: true,
  imports: [
    CommonModule,
    GalleriaModule,
    CardModule,
    ButtonModule,
    RatingModule,
    FormsModule,
    TagModule,
    CalendarModule,
    InputNumberModule,
    OverlayPanelModule,
    DropdownModule,
    ReviewsComponent,
    AddReviewsComponent,
  ],
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.scss'],
})
export class TripDetailsComponent implements OnInit {
  trip: Trip | undefined;
  images: { type: 'image'; url: string }[] = []; // Array for images
  videos: { type: 'video'; url: string }[] = []; // Array for videos
  activeVideo: string | null = null; // Track the currently playing video
  currentIndex = 0;
  showReviewForm = false; // Control the visibility of the floating review form

  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 4,
      thumbnailsPosition: 'left',
    },
    {
      breakpoint: '768px',
      numVisible: 3,
      thumbnailsPosition: 'bottom',
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      thumbnailsPosition: 'bottom',
    },
  ];

  selectedDate: Date = new Date();
  minDate: Date = new Date();
  adults: number = 2;
  children: number = 0;

  get totalTravelers(): number {
    return this.adults + this.children;
  }

  constructor(
    private route: ActivatedRoute,
    private tripsService: TripsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const tripId = Number(params['id']);
      this.trip = this.tripsService.getTripById(tripId);
      if (this.trip) {
        // Ensure media is filtered correctly
        this.images = this.trip.media.filter(
          (item): item is { type: 'image'; url: string } =>
            item.type === 'image'
        );
        this.videos = this.trip.media.filter(
          (item): item is { type: 'video'; url: string } =>
            item.type === 'video'
        );
        if (this.videos.length > 0) {
          this.activeVideo = this.videos[0].url; // Set the first video as active by default
        }
      }
    });
  }

  playVideo(url: string): void {
    this.activeVideo = url; // Set the active video URL
    const videoElement = document.querySelector(
      `video[src="${url}"]`
    ) as HTMLVideoElement;
    if (videoElement) {
      videoElement.play(); // Play the video programmatically
    }
  }
  showHeroVideo = false;

  playHeroVideo() {
    this.showHeroVideo = true;
  }

  closeHeroVideo() {
    this.showHeroVideo = false;
  }

  toggleReviewForm(): void {
    this.showReviewForm = !this.showReviewForm;
    // Add a class to the body to prevent scrolling when the form is open
    if (this.showReviewForm) {
      document.body.classList.add('review-form-open');
    } else {
      document.body.classList.remove('review-form-open');
    }
  }

  onReviewAdded(review: Review): void {
    // Close the review form after submission
    this.showReviewForm = false;
    document.body.classList.remove('review-form-open');

    // Show a success notification
    this.showSuccessNotification();
  }

  showSuccessNotification(): void {
    const notification = document.createElement('div');
    notification.className = 'notification success';
    notification.innerHTML = `
      <div class="notification-content">
        <div class="notification-icon">
          <i class="pi pi-check-circle"></i>
        </div>
        <div class="notification-text">
          <h4>Success!</h4>
          <p>Your review has been added successfully</p>
        </div>
      </div>
    `;

    document.body.appendChild(notification);

    // Force reflow
    notification.offsetHeight;

    // Add show class
    notification.classList.add('show');

    // Remove notification after animation
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }

  stopVideo(): void {
    if (this.activeVideo) {
      const videoElement = document.querySelector(
        `video[src="${this.activeVideo}"]`
      ) as HTMLVideoElement;
      if (videoElement) {
        videoElement.pause(); // Pause the video programmatically
        videoElement.currentTime = 0; // Reset the video to the beginning
      }
      this.activeVideo = null; // Reset the active video URL
    }
  }

  onVideoPlay(url: string): void {
    console.log(`Video started: ${url}`);
  }

  onVideoPause(url: string): void {
    console.log(`Video paused: ${url}`);
  }

  getVideoThumbnail(videoUrl: string): string {
    // Ensure the thumbnail path is correct
    const basePath = 'assets/videos/'; // Adjust this path to match your project structure
    const videoFileName = videoUrl.split('/').pop()?.replace('.mp4', '.jpg');
    return `${basePath}${videoFileName}`;
  }

  setActiveImage(index: number) {
    this.currentIndex = index;
  }

  prevImage() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  nextImage() {
    if (this.currentIndex < this.images.length - 1) {
      this.currentIndex++;
    }
  }
}
