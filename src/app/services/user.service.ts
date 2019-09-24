import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IUser } from './user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<IUser[]> {
    const url = 'http://localhost:3000/api/v1/users';
    return this.http.get<IUser[]>(url);
  }
}
