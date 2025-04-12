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
  @ViewChild('videoPlayer') videoPlayer!: ElementRef;
  isMuted = true;

  toggleSound() {
    const video = this.videoPlayer.nativeElement;
    this.isMuted = !this.isMuted;
    video.muted = this.isMuted;
  }

  ngAfterViewInit() {
    // Ensure video is loaded properly
    const video = document.querySelector('.parallax-video') as HTMLVideoElement;
    if (video) {
      video.addEventListener('error', (e) => {
        console.error('Video error:', e);
        // Fallback to a static background if video fails
        video.style.display = 'none';
        const section = document.querySelector(
          '.parallax-section'
        ) as HTMLElement;
        if (section) {
          section.style.backgroundImage = 'url("assets/desert.jpg")';
          section.style.backgroundSize = 'cover';
          section.style.backgroundPosition = 'center';
        }
      });
    }

    // Parallax effect on scroll
    window.addEventListener('scroll', () => {
      const parallaxVideo = document.querySelector(
        '.parallax-video'
      ) as HTMLVideoElement;
      const parallaxContent = document.querySelector(
        '.parallax-overlay .content'
      ) as HTMLElement;

      if (parallaxVideo && parallaxContent) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;

        parallaxVideo.style.transform = `translate3d(-50%, -${
          50 + rate * 0.1
        }%, 0)`;
        parallaxContent.style.transform = `translateY(${rate * 0.2}px)`;
      }
    });
  }
}
