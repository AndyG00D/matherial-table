import {Component, ViewEncapsulation, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {EventEmitter} from '@angular/core';
import {debounce, debounceTime} from 'rxjs/operators';


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
    this.filterForm.valueChanges.pipe(debounceTime(1000)).subscribe((value) => {
      const filterParams = {};
      filterParams['name.first_like'] = value.first;
      if (value.isActive !== '') {
        filterParams['isActive'] = value.isActive;
      }
      this.formValue.emit(filterParams);
    });
  }


  public ngOnDestroy(): void {
  }

  // public onSubmit() {
  //   if (this.paginationForm.valid) {
  //     console.log(this.paginationForm.value);
  //   }
  // }


}
