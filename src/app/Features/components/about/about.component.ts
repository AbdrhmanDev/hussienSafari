import { Component, OnInit, HostListener } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    ButtonModule,
    CommonModule,
    CardModule,
    DividerModule,
    CarouselModule,
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent implements OnInit {
  yearsExperience: number = 0;
  successfulTrips: number = 0;
  happyCustomers: number = 0;
  isVisible = false;

  ngOnInit() {
    this.animateCounters();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const element = document.querySelector('.stats-section');
    if (element) {
      const position = element.getBoundingClientRect();
      if (position.top < window.innerHeight && position.bottom >= 0) {
        this.isVisible = true;
        this.animateCounters();
      }
    }
  }

  animateCounters() {
    const animationDuration = 2000; // 2 seconds
    const steps = 50;

    const yearsFinal = 8;
    const tripsFinal = 500;
    const customersFinal = 1500;

    const yearsIncrement = yearsFinal / steps;
    const tripsIncrement = tripsFinal / steps;
    const customersIncrement = customersFinal / steps;

    const interval = setInterval(() => {
      this.yearsExperience = Math.min(
        this.yearsExperience + yearsIncrement,
        yearsFinal
      );
      this.successfulTrips = Math.min(
        this.successfulTrips + tripsIncrement,
        tripsFinal
      );
      this.happyCustomers = Math.min(
        this.happyCustomers + customersIncrement,
        customersFinal
      );

      if (
        this.yearsExperience >= yearsFinal &&
        this.successfulTrips >= tripsFinal &&
        this.happyCustomers >= customersFinal
      ) {
        clearInterval(interval);
      }
    }, animationDuration / steps);
  }

  goToJourneys(): void {
    // Navigate to journey section or route
    console.log('Navigating to journeys...');
    // e.g. this.router.navigate(['/journeys']);
  }

  contactGuide(): void {
    // Open contact page or form
    console.log('Opening contact form...');
    // e.g. this.router.navigate(['/contact']);
  }
}
