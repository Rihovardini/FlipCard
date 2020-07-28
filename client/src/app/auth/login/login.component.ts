import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from '../../shared/services/auth.service';
import { notEmpty } from 'src/app/shared/validators/not-empty';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {
  public loginForm = this.buildLogInForm();
  
  private isAlive$ = new Subject();

  constructor(
    private formBuilder: FormBuilder, 
    private router: Router,
    private authService: AuthService
  ){}

  public ngOnDestroy(): void {
    this.isAlive$.next();
    this.isAlive$.complete();
  }  

  public logIn(): void {
    const { email, password } = this.loginForm.value;

    this.authService.logIn(email, password)
      .pipe(takeUntil(this.isAlive$))
      .subscribe(() => {
        this.router.navigate(['/student']);
      })
  }

  private buildLogInForm(): FormGroup {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(128), Validators.email, notEmpty]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(128), notEmpty]]
    });
  }
}
