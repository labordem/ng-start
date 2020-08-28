import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ImageDefaultDirective } from './image-default.directive';
import { MaterialModule } from './material/material.module';

@NgModule({
  declarations: [ImageDefaultDirective],
  imports: [],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ImageDefaultDirective,
  ],
})
export class SharedModule {}
