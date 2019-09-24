import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IOperator } from './operator.model';
import { Observable } from 'rxjs';
import { IUser } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class OperatorService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<IOperator[]> {
    const url = 'http://localhost:3000/api/v1/operators';
    return this.http.get<IOperator[]>(url);
  }

  getById(id: string): Observable<IOperator> {
    const url = `http://localhost:3000/api/v1/operators/${id}`;
    console.log(url);
    return this.http.get<IOperator>(url);
  }
}
