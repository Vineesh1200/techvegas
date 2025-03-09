import { Component, inject, ViewEncapsulation } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { Router, RouterLink } from '@angular/router';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { Store } from '@ngrx/store';
import { ProductInterface } from '../../interfaces/product-interface';
import { filter, map, Observable, of } from 'rxjs';
import { selectedProducts, selectedProductsByCategory } from '../../store/selector/products.selectors';
import { CartsActions } from '../../store/action/cart.actions';
import { selectedCartTotal } from '../../store/selector/cart.selectors';
import { UserActions } from '../../store/action/user.actions';
import { selectedUser } from '../../store/selector/user.selectors';
import { ProfileInterface } from '../../interfaces/profile-interface';
import { ProductsActions } from '../../store/action/products.actions';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, NzInputModule, NzIconModule, NzGridModule, NzSpinModule, FormsModule, NzModalModule, NzBadgeModule, NzPopoverModule, NzAvatarModule, AsyncPipe, RouterLink, NzSelectModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})

export class HeaderComponent {

  items = [
    { title: 'Cart', count: '', icon: 'assets/shopping-cart (2).png', link: '/cart' },
    { title: 'Logout', count: '', icon: 'assets/IC_Logout.svg', link: '' },
  ];
  searchForm: FormGroup;
  searchText: string = '';
  isModalVisible: boolean = false;
  searchProductData$!: Observable<ProductInterface[]>;
  filteredProducts$!: Observable<ProductInterface[]>;
  isLoading: boolean = false;
  userData$!: Observable<ProfileInterface[]>;
  cartsCount: number = 0;
  searchSelectedValue = ""

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private store$ = inject(Store);

  constructor() {
    this.searchForm = this.fb.group({
      searchText: [''],
    });
  }

  ngOnInit() {
    this.store$.dispatch(ProductsActions.getProducts());
    this.searchProductData$ = this.store$.select(selectedProducts);
    this.store$.dispatch(UserActions.getUser({ userId: 1 }));
    this.userData$ = this.store$.select(selectedUser);
    this.store$.dispatch(CartsActions.getCarts({ userId: 1 }));
    this.store$.select(selectedCartTotal).subscribe((total: number) => {
      this.cartsCount = total
    });
  }

  onSearch(searchText: any): void {
    this.searchText = searchText;
    this.filteredProducts$ = this.searchProductData$.pipe(
      map((products) =>
        products.filter((product) =>
          product.title.toLowerCase().includes(this.searchText.toLowerCase())
        )
      )
    );
  }

  back() {
    window.history.back();
  }

  handleCancel(): void {
    this.isModalVisible = false;
  }

  onSelected(product: ProductInterface): void {
    this.router.navigate([`/product-detail/${product.id}`]);
  }

  navigateUrl(link: string): void {
    this.router.navigate([link]);
  }

  navHandleChange(title: string): void {
    console.log('Clicked:', title);
    if (title === 'Logout') {
      console.log('Logout');
    }
  }
}
