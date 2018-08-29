/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import {ErrorStateMatcher} from '../core/error/error-options';



/** @docs-private */
export interface HasErrorState {
  _parentFormGroup: FormGroupDirective;
  _parentForm: NgForm;
  _defaultErrorStateMatcher: ErrorStateMatcher;
  ngControl: NgControl;
}

/** @docs-private */
export interface CanUpdateErrorState {
  updateErrorState(): any;
  readonly stateChanges: Subject<void>;
  errorState: boolean;
  errorStateMatcher: ErrorStateMatcher;
}

export declare type Constructor<T> = new (...args: any[]) => T;
/**
 * Mixin to augment a directive with updateErrorState method.
 * For component with `errorState` and need to update `errorState`.
 */
export declare function mixinErrorState<T extends Constructor<HasErrorState>>(base: T): Constructor<CanUpdateErrorState> & T;
