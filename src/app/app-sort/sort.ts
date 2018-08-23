import {
  Directive,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {SortDirection} from './sort-direction';
import {Subject} from 'rxjs';
import {AppTableDataSource} from '../app-table/table-data-source';


export interface AppSortable {
  id: string;
  start: 'asc' | 'desc' | '';
  // disableClear: boolean;
}

export interface Sort {
  active: string;
  direction: SortDirection;
}


@Directive({
  selector: '[appSort]',
  exportAs: 'appSort',
})
export class AppSort
  implements OnChanges, OnDestroy, OnInit {

  sortables = new Map<string, AppSortable>();

  readonly _stateChanges = new Subject<void>();

  @Input('appSortActive') active: string;

  @Input('appSortStart') start: 'asc' | 'desc' = 'asc';

  @Input('appSortDirection')

  get direction(): SortDirection {
    return this._direction;
  }

  set direction(direction: SortDirection) {
    this._direction = direction;
  }

  private _direction: SortDirection = '';

  @Input() dataSource: AppTableDataSource<any>;

  @Output('appSortChange') readonly sortChange: EventEmitter<Sort> = new EventEmitter<Sort>();


  register(sortable: AppSortable): void {
    this.sortables.set(sortable.id, sortable);
  }

  deregister(sortable: AppSortable): void {
    this.sortables.delete(sortable.id);
  }

  sort(sortable: AppSortable): void {
    if (this.active !== sortable.id) {
      this.active = sortable.id;
      this.direction = sortable.start ? sortable.start : this.start;
    } else {
      this.direction = this.getNextSortDirection(sortable);
    }
    const newSortParams = {active: this.active, direction: this.direction};
    this.dataSource.sort = newSortParams;
    this.sortChange.emit(newSortParams);
  }

  getNextSortDirection(sortable: AppSortable): SortDirection {
    if (!sortable) {
      return '';
    }
    const sortDirectionCycle: SortDirection[] = ['asc', 'desc', ''];
    let nextDirectionIndex = sortDirectionCycle.indexOf(this.direction) + 1;
    if (nextDirectionIndex >= sortDirectionCycle.length) {
      nextDirectionIndex = 0;
    }
    return sortDirectionCycle[nextDirectionIndex];
  }

  ngOnInit() {
  }

  ngOnChanges() {
    this._stateChanges.next();
  }

  ngOnDestroy() {
    this._stateChanges.complete();
  }
}
