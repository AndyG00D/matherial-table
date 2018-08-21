/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Injectable, SkipSelf, Optional} from '@angular/core';
import {Subject} from 'rxjs';

/**
 * To modify the labels and text displayed, create a new instance of AppSortHeaderIntl and
 * include it in a custom provider.
 */
@Injectable({providedIn: 'root'})
export class AppSortHeaderIntl {
  /**
   * Stream that emits whenever the labels here are changed. Use this to notify
   * components if the labels have changed after initialization.
   */
  readonly changes: Subject<void> = new Subject<void>();

  /** ARIA label for the sorting button. */
  sortButtonLabel = (id: string) => {
    return `Change sorting for ${id}`;
  }
}
/** @docs-private */
export function MAT_SORT_HEADER_INTL_PROVIDER_FACTORY(parentIntl: AppSortHeaderIntl) {
  return parentIntl || new AppSortHeaderIntl();
}

/** @docs-private */
export const MAT_SORT_HEADER_INTL_PROVIDER = {
  // If there is already an AppSortHeaderIntl available, use that. Otherwise, provide a new one.
  provide: AppSortHeaderIntl,
  deps: [[new Optional(), new SkipSelf(), AppSortHeaderIntl]],
  useFactory: MAT_SORT_HEADER_INTL_PROVIDER_FACTORY
};

