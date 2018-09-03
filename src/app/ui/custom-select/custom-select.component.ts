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

@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AppCustomSelectComponent
  implements ControlValueAccessor, OnInit, AfterViewInit, AfterContentInit, AfterContentChecked, OnDestroy {
  _OptionsData: CustomOption[];
  bufferOptionsData: CustomOption[] = [];
  currentOption: CustomOption;
  isShowOptions = false;
  private destroy: Subject<any>;
  @Input('options') optionsData: CustomOption[];
  @Input('search') searchState = false;
  // @HostListener('change')_onChange($event.target.value)'

  // get searchState(): boolean {
  //   return this._searchState;
  // }
  //
  // set searchState(value: boolean) {
  //   this._searchState = value || true;
  // }
  //
  private _searchState = false;

  @ContentChildren(AppCustomOptionDirective) _optionList: QueryList<any>;
  @ViewChild('optionContainer', {read: ViewContainerRef})
  private optionContainer: ViewContainerRef;
  @ViewChild('selectOptionContainer', {read: ViewContainerRef})
  private selectOptionContainer: ViewContainerRef;

  public searchControl = new FormControl('');
  public OptionDataList: CustomOption[] = [];

  // @Input() myTemplate: TemplateRef<any>;
  constructor(private _changeDetectorRef: ChangeDetectorRef
  ) {

  }

  ngOnInit() {
    // this._optionList.forEach(option => console.log(option) );
    // console.log(this._optionList);
    // console.log(this.searchState);

    if (this.optionsData) {
      // this.bufferOptionsData.push(...this.optionsData);
      // this.currentOption = this.bufferOptionsData[0];
    } else {

    }

    if (this.searchState) {
      this.initSearch();
    }
  }

  initSearch() {
    if (this.searchState) {
      this.searchControl.valueChanges
        .pipe(
          // takeUntil(this.destroy),
          debounceTime(300)
        )
        .subscribe((value) => {
          console.log(value);
          this.bufferOptionsData = this.optionsData.filter(option => option.title.includes(value));
          this._changeDetectorRef.detectChanges();
        });
    }
  }

  filterOptions() {
  }

  ngAfterViewInit() {
    this.getOptionsData();
    // console.log(this.OptionDataList);
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }

  public ngAfterContentInit() {
    // this.createOptions();
    // this.createSelectOption();
  }

  ngAfterContentChecked() {
    // this.createOptions();
    // this.createSelectOption();
  }

  isValidOptions() {

  }

  getOptionsData() {
    this._changeDetectorRef.detectChanges();
    // this._optionList[];
    this._optionList.forEach(option => {
      console.log(option);
      this.optionsData.push(option);
    });
  }

  searchOptions() {
  }

  placingDropdownMenu() {
  }

  writeValue(value) {
    console.log(value);
    this.currentOption = value;
    this.hideOptions();
    this.clearSearch();
    this._onChange(this.currentOption.value);
  }

  // selectOption(option: CustomOption) {
  //   console.log(option);
  //   this.currentOption = option;
  //   this.hideOptions();
  // }

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
    this.isShowOptions = true;
  }

  clearSearch() {
    this.searchControl.patchValue('');
  }

  coerceBooleanProperty(value: any): boolean {
    return value != null && `${value}` !== 'false';
  }
}
