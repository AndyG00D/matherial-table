import {
  AfterContentInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component, ContentChildren, EventEmitter,
  OnDestroy,
  Output, QueryList, ViewChild, ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {debounceTime, takeUntil} from 'rxjs/operators';
import {FormControl, FormGroup} from '@angular/forms';
import {FilterControlDirective} from './filter-control.directive';

@Component({
  selector: 'app-filter',
  exportAs: 'appFilter',
  templateUrl: './filter.html',
  styleUrls: ['./filter.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppFilterComponent implements OnDestroy, AfterContentInit {

  private _rerenderSubscription: Subscription;
  private destroy = new Subject();


  @ContentChildren(FilterControlDirective) filterControls: QueryList<any>;
  @Output() filterValue = new EventEmitter();
  @ViewChild('filterBar', {read: ViewContainerRef})
  private filterBar: ViewContainerRef;
  public filterForm = new FormGroup({});

  constructor(private changeDetectorRef: ChangeDetectorRef) {
  }

  public ngAfterContentInit() {
    this.createFilterControlsView();

    this.filterForm.valueChanges
      .pipe(
        takeUntil(this.destroy),
        debounceTime(1000)
      )
      .subscribe((value) => {
        console.log(value);
        this.filterValue.emit(value);
        this.changeDetectorRef.detectChanges();
      });
  }

  ngOnDestroy() {
    this._rerenderSubscription.unsubscribe();
    this.destroy.next();
    this.destroy.complete();
  }

  public createFilterControlsView() {
    this.filterBar.clear();
    this.filterControls.forEach(filterControl => {
      if (!this.filterForm.get(filterControl.name)) {
        this.filterForm.setControl(filterControl.name, new FormControl(''));
        this.filterBar.createEmbeddedView(filterControl.template, {
          $implicit: {
            control: this.filterForm.get(filterControl.name)
          }
        });
        this.changeDetectorRef.detectChanges();
      }
    });
  }
}
