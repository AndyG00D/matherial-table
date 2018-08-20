import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';
import {Subject} from 'rxjs/internal/Subject';
import {ProductsService} from '../products.service';
import {Product} from '../../core/models/product';
import {error} from 'selenium-webdriver';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit, OnDestroy {
  private destroy = new Subject();
  private product: Product;

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.getProduct();
  }

  private getProduct() {

    this.route.params
      .pipe(
        takeUntil(this.destroy),
      )
      .subscribe(params =>
      this.productsService.getProduct(params.id).subscribe(
        data => this.product = data,
        () => this.router.navigateByUrl('/')
      )
    );
  }

  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
