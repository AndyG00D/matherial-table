/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {
  Attribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  IterableDiffers,
  Optional,
  ViewEncapsulation
} from '@angular/core';
import {CDK_TABLE_TEMPLATE, CdkTable} from '@angular/cdk/table';
import {Directionality} from '@angular/cdk/bidi';

/**
 * Wrapper for the CdkTable with Material design styles.
 */
@Component({
  selector: 'app-table, table[app-table]',
  exportAs: 'appTable',
  template: CDK_TABLE_TEMPLATE,
  styleUrls: ['./table.scss'],
  host: {
    'class': 'app-table',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppTable<T> extends CdkTable<T> {
  /** Overrides the sticky CSS class set by the `CdkTable`. */
  protected stickyCssClass = 'app-table-sticky';

  // TODO(andrewseguin): Remove this explicitly set constructor when the compiler knows how to
  // properly build the es6 version of the class. Currently sets ctorParameters to empty due to a
  // fixed bug.
  // https://github.com/angular/tsickle/pull/760 - tsickle PR that fixed this
  // https://github.com/angular/angular/pull/23531 - updates compiler-cli to fixed version
  constructor(protected _differs: IterableDiffers,
              protected _changeDetectorRef: ChangeDetectorRef,
              protected _elementRef: ElementRef,
              @Attribute('role') role: string,
              @Optional() protected readonly _dir: Directionality) {
    super(_differs, _changeDetectorRef, _elementRef, role, _dir);
  }
}
