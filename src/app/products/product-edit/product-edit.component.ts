import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRouteSnapshot} from '@angular/router';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';
import {Subject} from 'rxjs/internal/Subject';
import {ProductsService} from '../products.service';
import {Product} from '../../core/models/product';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit, OnDestroy {
  public loading$ = new BehaviorSubject(true);
  private destroy = new Subject();
  private product: Product;

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRouteSnapshot
  ) {
  }

  ngOnInit() {
    this.getProduct();
  }

  private getProduct() {
    this.productsService.getProduct(this.route.params.id).subscribe(
      data => this.product = data
    );
  }

  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
    this.loading$.complete();
  }
}
