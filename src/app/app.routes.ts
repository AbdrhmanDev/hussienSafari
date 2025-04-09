import { Routes } from '@angular/router';
import { TripsComponent } from './Features/components/trips/trips.component';

import { HomeComponent } from './Features/components/home/home.component';
import { TripDetailsComponent } from './Features/components/trips/trip-details/trip-details.component';
import { AddTripComponent } from './Features/components/trips/add-trip/add-trip.component';
import { TripListComponent } from './Features/components/trips/trip-list/trip-list.component';
import { EditTripComponent } from './Features/components/trips/edit-trip/edit-trip.component';
import { BookingsComponent } from './Features/components/trips/bookings/bookings.component';
import { UsersComponent } from './Features/components/trips/users/users.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'trips', component: TripsComponent },
  { path: 'details/:id', component: TripDetailsComponent },
  { path: 'addtrip', component: AddTripComponent },
  { path: 'triplist', component: TripListComponent },
  { path: 'edittrip/:id', component: EditTripComponent },
  { path: 'bookings', component: BookingsComponent },
  { path: 'users', component: UsersComponent },
  { path: '**', redirectTo: '' }, // Default route
];
