import {Directive, Input, TemplateRef} from '@angular/core';

@Directive({
  selector: '[filterControl]',
})

export class FilterControlDirective {
  @Input('filterControl') name: string; //tslint:disable-line
  @Input() defaultValue: number | string | boolean;
  constructor(public template: TemplateRef<any>) { }
}
