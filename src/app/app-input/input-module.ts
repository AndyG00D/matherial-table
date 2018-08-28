import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';


import {AppTextareaAutosize} from './autosize';
import {AppInput} from './input';
import {AppFormFieldModule} from '../app-form-field/form-field-module';
import {TextFieldModule} from '../text-field/text-field-module';
import {ErrorStateMatcher} from '../core/error/error-options';


@NgModule({
  declarations: [AppInput, AppTextareaAutosize],
  imports: [
    CommonModule,
    TextFieldModule,
    AppFormFieldModule,
  ],
  exports: [
    TextFieldModule,
    AppFormFieldModule,
    AppInput,
    AppTextareaAutosize,
  ],
  providers: [ErrorStateMatcher],
})
export class MatInputModule {
}
