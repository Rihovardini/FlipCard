import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm = this.formBuilder.group({ email: 'rihovar@gmail.com', password: 'password' });

  constructor(
    private formBuilder: FormBuilder, 
    private router: Router,
    private authService: AuthService
    ){}

  public ngOnInit(): void {
  }

  public logIn(): void {
    const { email, password } = this.loginForm.value;

    this.authService.logIn(email, password).subscribe(() => {
      console.log('log In succsess');
      this.router.navigate(['/learning']);
    })
  }

}
