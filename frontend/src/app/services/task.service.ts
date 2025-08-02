import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private api = `${environment.apiUrl}/task`;

  constructor(private http: HttpClient, private router: Router) {}

  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(this.api);
  }

  createTask(task: any): Observable<any> {
    return this.http.post(this.api, task);
  }

  updateTask(id: number, task: any): Observable<any> {
    return this.http.put(`${this.api}/${id}`, task);
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
}
