import { Component, Input, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { LoginService } from '../_services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService
  ) {}
  @Input() error: string | null | undefined;

  public loginForm = this.formBuilder.group({
    username: ['', [Validators.email, Validators.required]],
    password: ['', Validators.required],
  });

  submit() {
    let username = this.loginForm.controls['username'].value;
    let password = this.loginForm.controls['password'].value;
    this.loginService
      .login(username ? username : '', password ? password : '')
      .subscribe((resp) => {});
  }

  ngOnInit(): void {}
}
