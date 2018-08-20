import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Product, ProductsWithCount} from '../core/models/product';
import {catchError, map} from 'rxjs/operators';
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

  public load(params = null): Observable<ProductsWithCount> {
    return this.http.get<ProductsWithCount>(ApiUrls.products, {params})
      .pipe(
        map((response) => {
          console.log(response);
          const dataWithCount: ProductsWithCount = {data: [], count: 0};
          dataWithCount.data = response;
          // dataWithCount.count = response.headers('X-Total-Count');
          console.log(dataWithCount);
          return dataWithCount;
        }));
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
