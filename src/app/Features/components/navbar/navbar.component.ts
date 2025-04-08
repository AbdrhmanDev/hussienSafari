import { Component, HostListener } from '@angular/core';
import { MegaMenuItem } from 'primeng/api';
import { MegaMenu } from 'primeng/megamenu';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { DropdownModule } from 'primeng/dropdown';
import { animate, style, transition, trigger } from '@angular/animations';
import { FormsModule } from '@angular/forms';

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
    DropdownModule,
    FormsModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-100%)' }),
        animate(
          '0.3s ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
      transition(':leave', [
        animate(
          '0.3s ease-in',
          style({ opacity: 0, transform: 'translateY(-100%)' })
        ),
      ]),
    ]),
  ],
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
    { label: 'Blog', icon: 'pi pi-book', routerLink: '/blog' },
  ];

  isScrolled = false;
  prevScrollPos = window.pageYOffset;
  isVisible = true;

  languages = [
    { label: 'EN', code: 'en', flag: 'en' },
    { label: 'AR', code: 'ar', flag: 'ar' },
    { label: 'DE', code: 'de', flag: 'de' },
  ];

  selectedLanguage = this.languages[0];
  isLoggedIn = false; // Replace with actual auth logic
  userMenuItems = [
    { label: 'Profile', icon: 'pi pi-user' },
    { label: 'My Bookings', icon: 'pi pi-calendar' },
    { label: 'Settings', icon: 'pi pi-cog' },
    { separator: true },
    { label: 'Sign Out', icon: 'pi pi-sign-out' },
  ];

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const currentScrollPos = window.pageYOffset;
    this.isVisible =
      this.prevScrollPos > currentScrollPos || currentScrollPos < 50;
    this.isScrolled = currentScrollPos > 50;
    this.prevScrollPos = currentScrollPos;
  }

  onLanguageChange(event: any) {
    // Implement language change logic
    console.log('Language changed to:', event.value);
  }

  ngOnInit() {}
}
