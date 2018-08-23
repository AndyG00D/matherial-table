import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductsTableComponent} from './products-table/products-table.component';
import {ProductEditComponent} from './product-edit/product-edit.component';
import {ProductsRoutingModule} from './products-routing.module';
import {ProductsService} from './products.service';
import {AppTableModule} from '../app-table/table-module';
import {HttpClientModule} from '@angular/common/http';
import {FilterFormComponent} from './components/filter-form/filter-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {PaginationBarComponent} from './components/pagination-bar/pagination-bar.component';
import {AppSortModule} from '../app-sort/sort-module';
import {AppFilterModule} from '../app-filter/filter-module';
import {OtFilterModule} from '../ot-filter/filter-module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    AppTableModule,
    AppSortModule,
    AppFilterModule,
    // OtFilterModule,
    ProductsRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ProductsTableComponent,
    ProductEditComponent,
    FilterFormComponent,
    PaginationBarComponent
  ],
  providers: [
    ProductsService
  ],
  exports: [ProductsTableComponent, ProductEditComponent]
})
export class ProductsModule {
}
