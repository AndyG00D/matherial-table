import {Product} from '../core/models/product';
import {AppTableDataSource} from '../app-table/table-data-source';
import {ProductsService} from './products.service';


export class ProductsDataSource extends AppTableDataSource<Product> {

  constructor(private productsService: ProductsService) {
    super();
    this.fetchApi = this.productsService.getProducts();
  }
}
