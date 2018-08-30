import {Directive, ElementRef, HostBinding, TemplateRef} from '@angular/core';
import {CustomOption} from './custom-option.model';

let nextUniqueId = 0;

@Directive({
  selector: 'app-custom-option',
})
export class AppCustomOptionDirective implements CustomOption{
  constructor(
    private textElement: ElementRef
  ) {
  }

  public title =  this.textElement.nativeElement.value;
  @HostBinding('class') class = 'dropdown-item';
  @HostBinding('attr.id') id = `mat-hint-${nextUniqueId++}`;
  @HostBinding('attr.value') value;
  @HostBinding('attr.disabled') disable;
  @HostBinding('attr.label') isLabel = false;
}
