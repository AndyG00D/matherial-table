import {Component, ViewEncapsulation, OnDestroy, OnInit, Output, Input} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {EventEmitter} from '@angular/core';
import {debounce, debounceTime, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs/internal/Subject';
import {AppTableDataSource} from '../../../ui/app-table/table-data-source';


@Component({
  selector: 'app-pagination-bar',
  templateUrl: './pagination-bar.component.html',
  styleUrls: ['./pagination-bar.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class PaginationBarComponent implements OnInit, OnDestroy {
  // @Input() currentPage = 1;
  // @Input() currentLimit = 1;
  // @Input() lastPage = 10;
  @Output() setPageLimit = new EventEmitter<any>();
  @Output() setPage = new EventEmitter<any>();
  @Input() dataSource: AppTableDataSource<any>;

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
        if (value._limit !== this.dataSource.limit) {
          this.dataSource.limit = value._limit;
          this.setPageLimit.emit(value._limit);
        } else if (value.currentPage !== this.dataSource.page) {
          this.setPageWithValidation(value.currentPage);
        }
      });
  }

  public setPageWithValidation(newPage) {
    if (newPage >= 1 && newPage <= this.dataSource.lastPage) {
      this.dataSource.page = newPage;
      this.setPage.emit(newPage);
    } else {
      this.paginationForm.get('currentPage').patchValue(this.dataSource.page);
    }
  }

  isFirst() {
    return this.dataSource.page <= 1;
  }

  isLast() {
    return this.dataSource.page >= this.dataSource.lastPage;
  }

  public onPrev() {
    this.setPageWithValidation(this.dataSource.page - 1);

  }

  public onNext() {
    this.setPageWithValidation(this.dataSource.page + 1);
  }


  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }


}
