import { Routes } from '@angular/router';
import { TripsComponent } from './Features/components/trips/trips.component';

import { HomeComponent } from './Features/components/home/home.component';
import { TripDetailsComponent } from './Features/components/trips/trip-details/trip-details.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'trips', component: TripsComponent },
  { path: 'details/:id', component: TripDetailsComponent },

  { path: '**', redirectTo: '' }, // Default route
];
