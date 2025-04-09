import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-trip-list',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    DialogModule,
    DropdownModule,
    InputTextModule,
    RouterModule,
    FormsModule,
    SidebarComponent,
    
],
  templateUrl: './trip-list.component.html',
  styleUrl: './trip-list.component.scss'

})
export class TripListComponent implements OnInit {
  trips: any[] = [];
  selectedTrip: any = null;
  showDetails = false;
  searchText = '';
  selectedCategory: string = '';
  constructor(private router: Router) {}

  categories = [
    { label: 'All', value: '' },
    { label: 'Adventure', value: 'Adventure' },
    { label: 'Romantic', value: 'Romantic' },
    { label: 'Family', value: 'Family' },
  ];

  ngOnInit(): void {
    this.trips = [
      {
        _id: '1',
        name: 'Desert Safari',
        location: 'Dubai',
        price_per_person: 150,
        category: 'Adventure',
        destination: 'Al Marmoom',
      },
      {
        _id: '2',
        name: 'Nile Cruise',
        location: 'Luxor',
        price_per_person: 300,
        category: 'Romantic',
        destination: 'Aswan',
      },
      {
        _id: '3',
        name: 'Mountain Hiking',
        location: 'Fujairah',
        price_per_person: 200,
        category: 'Family',
        destination: 'Hajar Mountains',
      },
    ];
  }

  get filteredTrips() {
    return this.trips.filter(
      (trip) =>
        (!this.selectedCategory || trip.category === this.selectedCategory) &&
        (!this.searchText ||
          trip.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
          trip.location.toLowerCase().includes(this.searchText.toLowerCase()))
    );
  }

  editTrip(id: string) {
    this.router.navigate(['/edittrip', id]);
  }
  

  deleteTrip(id: string) {
    if (confirm('Are you sure you want to delete this trip?')) {
      this.trips = this.trips.filter((t) => t._id !== id);
    }
  }

  viewTrip(trip: any) {
    this.selectedTrip = trip;
    this.showDetails = true;
  }
//   isSidebarActive: boolean = false;

// toggleSidebar() {
//   const sidebarEl = document.querySelector('app-sidebar');
//   sidebarEl?.classList.toggle('active');
// }
isSidebarVisible: boolean = false;

toggleSidebar(): void {
    this.isSidebarVisible = !this.isSidebarVisible;
}

}
