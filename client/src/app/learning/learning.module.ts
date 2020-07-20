import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LearningComponent } from './learning/learning.component';

const routes: Routes = [
  { path: '', component: LearningComponent }
];

@NgModule({
  declarations: [LearningComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class LearningModule { }
