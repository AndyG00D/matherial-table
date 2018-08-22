import {Directive, Input, TemplateRef} from '@angular/core';

@Directive({
  selector: '[otFilter]',
})
export class FilterDirective {
  @Input('otFilter') name: string; //tslint:disable-line
  @Input() defaultValue: number | string | boolean;
  constructor(public template: TemplateRef<any>) { }
}
