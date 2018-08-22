import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[filterControl]',
})
export class FilterControlDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
