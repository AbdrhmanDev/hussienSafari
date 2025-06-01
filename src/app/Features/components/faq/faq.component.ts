import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionModule } from 'primeng/accordion';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule, AccordionModule],
  template: `
    <section class="faq-section">
      <h2>Frequently Asked Questions</h2>
      <p-accordion>
        <p-accordionTab *ngFor="let faq of faqs">
          <ng-template pTemplate="header">
            {{ faq.question }}
          </ng-template>
          <ng-template pTemplate="content">
            {{ faq.answer }}
          </ng-template>
        </p-accordionTab>
      </p-accordion>
    </section>
  `,
  styles: [
    `
      .faq-section {
        padding: 5rem 2rem;
        max-width: 800px;
        margin: 0 auto;
        h2 {
          text-align: center;
          font-size: 2.5rem;
          margin-bottom: 3rem;
          color: #333;
        }
      }
    `,
  ],
})
export class FaqComponent {
  faqs = [
    {
      question: 'What should I bring for the safari?',
      answer:
        'We recommend bringing sunscreen, hat, comfortable clothes, and a camera. All safety equipment will be provided.',
    },
    // Add more FAQs
  ];
}
