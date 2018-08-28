import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatError} from './error';
import {MatFormField} from './form-field';
import {MatHint} from './hint';
import {MatLabel} from './label';
import {MatPlaceholder} from './placeholder';



@NgModule({
  declarations: [
    MatError,
    MatFormField,
    MatHint,
    MatLabel,
    MatPlaceholder,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    MatError,
    MatFormField,
    MatHint,
    MatLabel,
    MatPlaceholder,
  ],
})
export class MatFormFieldModule {}
