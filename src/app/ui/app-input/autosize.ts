
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {Directive, HostBinding, HostListener, Input} from '@angular/core';
export const _CdkTextareaAutosize = CdkTextareaAutosize;


@Directive({
  selector: 'textarea[app-autosize], textarea[appTextareaAutosize]',
  exportAs: 'appTextareaAutosize',
})
export class AppTextareaAutosizeDirective extends _CdkTextareaAutosize {
  @Input()
  get appAutosizeMinRows(): number { return this.minRows; }
  set appAutosizeMinRows(value: number) { this.minRows = value; }

  @Input()
  get appAutosizeMaxRows(): number { return this.maxRows; }
  set appAutosizeMaxRows(value: number) { this.maxRows = value; }

  @Input('app-autosize')
  get appAutosize(): boolean { return this.enabled; }
  set appAutosize(value: boolean) { this.enabled = value; }

  @Input()
  get appTextareaAutosize(): boolean { return this.enabled; }
  set appTextareaAutosize(value: boolean) { this.enabled = value; }

  @HostBinding('class') class = 'cdk-textarea-autosize app-autosize';
  @HostBinding('rows') rows = '1';
  @HostListener('input') input = this._noopInputHandler();
}
