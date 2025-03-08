import { Component, inject, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { CategoriesActions } from '../../store/action/categories.actions';
import { selectedCategories } from '../../store/selector/categories.selectors';
import { Observable, withLatestFrom } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ProductsActions } from '../../store/action/products.actions';
import { ProductInterface } from '../../interfaces/product-interface';
import { selectedProducts } from '../../store/selector/products.selectors';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NzCardModule, NzFlexModule, CommonModule, AsyncPipe, NzRateModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  encapsulation: ViewEncapsulation.None
})

export class HomeComponent {

  selectedValue: string = '';
  cardItems: any[] = [];
  isLoading: boolean = false;
  historyOption: string = '';
  isAdmin: boolean = false;

  categories$!: Observable<string[]>;
  products$!: Observable<ProductInterface[]>;

  private router = inject(Router);
  private store$ = inject(Store);

  ngOnInit() {
    this.store$.dispatch(CategoriesActions.getCategories());
    this.categories$ = this.store$.select(selectedCategories);
    this.categories$.subscribe((value: any) => {
      if (value.length > 0) {
        this.selectedValue = value[0];
        this.getProducts();
      }
    })
  }

  getProducts() {
    this.store$.dispatch(ProductsActions.getProductsByCategory({ category: this.selectedValue }));
    this.products$ = this.store$.select(selectedProducts);
  }

  handleChange(value: string): void {
    this.selectedValue = value;
    this.getProducts();
  }

  navigateToDetail(productId: number): void {
    this.router.navigate([`/product-detail/${productId}`]);
  }

}
