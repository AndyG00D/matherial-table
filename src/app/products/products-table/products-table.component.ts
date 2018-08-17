import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductsService} from '../products.service';
import {ProductsDataSource} from '../products-data-source.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss']
})
export class ProductsTableComponent implements OnInit, OnDestroy {
  public ds: ProductsDataSource;
  public displayedColumns: string[] = ['avatar', 'name', 'balance', 'isActive', 'action'];

  constructor(
    private productsService: ProductsService
  ) {
    this.ds = new ProductsDataSource(this.productsService);
  }

  ngOnInit() {
  }

  public deleteProduct(id: number) {
    this.productsService.deleteProduct(id)
      .subscribe( () => this.ds.refresh());
  }

  public toggleActive(id: number, isActive: boolean) {
    this.productsService.updateProduct(id, {isActive: !isActive})
      .subscribe(() => this.ds.refresh());
  }

  public ngOnDestroy(): void {
  }
}
