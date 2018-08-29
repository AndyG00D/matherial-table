/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  ViewEncapsulation
} from '@angular/core';
import {
  CDK_ROW_TEMPLATE,
  CdkFooterRow,
  CdkFooterRowDef,
  CdkHeaderRow,
  CdkHeaderRowDef,
  CdkRow,
  CdkRowDef,
} from '@angular/cdk/table';

/**
 * Header row definition for the app-table.
 * Captures the header row's template and other header properties such as the columns to display.
 */
@Directive({
  selector: '[appHeaderRowDef]',
  providers: [{provide: CdkHeaderRowDef, useExisting: AppHeaderRowDef}],
  inputs: ['columns: appHeaderRowDef', 'sticky: appHeaderRowDefSticky'],
})
export class AppHeaderRowDef extends CdkHeaderRowDef {
}

/**
 * Footer row definition for the app-table.
 * Captures the footer row's template and other footer properties such as the columns to display.
 */
@Directive({
  selector: '[appFooterRowDef]',
  providers: [{provide: CdkFooterRowDef, useExisting: AppFooterRowDef}],
  inputs: ['columns: appFooterRowDef', 'sticky: appFooterRowDefSticky'],
})
export class AppFooterRowDef extends CdkFooterRowDef {
}

/**
 * Data row definition for the app-table.
 * Captures the footer row's template and other footer properties such as the columns to display and
 * a when predicate that describes when this row should be used.
 */
@Directive({
  selector: '[appRowDef]',
  providers: [{provide: CdkRowDef, useExisting: AppRowDef}],
  inputs: ['columns: appRowDefColumns', 'when: appRowDefWhen'],
})
export class AppRowDef<T> extends CdkRowDef<T> {
}

/** Footer template container that contains the cell outlet. Adds the right class and role. */
@Component({
  selector: 'app-header-row, tr[app-header-row]',
  template: CDK_ROW_TEMPLATE,
  host: {
    'class': 'app-header-row',
    'role': 'row',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'appHeaderRow',
  providers: [{provide: CdkHeaderRow, useExisting: AppHeaderRow}],
})
export class AppHeaderRow extends CdkHeaderRow {
}

/** Footer template container that contains the cell outlet. Adds the right class and role. */
@Component({
  selector: 'app-footer-row, tr[app-footer-row]',
  template: CDK_ROW_TEMPLATE,
  host: {
    'class': 'app-footer-row',
    'role': 'row',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'appFooterRow',
  providers: [{provide: CdkFooterRow, useExisting: AppFooterRow}],
})
export class AppFooterRow extends CdkFooterRow {
}

/** Data row template container that contains the cell outlet. Adds the right class and role. */
@Component({
  selector: 'app-row, tr[app-row]',
  template: CDK_ROW_TEMPLATE,
  host: {
    'class': 'app-row',
    'role': 'row',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'appRow',
  providers: [{provide: CdkRow, useExisting: AppRow}],
})
export class AppRow extends CdkRow {
}
