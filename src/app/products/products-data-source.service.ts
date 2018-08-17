import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Product} from '../core/models/product';
import {catchError} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {AppTableDataSource} from '../app-table/table-data-source';
import {ProductsService} from './products.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsDataSource extends AppTableDataSource<Product> {

  constructor(private productsService: ProductsService) {
    super();
    this.productsService.getProducts().subscribe(
      data => this.data = data
    );
  }
}
