/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Directive, ElementRef, Input} from '@angular/core';
import {
  CdkCell,
  CdkCellDef,
  CdkColumnDef, CdkFooterCell, CdkFooterCellDef,
  CdkHeaderCell,
  CdkHeaderCellDef,
} from '@angular/cdk/table';

/**
 * Cell definition for the app-table.
 * Captures the template of a column's data row cell as well as cell-specific properties.
 */
@Directive({
  selector: '[appCellDef]',
  providers: [{provide: CdkCellDef, useExisting: AppCellDef}]
})
export class AppCellDef extends CdkCellDef {}

/**
 * Header cell definition for the app-table.
 * Captures the template of a column's header cell and as well as cell-specific properties.
 */
@Directive({
  selector: '[appHeaderCellDef]',
  providers: [{provide: CdkHeaderCellDef, useExisting: AppHeaderCellDef}]
})
export class AppHeaderCellDef extends CdkHeaderCellDef {}

/**
 * Footer cell definition for the app-table.
 * Captures the template of a column's footer cell and as well as cell-specific properties.
 */
@Directive({
  selector: '[appFooterCellDef]',
  providers: [{provide: CdkFooterCellDef, useExisting: AppFooterCellDef}]
})
export class AppFooterCellDef extends CdkFooterCellDef {}

/**
 * Column definition for the app-table.
 * Defines a set of cells available for a table column.
 */
@Directive({
  selector: '[appColumnDef]',
  providers: [{provide: CdkColumnDef, useExisting: AppColumnDef}],
})
export class AppColumnDef extends CdkColumnDef {
  /** Unique name for this column. */
  @Input('appColumnDef') name: string;

  /** Whether this column should be sticky positioned at the start of the row */
  @Input() sticky: boolean;

  /** Whether this column should be sticky positioned on the end of the row */
  @Input() stickyEnd: boolean;
}

/** Header cell template container that adds the right classes and role. */
@Directive({
  selector: 'app-header-cell, th[app-header-cell]',
  host: {
    'class': 'app-header-cell',
    'role': 'columnheader',
  },
})
export class AppHeaderCell extends CdkHeaderCell {
  constructor(columnDef: CdkColumnDef,
              elementRef: ElementRef) {
    super(columnDef, elementRef);
    elementRef.nativeElement.classList.add(`app-column-${columnDef.cssClassFriendlyName}`);
  }
}

/** Footer cell template container that adds the right classes and role. */
@Directive({
  selector: 'app-footer-cell, td[app-footer-cell]',
  host: {
    'class': 'app-footer-cell',
    'role': 'gridcell',
  },
})
export class AppFooterCell extends CdkFooterCell {
  constructor(columnDef: CdkColumnDef,
              elementRef: ElementRef) {
    super(columnDef, elementRef);
    elementRef.nativeElement.classList.add(`app-column-${columnDef.cssClassFriendlyName}`);
  }
}

/** Cell template container that adds the right classes and role. */
@Directive({
  selector: 'app-cell, td[app-cell]',
  host: {
    'class': 'app-cell',
    'role': 'gridcell',
  },
})
export class AppCell extends CdkCell {
  constructor(columnDef: CdkColumnDef,
              elementRef: ElementRef) {
    super(columnDef, elementRef);
    elementRef.nativeElement.classList.add(`app-column-${columnDef.cssClassFriendlyName}`);
  }
}
