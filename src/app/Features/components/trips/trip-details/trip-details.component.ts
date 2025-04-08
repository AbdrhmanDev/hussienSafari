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

interface Review {
  userName: string;
  date: string;
  rating: number;
  comment: string;
}

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

  reviews: Review[] = [
    {
      userName: 'John Doe',
      date: '2024-01-15',
      rating: 5,
      comment:
        'Amazing safari experience! The guides were knowledgeable and we saw incredible wildlife.',
    },
    {
      userName: 'Jane Smith',
      date: '2024-01-10',
      rating: 4,
      comment:
        'Great trip overall. The accommodations were comfortable and the scenery was breathtaking.',
    },
    {
      userName: 'Mike Johnson',
      date: '2024-01-05',
      rating: 5,
      comment:
        'Once in a lifetime experience! The staff was professional and the wildlife sightings were spectacular.',
    },
    {
      userName: 'Sarah Wilson',
      date: '2024-01-01',
      rating: 4,
      comment:
        'Wonderful adventure with great attention to detail. Would highly recommend!',
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
