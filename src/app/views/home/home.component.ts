import { Component, inject, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { CategoriesActions } from '../../store/action/categories.actions';
import { selectedCategories } from '../../store/selector/categories.selectors';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ProductsByCategoryActions } from '../../store/action/products.actions';
import { ProductInterface } from '../../interfaces/product-interface';
import { selectedProductsByCategory } from '../../store/selector/products.selectors';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { FormsModule } from '@angular/forms';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NzCardModule, NzFlexModule, CommonModule, NzCarouselModule, AsyncPipe, NzRateModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  encapsulation: ViewEncapsulation.None
})

export class HomeComponent {

  advertisementImages = ['https://www.kottayam.lulumall.in/wp-content/uploads/2024/10/kottayam-banners-01-scaled.jpg','https://www.kottayam.lulumall.in/wp-content/uploads/2024/10/kottayam-banners-04-scaled.jpg'];
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
    this.store$.dispatch(ProductsByCategoryActions.getProductsByCategory({ category: this.selectedValue }));
    this.products$ = this.store$.select(selectedProductsByCategory);
  }

  handleChange(value: string): void {
    this.selectedValue = value;
    this.getProducts();
  }

  navigateToDetail(productId: number): void {
    this.router.navigate([`/product-detail/${productId}`]);
  }

}
