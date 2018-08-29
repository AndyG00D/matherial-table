import {DataSource} from '@angular/cdk/table';
import {
  BehaviorSubject, merge, Observable, Subscription, combineLatest, Subject, of, from,
} from 'rxjs';
import {FilterParams} from '../../core/models/product';
import {concatMap, distinctUntilChanged, map, mergeMap, switchMap, takeUntil, tap} from 'rxjs/operators';


export class AppTableDataSource<T> extends DataSource<T> {

  private readonly _data: BehaviorSubject<T[]>;
  private readonly _filter = new BehaviorSubject<FilterParams>({});
  private readonly _page = new BehaviorSubject<number>(1);
  private readonly _limit = new BehaviorSubject<number>(10);
  private readonly _dataCount = new BehaviorSubject<number>(20);
  private readonly _sort = new BehaviorSubject<FilterParams>({});
  private destroy = new Subject();
   private _changePage: Observable<any> = from(this._page)
    .pipe(
      distinctUntilChanged(),
      takeUntil(this.destroy),
      tap(v => this.page = v),
      switchMap(() => this.refresh())
    );

  private _changeParams: Observable<any> = merge(this._filter, this._limit, this._sort)
    .pipe(
      distinctUntilChanged(),
      takeUntil(this.destroy),
      tap( () => this.page = 1),
      switchMap(() => this._changePage)
    );

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
    // this.refresh();
  }

  get filter(): FilterParams {
    return this._filter.value;
  }

  set filter(filter: FilterParams) {
    this._filter.next(filter);
    // this.page = 1;
  }

  get limit(): number {
    return this._limit.value;
  }

  set limit(limit: number) {
    this._limit.next(limit);
    // this.page = 1;
  }

  get sort(): any {
    return this._sort.value;
  }

  set sort(newSort: any) {
    this._sort.next(newSort);
    // this.page = 1;
  }

  get lastPage() {
    return Math.ceil(this.dataCount / this.limit);
  }

  refresh() {

    const paginateParams = {
      _page: this.page,
      _limit: this.limit,
    };
    const allParams = Object.assign(paginateParams, this.sort, this.filter);
    console.log('request params: ' + JSON.stringify(allParams));
    return this.service.load(allParams);
  }

  connect() {
    this._changeParams.subscribe(
      fetchData => {
        this.data = fetchData.data;
        this.dataCount = fetchData.count;
      }
    );
    return this._data;
  }

  disconnect() {
    this._data.complete();
    this._limit.complete();
    this._page.complete();
    this._dataCount.complete();
    this._filter.complete();
    this._sort.complete();
    this.destroy.next();
    this.destroy.complete();
  }
}
