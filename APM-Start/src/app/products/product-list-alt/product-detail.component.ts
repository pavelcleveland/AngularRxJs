import { Component, ChangeDetectionStrategy } from '@angular/core';

import { ProductService } from '../product.service';
import { catchError, map, filter } from 'rxjs/operators';
import { EMPTY, Subject, combineLatest } from 'rxjs';
import { Product } from '../product';

@Component({
  selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailComponent {
  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  product$ = this.productService.selectedProduct$
    .pipe(
      catchError((err) => 
      {
        this.errorMessageSubject.next(err);
        return EMPTY;
      }
    ));
  pageTitle$ =  this.product$
    .pipe(
      map((p: Product) => p ? `Product Detail for ${p.productName}` : null)
    );
  productSuppliers$ = this.productService.selectedProductSuppliers$
  .pipe(
    catchError(err =>
      {
        this.errorMessageSubject.next(err);
        return EMPTY;
      }
    )
  );

  //Combine stream together
  //In html then you can use one stream 
  /*
  <div class="card"
     *ngIf="vm$ | async as vm">
  <div class="card-header"
      *ngIf="vm.pageTitle"
  >
  ...
  <div class="col-md-6">{{vm.product.productName}}</div>
  */
  vm$ = combineLatest(
    this.product$,
    this.productSuppliers$,
    this.pageTitle$
  ).pipe(
    filter(([product]) => Boolean(product)),
    map(([product, suppliers, title]) =>
    ( { product, suppliers, title }))
  );
  


  constructor(private productService: ProductService) { }

}
