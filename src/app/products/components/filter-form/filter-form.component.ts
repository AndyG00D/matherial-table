import {Component, ViewEncapsulation, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {EventEmitter} from '@angular/core';
import {debounceTime} from 'rxjs/operators';
import {FilterParams} from '../../../core/models/product';


@Component({
  selector: 'app-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class FilterFormComponent implements OnInit, OnDestroy {
  @Output() formValue = new EventEmitter<any>();
  public filterForm;

  constructor() {
    this.filterForm = new FormGroup(
      {
        first: new FormControl('',
          []),
        isActive: new FormControl('',
          [])
      });
  }

  public ngOnInit() {
    this.filterForm.valueChanges
      .pipe(debounceTime(1000))
      .subscribe((filterParams: FilterParams) => {
        this.formValue.emit(filterParams);
      });
  }

  public ngOnDestroy(): void {
  }

}
