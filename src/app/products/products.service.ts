import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Product} from '../core/models/product';
import {catchError} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private http: HttpClient,
  ) {
  }

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:3030/products');
  }

  public getProduct(id: number): Observable<Product> {
    return this.http.get<Product>('http://localhost:3030/products/' + id);
  }

  public deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>('http://localhost:3030/products/' + id);
  }

  public updateProduct(id: number, params: any): Observable<Product> {
    return this.http.patch<Product>('http://localhost:3030/products/' + id, params);
  }
}
