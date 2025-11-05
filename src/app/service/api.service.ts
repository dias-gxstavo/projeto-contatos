import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {}

  getUserDetails(): Observable<{ name: string; email: string }[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users`).pipe(
      map(users =>
        users.map(user => ({
          name: user.name,
          email: user.email,
        }))
      )
    );
  }
}