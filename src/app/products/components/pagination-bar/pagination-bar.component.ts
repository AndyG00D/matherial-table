import {Component, ViewEncapsulation, OnDestroy, OnInit, Output, Input} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {EventEmitter} from '@angular/core';
import {debounce, debounceTime, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs/internal/Subject';


@Component({
  selector: 'app-pagination-bar',
  templateUrl: './pagination-bar.component.html',
  styleUrls: ['./pagination-bar.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class PaginationBarComponent implements OnInit, OnDestroy {
  @Input() currentPage = 1;
  @Input() currentLimit = 1;
  @Input() lastPage = 1;
  @Output() setPageLimit = new EventEmitter<any>();
  @Output() setPage = new EventEmitter<any>();
  public paginationForm;
  private destroy = new Subject();

  constructor() {
    this.paginationForm = new FormGroup(
      {
        _limit: new FormControl('',
          []),
        currentPage: new FormControl('',
          [])
      });
  }

  public ngOnInit() {
    this.paginationForm.valueChanges
      .pipe(
        takeUntil(this.destroy),
        debounceTime(1000),
      )
      .subscribe((value) => {
        this.setPageLimit.emit(value._limit);
        this.setPage.emit(value.currentPage);
      });
  }

  isFirst() {
    return this.currentPage <= 1;
  }

  isLast() {
    return this.currentPage >= this.lastPage;
  }

  public onPrev() {
    if (!this.isLast()) {
      this.setPage.emit(this.currentPage + 1);
    }
  }

  public onNext() {
    if (!this.isFirst()) {
      this.setPage.emit(this.currentPage - 1);
    }
  }

  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }


}
