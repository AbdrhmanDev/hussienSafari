import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleriaModule } from 'primeng/galleria';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { SidebarComponent } from '../trips/sidebar/sidebar.component';
import {
  animate,
  style,
  transition,
  trigger,
  stagger,
  query,
} from '@angular/animations';

export interface GalleryItem {
  id: number;
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  category: string;
  title: string;
  isFavorite?: boolean;
  loveCount: number;
}

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, GalleriaModule, ButtonModule, TagModule, ToastModule, SidebarComponent],
  providers: [MessageService],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  animations: [
    trigger('galleryAnimation', [
      transition('* => *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'scale(0.8)' }),
            stagger('60ms', [
              animate(
                '400ms cubic-bezier(0.35, 0, 0.25, 1)',
                style({ opacity: 1, transform: 'scale(1)' })
              ),
            ]),
          ],
          { optional: true }
        ),
        query(
          ':leave',
          [
            stagger('60ms', [
              animate(
                '400ms cubic-bezier(0.35, 0, 0.25, 1)',
                style({ opacity: 0, transform: 'scale(0.8)' })
              ),
            ]),
          ],
          { optional: true }
        ),
      ]),
    ]),
    trigger('itemAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate(
          '400ms cubic-bezier(0.35, 0, 0.25, 1)',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
  ],
})
export class GalleryComponent implements OnInit {
  galleryItems: GalleryItem[] = [
    {
      id: 1,
      type: 'image',
      url: 'assets/desert.jpg',
      category: 'adventures',
      title: 'Desert Adventure',
      loveCount: 0,
      isFavorite: false,
    },
    {
      id: 2,
      type: 'image',
      url: 'assets/sliderimages/image1.jpg',
      category: 'wildlife',
      title: 'Desert Adventure',
      loveCount: 0,
      isFavorite: false,
    },
    {
      id: 3,
      type: 'image',
      url: 'assets/sliderimages/image2.jpg',
      category: 'adventures',
      title: 'Desert Adventure',
      loveCount: 0,
      isFavorite: false,
    },
    {
      id: 4,
      type: 'image',
      url: 'assets/sliderimages/image3.jpg',
      category: 'landscapes',
      title: 'Desert Adventure',
      loveCount: 0,
      isFavorite: false,
    },
  ];

  categories: string[] = ['all', 'adventures', 'landscapes', 'wildlife'];
  selectedCategory: string = 'all';
  selectedItem: GalleryItem | null = null;
  showLightbox: boolean = false;

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.loadGalleryItems();
  }


  loadGalleryItems() {
    // In a real app, this might be an API call
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;
  }

  getFilteredItems(): GalleryItem[] {
    if (this.selectedCategory === 'all') {
      return this.galleryItems;
    }
    return this.galleryItems.filter(
      (item) => item.category === this.selectedCategory
    );
  }

  openLightbox(item: GalleryItem) {
    this.selectedItem = item;
    this.showLightbox = true;
  }

  closeLightbox() {
    this.showLightbox = false;
    this.selectedItem = null;
  }

  toggleFavorite(event: Event, item: GalleryItem) {
    event.stopPropagation();
    item.isFavorite = !item.isFavorite;
    item.loveCount = item.isFavorite ? item.loveCount + 1 : item.loveCount - 1;

    this.messageService.add({
      severity: item.isFavorite ? 'success' : 'info',
      summary: item.isFavorite
        ? 'Added to Favorites'
        : 'Removed from Favorites',
      detail: `${item.title} (${item.loveCount} loves)`,
    });
  }

  downloadImage(event: Event, item: GalleryItem) {
    event.stopPropagation();
    const link = document.createElement('a');
    link.href = item.url;
    link.download = `${item.title}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    this.messageService.add({
      severity: 'success',
      summary: 'Download Started',
      detail: item.title,
    });
  }
}
