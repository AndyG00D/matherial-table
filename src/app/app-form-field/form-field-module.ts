import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {AppError} from './error';
import {AppFormField} from './form-field';
import {AppHint} from './hint';
import {AppLabel} from './label';
import {AppPlaceholder} from './placeholder';



@NgModule({
  declarations: [
    AppError,
    AppFormField,
    AppHint,
    AppLabel,
    AppPlaceholder,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    AppError,
    AppFormField,
    AppHint,
    AppLabel,
    AppPlaceholder,
  ],
})
export class AppFormFieldModule {}
