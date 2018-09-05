import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef, EventEmitter, HostBinding, HostListener,
  Input, OnDestroy, OnInit, Output,
  QueryList, TemplateRef,
  ViewChild, ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import {BehaviorSubject, EMPTY, merge, Subject} from 'rxjs';
import {debounceTime, startWith, takeUntil} from 'rxjs/operators';
import {ControlValueAccessor, FormControl, Validators} from '@angular/forms';
import {AppCustomOptionDirective} from './custom-option.directive';
import {CustomOption, Icon} from './custom-option.model';
import {getMatSelectDynamicMultipleError} from '../form-field/app-select/select-errors';
import {getValidOptionLabelWithoutTittleError, getValidOptionUndefinedValueError} from './custom-select-errors';

@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AppCustomSelectComponent
  implements ControlValueAccessor, AfterViewInit, OnDestroy {
  private initOptionsData: CustomOption[] = [];
  bufferOptionsData: CustomOption[] = [];
  currentOption: CustomOption;
  isShowOptions = false;
  private destroy = new Subject();
  @Input('options') propsOptionsData: CustomOption[];
  @Input('search') searchState = false;
  @ViewChild('optionsMenu') optionsMenu: ElementRef;
  @ViewChild('optionsMenu') valueField: ElementRef;
  @ContentChildren(AppCustomOptionDirective) private contentOptionList: QueryList<any>;
  // @ViewChild('optionContainer', {read: ViewContainerRef})
  // private optionContainer: ViewContainerRef;
  // @ViewChild('selectOptionContainer', {read: ViewContainerRef})
  // private selectOptionContainer: ViewContainerRef;
  public searchControl = new FormControl('');

  constructor(private _changeDetectorRef: ChangeDetectorRef) {
  }

  ngAfterViewInit() {
    // this.getPropsOptionsData();
    this.getContentOptionsData();
    // if (this.isValidOptionsData(this.initOptionsData)) {
    console.log(this.initOptionsData);
    this.bufferOptionsData.push(...this.initOptionsData);
    this._changeDetectorRef.detectChanges();
    // }
    this.initSearch();
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }

  getPropsOptionsData() {
    this.initOptionsData.push(...this.propsOptionsData);
  }

  getContentOptionsData() {
    this.contentOptionList.forEach((option: CustomOption) => {
      // if (option.value === undefined && option.title !== undefined) {
      //   option.value = option.title;
      // }
      // if (option.selected) {
      // this.currentOption = option;
      // this.writeValue(option.value);
      // }
      this.initOptionsData.push(option as CustomOption);
    });
  }

  // isValidOptionsData(optionsData: CustomOption[]): boolean {
  //   optionsData.forEach(option => {
  //     if (!option.isLabel && option.title === undefined && option.value === undefined) {
  //       getValidOptionUndefinedValueError();
  //     }
  //     if (option.isLabel && option.title === undefined) {
  //       getValidOptionLabelWithoutTittleError();
  //     }
  //   });
  //   return true;
  // }

  // markSelectOption(selectOption) {
  //   this.initOptionsData.map(option => {
  //     if (option.title !== selectOption.title) {
  //       option.selected = false;
  //     } else {
  //       option.selected = true;
  //     }
  //   });
  //   this._changeDetectorRef.checkNoChanges();
  // }

  isSelected(option): boolean {
    return option === this.currentOption;
  }

  selectOption(selectOption) {
    this.hideOptions();
    this.clearSearch();
    this.currentOption = selectOption;
    this.writeValue(this.currentOption.value);
    this._onTouched();
    // this.markSelectOption(selectOption);
  }

  initSearch() {
    if (this.searchState) {
      this.searchControl.valueChanges
        .pipe(
          takeUntil(this.destroy),
          debounceTime(300)
        )
        .subscribe((value) => {
          this.bufferOptionsData = this.initOptionsData.filter(option => option.title.includes(value));
          this._changeDetectorRef.detectChanges();
        });
    }
  }

  writeValue(value) {
    this._onChange(value);
  }

  registerOnChange(fn: (_: any) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
  }

  _onChange(value) {
  }

  _onTouched() {
  }

  hideOptions() {
    this.isShowOptions = false;
  }

  showOptions() {
    // ['offsetHeight', 'offsetLeft', 'offsetParent', 'offsetTop', 'offsetWidth'].forEach(prop => {
    //   console.log(prop + ': ' + this.optionsMenu.nativeElement[prop]);
    //   console.log(prop + ': ' + this.valueField.nativeElement[prop]);
    // });

    // console.log(window.innerHeight);
    // console.log(this.optionsMenu.nativeElement.offsetTop);
    // console.log(this.optionsMenu.nativeElement);
    // console.log((window.scrollY);
    this.isShowOptions = true;
  }

  clearSearch() {
    this.searchControl.patchValue('');
  }
}
