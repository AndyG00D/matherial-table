/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {PlatformModule} from '@angular/cdk/platform';
import {NgModule} from '@angular/core';
import {AppAutofill} from './autofill';
import {AppTextareaAutosizeDirective} from './autosize';



@NgModule({
  declarations: [AppAutofill, AppTextareaAutosizeDirective],
  imports: [PlatformModule],
  exports: [AppAutofill, AppTextareaAutosizeDirective],
})
export class TextFieldModule {}
