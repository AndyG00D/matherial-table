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
  ElementRef, EventEmitter, HostBinding,
  Input, OnDestroy, OnInit, Output,
  QueryList, TemplateRef,
  ViewChild, ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import {EMPTY, merge, Subject} from 'rxjs';
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
  _privateOptionsData: CustomOption[];
  private destroy: Subject<any>;
  @Input('options') public optionsData: CustomOption[];
  isShowOptions = false;
  // @ContentChildren(AppCustomOptionDirective) _optionList: QueryList<any>;
  // @ViewChild('optionContainer', {read: ViewContainerRef})
  // private optionContainer: ViewContainerRef;
  // @ViewChild('selectOptionContainer', {read: ViewContainerRef})
  // private selectOptionContainer: ViewContainerRef;

  public search = new FormControl('', []);
  public OptionDataList: CustomOption[] = [];

  // @Input() myTemplate: TemplateRef<any>;
  constructor(private _changeDetectorRef: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    // this._optionList.forEach(option => console.log(option) );
    // console.log(this._optionList);
  }

  initSearch() {
    this.search.valueChanges
      .pipe(
        takeUntil(this.destroy),
        debounceTime(1000)
      )
      .subscribe((value) => {
        console.log(value);
        this._changeDetectorRef.detectChanges();
      });
  }

  filterOptions() {
  }

  ngAfterViewInit() {
    this._changeDetectorRef.detectChanges();
    // this._optionList[];
    // this._optionList.forEach(option => {
    //   const newOptionData = {
    //     title: option.title,
    //     isLabel: option.isLabel,
    //     value: option.value,
    //     disable: option.disable,
    //   };
    //   this.OptionDataList.push(newOptionData);
    // });
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

  getOptions() {

  }

  searchOptions() {
  }

  // createOptions() {
  //   this.optionContainer.clear();
  //   this._optionList.forEach(option => {
  //     const newOptionData = {
  //       title: option.title,
  //       isLabel: option.isLabel,
  //       value: option.value,
  //       disable: option.disable,
  //     };
  //     console.log(newOptionData);
  //     this.optionContainer.createEmbeddedView(option.template, newOptionData);
  //     this._changeDetectorRef.detectChanges();
  //   });
  // }
  //
  // createSelectOption() {
  //   this.selectOptionContainer.clear();
  //   this._optionList.forEach(option => {
  //     // console.log(option.value);
  //     // if (option.value === '2') {
  //     this.selectOptionContainer.createEmbeddedView(option.template);
  //     this._changeDetectorRef.detectChanges();
  //   });
  // }

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

  hideOptions(){
    this.isShowOptions = false;
  }

  showOptions() {
    this.isShowOptions = true;
  }

  selectOption(option: CustomOption){
    console.log(option);
    this.hideOptions();
  }
}
