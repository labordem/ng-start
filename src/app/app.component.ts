import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<app-layout></app-layout>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
