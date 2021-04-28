import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ComponentsModule } from './components/components.module';
import { PipesModule } from './pipes/pipes.module';
import { MaterialModule } from './material/material.module';

@NgModule({
  imports: [CommonModule],
  exports: [
    ReactiveFormsModule,
    ComponentsModule,
    MaterialModule,
    PipesModule,
    FontAwesomeModule
  ]
})
export class SharedModule {}
