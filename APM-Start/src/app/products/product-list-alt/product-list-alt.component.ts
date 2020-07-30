import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';

import { Subscription, EMPTY, Subject } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list-alt.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListAltComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';
  
  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  products$ = this.productService.productsWithCategory$
    .pipe(catchError(err => {
        this.errorMessageSubject.next(err);
        return EMPTY;
    }));
  
  selectedProduct$ = this.productService.selectedProduct$;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  onSelected(productId: number): void {
    this.productService.selectedProductChanged(productId);
  }
}
