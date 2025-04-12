import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { AccordionModule } from 'primeng/accordion';
import { CardModule } from 'primeng/card';
import { StepsModule } from 'primeng/steps';
import { MenuItem } from 'primeng/api';
@Component({
    selector: 'app-booking',
    templateUrl: './booking.component.html',
    styleUrls: ['./booking.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        InputTextModule,
        ButtonModule,
        CheckboxModule,
        AccordionModule,
        CardModule,
        StepsModule
    ]
})
export class BookingComponent implements OnInit {
    bookingForm: FormGroup;
    remainingTime: string = '19:49';
    activeStepIndex: number = 0;
    steps: MenuItem[] = [
        { label: 'Contact Details', command: () => this.activeStepIndex = 0 },
        { label: 'Activity Details', command: () => this.activeStepIndex = 1 },
        { label: 'Payment Details', command: () => this.activeStepIndex = 2 }
    ];

    constructor(private fb: FormBuilder) {
        this.bookingForm = this.fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', Validators.required],
            newsletter: [false],
            promoCode: [''],  // Adding promoCode to formGroup
            date: ['', Validators.required],
            numberOfPeople: [1, Validators.required],
            specialRequests: [''],
            cardNumber: ['', Validators.required],
            expiryDate: ['', Validators.required],
            cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3,4}$')]],  // Validate CVV
        });
    }
    ngOnInit() {
        // Start countdown timer
        this.startCountdown();
    }

    startCountdown() {
        const [minutes, seconds] = this.remainingTime.split(':').map(Number);
        let totalSeconds = minutes * 60 + seconds;

        const timer = setInterval(() => {
            if (totalSeconds <= 0) {
                clearInterval(timer);
                return;
            }

            totalSeconds--;
            const newMinutes = Math.floor(totalSeconds / 60);
            const newSeconds = totalSeconds % 60;
            this.remainingTime = `${newMinutes}:${newSeconds.toString().padStart(2, '0')}`;
        }, 1000);
    }

    goToNextStep() {
        // Validate current step before proceeding
        if (this.validateCurrentStep()) {
            this.activeStepIndex++;
        } else {
            this.markCurrentStepAsTouched();
        }
    }

    prevStep() {
        if (this.activeStepIndex > 0) {
            this.activeStepIndex--;
        }
    }

    validateCurrentStep(): boolean {
        const stepControls = this.getStepControls();
        return stepControls.every(controlName => {
            const control = this.bookingForm.get(controlName);
            return control ? control.valid : true;
        });
    }

    getStepControls(): string[] {
        switch (this.activeStepIndex) {
            case 0:
                return ['firstName', 'lastName', 'email', 'phone'];
            case 1:
                return ['date', 'numberOfPeople'];
            case 2:
                return ['cardNumber', 'expiryDate', 'cvv'];
            default:
                return [];
        }
    }

    markCurrentStepAsTouched() {
        const stepControls = this.getStepControls();
        stepControls.forEach(controlName => {
            const control = this.bookingForm.get(controlName);
            if (control) {
                control.markAsTouched();
            }
        });
    }

    onSubmit() {
        if (this.bookingForm.valid) {
            console.log('Booking submitted:', this.bookingForm.value);
            // Handle booking submission
        } else {
            this.markCurrentStepAsTouched();
        }
    }

    applyPromoCode() {
        const promoCode = this.bookingForm.get('promoCode')?.value;
        if (promoCode) {
            console.log('Applying promo code:', promoCode);
            // Handle promo code application
        }
    }
}