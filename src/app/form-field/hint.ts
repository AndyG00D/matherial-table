import {Directive, Input} from '@angular/core';


let nextUniqueId = 0;


/** Hint text to be shown underneath the form field control. */
@Directive({
  selector: 'mat-hint',
  host: {
    'class': 'mat-hint',
    '[attr.id]': 'id',
  }
})
export class MatHint {
  /** Whether to align the hint label at the start or end of the line. */
  // @Input() align: 'start' | 'end' = 'start';

  /** Unique ID for the hint. Used for the aria-describedby on the form field control. */
  @Input() id: string = `mat-hint-${nextUniqueId++}`;
}
