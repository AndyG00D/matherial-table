/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {FilterContainerComponent} from './filter-container.component';
import {FilterDirective} from './filter.directive';


@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [FilterDirective, FilterContainerComponent],
  exports: [FilterDirective, FilterContainerComponent]
})
export class OtFilterModule {}
