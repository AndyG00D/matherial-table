import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef, HostBinding,
  Input, OnInit,
  QueryList,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {EMPTY, merge} from 'rxjs';
import {startWith} from 'rxjs/operators';
import {ControlValueAccessor, FormControl, Validators} from '@angular/forms';
import {AppErrorDirective} from '../form-field/app-form-field/error';
import {AppCustomOptionDirective} from './custom-option.directive';


@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AppCustomSelectComponent implements ControlValueAccessor, OnInit {
  @ContentChildren(AppCustomOptionDirective) _optionList: QueryList<AppCustomOptionDirective>;
  public search = new FormControl('', []);

  constructor(public _elementRef: ElementRef,
              private _changeDetectorRef: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    // this._optionList.forEach(option => console.log(option) );
    console.log(this._optionList);
  }

  isValidOptions() {

  }

  getOptions() {

  }

  searchOptions() {
  }


  toggleDropdown() {

  }

  placingDropdownMenu() {
  }

  writeValue(value) {
  }

  registerOnChange() {

  }

  registerOnTouched() {

  }

}
