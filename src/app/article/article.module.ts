import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConfirmedUserGuard } from '../core/guards/confirmed-user.guard';

import { ArticleComponent } from './article.component';

const routes: Routes = [
  { path: '', component: ArticleComponent, canActivate: [ConfirmedUserGuard] },
];

@NgModule({
  declarations: [ArticleComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ArticleModule {}
