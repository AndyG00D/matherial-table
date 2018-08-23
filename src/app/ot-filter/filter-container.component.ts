import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  EventEmitter,
  OnDestroy,
  Output,
  QueryList,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
// import { AutoUnsubscribe } from '@tenant/helpers';
// import { deepCompare } from '@tenant/ot';
import {Subscription} from 'rxjs';
import {debounceTime, map, takeWhile, tap} from 'rxjs/operators';

import { FilterDirective } from './filter.directive';

@Component({
  selector: 'ot-filter-container',
  templateUrl: './filter-container.component.html',
  styleUrls: ['./filter-container.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
// @AutoUnsubscribe()
export class FilterContainerComponent implements AfterContentInit, OnDestroy {
  public fg = new FormGroup({});
  public filterChanged = false;
  @ContentChildren(FilterDirective) filters: QueryList<FilterDirective>;
  @Output() filterChange = new EventEmitter();
  @ViewChild('container', {read: ViewContainerRef})
  private container: ViewContainerRef;
  private initial: any = {};
  private destroy: any;
  private changeSubscription$: Subscription;

  constructor(private cd: ChangeDetectorRef) {
  }

  public ngOnDestroy(): void {
    this.destroy = true;
  }

  public ngAfterContentInit() {
    this.init();

    this.filters.changes.pipe(takeWhile(() => !this.destroy)).subscribe(() => {
      this.init();
    });
    // this.initial = this.fg.value;
  }

  public clear($event) {
    $event.preventDefault();
    this.fg.patchValue(this.initial);
  }

  private init() {
    this.container.clear();
    this.filters.forEach((v) => {
      if (!this.fg.get(v.name)) {
        this.fg.setControl(v.name, new FormControl(v.defaultValue));
        this.initial[v.name] = v.defaultValue;
        // this.fg.setControl(v.name, new FormControl(''));
      }
      this.container.createEmbeddedView(v.template, {
        $implicit: {
          control: this.fg.get(v.name)
        }
      });
      this.cd.detectChanges();
    });

    if (this.changeSubscription$) {
      this.changeSubscription$.unsubscribe();
    }
    this.changeSubscription$ = this.fg.valueChanges
      .pipe(
        takeWhile(() => !this.destroy),
        debounceTime(300),
        tap((v) => {
          // this.filterChanged = deepCompare(this.initial, v) === false;
          this.initial = v
          this.filterChanged = true;
        }),
        map((v) => {
          const res = {};
          for (const key in v) {
            if (v.hasOwnProperty(key)) {
              if (v[key] != null && (typeof v[key] !== 'string' || v[key].length > 0)) {
                res[key] = v[key];
              }
            }
          }
          return res;
        })
      )
      .subscribe((v) => {
        console.log(v);
        this.filterChange.emit(v);
        this.cd.detectChanges();
      });
    this.cd.markForCheck();
  }
}
