import {Directive, Input} from '@angular/core';


let nextUniqueId = 0;


/** Single error message to be shown underneath the form field. */
@Directive({
  selector: 'mat-error',
  host: {
    'class': 'invalid-feedback',
    'role': 'alert',
    '[attr.id]': 'id',
  }
})
export class MatError {
  @Input() id: string = `mat-error-${nextUniqueId++}`;
}
