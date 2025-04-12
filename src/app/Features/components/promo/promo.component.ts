import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-promo',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './promo.component.html',
  styleUrls: ['./promo.component.scss'],
})
export class PromoComponent implements AfterViewInit {
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;
  isMuted: boolean = true; // Initial state: muted

  ngAfterViewInit(): void {
    const video = this.videoPlayer?.nativeElement;
    if (video) {
      video.muted = this.isMuted; // Mute the video on load

      // Handle video error (e.g., video not found)
      video.addEventListener('error', () => {
        video.style.display = 'none';
        const section = document.querySelector('.promo-section') as HTMLElement;
        if (section) {
          section.style.backgroundImage = 'url("assets/desert.jpg")';
          section.style.backgroundSize = 'cover';
          section.style.backgroundPosition = 'center';
        }
      });
    }
  }

  toggleMute(): void {
    const video = this.videoPlayer.nativeElement;
    this.isMuted = !this.isMuted; // Toggle mute state
    video.muted = this.isMuted; // Update video's muted property
  }
}