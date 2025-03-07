import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { CategoriesActions } from '../../store/action/categories.actions';
import { selectedCategories } from '../../store/selector/categories.selectors';
import { Observable, withLatestFrom } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ProductsActions } from '../../store/action/products.actions';
import { ProductInterface } from '../../interfaces/product-interface';
import { selectedProducts } from '../../store/selector/products.selectors';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})

export class HomeComponent {

  categories$!: Observable<string[]>;
  products$!: Observable<ProductInterface[]>;

  private store$ = inject(Store);

  ngOnInit() {
    this.store$.dispatch(CategoriesActions.getCategories());
    this.categories$ = this.store$.select(selectedCategories);
    this.store$.dispatch(ProductsActions.getProductsByCategory({ category: 'jewelery' }));
    this.products$ = this.store$.select(selectedProducts);
  }

}
