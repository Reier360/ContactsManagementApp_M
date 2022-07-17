import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../_services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  errorMessage: string = '';
  isLoginFailed: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {}

  public loginForm = this.formBuilder.group({
    username: ['', [Validators.email, Validators.required]],
    password: ['', Validators.required],
  });

  submit() {
    this.isLoginFailed = false;
    let username = this.loginForm.controls['username'].value;
    let password = this.loginForm.controls['password'].value;
    this.loginService
      .login(username ? username : '', password ? password : '')
      .subscribe({
        next: (v: any) => {
          localStorage.setItem('jwt-token', v.token);
          window.location.href = '/contacts';
        },
        error: (e) => {
          this.isLoginFailed = true;
          this.errorMessage = 'Please check username and password.';
        },
      });
  }
  ngOnInit(): void {}
}
