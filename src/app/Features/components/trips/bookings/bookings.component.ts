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
  import * as XLSX from 'xlsx';
  import jsPDF from 'jspdf';
  import autoTable from 'jspdf-autotable';
  import { HttpClient } from '@angular/common/http';
  import { SidebarComponent } from '../sidebar/sidebar.component';
  import { CalendarModule } from 'primeng/calendar';
  
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
      SidebarComponent,
      CalendarModule
      
    ],
    providers: [ConfirmationService, MessageService],
  })
  export class BookingsComponent implements OnInit {
    bookings: any[] = [];
    filteredBookings: any[] = [];
    selectedStatus: string = '';
    searchText: string = '';
    selectedCategory: string = '';
    showDetails: boolean = false;
    selectedBooking: any;
    dateRange: Date[] = [];
    chartData: any;
    chartOptions: any;

    categories = [
      { label: 'Adventure', value: 'adventure' },
      { label: 'Family', value: 'family' },
      { label: 'Romantic', value: 'romantic' },
    ];
    statuses = ['Pending', 'Confirmed', 'Cancelled'];

    constructor(private http: HttpClient) {}

    ngOnInit() {
      this.fetchBookings();
    }

    // fetchBookings() {
    //   this.http.get<any[]>('http://localhost:3000/api/bookings').subscribe({
    //     next: (data) => {
    //       this.bookings = data;
    //       this.filteredBookings = data;
    //       this.initChart();
    //     },
    //     error: (err) => console.error('Error fetching bookings:', err),
    //   });
    // }
    fetchBookings() {
      // بيانات وهمية (static)
      this.bookings = [
        {
          _id: '1',
          userID: 'Ahmed Ali',
          tripID: 'Red Sea Safari',
          bookingDate: '2025-04-05',
          numberOfPeople: 2,
          totalPrice: 1500,
          status: 'Pending',
          paymentStatus: 'Pending',
          category: 'Adventure',
        },
        {
          _id: '2',
          userID: 'Sara Mohamed',
          tripID: 'Mountain Hiking',
          bookingDate: '2025-04-06',
          numberOfPeople: 1,
          totalPrice: 800,
          status: 'Confirmed',
          paymentStatus: 'Paid',
          category: 'Romantic',
        },
        {
          _id: '3',
          userID: 'John Doe',
          tripID: 'Desert Ride',
          bookingDate: '2025-04-07',
          numberOfPeople: 3,
          totalPrice: 2100,
          status: 'Cancelled',
          paymentStatus: 'Pending',
          category: 'Family',
        },
      ];

      // نفس البيانات للفلترة
      this.filteredBookings = [...this.bookings];

      // تجهيز الرسم البياني أو أي عمليات إضافية
      this.initChart();
    }

    filterBookings() {
      this.filteredBookings = this.bookings.filter((b) => {
        const matchesSearch =
          b.tripID?.toLowerCase().includes(this.searchText.toLowerCase()) ||
          b.userID?.toLowerCase().includes(this.searchText.toLowerCase());

        const matchesStatus = this.selectedStatus
          ? b.status === this.selectedStatus
          : true;

        const matchesCategory = this.selectedCategory
          ? b.category === this.selectedCategory
          : true;

        const matchesDate =
          !this.dateRange.length ||
          (new Date(b.bookingDate) >= this.dateRange[0] &&
            new Date(b.bookingDate) <= this.dateRange[1]);

        return matchesSearch && matchesStatus && matchesCategory && matchesDate;
      });
    }

    viewBooking(b: any) {
      this.selectedBooking = b;
      this.showDetails = true;
    }

    confirmBooking(b: any) {
      b.status = 'Confirmed';
    }

    editBooking(id: string) {
      console.log('Edit booking', id);
    }

    deleteBooking(id: string) {
      this.filteredBookings = this.filteredBookings.filter((b) => b._id !== id);
    }

    exportExcel() {
      const ws = XLSX.utils.json_to_sheet(this.filteredBookings);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Bookings');
      XLSX.writeFile(wb, 'bookings.xlsx');
    }

    exportPDF() {
      const doc = new jsPDF();
      autoTable(doc, {
        head: [['User', 'Trip', 'Date', 'People', 'Price', 'Status']],
        body: this.filteredBookings.map((b) => [
          b.userID,
          b.tripID,
          b.bookingDate,
          b.numberOfPeople,
          b.totalPrice,
          b.status,
        ]),
      });
      doc.save('bookings.pdf');
    }

    initChart() {
      const statusCounts = { Pending: 0, Confirmed: 0, Cancelled: 0 };
      this.bookings.forEach((b) => {
        if (b.status in statusCounts) {
          statusCounts[b.status as keyof typeof statusCounts]++;
        }
      });

      this.chartData = {
        labels: ['Pending', 'Confirmed', 'Cancelled'],
        datasets: [
          {
            data: Object.values(statusCounts),
            backgroundColor: ['#f9c74f', '#43aa8b', '#f94144'],
          },
        ],
      };

      this.chartOptions = {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
        },
      };
    }
    isSidebarActive: boolean = false;

toggleSidebar() {
  const sidebarEl = document.querySelector('app-sidebar');
  sidebarEl?.classList.toggle('active');
}
  }
