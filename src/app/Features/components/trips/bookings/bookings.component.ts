import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bookings',
  standalone: true,
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss'],
  imports: [
    CommonModule,
    TableModule,
    InputTextModule,
    DropdownModule,
    TagModule,
    DialogModule,
    ButtonModule,
    ConfirmDialogModule,
    ToastModule,
    FormsModule,
  ],
  providers: [ConfirmationService, MessageService],
})
export class BookingsComponent implements OnInit {
  bookings: any[] = [];
  filteredBookings: any[] = [];
  searchText: string = '';
  selectedStatus: string = '';
  selectedCategory: string = '';
  showDetails: boolean = false;
  selectedBooking: any = null;

  statuses = ['Pending', 'Confirmed', 'Cancelled'];
  categories = ['Adventure', 'Family', 'Romantic'];

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.bookings = [
      {
        _id: '1',
        userID: 'User A',
        tripID: 'Trip X',
        bookingDate: '2025-04-08',
        numberOfPeople: 2,
        totalPrice: 300,
        status: 'Confirmed',
        paymentStatus: 'Paid',
        category: 'Adventure',
      },
      {
        _id: '2',
        userID: 'User B',
        tripID: 'Trip Y',
        bookingDate: '2025-04-09',
        numberOfPeople: 1,
        totalPrice: 150,
        status: 'Pending',
        paymentStatus: 'Pending',
        category: 'Family',
      },
    ];
    this.filteredBookings = [...this.bookings];
  }

  viewBooking(booking: any) {
    this.selectedBooking = booking;
    this.showDetails = true;
  }

  confirmBooking(booking: any) {
    booking.status = 'Confirmed';
    booking.paymentStatus = 'Paid';
    this.messageService.add({
      severity: 'success',
      summary: 'Confirmed',
      detail: 'Booking confirmed!',
    });
  }

  editBooking(id: string) {
    console.log('Edit booking:', id);
  }

  deleteBooking(id: string) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this booking?',
      accept: () => {
        this.bookings = this.bookings.filter((b) => b._id !== id);
        this.filterBookings();
        this.messageService.add({
          severity: 'warn',
          summary: 'Deleted',
          detail: 'Booking has been deleted.',
        });
      },
    });
  }

  filterBookings() {
    this.filteredBookings = this.bookings.filter((booking) => {
      const matchesText =
        !this.searchText ||
        booking.userID.toLowerCase().includes(this.searchText.toLowerCase()) ||
        booking.tripID.toLowerCase().includes(this.searchText.toLowerCase());
      const matchesStatus =
        !this.selectedStatus || booking.status === this.selectedStatus;
      const matchesCategory =
        !this.selectedCategory || booking.category === this.selectedCategory;

      return matchesText && matchesStatus && matchesCategory;
    });
  }
}
