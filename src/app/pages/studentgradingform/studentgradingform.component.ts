import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';  // Correct import
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input'; 
import { PrimaryButtonComponent } from "../../components/primary-button/primary-button.component";
import { StudentgradingserviceService } from '../../services/studentgradingservice.service';
import { Subject } from '../../../Models/subject.model';  // Assuming your Subject model
import { SubjectserviceService } from '../../services/subjectservice.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


@Component({
  selector: 'app-studentgradingform',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    PrimaryButtonComponent,
    ReactiveFormsModule,
    CommonModule,
    MatSnackBarModule,
  ],
  template: `
    <div class="form-container">
      <form [formGroup]="studentGradeForm" (ngSubmit)="onSubmit()">
        <button type="button" class="back-button" (click)="goBack()">
          Back to Home
        </button>

        <h2>{{ isEditMode ? 'Edit' : 'Add' }} Student Grading Form</h2>
        <input type="hidden" formControlName="studentGradeId" />
        <div class="form-row">
          <mat-form-field appearance="outline">
            <mat-label>First Name</mat-label>
            <input
              matInput
              placeholder="Enter first name"
              formControlName="firstName"
              required
            />
            <mat-error
              *ngIf="studentGradeForm.get('firstName')!.hasError('required')"
              >First Name is required</mat-error
            >
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Last Name</mat-label>
            <input
              matInput
              placeholder="Enter last name"
              formControlName="lastName"
              required
            />
            <mat-error
              *ngIf="studentGradeForm.get('lastName')!.hasError('required')"
              >Last Name is required</mat-error
            >
          </mat-form-field>
        </div>

        <div class="form-row">
          <mat-form-field appearance="outline">
            <mat-label>Select Subject</mat-label>
            <mat-select formControlName="subjectId" required>
              <mat-option
                *ngFor="let subject of subjects"
                [value]="subject.subjectId"
                >{{ subject.subjectName }}</mat-option
              >
            </mat-select>
            <mat-error
              *ngIf="studentGradeForm.get('subjectId')!.hasError('required')"
              >Subject is required</mat-error
            >
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Select Grade</mat-label>
            <mat-select formControlName="grade" required>
              <mat-option value="A">A</mat-option>
              <mat-option value="B">B</mat-option>
              <mat-option value="C">C</mat-option>
              <mat-option value="D">D</mat-option>
              <mat-option value="E">E</mat-option>
              <mat-option value="F">F</mat-option>
            </mat-select>
            <mat-error
              *ngIf="studentGradeForm.get('grade')!.hasError('required')"
              >Grade is required</mat-error
            >
          </mat-form-field>
        </div>

        <div class="form-row full-width">
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Remarks</mat-label>
            <textarea
              matInput
              placeholder="Enter remarks"
              formControlName="remarks"
            ></textarea>
          </mat-form-field>
        </div>

        <div class="form-actions">
          <app-primary-button
            label="Submit"
            [disabled]="studentGradeForm.invalid || isSubmitSuccessful"
          ></app-primary-button>
        </div>
      </form>
    </div>
  `,
  styles: [
    `
      .form-container {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        min-height: 100vh;
        background: #f4f4f4;
        padding: 20px;
        box-sizing: border-box;
        margin: 0px;
      }

      form {
        max-width: 700px;
        width: 100%;
        background: #ffffff;
        padding: 30px;
        border-radius: 12px;
        box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
        text-align: center;
        margin-top: 50px;
      }

      h2 {
        font-size: 20px;
        margin-bottom: 15px;
      }

      .form-row {
        display: flex;
        justify-content: space-between;
        width: 100%;
        gap: 15px;
        margin-bottom: 15px;
      }

      mat-form-field {
        flex: 2;
      }

      .full-width {
        width: 100%;
      }

      .form-actions {
        display: flex;
        justify-content: flex-end;
        width: 100%;
        margin-top: 15px;
      }

      mat-error {
        color: red;
      }

      .back-button {
        background-color: transparent;
        border: 1px solid #1976d2;
        color: #1976d2;
        padding: 8px 16px;
        margin-bottom: 20px;
        cursor: pointer;
        font-size: 16px;
        border-radius: 5px;
        display: inline-block;
      }

      .back-button:hover {
        background-color: #1976d2;
        color: white;
      }

      
    `,
  ],
})
export class StudentgradingformComponent implements OnInit {
  studentGradeForm!: FormGroup;
  subjects: Subject[] = [];
  isSubmitSuccessful = false;
  isEditMode = false;

  @Input() studentGradeData: any;

  constructor(
    private fb: FormBuilder,
    private studentGradeService: StudentgradingserviceService,
    private subjectService: SubjectserviceService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.studentGradeForm = this.fb.group({
      studentGradeId: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      subjectId: ['', Validators.required],
      grade: ['', Validators.required],
      remarks: [''],
    });

    const studentGradeId = this.route.snapshot.paramMap.get('id');

    if (studentGradeId) {
      this.isEditMode = true;
      this.studentGradeService
        .GetStudentGradeById(studentGradeId)
        .subscribe((response) => {
          console.log(response.data);
          if (response.success && response.data) {
            this.studentGradeForm.patchValue(response.data);
          }
        });
    }

    this.subjectService.GetSubjects().subscribe((response) => {
      if (response.success) {
        this.subjects = response.data;
      } else {
        console.error(response.message);
      }
    });
  }
  goBack(): void {
    this.router.navigate(['/']);
  }
  onSubmit(): void {
    if (this.studentGradeForm.valid) {
      const studentGrade = this.studentGradeForm.value;
      if (this.isEditMode) {
        this.studentGradeService
          .UpdateStudentGrade(studentGrade)
          .subscribe((response) => {
            if (response.success) {
              this.showSnackbar('Grade updated successfully!', 'success');
              this.isSubmitSuccessful = true;
              this.router.navigate(['/']);
            } else {
              this.showSnackbar(
                'Something went wrong. Please try again!',
                'error'
              );
              console.error('Error updating student grade', response.message);
            }
          });
      } else {
        this.studentGradeService
          .AddStudentGrade(studentGrade)
          .subscribe((response) => {
            if (response.success) {
              this.showSnackbar('Grade added successfully!', 'success');
              this.isSubmitSuccessful = true;
              this.router.navigate(['/']);
            } else {
              this.showSnackbar('Failed to add grade. Try again!', 'error');
              console.error('Error adding student grade', response.message);
            }
          });
      }
    }
  }

  private showSnackbar(message: string, type: 'success' | 'error') {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: type === 'success' ? 'snackbar-success' : 'snackbar-error',
    });
  }
}


