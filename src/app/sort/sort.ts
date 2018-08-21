/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {
  Directive,
  EventEmitter,
  Input,
  isDevMode,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {CanDisable, HasInitialized, mixinDisabled, mixinInitialized} from '@angular/material/core';
import {SortDirection} from './sort-direction';
import {Subject} from 'rxjs';

/** Interface for a directive that holds sorting state consumed by `MatSortHeader`. */
export interface MatSortable {
  id: string;
  start: 'asc' | 'desc';
  disableClear: boolean;
}

/** The current sort state. */
export interface Sort {
  active: string;
  direction: SortDirection;
}

// export class MatSortBase {
// }

// export const _MatSortMixinBase = mixinInitialized(mixinDisabled(MatSortBase));

/** Container for MatSortables to manage the sort state and provide default sort parameters. */
@Directive({
  selector: '[matSort]',
  exportAs: 'matSort',
  inputs: ['disabled: matSortDisabled']
})
export class MatSort
  implements CanDisable, HasInitialized, OnChanges, OnDestroy, OnInit {
  /** Collection of all registered sortables that this directive manages. */
  sortables = new Map<string, MatSortable>();

  /** Used to notify any child components listening to state changes. */
  readonly _stateChanges = new Subject<void>();

  @Input('matSortActive') active: string;

  @Input('matSortStart') start: 'asc' | 'desc' = 'asc';

  @Input('matSortDirection')
  get direction(): SortDirection {
    return this._direction;
  }

  set direction(direction: SortDirection) {
    this._direction = direction;
  }

  private _direction: SortDirection = '';

  @Output('matSortChange') readonly sortChange: EventEmitter<Sort> = new EventEmitter<Sort>();


  register(sortable: MatSortable): void {
    this.sortables.set(sortable.id, sortable);
  }


  deregister(sortable: MatSortable): void {
    this.sortables.delete(sortable.id);
  }

  sort(sortable: MatSortable): void {
    if (this.active !== sortable.id) {
      this.active = sortable.id;
      this.direction = sortable.start ? sortable.start : this.start;
    } else {
      this.direction = this.getNextSortDirection(sortable);
    }

    this.sortChange.emit({active: this.active, direction: this.direction});
  }

  /** Returns the next sort direction of the active sortable, checking for potential overrides. */
  getNextSortDirection(sortable: MatSortable): SortDirection {
    if (!sortable) {
      return '';
    }

    // Get the sort direction cycle with the potential sortable overrides.
    const disableClear = sortable.disableClear != null ? sortable.disableClear : this.disableClear;
    let sortDirectionCycle = getSortDirectionCycle(sortable.start || this.start, disableClear);

    // Get and return the next direction in the cycle
    let nextDirectionIndex = sortDirectionCycle.indexOf(this.direction) + 1;
    if (nextDirectionIndex >= sortDirectionCycle.length) {
      nextDirectionIndex = 0;
    }
    return sortDirectionCycle[nextDirectionIndex];
  }

  ngOnInit() {
    // this._markInitialized();
  }

  ngOnChanges() {
    this._stateChanges.next();
  }

  ngOnDestroy() {
    this._stateChanges.complete();
  }
}

/** Returns the sort direction cycle to use given the provided parameters of order and clear. */
function getSortDirectionCycle(start: 'asc' | 'desc',
                               disableClear: boolean): SortDirection[] {
  let sortOrder: SortDirection[] = ['asc', 'desc'];
  if (start === 'desc') {
    sortOrder.reverse();
  }
  if (!disableClear) {
    sortOrder.push('');
  }

  return sortOrder;
}
