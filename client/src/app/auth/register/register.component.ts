import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from '../../shared/services/auth.service';
import { notEmpty } from 'src/app/shared/validators/not-empty';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnDestroy {
  public registerForm = this.buildRegisterForm();

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

  public registerUser(): void {
    const { firstName, lastName, email, password } = this.registerForm.value;

    this.authService.signUp(firstName, lastName, email, password)
      .pipe(takeUntil(this.isAlive$))
      .subscribe(() => {
        this.router.navigate(['/student']);
      })
  }

  private buildRegisterForm(): FormGroup {
    return this.formBuilder.group({
      firstName: ['', [Validators.required, notEmpty, Validators.maxLength(128)]],
      lastName: ['', [Validators.required, notEmpty, Validators.maxLength(128)]],
      email: ['', [Validators.required, Validators.email, Validators.minLength(8), Validators.maxLength(128)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(128)]]
    });
  }
}
