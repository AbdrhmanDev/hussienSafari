import { Injectable } from '@angular/core';

export interface Media {
  type: 'image' | 'video'; // Media type
  url: string; // URL of the media
}

export interface Trip {
  id: number;
  title: string;
  description: string;
  price: number;
  pricePerPerson: number;
  image: string;
  duration: string;
  location: string;
  groupSize: string;
  difficulty: string;
  rating: number;
  reviewCount: number;
  endTime: string;
  requiredItems: string[];
  availability: string;
  inclusions: string[];
  exclusions: string[];
  category: string;
  destination: string;
  media: Media[]; // New field for images and videos
}

@Injectable({
  providedIn: 'root',
})
export class TripsService {
  private trips: Trip[] = [
    {
      id: 1,
      title: 'Serengeti Wildlife Safari',
      description:
        "Experience the great migration and witness Africa's most spectacular wildlife in their natural habitat.",
      price: 2499,
      pricePerPerson: 625,
      image: 'sliderimages/image1.jpg', // Updated to public folder
      duration: '7 days',
      location: 'Serengeti National Park',
      groupSize: '4-12 people',
      difficulty: 'Moderate',
      rating: 4.8,
      reviewCount: 203,
      endTime: '6:00 PM',
      requiredItems: ['Binoculars', 'Camera', 'Comfortable Shoes'],
      availability: 'Available Year-Round',
      inclusions: ['Meals', 'Guided Tours', 'Park Fees'],
      exclusions: ['Flights', 'Travel Insurance'],
      category: 'Wildlife',
      destination: 'Tanzania',
      media: [
        { type: 'image', url: 'sliderimages/image1.jpg' }, // Updated
        { type: 'image', url: 'sliderimages/image2.jpg' }, // Updated
        { type: 'video', url: 'videos/vid.mp4' }, // Updated
      ],
    },
    {
      id: 2,
      title: 'Masai Mara Adventure',
      description:
        'Explore the iconic Masai Mara and interact with local Masai communities while spotting the Big Five.',
      price: 1999,
      pricePerPerson: 500,
      image: 'sliderimages/image1.jpg', // Updated to public folder
      duration: '5 days',
      location: 'Masai Mara Reserve',
      groupSize: '6-10 people',
      difficulty: 'Easy',
      rating: 4.9,
      reviewCount: 189,
      endTime: '5:30 PM',
      requiredItems: ['Hat', 'Sunscreen', 'Comfortable Clothing'],
      availability: 'June to October',
      inclusions: ['Meals', 'Accommodation', 'Game Drives'],
      exclusions: ['Flights', 'Personal Expenses'],
      category: 'Adventure',
      destination: 'Kenya',
      media: [
        { type: 'image', url: 'sliderimages/image3.jpg' }, // Updated
        { type: 'video', url: 'videos/vid.mp4' }, // Updated
      ],
    },
    {
      id: 3,
      title: 'Ngorongoro Crater Safari',
      description:
        "Discover the world's largest intact volcanic caldera and its diverse wildlife ecosystem.",
      price: 2199,
      pricePerPerson: 550,
      image: 'sliderimages/image1.jpg', // Updated to public folder
      duration: '4 days',
      location: 'Ngorongoro Conservation Area',
      groupSize: '4-8 people',
      difficulty: 'Easy',
      rating: 4.7,
      reviewCount: 156,
      endTime: '4:00 PM',
      requiredItems: ['Camera', 'Comfortable Shoes'],
      availability: 'Available Year-Round',
      inclusions: ['Meals', 'Guided Tours', 'Park Fees'],
      exclusions: ['Flights', 'Travel Insurance'],
      category: 'Safari',
      destination: 'Tanzania',
      media: [
        { type: 'image', url: 'sliderimages/image3.jpg' }, // Updated
        { type: 'video', url: 'videos/vid.mp4' }, // Updated
      ],
    },
    {
      id: 4,
      title: 'Okavango Delta Expedition',
      description:
        'Navigate through the waterways of the Okavango Delta and camp under the African stars.',
      price: 3299,
      pricePerPerson: 825,
      image: 'sliderimages/image2.jpg', // Updated to public folder
      duration: '8 days',
      location: 'Okavango Delta',
      groupSize: '4-8 people',
      difficulty: 'Challenging',
      rating: 4.9,
      reviewCount: 145,
      endTime: '7:00 PM',
      requiredItems: ['Binoculars', 'Camping Gear'],
      availability: 'May to September',
      inclusions: ['Meals', 'Guided Tours', 'Park Fees'],
      exclusions: ['Flights', 'Travel Insurance'],
      category: 'Expedition',
      destination: 'Botswana',
      media: [
        { type: 'image', url: 'sliderimages/image3.jpg' }, // Updated
        { type: 'video', url: 'videos/vid.mp4' }, // Updated
      ],
    },
    {
      id: 5,
      title: 'Kruger National Park Safari',
      description:
        "Experience South Africa's premier wildlife destination with luxury lodging and expert guides.",
      price: 2799,
      pricePerPerson: 700,
      image: 'sliderimages/image3.jpg', // Updated to public folder
      duration: '6 days',
      location: 'Kruger National Park',
      groupSize: '2-8 people',
      difficulty: 'Easy',
      rating: 4.6,
      reviewCount: 167,
      endTime: '5:00 PM',
      requiredItems: ['Camera', 'Comfortable Shoes'],
      availability: 'Available Year-Round',
      inclusions: ['Meals', 'Guided Tours', 'Park Fees'],
      exclusions: ['Flights', 'Travel Insurance'],
      category: 'Luxury',
      destination: 'South Africa',
      media: [
        { type: 'image', url: 'sliderimages/image3.jpg' }, // Updated
        { type: 'video', url: 'videos/vid.mp4' }, // Updated
      ],
    },
  ];

  constructor() {}

  getAllTrips(): Trip[] {
    return this.trips;
  }

  getFeaturedTrips(): Trip[] {
    return this.trips.slice(0, 3);
  }

  getTripById(id: number): Trip | undefined {
    return this.trips.find((trip) => trip.id === id);
  }
}
