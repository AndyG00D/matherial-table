import {Component, Input, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';
import {Subject} from 'rxjs/internal/Subject';
import {ProductsService} from '../products.service';
import {Product} from '../../core/models/product';
import {error} from 'selenium-webdriver';
import {takeUntil} from 'rxjs/operators';
import {FormControl, Validators} from '@angular/forms';
import {CustomOption} from '../../ui/custom-select/custom-option.model';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductEditComponent implements OnInit, OnDestroy {
  private destroy = new Subject();
  private product: Product;
  public email = new FormControl('',
    [Validators.required, Validators.email]);
  public options: CustomOption[] = [{
    title: 'one',
    isLabel: false,
    value: 1,
    disabled: false
  },
    {
      title: 'two',
      isLabel: false,
      value: 2,
      disabled: false
    }
  ];

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

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }

}
