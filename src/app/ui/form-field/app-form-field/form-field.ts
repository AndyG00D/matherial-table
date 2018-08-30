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
  Input,
  QueryList,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {EMPTY, merge} from 'rxjs';
import {startWith} from 'rxjs/operators';
import {AppErrorDirective} from './error';
import {AppFormFieldControl} from './form-field-control';
import {
  getAppFormFieldMissingControlError,
  getAppFormFieldPlaceholderConflictError,
} from './form-field-errors';
import {AppHintDirective} from './hint';
import {AppPlaceholderDirective} from './placeholder';


@Component({
  selector: 'app-form-field',
  exportAs: 'appFormField',
  templateUrl: './form-field.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AppFormFieldComponent implements AfterContentInit, AfterContentChecked, AfterViewInit {

  @Input()
  get hideRequiredMarker(): boolean {
    return this._hideRequiredMarker;
  }

  set hideRequiredMarker(value: boolean) {
    this._hideRequiredMarker = coerceBooleanProperty(value);
  }

  private _hideRequiredMarker: boolean;

  /** Text for the form field label. */
  @Input()
  get label(): string {
    return this._label;
  }

  set label(value: string) {
    this._label = value;
  }

  private _label = '';

  @ViewChild('connectionContainer') _connectionContainerRef: ElementRef<HTMLElement>;
  @ViewChild('inputContainer') _inputContainerRef: ElementRef;

  @ContentChild(AppFormFieldControl) _control: AppFormFieldControl<any>;
  @ContentChild(AppPlaceholderDirective) _placeholderChild: AppPlaceholderDirective;
  @ContentChildren(AppErrorDirective) _errorChildren: QueryList<AppErrorDirective>;
  @ContentChildren(AppHintDirective) _hintChildren: QueryList<AppHintDirective>;

  @HostBinding('class.ng-untouched') untouched = this._shouldForward('untouched');
  @HostBinding('class.ng-touched') touched = this._shouldForward('touched');
  @HostBinding('class.ng-pristine') pristine = this._shouldForward('pristine');
  @HostBinding('class.ng-dirty') dirty = this._shouldForward('dirty');
  @HostBinding('class.ng-valid') valid = this._shouldForward('valid');
  @HostBinding('class.ng-invalid') invalid = this._shouldForward('invalid');
  @HostBinding('class.ng-pending') pending = this._shouldForward('pending');



  constructor(
    public _elementRef: ElementRef,
    private _changeDetectorRef: ChangeDetectorRef,
  ) {
  }

  ngAfterContentInit() {
    this._validateControlChild();
    if (this._control.controlType) {
      this._elementRef.nativeElement.classList
        .add(`app-form-field-type-${this._control.controlType}`);
    }

    // Subscribe to changes in the child control state in order to update the form field UI.
    this._control.stateChanges.pipe(startWith(null)).subscribe(() => {
      this._validatePlaceholders();
      this._syncDescribedByIds();
      this._changeDetectorRef.markForCheck();
    });

    // Run change detection if the value, prefix, or suffix changes.
    const valueChanges = this._control.ngControl && this._control.ngControl.valueChanges || EMPTY;
    merge(valueChanges)
      .subscribe(() => this._changeDetectorRef.markForCheck());

    // Re-validate when the number of hints changes.
    this._hintChildren.changes.pipe(startWith(null)).subscribe(() => {
      this._processHints();
      this._changeDetectorRef.markForCheck();
    });

    // Update the aria-described by when the number of errors changes.
    this._errorChildren.changes.pipe(startWith(null)).subscribe(() => {
      this._syncDescribedByIds();
      this._changeDetectorRef.markForCheck();
    });
  }

  ngAfterContentChecked() {
    this._validateControlChild();
  }

  ngAfterViewInit() {
    this._changeDetectorRef.detectChanges();
  }

  /** Determines whether a class from the NgControl should be forwarded to the host element. */
  _shouldForward(prop: string): boolean {
    const ngControl = this._control ? this._control.ngControl : null;
    return ngControl && ngControl[prop];
  }

  /** Determines whether to display hints or errors. */
  _getDisplayedMessages(): 'error' | 'hint' {
    return (this._errorChildren && this._errorChildren.length > 0 &&
      this._control.errorState) ? 'error' : 'hint';
  }

  private _validatePlaceholders() {
    if (this._control.placeholder && this._placeholderChild) {
      throw getAppFormFieldPlaceholderConflictError();
    }
  }

  /** Does any extra processing that is required when handling the hints. */
  private _processHints() {
    // this._validateHints();
    this._syncDescribedByIds();
  }


  /**
   * Sets the list of element IDs that describe the child control. This allows the control to update
   * its `aria-describedby` attribute accordingly.
   */
  private _syncDescribedByIds() {
    if (this._control) {
      let ids: string[] = [];

      if (this._getDisplayedMessages() === 'hint') {
        if (this._errorChildren) {
          ids = this._hintChildren.map(hint => hint.id);
        } else if (this._errorChildren) {
          ids = this._errorChildren.map(error => error.id);
        }

        this._control.setDescribedByIds(ids);
      }
    }
  }

  /** Throws an error if the form field's control is missing. */
  protected _validateControlChild() {
    if (!this._control) {
      throw getAppFormFieldMissingControlError();
    }
  }

}
