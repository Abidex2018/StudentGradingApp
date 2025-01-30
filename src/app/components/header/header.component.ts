import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon'; 
import { Router } from '@angular/router';  
@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatIconModule],  
  template: `
    <mat-toolbar class="toolbar">
      <span>
        Student Grading App
      </span>
      <span class="spacer"></span> 
      
      <button mat-icon-button (click)="navigateToAssignGrade()">
        <mat-icon>edit</mat-icon>
        <span class="button-text">Assign Grade</span> 
      </button>
    </mat-toolbar>
  `,
  styles: [`
    .spacer {
    flex: 1;
  }
  mat-icon {
    color: black; 
  }
  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
  }
  .button-text {
    margin-left: 8px;  
    color: black;  
    font-weight: bold;
    font-family: 'Poppins', sans-serif;
  }
  .toolbar {
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    background-color: #673AB7;
  }
  `]
})
export class HeaderComponent {
  constructor(private router: Router) {}

 
  navigateToAssignGrade(): void {
    this.router.navigate(['/studentgradingform']); 
  }
}
