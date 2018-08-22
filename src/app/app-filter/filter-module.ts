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
import {AppFilterComponent} from './filter';
import {FilterControlDirective} from './filter-control.directive';


@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [AppFilterComponent, FilterControlDirective],
  exports: [AppFilterComponent, FilterControlDirective]
})
export class AppFilterModule {}
