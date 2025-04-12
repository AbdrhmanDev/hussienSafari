import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextarea } from 'primeng/inputtextarea';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import {
  ReviewsService,
  Review,
  ReviewPhoto,
} from '../../../services/reviews.service';

@Component({
  selector: 'app-add-reviews',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RatingModule,
    ButtonModule,
    InputTextModule,
    InputTextarea,

    FileUploadModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './add-reviews.component.html',
  styleUrl: './add-reviews.component.scss',
})
export class AddReviewsComponent implements OnInit {
  @Input() tripId: number = 0;
  @Output() reviewAdded = new EventEmitter<Review>();

  reviewForm: FormGroup;
  uploadedPhotos: any[] = [];
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private reviewsService: ReviewsService,
    private messageService: MessageService
  ) {
    this.reviewForm = this.fb.group({
      rating: [0, [Validators.required, Validators.min(1), Validators.max(5)]],
      userName: ['', [Validators.required, Validators.minLength(2)]],
      comment: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  ngOnInit(): void {
    // Initialize form
  }

  onRatingChange(event: any): void {
    this.reviewForm.patchValue({ rating: event.value });
  }

  onPhotoUpload(event: any): void {
    for (let file of event.files) {
      // In a real app, you would upload to a server
      // For this mock, we'll create object URLs
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.uploadedPhotos.push({
          file: file,
          url: e.target.result,
          caption: file.name,
          uploadDate: new Date().toISOString(),
        });
      };
      reader.readAsDataURL(file);
    }

    this.messageService.add({
      severity: 'info',
      summary: 'Success',
      detail: 'Photo(s) uploaded successfully',
    });
  }

  removePhoto(index: number): void {
    this.uploadedPhotos.splice(index, 1);
  }

  submitReview(): void {
    if (this.reviewForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please fill in all required fields correctly',
      });
      return;
    }

    this.isSubmitting = true;

    // Create the review object
    const reviewData: Omit<Review, 'id' | 'helpful' | 'notHelpful'> = {
      tripId: this.tripId,
      userId: 'user' + Math.floor(Math.random() * 1000), // Mock user ID
      userName: this.reviewForm.value.userName,
      userAvatar:
        'assets/sliderimages/image' +
        Math.floor(Math.random() * 3 + 1) +
        '.jpg', // Random avatar
      date: new Date().toISOString().split('T')[0],
      rating: this.reviewForm.value.rating,
      comment: this.reviewForm.value.comment,
      photos: [],
    };

    // Add the review
    this.reviewsService.addReview(reviewData).subscribe({
      next: (newReview) => {
        // If there are photos, add them
        if (this.uploadedPhotos.length > 0) {
          // Process photos one by one (in a real app, you might use forkJoin)
          let photoCount = 0;

          const processNextPhoto = (index: number) => {
            if (index >= this.uploadedPhotos.length) {
              // All photos processed
              this.reviewAdded.emit(newReview);
              this.resetForm();
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Your review has been submitted!',
              });
              return;
            }

            const photo = this.uploadedPhotos[index];
            const photoData: Omit<ReviewPhoto, 'id'> = {
              url: photo.url,
              caption: photo.caption,
              uploadedBy: reviewData.userName,
              uploadDate: photo.uploadDate,
            };

            this.reviewsService
              .addReviewPhoto(newReview.id, photoData)
              .subscribe({
                next: () => {
                  photoCount++;
                  processNextPhoto(index + 1);
                },
                error: (err) => {
                  console.error('Error adding photo', err);
                  processNextPhoto(index + 1); // Continue with next photo even if one fails
                },
              });
          };

          // Start processing photos
          processNextPhoto(0);
        } else {
          this.reviewAdded.emit(newReview);
          this.resetForm();
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Your review has been submitted!',
          });
        }
        this.isSubmitting = false;
      },
      error: (err) => {
        console.error('Error adding review', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail:
            'There was an error submitting your review. Please try again.',
        });
        this.isSubmitting = false;
      },
    });
  }

  resetForm(): void {
    this.reviewForm.reset({
      rating: 0,
      userName: '',
      comment: '',
    });
    this.uploadedPhotos = [];
  }
}
