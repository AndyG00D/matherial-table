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
import {MatSort, MatSortable} from './sort';
import {MatSortHeaderIntl} from './sort-header-intl';
import {merge, Subscription} from 'rxjs';

export class MatSortHeaderBase {
}

export const _MatSortHeaderMixinBase = mixinDisabled(MatSortHeaderBase);

@Component({
  selector: '[mat-sort-header]',
  exportAs: 'matSortHeader',
  templateUrl: 'sort-header.html',
  styleUrls: ['sort-header.scss'],
  host: {
    '(click)': '_handleClick()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatSortHeader extends _MatSortHeaderMixinBase
  implements CanDisable, OnDestroy, OnInit {

  private _rerenderSubscription: Subscription;

  @Input('mat-sort-header') id: string;
  @Input() start: 'asc' | 'desc';

  constructor(public _intl: MatSortHeaderIntl,
              changeDetectorRef: ChangeDetectorRef,
              @Optional() public _sort: MatSort,
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
    this._sort.register(this as MatSortable);
  }

  ngOnDestroy() {
    this._rerenderSubscription.unsubscribe();
    this._sort.deregister(this);
  }

  _handleClick() {
    if (this._isDisabled()) {
      return;
    }

    this._sort.sort(this);
  }

  _isSorted() {
    return this._sort.active === this.id &&
      (this._sort.direction === 'asc' || this._sort.direction === 'desc');
  }


  _isDisabled() {
    return this._sort.disabled || this.disabled;
  }

  isShowASC() {
    return this._sort.active === this.id && this._sort.direction === 'asc' && !this._isDisabled();
  }

  isShowDESC() {
    return this._sort.active === this.id && this._sort.direction === 'desc' && !this._isDisabled();
  }

}
