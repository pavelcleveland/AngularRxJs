import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription, EMPTY } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list-alt.component.html'
})
export class ProductListAltComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';
  errorMessage = '';
  selectedProductId: number;

  products$ = this.productService.productsWithCategory$
    .pipe(catchError(err => {
      this.errorMessage = err;
      return EMPTY;
    }));
  

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  onSelected(productId: number): void {
    console.log('Not yet implemented');
  }
}
