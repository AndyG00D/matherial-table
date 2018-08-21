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
import {AppSortModule} from '../sort/sort-module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    AppTableModule,
    AppSortModule,
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
