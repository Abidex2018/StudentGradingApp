import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { SubjectserviceService } from '../../services/subjectservice.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { StudentgradingserviceService } from '../../services/studentgradingservice.service';
import { Subject } from '../../../Models/subject.model';
import { StudentGrade } from '../../../Models/studentGrade.model';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-studentgradinglists',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    CommonModule,
  ],
  template: `
    <div class="table-wrapper">
      <div class="table-container">
        <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">
          <ng-container matColumnDef="studentGradeId">
            <th mat-header-cell *matHeaderCellDef>No.</th>
            <td mat-cell *matCellDef="let element; let i = index">
            {{ i + 1 }}
            </td>
          </ng-container>

          <ng-container matColumnDef="Name">
            <th mat-header-cell *matHeaderCellDef>Name</th>
            <td mat-cell *matCellDef="let element">
              {{ element.firstName }} {{ element.lastName }}
            </td>
          </ng-container>

          <ng-container matColumnDef="subjectId">
            <th mat-header-cell *matHeaderCellDef>Subject</th>
            <td mat-cell *matCellDef="let element">
              {{ getSubjectName(element.subjectId) }}
            </td>
          </ng-container>

          <ng-container matColumnDef="grade">
            <th mat-header-cell *matHeaderCellDef>Grade</th>
            <td mat-cell *matCellDef="let element">{{ element.grade }}</td>
          </ng-container>

          <ng-container matColumnDef="remarks">
            <th mat-header-cell *matHeaderCellDef>Remarks</th>
            <td mat-cell *matCellDef="let element">{{ element.remarks }}</td>
          </ng-container>

          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef>Actions</th>
            <td mat-cell *matCellDef="let element">
            <button
                mat-icon-button
                (click)="editStudentGrade(element)"
              >
                <mat-icon [ngStyle]="{color: '#3f51b5' }">edit</mat-icon>
              </button>
              <button
                mat-icon-button
                (click)="deleteStudentGrade(element)"
              >
                <mat-icon [ngStyle]="{color: '#f44336' }">delete</mat-icon>
              </button>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
        </table>

        <mat-paginator
          [length]="studentGradeList.length"
          [pageSize]="pageSize"
          [pageSizeOptions]="[5, 10, 25, 100]"
          (page)="pageChanged($event)"
        >
        </mat-paginator>
      </div>
    </div>
  `,
  styles: `
 .table-wrapper {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 10px;
      margin-top: 70px
    }

    .table-container {
      width: 80%; 
      max-width: 1200px; 
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    mat-paginator {
      margin-top: 10px;
      align-self: stretch;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    th, td {
      padding: 12px 16px;
      text-align: left;
      border-bottom: 2px solid #ddd;
    }

    th {
      background-color: #673AB7;
      color: black;
      font-weight: bold;
    }

    tr:hover {
      background-color: #f1f1f1;
    }

    td {
      background-color: #fff;
    }

    .mat-icon-button .mat-icon {
  color: white !important;
}

  `,
})
export class StudentgradinglistsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  subjects: Subject[] = [];
  studentGradeList: StudentGrade[] = [];
  message: string = '';
  displayedColumns: string[] = [
    'studentGradeId',
    'Name',
    'subjectId',
    'grade',
    'remarks',
    'actions',
  ];
  dataSource = new MatTableDataSource<StudentGrade>();
  pageSize = 10;

  constructor(
    private subjectService: SubjectserviceService,
    private studentGradeService: StudentgradingserviceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Fetch subjects
    this.subjectService.GetSubjects().subscribe((response) => {
      if (response.success) {
        this.subjects = response.data;
      } else {
        this.message = response.message;
      }
    });

    // Fetch student grades and map subject names
    this.studentGradeService.GetStudentGrades().subscribe((response) => {
      if (response.success) {
        console.log(response.data);
        this.studentGradeList = response.data.map((studentGrade) => ({
          ...studentGrade,
          subjectName: this.getSubjectName(studentGrade.subjectId),
        }));
        this.dataSource.data = this.studentGradeList;
        this.dataSource.paginator = this.paginator;
      } else {
        this.message = response.message;
      }
    });
  }

  getSubjectName(subjectId: string): string {
    const subject = this.subjects.find((sub) => sub.subjectId === subjectId);
    if (subject) return subject.subjectName;

    this.subjectService.getSubjectById(subjectId).subscribe((response) => {
      console.log(response.data);
      if (response.success && response.data.length > 0) {
        this.subjects.push(response.data[0]);
      }
    });

    return 'Loading...';
  }

  pageChanged(event: any): void {
    this.dataSource.paginator = this.paginator;
  }

  editStudentGrade(studentGrade: StudentGrade) {
    this.router.navigate(['/studentgradingform', studentGrade.studentGradeId]);
  }

  deleteStudentGrade(studentGrade: StudentGrade) {
    if (confirm('Are you sure you want to delete this grade?')) {
      this.studentGradeService
        .DeleteStudentGradeById(studentGrade.studentGradeId)
        .subscribe((response) => {
          if (response.success) {
            console.log(response.data);
            this.loadStudentGrades();
          } else {
            alert('Error deleting grade: ' + response.message);
          }
        });
    }
  }

  loadStudentGrades() {
    this.studentGradeService.GetStudentGrades().subscribe((response) => {
      if (response.success) {
        this.studentGradeList = response.data.map((studentGrade) => ({
          ...studentGrade,
          subjectName: this.getSubjectName(studentGrade.subjectId),
        }));
        this.dataSource.data = this.studentGradeList;
      } else {
        this.message = response.message;
      }
    });
  }

  addStudentGrade() {
    this.router.navigate(['/studentgradingform']);
  }
}
