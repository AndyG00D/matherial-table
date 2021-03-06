import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {getSupportedInputTypes, Platform} from '@angular/cdk/platform';
import {
  Directive,
  ElementRef,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Self,
  NgZone, DoCheck, HostBinding, HostListener,
} from '@angular/core';
import {FormGroupDirective, NgControl, NgForm} from '@angular/forms';
import {Subject} from 'rxjs';
import {getMatInputUnsupportedTypeError} from './input-errors';
import {APP_INPUT_VALUE_ACCESSOR} from './input-value-accessor';
import {AppFormFieldControl} from '../app-form-field/form-field-control';
import {AutofillMonitor} from '../app-text-field/autofill';
import {ErrorStateMatcher} from '../../../core/error/error-options';
import {mixinErrorState} from './error-state';


// Invalid app-input type. Using one of these will throw an MatInputUnsupportedTypeError.
const MAT_INPUT_INVALID_TYPES = [
  'button',
  'checkbox',
  'file',
  'hidden',
  'image',
  'radio',
  'range',
  'reset',
  'submit'
];

let nextUniqueId = 0;

export class MatInputBase {
  constructor(public _defaultErrorStateMatcher: ErrorStateMatcher,
              public _parentForm: NgForm,
              public _parentFormGroup: FormGroupDirective,
              public ngControl: NgControl) {
  }
}

export const _MatInputMixinBase = mixinErrorState(MatInputBase);

