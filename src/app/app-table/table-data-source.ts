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


export class AppTableDataSource<T> extends DataSource<T> {

  private readonly _data: BehaviorSubject<T[]>;
  // private readonly _renderData = new BehaviorSubject<T[]>([]);
  private readonly _filter = new BehaviorSubject<string>('');

  public _fetchApi: Observable<T[]>;

  constructor(initialData: T[] = [], initialFilter: any = null) {
    super();
    this._data = new BehaviorSubject<T[]>(initialData);
    this._filter = new BehaviorSubject<any>(initialFilter);
    // this.refresh();
    // this._updateChangeSubscription();
  }

  get data() {
    return this._data.value;
  }

  set data(data: T[]) {
    this._data.next(data);
  }

  get filter(): string {
    return this._filter.value;
  }

  set filter(filter: string) {
    this._filter.next(filter);
  }

  connect() {
    return this._data;
  }

  disconnect() {
    this._data.complete();
  }

  set fetchApi(newFetchApi: Observable<T[]>) {
    this._fetchApi = newFetchApi;
    this.refresh();
  }

  get fetchApi(): Observable<T[]> {
      return this._fetchApi;
  }

  refresh() {
    this.fetchApi.subscribe(
      fetchData => this.data = fetchData
    );
  }

  // _updateChangeSubscription() {
  //   const sortChange: Observable<Sort|null> = this._sort ?
  //       merge<Sort>(this._sort.sortChange, this._sort.initialized) :
  //       observableOf(null);
  //   const pageChange: Observable<PageEvent|null> = this._paginator ?
  //       merge<PageEvent>(this._paginator.page, this._paginator.initialized) :
  //       observableOf(null);
  //
  //   const dataStream = this._data;
  //   // Watch for base data or filter changes to provide a filtered set of data.
  //   const filteredData = combineLatest(dataStream, this._filter)
  //     .pipe(map(([data]) => this._filterData(data)));
  //   // Watch for filtered data or sort changes to provide an ordered set of data.
  //   const orderedData = combineLatest(filteredData, sortChange)
  //     .pipe(map(([data]) => this._orderData(data)));
  //   // Watch for ordered data or page changes to provide a paged set of data.
  //   const paginatedData = combineLatest(orderedData, pageChange)
  //     .pipe(map(([data]) => this._pageData(data)));
  //   // Watched for paged data changes and send the result to the table to render.
  //   this._renderChangesSubscription.unsubscribe();
  //   this._renderChangesSubscription = paginatedData.subscribe(data => this._renderData.next(data));
  // }

  // _filterData(data: T[]) {
  //   this.filteredData =
  //       !this.filter ? data : data.filter(obj => this.filterPredicate(obj, this.filter));
  //
  //   if (this.paginator) { this._updatePaginator(this.filteredData.length); }
  //
  //   return this.filteredData;
  // }


  // _orderData(data: T[]): T[] {
  //   // If there is no active sort or direction, return the data without trying to sort.
  //   if (!this.sort) { return data; }
  //
  //   return this.sortData(data.slice(), this.sort);
  // }
}
