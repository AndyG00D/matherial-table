import {Directive, ElementRef, HostBinding, Input, TemplateRef} from '@angular/core';
import {CustomOption} from './custom-option.model';

let nextUniqueId = 0;

@Directive({
  selector: 'app-custom-option, [appOption]'
})

export class AppCustomOptionDirective implements CustomOption{
  //  @HostBinding('class') class = 'dropdown-item';
  @HostBinding('attr.id') id = `mat-hint-${nextUniqueId++}`;
  @Input('value') value = '';
  @Input('disabled') disabled = false;
  @HostBinding('attr.label') isLabel = false;
  public title = this.id;

  constructor(
    // public template: TemplateRef<any>
  ) {
  }
}
