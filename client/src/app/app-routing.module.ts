import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from './shared/guards/auth.guard';
import { LearningGuardService } from './shared/guards/learning.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuardService],
    loadChildren:() => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'student',
    canActivate: [LearningGuardService],
    loadChildren: () => import('./learning/student.module').then(m => m.StudentModule)
   },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
