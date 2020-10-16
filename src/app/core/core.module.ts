import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from 'src/environments/environment';

import { SharedModule } from '../shared/shared.module';

import { JwtInterceptor } from './jwt.interceptor';
import { LayoutFooterComponent } from './layout/layout-footer/layout-footer.component';
import { LayoutNavComponent } from './layout/layout-nav/layout-nav.component';
import { LayoutSettingsComponent } from './layout/layout-settings/layout-settings.component';
import { LayoutSidenavComponent } from './layout/layout-sidenav/layout-sidenav.component';
import { LayoutUserButtonComponent } from './layout/layout-user-button/layout-user-button.component';
import { LayoutUserComponent } from './layout/layout-user/layout-user.component';
import { LayoutComponent } from './layout/layout.component';

@NgModule({
  declarations: [
    LayoutComponent,
    LayoutSettingsComponent,
    LayoutFooterComponent,
    LayoutSidenavComponent,
    LayoutNavComponent,
    LayoutUserComponent,
    LayoutUserButtonComponent,
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
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {}
