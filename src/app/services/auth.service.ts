import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { MatDialog, MatSnackBar } from '@angular/material';
import { IPromptDialogData, PromptDialogComponent } from '../dialogs/prompt-dialog/prompt-dialog.component';
import { IUser } from './user.model';

interface ILoginRO {
  user: {
    id: string;
    name: string;
    username: string;
    role: string;
  };
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  changedToken = new Subject<string>();

  private token: string = null;
  private user;

  constructor(private router: Router,
              private snackbar: MatSnackBar,
              private dialog: MatDialog,
              private http: HttpClient) {
  }

  login(username: string, password: string): void {
    const url = 'http://localhost:3000/api/v1/login';
    const _this = this;
    this.http
      .post(url, {username, password}).subscribe((data: ILoginRO) => {
        // console.log(data);
        this.token = data.token;
        this.user = data.user;
        this.changedToken.next(this.token);
        this.snackbar.open('Login successful', 'X', {duration: 5000});
        this.router.navigate([ '/' ]);
      },
      error => {
        console.error(error);
        window.alert('Invalid credentials, please try again.');
        // this._prompt('Error', 'Login failed', 'Invalid credentials, please try again.').subscribe();
      });
  }

  getToken(): string {
    return this.token;
  }

  getUser() {
    return this.user;
  }

  logout(): void {
    this.token = null;
    this.changedToken.next(null);
    this.snackbar.open('Logout successful', 'X', {duration: 5000});
    this.router.navigate([ '/login' ]);
  }

// Private

  _prompt(title: string, subtitle: string, message: string): Observable<boolean> {
    const data: IPromptDialogData = {
      title: title,
      subtitle: subtitle,
      message: message
    };
    return this.dialog.open(PromptDialogComponent, {data: data}).afterClosed();
  }

}
