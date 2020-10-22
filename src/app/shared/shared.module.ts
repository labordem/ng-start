import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ImageDefaultDirective } from './image-default.directive';

const materialModules = [
  MatButtonModule,
  MatDividerModule,
  MatMenuModule,
  MatSidenavModule,
  MatListModule,
  MatIconModule,
  MatDialogModule,
  MatTooltipModule,
];

@NgModule({
  declarations: [ImageDefaultDirective],
  imports: [CommonModule, materialModules],
  exports: [
    materialModules,
    FormsModule,
    ReactiveFormsModule,
    ImageDefaultDirective,
  ],
})
export class SharedModule {}
