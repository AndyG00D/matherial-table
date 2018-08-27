import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductsTableComponent} from './products-table/products-table.component';
import {ProductEditComponent} from './product-edit/product-edit.component';
import {ProductsRoutingModule} from './products-routing.module';
import {ProductsService} from './products.service';
import {AppTableModule} from '../app-table/table-module';
import {HttpClientModule} from '@angular/common/http';
import {FilterFormComponent} from './components/filter-form/filter-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PaginationBarComponent} from './components/pagination-bar/pagination-bar.component';
import {AppSortModule} from '../app-sort/sort-module';
import {AppFilterModule} from '../app-filter/filter-module';
import {AppPaginationModule} from '../app-pagination/pagination-module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material';
import {MatInputModule} from '../input/input-module';





@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    AppTableModule,
    AppSortModule,
    AppFilterModule,
    // AppPaginationModule,
    ProductsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule

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
