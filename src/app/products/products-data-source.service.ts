import {Injectable} from '@angular/core';
import {Product} from '../core/models/product';
import {AppTableDataSource} from '../app-table/table-data-source';
import {ProductsService} from './products.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsDataSource extends AppTableDataSource<Product> {

  constructor(private productsService: ProductsService) {
    super();
    this.refresh();
  }

  refresh() {
    this.productsService.getProducts().subscribe(
      data => this.data = data
    );
  }
}
