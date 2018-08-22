import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component, ContentChildren, EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Optional, Output, QueryList, ViewChild, ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import {CanDisable, mixinDisabled} from '@angular/material/core';
import {merge, Subject, Subscription} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-filter',
  exportAs: 'appFilter',
  templateUrl: './filter-container.component.html',
  styleUrls: ['./filter-container.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppFilterComponent implements OnDestroy, OnInit, AfterViewInit {

  private _rerenderSubscription: Subscription;
  private destroy: Subject<any>;


  @ContentChildren('filterControl') filterControls: QueryList<any>;
  @Output() filterValue = new EventEmitter();

  @ViewChild('filterBar', { read: ViewContainerRef })
  private filterBar: ViewContainerRef;
  // @ViewChild('vc', {read: ViewContainerRef}) vc: ViewContainerRef;

  public fg = new FormGroup({});

  constructor(changeDetectorRef: ChangeDetectorRef) {

    this._rerenderSubscription = merge()
      .pipe(
        takeUntil(this.destroy)
      )
      .subscribe(() => {
        changeDetectorRef.markForCheck();
      });
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.filterControls.forEach(filterControl =>{
    // for (const filterControl of this.filterControls) {
      this.fg.setControl(filterControl.name, new FormControl(filterControl.defaultValue));
      // this.initial[v.name] = v.defaultValue;
      this.filterBar.createEmbeddedView(filterControl.template, {
        $implicit: {
          control: this.fg.get(filterControl.name)
        }
      });
    });
  }

  ngOnDestroy() {
    this._rerenderSubscription.unsubscribe();
    this.destroy.complete();
  }

}
