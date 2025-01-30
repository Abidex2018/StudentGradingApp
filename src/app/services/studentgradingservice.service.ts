import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, StudentGrade } from '../../Models/studentGrade.model';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class StudentgradingserviceService {
  http  = inject(HttpClient);


  constructor() { }


   public GetStudentGrades(): Observable<ApiResponse>{
      const url = 'http://localhost:5240/api/StudentGrade/GetStudentGrades';
      return this.http.get<ApiResponse>(url);
    }
    public GetStudentGradeById(studentGradeId: string): Observable<ApiResponse>{
      const url = 'http://localhost:5240/api/StudentGrade/GetStudentGradesById';
       return this.http.get<ApiResponse>(`${url}/${studentGradeId}`);
    }

    public DeleteStudentGradeById(studentGradeId: string): Observable<ApiResponse>{
      const url = 'http://localhost:5240/api/StudentGrade/DeleteStudentGrade';
       return this.http.delete<ApiResponse>(`${url}/${studentGradeId}`);
    }

    public GetSubjects(): Observable<ApiResponse>{
        const url = 'http://localhost:5240/api/Subject/GetSubjects';
        return this.http.get<ApiResponse>(url);
      }

    public AddStudentGrade(studentGradeRequest: StudentGrade): Observable<ApiResponse>{
      const url = 'http://localhost:5240/api/StudentGrade/CreateStudentGrade';
      return this.http.post<ApiResponse>(url, studentGradeRequest).pipe(
        tap(()=>{
          this.GetStudentGrades();
        })
      );
    }


    //Coming Soon, Smiles
    public UpdateStudentGrade(studentGradeRequest: StudentGrade): Observable<ApiResponse>{
      const url = 'http://localhost:5240/api/StudentGrade/UpdateStudentGrade';
      return this.http.put<ApiResponse>(url, studentGradeRequest).pipe(
        tap(()=>{
          this.GetStudentGrades();
        })
      );
    }
}
