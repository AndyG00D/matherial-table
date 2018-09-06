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
  ElementRef, EventEmitter, forwardRef, HostBinding, HostListener,
  Input, OnDestroy, OnInit, Output,
  QueryList, TemplateRef,
  ViewChild, ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import {BehaviorSubject, EMPTY, merge, Subject} from 'rxjs';
import {debounceTime, startWith, takeUntil} from 'rxjs/operators';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {AppCustomOptionDirective} from './custom-option.directive';
import {CustomOption, Icon} from './custom-option.model';

@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppCustomSelectComponent),
      multi: true
    }
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AppCustomSelectComponent
  implements ControlValueAccessor, OnInit, AfterViewInit, OnDestroy {
  optionsData: CustomOption[] = [];
  bufferOptionsData: CustomOption[] = [];
  currentOption: CustomOption;
  isShowOptions = false;
  disabled = false;
  private destroy = new Subject();
  @Input('options') propsOptionsData: CustomOption[];
  @Input('value') propsValue: string;
  @Input('search') searchState = false;

  @ContentChildren(AppCustomOptionDirective) _contentOptionList: QueryList<any>;
  @ViewChild('optionContainer', {read: ViewContainerRef})
  private optionContainer: ViewContainerRef;
  @ViewChild('selectOptionContainer', {read: ViewContainerRef})
  private selectOptionContainer: ViewContainerRef;

  public searchControl = new FormControl('');

  constructor(private _changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit() {
  }

  initSearch() {
    if (this.searchState) {
      this.searchControl.valueChanges
        .pipe(
          takeUntil(this.destroy),
          debounceTime(300)
        )
        .subscribe((value) => {
          this.bufferOptionsData = this.optionsData
            .filter(option => option.title.includes(value));
          this._changeDetectorRef.detectChanges();
        });
    }
  }

  ngAfterViewInit() {
    this.getContentOptionsData();
    if (this.searchState || this.disabled) {
      this.initSearch();
    }
    this._changeDetectorRef.detectChanges();
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }

  getContentOptionsData() {
    this._contentOptionList.forEach(option => {
      if (this.propsValue === option.value) {
        this.writeValue(option);
      }
      this.optionsData.push(option as CustomOption);
      this.bufferOptionsData.push(option as CustomOption);
    });
    this._changeDetectorRef.detectChanges();
  }

  writeValue(value) {
    this.currentOption = value;
    this.hideOptions();
    this.clearSearch();
    this._onChange(this.currentOption.value);
    this._changeDetectorRef.detectChanges();
  }

  isSelected(option) {
    return option === this.currentOption;
  }

  isDropup() {
    return false;
  }

  registerOnChange(fn: (_: any) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
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
}
