import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from './shared/guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { 
    path: 'login',
    component: LoginComponent
  },
  { 
    path: 'sign-up',
     component: RegisterComponent
  },
  {
    path: 'learning',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./learning/learning.module').then(m => m.LearningModule)
   },
   { path : '', redirectTo : 'login', pathMatch : 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
