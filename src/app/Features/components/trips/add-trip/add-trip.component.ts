import { Component, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
  FormControl,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { InputTextModule } from 'primeng/inputtext';
import { InputTextarea } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { StepsModule } from 'primeng/steps';
import { FloatLabel } from 'primeng/floatlabel';
import { Textarea } from 'primeng/textarea';
import { DatePicker } from 'primeng/datepicker';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUpload } from 'primeng/fileupload';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-add-trip',
  standalone: true,
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    InputTextarea,
    CalendarModule,
    DropdownModule,
    ChipModule,
    FileUploadModule,
    ButtonModule,
    CardModule,
    StepsModule,
    FormsModule,
    FloatLabel,
    Textarea,
    DatePicker,
    FieldsetModule,
    SidebarComponent,
  ],
})
export class AddTripComponent {
  tripForm: FormGroup;
  selectedMedia: { type: 'image' | 'video'; url: string }[] = [];
  activeStepIndex = 0;

  categories = [
    { label: 'Adventure', value: 'adventure' },
    { label: 'Family', value: 'family' },
    { label: 'Romantic', value: 'romantic' },
  ];

  steps = [
    { label: 'Trip Details' },
    { label: 'Media & Pricing' },
    { label: 'Submit' },
  ];

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.tripForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required],
      category: ['', Validators.required],
      destination: ['', Validators.required],
      price_per_person: [0, Validators.required],
      duration: ['', Validators.required],
      start_time: [new Date(), Validators.required],
      end_time: [new Date(), Validators.required],
      inclusions: [[]],
      exclusions: [[]],
    });
  }

  async onMediaSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedMedia = [];
      for (const file of Array.from(input.files)) {
        const uploaded = await this.uploadToCloudinary(file);
        this.selectedMedia.push(uploaded);
      }
    }
  }

  uploadToCloudinary(
    file: File
  ): Promise<{ type: 'image' | 'video'; url: string }> {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'safari_unsigned');
    const type = file.type.startsWith('video') ? 'video' : 'image';

    return fetch(`https://api.cloudinary.com/v1_1/dqh4vcjcn/${type}/upload`, {
      method: 'POST',
      body: data,
    })
      .then((res) => res.json())
      .then((result) => ({
        type,
        url: result.secure_url,
      }));
  }

  nextStep() {
    if (this.activeStepIndex < 2) this.activeStepIndex++;
  }

  prevStep() {
    if (this.activeStepIndex > 0) this.activeStepIndex--;
  }

  submitTrip(): void {
    console.log(this.tripForm.value);

    if (!this.tripForm.valid) {
      alert('Please complete all required fields.');
      return;
    }

    const payload = {
      ...this.tripForm.value,
      category: this.tripForm.value.category.value, // 🔥 خذ فقط القيمة النصية مثل "family"
      media: this.selectedMedia,
    };

    this.http.post('http://localhost:3000/api/trip', payload).subscribe({
      next: () => {
        alert('Trip added successfully!');
        this.tripForm.reset();
        this.selectedMedia = [];
        this.activeStepIndex = 0;
      },
      error: () => alert('Failed to add trip.'),
    });
  }
  @ViewChild('fileUpload') fileUpload!: FileUpload;

  onMediaUpload(event: any) {
    const files: File[] = event.files;
    this.selectedMedia = [];

    const uploads = files.map(async (file: File) => {
      const uploaded = await this.uploadToCloudinary(file);
      this.selectedMedia.push(uploaded);
    });

    Promise.all(uploads).then(() => {
      this.fileUpload.clear();
    });
  }
  removeMedia(index: number) {
    this.selectedMedia.splice(index, 1);
  }

  inclusionControl = new FormControl('');
  inclusionInput = new FormControl('');
  addInclusion() {
    const trimmed = (this.inclusionInput.value || '').trim();
    if (trimmed && !this.tripForm.value.inclusions.includes(trimmed)) {
      const updated = [...this.tripForm.value.inclusions, trimmed];
      this.tripForm.patchValue({ inclusions: updated });
      this.inclusionInput.setValue('');
    }
  }

  removeInclusion(index: number) {
    const updated = [...this.tripForm.value.inclusions];
    updated.splice(index, 1);
    this.tripForm.patchValue({ inclusions: updated });
  }
  // ✨ هذا تعريف كنترول الإدخال للإقصاءات
  exclusionInput = new FormControl('');

  // ✨ دالة الإضافة
  addExclusion() {
    const value = this.exclusionInput.value?.trim();
    if (value && !this.tripForm.value.exclusions.includes(value)) {
      const updated = [...this.tripForm.value.exclusions, value];
      this.tripForm.patchValue({ exclusions: updated });
      this.exclusionInput.setValue('');
    }
  }

  // ✨ دالة الحذف
  removeExclusion(index: number) {
    const updated = [...this.tripForm.value.exclusions];
    updated.splice(index, 1);
    this.tripForm.patchValue({ exclusions: updated });
  }
  // isSidebarActive: boolean = false;

  // toggleSidebar() {
  //   const sidebarEl = document.querySelector('app-sidebar');
  //   sidebarEl?.classList.toggle('active');
  // }
  sidebarOpen = false;

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
    const layout = document.querySelector('.layout');
    const sidebar = document.querySelector('app-sidebar');

    if (this.sidebarOpen) {
      layout?.classList.add('sidebar-open');
      sidebar?.classList.add('active');
    } else {
      layout?.classList.remove('sidebar-open');
      sidebar?.classList.remove('active');
    }
  }
}
