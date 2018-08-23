import {DataSource} from '@angular/cdk/table';
import {
  BehaviorSubject,
} from 'rxjs';
import {FilterParams} from '../core/models/product';


export class AppTableDataSource<T> extends DataSource<T> {

  private readonly _data: BehaviorSubject<T[]>;
  private readonly _filter = new BehaviorSubject<FilterParams>({});
  private readonly _page = new BehaviorSubject<number>(1);
  private readonly _limit = new BehaviorSubject<number>(10);
  private readonly _dataCount = new BehaviorSubject<number>(20);
  private readonly _sort = new BehaviorSubject<FilterParams>({});

  constructor(private service) {
    super();
    this._data = new BehaviorSubject<T[]>([]);
    this.refresh();
  }

  get data() {
    return this._data.value;
  }

  set data(data: T[]) {
    this._data.next(data);
  }

  get dataCount(): number {
    return this._dataCount.value;
  }

  set dataCount(dataCount: number) {
    this._dataCount.next(dataCount);
  }

  get page(): number {
    return this._page.value;
  }

  set page(page: number) {
    this._page.next(page);
    this.refresh();
  }

  get filter(): FilterParams {
    return this._filter.value;
  }

  set filter(filter: FilterParams) {
    this._filter.next(filter);
    this.page = 1;
  }

  get limit(): number {
    return this._limit.value;
  }

  set limit(limit: number) {
    this._limit.next(limit);
    this.page = 1;
  }

  get sort(): any {
    return this._sort.value;
  }

  set sort(newSort: any) {
    this._sort.next(newSort);
    this.page = 1;
  }

  get lastPage() {
    return Math.ceil(this.dataCount / this.limit);
  }

  refresh() {

    const paginateParams = {
      _page: this.page,
      _limit: this.limit,
    };

    let sortParams = {};
    if (this.sort.direction) {
      sortParams = {
        _sort: this.sort.active,
        _order: this.sort.direction
      };
    }

    const filterParams = {};
    if (this.filter.first) {
      filterParams['name.first_like'] = this.filter.first;
    }
    if (this.filter.isActive) {
      filterParams['isActive'] = this.filter.isActive;
    }

    const allParams = Object.assign(paginateParams, sortParams, filterParams);
    console.log('request params: ' + JSON.stringify(allParams));
    this.service.load(allParams).subscribe(
      fetchData => {
        this.data = fetchData.data;
        this.dataCount = fetchData.count;
      }
    );
  }

  // filtering(newFilter: any) {
  //   this.page = 1;
  //   this.filter = newFilter;
  //   this.refresh();
  // }

  // changePage(newPage) {
  //   if (newPage >= 1 && newPage <= this.lastPage) {
  //     this.page = newPage;
  //     this.refresh();
  //   }
  // }

  // changeLimit(newLimit) {
  //   this.page = 1;
  //   this.limit = newLimit;
  //   this.refresh();
  // }

  // changeSort(newSort) {
  //   this.page = 1;
  //   this.sort = newSort;
  //   this.refresh();
  // }

  connect() {
    return this._data;
  }

  disconnect() {
    this._data.complete();
    this._limit.complete();
    this._page.complete();
    this._dataCount.complete();
    this._filter.complete();
    this._sort.complete();
  }
}
