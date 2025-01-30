import { Component, Input, input } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-primary-button',
  standalone: true,
  imports: [MatButtonModule],
  template: `
     <button mat-flat-button class="primary">{{ label }}</button>
  `,
  styles: `
  
  .primary {
      background-color: #673AB7;
      color: white;
      font-weight: 600;
      font-size: 16px;
      padding: 12px 24px;
      border-radius: 8px;
      border: none;
      outline: none;
      transition: all 0.3s ease;
    }

    .primary:hover {
      background-color: #5e35b1;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      cursor: pointer;
    }

    .primary:focus {
      outline: 3px solid #ffeb3b;
      box-shadow: 0 0 0 2px #ffeb3b;
    }

    .primary:disabled {
      background-color: #9e9e9e;
      color: #bdbdbd;
      cursor: not-allowed;
    }
    `
})
export class PrimaryButtonComponent {
@Input() label: string = '';
@Input() disabled: boolean = false;
}
