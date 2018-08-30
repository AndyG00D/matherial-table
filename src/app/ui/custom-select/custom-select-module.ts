import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {AppCustomSelectComponent} from './custom-select.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppCustomOptionDirective} from './custom-option.directive';

@NgModule({
  declarations: [
    AppCustomSelectComponent,
    AppCustomOptionDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    AppCustomSelectComponent,
    AppCustomOptionDirective
  ],
})
export class AppCustomSelectModule {
}