/** Directive that allows a native app-input to work inside a `AppFormFieldComponent`. */
@Directive({
  selector: `input[appInput], textarea[appInput], select[appInput]`,
  exportAs: 'appInput',
  providers: [{provide: AppFormFieldControl, useExisting: AppInputDirective}],
})
export class AppInputDirective extends _MatInputMixinBase implements AppFormFieldControl<any>, OnChanges,
  OnDestroy, OnInit, DoCheck {
  protected _uid = `app-input-${nextUniqueId++}`;
  protected _previousNativeValue: any;
  private _inputValueAccessor: { value: any };
  _ariaDescribedby: string;
  _isServer = false;
  focused = false;
  readonly stateChanges: Subject<void> = new Subject<void>();
  autofilled = false;

  /**
   * Implemented as part of AppFormFieldControl.
   * @docs-private
   */
  @Input()
  get disabled(): boolean {
    if (this.ngControl && this.ngControl.disabled !== null) {
      return this.ngControl.disabled;
    }
    return this._disabled;
  }

  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    if (this.focused) {
      this.focused = false;
      this.stateChanges.next();
    }
  }

  protected _disabled = false;

  /**
   * Implemented as part of AppFormFieldControl.
   * @docs-private
   */
  @Input()
  get required(): boolean {
    return this._required;
  }

  set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
  }

  protected _required = false;

  /** Input type of the element. */
  @Input()
  get type(): string {
    return this._type;
  }

  set type(value: string) {
    this._type = value || 'text';
    this._validateType();

    // When using Angular inputs, developers are no longer able to set the properties on the native
    // app-input element. To ensure that bindings for `type` work, we need to sync the setter
    // with the native property. Textarea elements don't support the type property or attribute.
    if (!this._isTextarea() && getSupportedInputTypes().has(this._type)) {
      this._elementRef.nativeElement.type = this._type;
    }
  }

  protected _type = 'text';

  /** An object used to control when error messages are shown. */
  @Input() errorStateMatcher: ErrorStateMatcher;

  /**
   * Implemented as part of AppFormFieldControl.
   * @docs-private
   */
  @Input()
  get value(): string {
    return this._inputValueAccessor.value;
  }

  set value(value: string) {
    if (value !== this.value) {
      this._inputValueAccessor.value = value;
      this.stateChanges.next();
    }
  }

  /** Whether the element is readonly. */
  @Input()
  get readonly(): boolean {
    return this._readonly;
  }

  set readonly(value: boolean) {
    this._readonly = coerceBooleanProperty(value);
  }

  private _readonly = false;

  protected _neverEmptyInputTypes = [
    'date',
    'datetime',
    'datetime-local',
    'month',
    'time',
    'week'
  ].filter(t => getSupportedInputTypes().has(t));

  @HostBinding('class') class = 'form-control';

  /**
   * Implemented as part of AppFormFieldControl.
   * @docs-private
   */
  @HostBinding('attr.id')
  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value || this._uid;
  }

  protected _id: string;

  /**
   * Implemented as part of AppFormFieldControl.
   * @docs-private
   */
  @HostBinding('attr.placeholder') placeholder: string;
  @HostBinding('class.is-invalid') invalid;
  @HostBinding('attr.aria-required') ariaRequired = this.required.toString();
  @HostListener('blur') onBlur = () => this._focusChanged(false);
  @HostListener('focus') onFocus = () => this._focusChanged(true);
  @HostListener('input') onInput = () => this._focusChanged(true);

  constructor(protected _elementRef: ElementRef,
              protected _platform: Platform,
              /** @docs-private */
              @Optional() @Self() public ngControl: NgControl,
              @Optional() _parentForm: NgForm,
              @Optional() _parentFormGroup: FormGroupDirective,
              _defaultErrorStateMatcher: ErrorStateMatcher,
              @Optional() @Self() @Inject(APP_INPUT_VALUE_ACCESSOR) inputValueAccessor: any,
              private _autofillMonitor: AutofillMonitor,
              ngZone: NgZone
  ) {
    super(_defaultErrorStateMatcher, _parentForm, _parentFormGroup, ngControl);
    // If no app-input value accessor was explicitly specified, use the element as the app-input value
    // accessor.
    this._inputValueAccessor = inputValueAccessor || this._elementRef.nativeElement;

    this._previousNativeValue = this.value;

    // Force setter to be called in case id was not specified.
    this.id = this.id;

    // On some versions of iOS the caret gets stuck in the wrong place when holding down the delete
    // key. In order to get around this we need to "jiggle" the caret loose. Since this bug only
    // exists on iOS, we only bother to install the listener on iOS.
    if (_platform.IOS) {
      ngZone.runOutsideAngular(() => {
        _elementRef.nativeElement.addEventListener('keyup', (event: Event) => {
          const el = event.target as HTMLInputElement;
          if (!el.value && !el.selectionStart && !el.selectionEnd) {
            // Note: Just setting `0, 0` doesn't fix the issue. Setting
            // `1, 1` fixes it for the first time that you type text and
            // then hold delete. Toggling to `1, 1` and then back to
            // `0, 0` seems to completely fix it.
            el.setSelectionRange(1, 1);
            el.setSelectionRange(0, 0);
          }
        });
      });
    }

    this._isServer = !this._platform.isBrowser;
  }

  ngOnInit() {
    if (this._platform.isBrowser) {
      this._autofillMonitor.monitor(this._elementRef.nativeElement).subscribe(event => {
        this.autofilled = event.isAutofilled;
        this.stateChanges.next();
      });
    }
  }

  ngOnChanges() {
    this.stateChanges.next();
  }

  ngOnDestroy() {
    this.stateChanges.complete();

    if (this._platform.isBrowser) {
      this._autofillMonitor.stopMonitoring(this._elementRef.nativeElement);
    }
  }

  ngDoCheck() {
    if (this.ngControl) {
      // We need to re-evaluate this on every change detection cycle, because there are some
      // error triggers that we can't subscribe to (e.g. parent form submissions). This means
      // that whatever logic is in here has to be super lean or we risk destroying the performance.
      this.updateErrorState();
      this.invalid = this.errorState;
    }

    // We need to dirty-check the native element's value, because there are some cases where
    // we won't be notified when it changes (e.g. the consumer isn't using forms or they're
    // updating the value using `emitEvent: false`).
    this._dirtyCheckNativeValue();
  }

  /** Focuses the app-input. */
  focus(): void {
    this._elementRef.nativeElement.focus();
  }

  /** Callback for the cases where the focused state of the app-input changes. */
  _focusChanged(isFocused: boolean) {
    if (isFocused !== this.focused && !this.readonly) {
      this.focused = isFocused;
      this.stateChanges.next();
    }
  }

  /** Does some manual dirty checking on the native app-input `value` property. */
  protected _dirtyCheckNativeValue() {
    const newValue = this.value;

    if (this._previousNativeValue !== newValue) {
      this._previousNativeValue = newValue;
      this.stateChanges.next();
    }
  }

  /** Make sure the app-input is a supported type. */
  protected _validateType() {
    if (MAT_INPUT_INVALID_TYPES.indexOf(this._type) > -1) {
      throw getMatInputUnsupportedTypeError(this._type);
    }
  }

  /** Checks whether the app-input type is one of the types that are never empty. */
  protected _isNeverEmpty() {
    return this._neverEmptyInputTypes.indexOf(this._type) > -1;
  }

  /** Checks whether the app-input is invalid based on the native validation. */
  protected _isBadInput() {
    const validity = (this._elementRef.nativeElement as HTMLInputElement).validity;
    return validity && validity.badInput;
  }

  /** Determines if the component host is a textarea. */
  protected _isTextarea() {
    return this._elementRef.nativeElement.nodeName.toLowerCase() === 'textarea';
  }

  /**
   * Implemented as part of AppFormFieldControl.
   * @docs-private
   */
  get empty(): boolean {
    return !this._isNeverEmpty() && !this._elementRef.nativeElement.value && !this._isBadInput() &&
      !this.autofilled;
  }

  /**
   * Implemented as part of AppFormFieldControl.
   * @docs-private
   */
  setDescribedByIds(ids: string[]) {
    this._ariaDescribedby = ids.join(' ');
  }

  /**
   * Implemented as part of AppFormFieldControl.
   * @docs-private
   */
  onContainerClick() {
    this.focus();
  }
}
