import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TripsService, Trip } from '../../services/trips.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trips',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './trips.component.html',
  styleUrl: './trips.component.scss',
})
export class TripsComponent implements OnInit {
  trips: Trip[] = [];

  constructor(private tripsService: TripsService, private router: Router) {}

  navigateToDetails(tripId: number) {
    this.router.navigate(['/details', tripId]);
  }

  ngOnInit() {
    this.trips = this.tripsService.getAllTrips();
  }
}
