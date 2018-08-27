import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ProductsService} from '../products.service';
import {AppTableDataSource} from '../../app-table/table-data-source';
import {Product} from '../../core/models/product';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsTableComponent implements OnInit, OnDestroy {

  public ds: AppTableDataSource<Product[]>;
  public displayedColumns: string[] = ['avatar', 'name', 'age', 'balance', 'isActive', 'action'];

  constructor(
    private productsService: ProductsService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.ds = new AppTableDataSource(this.productsService);
  }

  ngOnInit() {
  }

  public deleteProduct(id: number) {
    this.productsService.deleteProduct(id)
      .subscribe(() => {
        this.ds.refresh();
        this.changeDetectorRef.detectChanges();
      });
  }

  public toggleActive(id: number, isActive: boolean) {
    this.productsService.updateProduct(id, {isActive: !isActive})
      .subscribe(() => {
        this.ds.refresh();
        this.changeDetectorRef.detectChanges();
      });
  }

  // public onSearch(event: any) {
  //   this.ds.filtering(event);
  // }
  //
  // public shortChanges(event) {
  //   this.ds.changeSort(event);
  // }


  public ngOnDestroy(): void {
  }
}
