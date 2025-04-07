import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';

interface Tour {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CarouselModule, ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  sliderImages = [
    '/sliderimages/image1.jpg',
    '/sliderimages/image2.jpg',
    '/sliderimages/image3.jpg',
  ];

  featuredTours: Tour[] = [
    {
      id: 1,
      title: 'Wildlife Safari Adventure',
      description:
        'Experience an unforgettable 3-day safari through the heart of wildlife territory.',
      price: 599,
      image: '/sliderimages/image1.jpg',
    },
    {
      id: 2,
      title: 'Sunset Desert Safari',
      description:
        'Enjoy a magical evening in the desert with dinner and traditional entertainment.',
      price: 299,
      image: '/sliderimages/image2.jpg',
    },
    {
      id: 3,
      title: 'Mountain Safari Expedition',
      description:
        'Discover breathtaking mountain landscapes and rare wildlife species.',
      price: 799,
      image: '/sliderimages/image3.jpg',
    },
  ];

  ngOnInit() {}
}
