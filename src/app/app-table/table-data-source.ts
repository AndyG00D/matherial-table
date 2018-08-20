import {_isNumberValue} from '@angular/cdk/coercion';
import {DataSource} from '@angular/cdk/table';
import {
  BehaviorSubject,
  combineLatest,
  merge,
  Observable,
  of as observableOf,
  Subscription
} from 'rxjs';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import {map} from 'rxjs/operators';
import {FilterParams} from '../core/models/product';


export class AppTableDataSource<T> extends DataSource<T> {

  private readonly _data: BehaviorSubject<T[]>;
  // private readonly _renderData = new BehaviorSubject<T[]>([]);
  private readonly _filter = new BehaviorSubject<FilterParams>({});
  private readonly _page = new BehaviorSubject<number>(1);
  private readonly _limit = new BehaviorSubject<number>(10);
  private readonly _dataCount = new BehaviorSubject<number>(20);

  // public _fetchApi: Observable<T[]>;

  constructor(private service) {
    super();
    this._data = new BehaviorSubject<T[]>([]);
    // this._filter = new BehaviorSubject<FilterParams>( );
    this.refresh();
    // this._updateChangeSubscription();
  }

  get data() {
    return this._data.value;
  }

  set data(data: T[]) {
    this._data.next(data);
  }

  get filter(): FilterParams {
    return this._filter.value;
  }

  set filter(filter: FilterParams) {
    this._filter.next(filter);
  }

  get page(): number {
    return this._page.value;
  }

  set page(page: number) {
    this._page.next(page);
  }

  get limit(): number {
    return this._limit.value;
  }

  set limit(limit: number) {
    this._limit.next(limit);
  }

  get dataCount(): number {
    return this._dataCount.value;
  }

  set dataCount(dataCount: number) {
    this._dataCount.next(dataCount);
  }

  get lastPage() {
    return Math.ceil(this.dataCount / this.limit);
  }

  connect() {
    return this._data;
  }

  disconnect() {
    this._data.complete();
  }

  // set fetchApi(newFetchApi: Observable<T[]>) {
  //   this._fetchApi = newFetchApi;
  //   this.refresh();
  // }
  //
  // get fetchApi(): Observable<T[]> {
  //     return this._fetchApi;
  // }

  refresh() {

    let params = {
      _page: this.page,
      _limit: this.limit,
    };

    // this.filter.first || params['name.first_like'] = this.filter.first;
    // this.filter.isActive || params.isActive = this.filter.isActive;

     params = Object.assign(params, this.filter);
    console.log(params._limit);
    this.service.load(params).subscribe(
      fetchData => {
        this.data = fetchData.data;
        this.dataCount = fetchData.count;
      }
    );
  }

  filtering(newFilter: any) {
    this.page = 1;
    this.filter = newFilter;
    this.refresh();
  }

  changePage(newPage) {
    if (newPage >= 1 && newPage <= this.lastPage ) {
      this.page = newPage;
      this.refresh();
    }
  }

  changeLimit(newLimit) {
    this.page = 1;
    this.limit = newLimit;
    this.refresh();
  }
}
