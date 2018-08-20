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

  // public _fetchApi: Observable<T[]>;

  constructor(private service) {
    super();
    this._data = new BehaviorSubject<T[]>([]);
    this._filter = new BehaviorSubject<any>(null);
    this.refresh();
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

  // set fetchApi(newFetchApi: Observable<T[]>) {
  //   this._fetchApi = newFetchApi;
  //   this.refresh();
  // }
  //
  // get fetchApi(): Observable<T[]> {
  //     return this._fetchApi;
  // }

  refresh() {
    this.service.load(this.filter).subscribe(
      fetchData => this.data = fetchData
    );
  }

  filtering(newFilter: any) {
    this.filter = newFilter;
    this.service.load(this.filter).subscribe(
      fetchData => this.data = fetchData
    );
  }
}
