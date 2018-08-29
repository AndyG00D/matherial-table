import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {AppErrorDirective} from './error';
import {AppFormFieldComponent} from './form-field';
import {AppHintDirective} from './hint';
import {AppLabelDirective} from './label';
import {AppPlaceholderDirective} from './placeholder';


@NgModule({
  declarations: [
    AppErrorDirective,
    AppFormFieldComponent,
    AppHintDirective,
    AppLabelDirective,
    AppPlaceholderDirective,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    AppErrorDirective,
    AppFormFieldComponent,
    AppHintDirective,
    AppLabelDirective,
    AppPlaceholderDirective,
  ],
})
export class AppFormFieldModule {
}
