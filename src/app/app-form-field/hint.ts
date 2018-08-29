import {Directive, HostBinding, Input} from '@angular/core';

let nextUniqueId = 0;

@Directive({
  selector: 'app-hint',
})
export class AppHintDirective {
  @HostBinding('class') class = `mat-hint-${nextUniqueId++}`;
  @HostBinding('attr.id') id = `mat-hint-${nextUniqueId++}`;
}
