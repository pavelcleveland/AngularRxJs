import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Subscription, Observable, EMPTY } from 'rxjs';

import { Product } from './product';
import { ProductService } from './product.service';
import { catchError } from 'rxjs/operators';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Product List';
  errorMessage = '';
  categories;

  products$ = this.productService.productsWithCategory$
    .pipe(catchError(err => {
      this.errorMessage = err;
      return EMPTY;
    }));

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
  }

  onAdd(): void {
    console.log('Not yet implemented');
  }

  onSelected(categoryId: string): void {
    console.log('Not yet implemented');
  }
}
