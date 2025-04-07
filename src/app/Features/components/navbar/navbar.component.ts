import { Component } from '@angular/core';
import { MegaMenuItem } from 'primeng/api';
import { MegaMenu } from 'primeng/megamenu';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MegaMenu,
    ButtonModule,
    CommonModule,
    AvatarModule,
    MenuModule,
    MenubarModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  menuItems = [
    { label: 'Home', icon: 'pi pi-home', routerLink: '/' },
    {
      label: 'Travels',
      icon: 'pi pi-compass',
      items: [
        { label: 'Adventure Tours', routerLink: '/travels/adventure' },
        { label: 'Desert Safaris', routerLink: '/travels/desert' },
        { label: 'Custom Packages', routerLink: '/travels/custom' },
        { label: 'Group Tours', routerLink: '/travels/group' },
      ],
    },
    { label: 'Gallery', icon: 'pi pi-images', routerLink: '/gallery' },
   
    
    { label: 'Testimonials', icon: 'pi pi-star', routerLink: '/testimonials' },
    { label: 'About', icon: 'pi pi-info-circle', routerLink: '/about' },
    // {
    //   label: 'Special Offers',
    //   icon: 'pi pi-tag',
    //   routerLink: '/special-offers',
    // },
    // { label: 'FAQ', icon: 'pi pi-question-circle', routerLink: '/faq' },
    // { label: 'Contact Us', icon: 'pi pi-envelope', routerLink: '/contact' },
    { label: 'Blog', icon: 'pi pi-book', routerLink: '/blog' },
    
    // { label: 'Help Center', icon: 'pi pi-info', routerLink: '/help' },
  ];

  ngOnInit() {}
}
