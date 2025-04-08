import { Component, OnInit, Input } from '@angular/core';
import { PanelMenuModule } from 'primeng/panelmenu';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [PanelMenuModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Input() visible: boolean = true;

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
