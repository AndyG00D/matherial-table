import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';


import {AppTextareaAutosizeDirective} from './autosize';
import {AppInputDirective} from './input';
import {AppFormFieldModule} from '../app-form-field/form-field-module';
import {TextFieldModule} from '../app-text-field/text-field-module';
import {ErrorStateMatcher} from '../../core/error/error-options';


@NgModule({
  declarations: [AppInputDirective, AppTextareaAutosizeDirective],
  imports: [
    CommonModule,
    TextFieldModule,
    AppFormFieldModule,
  ],
  exports: [
    TextFieldModule,
    AppFormFieldModule,
    AppInputDirective,
    AppTextareaAutosizeDirective,
  ],
  providers: [ErrorStateMatcher],
})
export class MatInputModule {
}
