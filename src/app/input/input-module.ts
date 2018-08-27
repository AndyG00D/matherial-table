/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ErrorStateMatcher} from '@angular/material/core';

import {MatTextareaAutosize} from './autosize';
import {MatInput} from './input';

import {MatFormFieldModule} from '../form-field/form-field-module';
import {TextFieldModule} from '../text-field/text-field-module';




@NgModule({
  declarations: [MatInput, MatTextareaAutosize],
  imports: [
    CommonModule,
    TextFieldModule,
    MatFormFieldModule,
  ],
  exports: [
    TextFieldModule,
    // We re-export the `MatFormFieldModule` since `MatInput` will almost always
    // be used together with `MatFormField`.
    MatFormFieldModule,
    MatInput,
    MatTextareaAutosize,
  ],
  providers: [ErrorStateMatcher],
})
export class MatInputModule {}
