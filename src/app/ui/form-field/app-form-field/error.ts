import {Directive, HostBinding, Input} from '@angular/core';


let nextUniqueId = 0;


/** Single error message to be shown underneath the form field. */
@Directive({
  selector: 'app-error',
})
export class AppErrorDirective {
  @HostBinding('class') class = 'invalid-feedback';
  @HostBinding('attr.id') id = `mat-error-${nextUniqueId++}`;
}
