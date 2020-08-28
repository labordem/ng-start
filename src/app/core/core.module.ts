import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from 'src/environments/environment';

import { SharedModule } from '../shared/shared.module';

import { LayoutSettingsComponent } from './layout/layout-settings/layout-settings.component';
import { LayoutComponent } from './layout/layout.component';

@NgModule({
  declarations: [LayoutComponent, LayoutSettingsComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
    RouterModule,
    SharedModule,
  ],
  exports: [LayoutComponent],
})
export class CoreModule {}
