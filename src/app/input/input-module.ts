import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';


import {MatTextareaAutosize} from './autosize';
import {MatInput} from './input';
import {MatFormFieldModule} from '../form-field/form-field-module';
import {TextFieldModule} from '../text-field/text-field-module';
import {ErrorStateMatcher} from '../core/error/error-options';


@NgModule({
  declarations: [MatInput, MatTextareaAutosize],
  imports: [
    CommonModule,
    TextFieldModule,
    MatFormFieldModule,
  ],
  exports: [
    TextFieldModule,
    MatFormFieldModule,
    MatInput,
    MatTextareaAutosize,
  ],
  providers: [ErrorStateMatcher],
})
export class MatInputModule {
}
