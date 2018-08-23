import {Directive, Input, TemplateRef} from '@angular/core';

@Directive({
  selector: '[filterControl]',
})

export class FilterControlDirective {
  @Input('filterControl') name: string; //tslint:disable-line
  constructor(public template: TemplateRef<any>) { }
}
