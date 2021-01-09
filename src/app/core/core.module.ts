import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from 'src/environments/environment';

import { SharedModule } from '../shared/shared.module';

import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';
import { HttpJwtInterceptor } from './interceptors/http-jwt.interceptor';
import { LayoutFooterComponent } from './layout/layout-footer/layout-footer.component';
import { LayoutNavComponent } from './layout/layout-nav/layout-nav.component';
import { LayoutSettingsComponent } from './layout/layout-settings/layout-settings.component';
import { LayoutSidenavComponent } from './layout/layout-sidenav/layout-sidenav.component';
import { LayoutComponent } from './layout/layout.component';

@NgModule({
  declarations: [
    LayoutComponent,
    LayoutSettingsComponent,
    LayoutFooterComponent,
    LayoutSidenavComponent,
    LayoutNavComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
    SharedModule,
    RouterModule,
    HttpClientModule,
  ],
  exports: [LayoutComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpJwtInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {}
