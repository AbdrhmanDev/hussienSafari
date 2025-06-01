import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-extra-services',
  standalone: true,
  imports: [CommonModule, ButtonModule, CardModule, DialogModule, FormsModule],
  templateUrl: './extra-services.component.html',
  styleUrls: ['./extra-services.component.scss'],
})
export class ExtraServicesComponent {
  showDialog = false;
  selectedService: string = '';

  extraServices = [
    {
      title: 'Hotel Booking Assistance',
      icon: 'pi pi-building',
      description:
        'Let me help you find and book the perfect hotel in Hurghada that matches your preferences and budget.',
      benefits: [
        'Access to local hotel partnerships',
        'Best rate guarantees',
        'Personalized recommendations',
      ],
    },
    {
      title: 'Private City Tours',
      icon: 'pi pi-map',
      description:
        'Explore Hurghada like a local with personalized city tours covering the best spots and hidden gems.',
      benefits: [
        'Flexible scheduling',
        'Custom itineraries',
        'Local insights and stories',
      ],
    },
    {
      title: 'Local Guidance & Tips',
      icon: 'pi pi-compass',
      description:
        'Get expert advice on restaurants, shopping, entertainment, and making the most of your stay in Hurghada.',
      benefits: [
        '24/7 WhatsApp support',
        'Restaurant recommendations',
        'Cultural insights',
      ],
    },
    {
      title: 'Transportation Services',
      icon: 'pi pi-car',
      description:
        'Reliable airport transfers and daily transportation arrangements throughout your stay.',
      benefits: [
        'Airport pickup/dropoff',
        'Private car service',
        'Reliable drivers',
      ],
    },
  ];

  openServiceDialog(service: string) {
    this.selectedService = service;
    this.showDialog = true;
  }
}
