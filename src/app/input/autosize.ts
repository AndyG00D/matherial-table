
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {Directive, Input} from '@angular/core';
export const _CdkTextareaAutosize = CdkTextareaAutosize;


@Directive({
  selector: 'textarea[mat-autosize], textarea[matTextareaAutosize]',
  exportAs: 'matTextareaAutosize',
  inputs: ['cdkAutosizeMinRows', 'cdkAutosizeMaxRows'],
  host: {
    'class': 'cdk-textarea-autosize mat-autosize',
    'rows': '1',
    '(input)': '_noopInputHandler()',
  },
})
export class MatTextareaAutosize extends _CdkTextareaAutosize {
  @Input()
  get matAutosizeMinRows(): number { return this.minRows; }
  set matAutosizeMinRows(value: number) { this.minRows = value; }

  @Input()
  get matAutosizeMaxRows(): number { return this.maxRows; }
  set matAutosizeMaxRows(value: number) { this.maxRows = value; }

  @Input('mat-autosize')
  get matAutosize(): boolean { return this.enabled; }
  set matAutosize(value: boolean) { this.enabled = value; }

  @Input()
  get matTextareaAutosize(): boolean { return this.enabled; }
  set matTextareaAutosize(value: boolean) { this.enabled = value; }
}
