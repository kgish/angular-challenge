import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss' ]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private authService: AuthService,
              private dialog: MatDialog,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [ '', [ Validators.required, Validators.email ] ],
      password: [ '', [ Validators.required, Validators.minLength(5) ] ]
    });
  }

  onSubmit() {
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password);
  }

  getInputError(name: string): string {
    const errors = this.loginForm.controls[name].errors;
    if (errors) {
      if (errors.email) {
        return 'Must be a valid email';
      } else if (errors.required) {
        return 'Required';
      } else if (errors.minlength) {
        return `Minimum length is ${errors.minlength.requiredLength} `;
      } else {
        return JSON.stringify(errors);
      }
    }
    return '';
  }

}
