import {AfterViewInit, Directive, ElementRef, HostBinding, Input, TemplateRef} from '@angular/core';
import {CustomOption} from './custom-option.model';

@Directive({
  selector: 'app-custom-option, [appOption]'
})

export class AppCustomOptionDirective implements CustomOption, AfterViewInit {
  @Input('value') value = '';
  @Input('disabled') disabled = false;
  @Input('isLabel') isLabel = false;
  @Input('imgSrc') imgSrc: string;
  @Input('imgRight') imgRight: boolean;
  public title = '';

  constructor(private elementRef: ElementRef) {
    this.title = this.elementRef.nativeElement.textContent;
  }

  ngAfterViewInit() {
    // this.title = this.elementRef.nativeElement.textContent;
  }
}
