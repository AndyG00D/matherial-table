import {CdkColumnDef} from '@angular/cdk/table';
import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  ViewEncapsulation
} from '@angular/core';
import {CanDisable, mixinDisabled} from '@angular/material/core';
import {AppSort, AppSortable} from './sort';
import {AppSortHeaderIntl} from './sort-header-intl';
import {merge, Subscription} from 'rxjs';

export class MatSortHeaderBase {
}

export const _MatSortHeaderMixinBase = mixinDisabled(MatSortHeaderBase);

@Component({
  selector: '[app-sort-header]',
  exportAs: 'appSortHeader',
  templateUrl: 'sort-header.html',
  styleUrls: ['sort-header.scss'],
  host: {
    '(click)': '_handleClick()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppSortHeader extends _MatSortHeaderMixinBase
  implements OnDestroy, OnInit {

  private _rerenderSubscription: Subscription;

  @Input('app-app-sort-header') id: string;
  @Input() start: 'asc' | 'desc' | '';

  constructor(public _intl: AppSortHeaderIntl,
              changeDetectorRef: ChangeDetectorRef,
              @Optional() public _sort: AppSort,
              @Optional() public _cdkColumnDef: CdkColumnDef) {

    super();

    this._rerenderSubscription = merge(_sort.sortChange, _sort._stateChanges, _intl.changes)
      .subscribe(() => {
        changeDetectorRef.markForCheck();
      });
  }

  ngOnInit() {
    if (!this.id && this._cdkColumnDef) {
      this.id = this._cdkColumnDef.name;
    }
    this._sort.register(this);
  }

  ngOnDestroy() {
    this._rerenderSubscription.unsubscribe();
    this._sort.deregister(this);
  }

  _handleClick() {
    if (this.disabled) {
      return;
    }
    this._sort.sort(this);
  }

  _isSorted() {
    return this._sort.active === this.id &&
      (this._sort.direction === 'asc' || this._sort.direction === 'desc');
  }

  isShowASC() {
    return this._sort.active === this.id && this._sort.direction === 'asc' && !this.disabled;
  }

  isShowDESC() {
    return this._sort.active === this.id && this._sort.direction === 'desc' && !this.disabled;
  }

}
