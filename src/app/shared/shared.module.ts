import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ImageDefaultDirective } from './image-default.directive';

@NgModule({
  declarations: [ImageDefaultDirective],
  imports: [],
  exports: [FormsModule, ReactiveFormsModule, ImageDefaultDirective],
})
export class SharedModule {}
