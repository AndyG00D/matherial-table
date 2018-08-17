import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductsTableComponent} from './products-table/products-table.component';
import {ProductEditComponent} from './product-edit/product-edit.component';
import {ProductsRoutingModule} from './products-routing.module';
import {ProductsService} from './products.service';
import {AppTableModule} from '../app-table/table-module';
import {ProductsDataSource} from './products-data-source.service';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    ProductsRoutingModule,
    HttpClientModule,
    AppTableModule
  ],
  declarations: [
    ProductsTableComponent,
    ProductEditComponent,
  ],
  providers: [
    ProductsService,
    ProductsDataSource
  ],
  exports: [ProductsTableComponent, ProductEditComponent]
})
export class ProductsModule {
}
