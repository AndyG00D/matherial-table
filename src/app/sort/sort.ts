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


export interface MatSortable {
  id: string;
  start: 'asc' | 'desc' | '';
  // disableClear: boolean;
}

export interface Sort {
  active: string;
  direction: SortDirection;
}


@Directive({
  selector: '[matSort]',
  exportAs: 'matSort',
})
export class MatSort
  implements OnChanges, OnDestroy, OnInit {

  sortables = new Map<string, MatSortable>();

  readonly _stateChanges = new Subject<void>();

  @Input('matSortActive') active: string;

  @Input('matSortStart') start: 'asc' | 'desc' = 'asc';

  @Input('matSortDirection')
  get direction(): SortDirection {
    return this._direction;
  }

  set direction(direction: SortDirection) {
    this._direction = direction;
  }

  private _direction: SortDirection = '';

  @Output('matSortChange') readonly sortChange: EventEmitter<Sort> = new EventEmitter<Sort>();


  register(sortable: MatSortable): void {
    this.sortables.set(sortable.id, sortable);
  }

  deregister(sortable: MatSortable): void {
    this.sortables.delete(sortable.id);
  }

  sort(sortable: MatSortable): void {
    if (this.active !== sortable.id) {
      this.active = sortable.id;
      this.direction = sortable.start ? sortable.start : this.start;
    } else {
      this.direction = this.getNextSortDirection(sortable);
    }

    this.sortChange.emit({active: this.active, direction: this.direction});
  }

  getNextSortDirection(sortable: MatSortable): SortDirection {
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
