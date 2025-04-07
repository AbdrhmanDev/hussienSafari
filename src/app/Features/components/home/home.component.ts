import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { TripsService, Trip } from '../../services/trips.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CarouselModule, ButtonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  sliderImages: string[] = [
    'assets/sliderimages/image1.jpg',
    'assets/sliderimages/image2.jpg',
    'assets/sliderimages/image3.jpg',
  ];

  featuredTours: Trip[] = [];

  constructor(private tripsService: TripsService) {}

  ngOnInit() {
    this.featuredTours = this.tripsService.getFeaturedTrips().slice(0, 3);
  }
}
