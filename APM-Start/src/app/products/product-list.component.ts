import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Subscription, Observable, EMPTY, Subject, combineLatest, BehaviorSubject } from 'rxjs';

import { Product } from './product';
import { ProductService } from './product.service';
import { catchError, map } from 'rxjs/operators';
import { ProductCategoryService } from '../product-categories/product-category.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Product List';
  errorMessage = '';
  
  private categorySelectedSubject = new BehaviorSubject<number>(0);
  categorySelectedAction$ = this.categorySelectedSubject.asObservable();

  categories$ = this.productCategoryService.productCategories$
    .pipe(
      catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      })
    );

  products$ = combineLatest([this.productService.productsWithCategory$, this.categorySelectedAction$]) 
    .pipe(
      map(([products, selectedCategoryId]) =>
        products.filter(product => selectedCategoryId ? product.categoryId === selectedCategoryId : true)),
      catchError(err => {
      this.errorMessage = err;
      return EMPTY;
    }));
  

  constructor(private productService: ProductService, private productCategoryService: ProductCategoryService) { }

  ngOnInit(): void {
  }

  onAdd(): void {
    console.log('Not yet implemented');
  }

  onSelected(categoryId: string): void {
    this.categorySelectedSubject.next(+categoryId);
  }
}
