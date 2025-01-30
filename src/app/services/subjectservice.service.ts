import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../Models/subject.model';

@Injectable({
  providedIn: 'root'
})
export class SubjectserviceService {
  http = inject(HttpClient);

  constructor() { }

  public GetSubjects(): Observable<ApiResponse>{
    const url = 'http://localhost:5240/api/Subject/GetSubjects';
    return this.http.get<ApiResponse>(url);
  }

  getSubjectById(subjectId: string): Observable<ApiResponse> {
    const url = 'http://localhost:5240/api/Subject/GetBySubjectId';
    return this.http.get<ApiResponse>(`${url}/${subjectId}`);
  }
}
