import { Component, OnInit } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  imports: [
    SidebarModule,
    PanelMenuModule,
    ButtonModule,
    RouterModule,
  ],
})
export class SidebarComponent implements OnInit {
  visibleSidebar = false;
  items: any[] = [];

  ngOnInit() {
    this.items = [
      {
        label: 'Trips',
        icon: 'pi pi-globe',
        items: [
          {
            label: 'Add Trip',
            icon: 'pi pi-plus-circle',
            routerLink: ['/addtrip'],
          },
          {
            label: 'View Trips',
            icon: 'pi pi-list',
            routerLink: ['/triplist'],
          },
        ],
      },
      {
        label: 'Bookings',
        icon: 'pi pi-ticket',
        routerLink: ['/bookings'],
      },
      {
        label: 'Settings',
        icon: 'pi pi-cog',
        routerLink: ['/settings'],
      },
    ];
  }
}
