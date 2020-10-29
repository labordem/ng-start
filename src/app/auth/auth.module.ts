import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { AuthComponent } from './auth.component';
import { DialogCheckMailboxComponent } from './dialog-check-mailbox/dialog-check-mailbox.component';
import { SigninFormComponent } from './signin-form/signin-form.component';
import { SignupFormComponent } from './signup-form/signup-form.component';

const routes: Routes = [{ path: '', component: AuthComponent }];

@NgModule({
  declarations: [
    AuthComponent,
    DialogCheckMailboxComponent,
    SigninFormComponent,
    SignupFormComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class AuthModule {}
