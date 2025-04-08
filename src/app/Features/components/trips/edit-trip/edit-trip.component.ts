import { Component, OnInit, ViewChild } from '@angular/core';
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
  templateUrl: './edit-trip.component.html',
  styleUrls: ['./edit-trip.component.scss'],
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
export class EditTripComponent implements OnInit {
  tripForm!: FormGroup;
  activeStepIndex = 0;

  selectedMedia = [
    { type: 'image', url: 'https://via.placeholder.com/150' },
    { type: 'video', url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
  ];

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

  inclusionInput = new FormControl('');
  exclusionInput = new FormControl('');

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.tripForm = this.fb.group({
      name: ['Desert Safari', Validators.required],
      description: ['Enjoy the desert experience', Validators.required],
      location: ['Dubai', Validators.required],
      destination: ['Red Dunes', Validators.required],
      duration: ['6 hours', Validators.required],
      price_per_person: [150, Validators.required],
      category: ['adventure', Validators.required],
      start_time: [new Date(), Validators.required],
      end_time: [new Date(), Validators.required],
      inclusions: [['Water', 'Snacks']],
      exclusions: [['Alcohol']],
    });
  }

  nextStep() {
    if (this.activeStepIndex < 2) this.activeStepIndex++;
  }

  prevStep() {
    if (this.activeStepIndex > 0) this.activeStepIndex--;
  }

  removeMedia(index: number) {
    this.selectedMedia.splice(index, 1);
  }

  addInclusion() {
    const value = this.inclusionInput.value?.trim();
    if (value && !this.tripForm.value.inclusions.includes(value)) {
      const updated = [...this.tripForm.value.inclusions, value];
      this.tripForm.patchValue({ inclusions: updated });
      this.inclusionInput.setValue('');
    }
  }

  removeInclusion(index: number) {
    const updated = [...this.tripForm.value.inclusions];
    updated.splice(index, 1);
    this.tripForm.patchValue({ inclusions: updated });
  }

  addExclusion() {
    const value = this.exclusionInput.value?.trim();
    if (value && !this.tripForm.value.exclusions.includes(value)) {
      const updated = [...this.tripForm.value.exclusions, value];
      this.tripForm.patchValue({ exclusions: updated });
      this.exclusionInput.setValue('');
    }
  }

  removeExclusion(index: number) {
    const updated = [...this.tripForm.value.exclusions];
    updated.splice(index, 1);
    this.tripForm.patchValue({ exclusions: updated });
  }

  updateTrip() {
    if (!this.tripForm.valid) {
      alert('Please complete all required fields');
      return;
    }
    console.log('Updated Trip:', this.tripForm.value);
    alert('Trip updated successfully!');
  }
}
