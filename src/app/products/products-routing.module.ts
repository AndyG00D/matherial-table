import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductsTableComponent } from './products-table/products-table.component';

const routes: Routes = [
  { path: '', component: ProductsTableComponent },
  { path: ':id', component: ProductEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule {}
