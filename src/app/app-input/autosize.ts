
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {Directive, Input} from '@angular/core';
export const _CdkTextareaAutosize = CdkTextareaAutosize;


@Directive({
  selector: 'textarea[app-autosize], textarea[appTextareaAutosize]',
  exportAs: 'appTextareaAutosize',
  inputs: ['cdkAutosizeMinRows', 'cdkAutosizeMaxRows'],
  host: {
    'class': 'cdk-textarea-autosize app-autosize',
    'rows': '1',
    '(input)': '_noopInputHandler()',
  },
})
export class AppTextareaAutosize extends _CdkTextareaAutosize {
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
}
