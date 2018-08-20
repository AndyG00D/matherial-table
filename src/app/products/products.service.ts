import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Product} from '../core/models/product';
import {catchError} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {ApiUrls} from '../core/api-urls';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private http: HttpClient,
  ) {
  }

  public load(params = null): Observable<Product[]> {
    return this.http.get<Product[]>(ApiUrls.products, {params});
  }

  public getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(ApiUrls.products + '/' + id);
  }

  public deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(ApiUrls.products + '/' + id);
  }

  public updateProduct(id: number, params: any): Observable<Product> {
    return this.http.patch<Product>(ApiUrls.products + '/' + id, params);
  }
}
