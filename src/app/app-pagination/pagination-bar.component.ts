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
  @Input() lastPage = 10;
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
        if (value._limit !== this.currentLimit) {
          this.setPageLimit.emit(value._limit);
        } else if (value.currentPage !== this.currentPage) {
          this.setPageWithValidation(value.currentPage);
        }
      });
  }

  public setPageWithValidation(newPage) {
    if (newPage >= 1 && newPage <= this.lastPage) {
      this.setPage.emit(newPage);
    } else {
      this.paginationForm.get('currentPage').patchValue(this.currentPage);
    }
  }

  isFirst() {
    return this.currentPage <= 1;
  }

  isLast() {
    return this.currentPage >= this.lastPage;
  }

  public onPrev() {
    this.setPageWithValidation(this.currentPage - 1);

  }

  public onNext() {
    this.setPageWithValidation(this.currentPage + 1);
  }


  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }


}
