import { Component, inject, OnDestroy } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { Store } from '@ngrx/store';
import { ProductInterface } from '../../interfaces/product-interface';
import { map, Observable, of, Subscription } from 'rxjs';
import { selectedProducts } from '../../store/selector/products.selectors';
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

export class HeaderComponent implements OnDestroy {

  items = [
    { title: 'Cart', count: '', icon: 'assets/shopping-cart (2).png', link: '/cart' },
    { title: 'Logout', count: '', icon: 'assets/IC_Logout.svg', link: '' },
  ];

  searchProductData$!: Observable<ProductInterface[]>;
  filteredProducts$!: Observable<ProductInterface[]>;
  userData$!: Observable<ProfileInterface[]>;
  cartsCount: number = 0;
  searchSelectedValue = "";
  isHome$: Observable<boolean> = of(false);
  routerSubscription$: Subscription = new Subscription;

  private router = inject(Router);
  private store$ = inject(Store);

  constructor() {
    this.routerSubscription$ = this.router.events.subscribe((res: any) => {
      if (res instanceof NavigationEnd) {
        if (res.url === '/home' || res.url === '/') {
          this.isHome$ = of(true);
        } else {
          this.isHome$ = of(false);
        }
      }
    })
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
    if (searchText) {
      this.filteredProducts$ = this.searchProductData$.pipe(
        map((products) =>
          products.filter((product) =>
            product.title.toLowerCase().includes(searchText.toLowerCase())
          )
        )
      );
    } else {
      this.filteredProducts$ = of([]);
    }
  }

  back() {
    window.history.back();
  }

  onSelected(product: ProductInterface): void {
    this.router.navigate([`/product-detail/${product.id}`]);
  }

  navigateUrl(link: string): void {
    this.router.navigate([link]);
  }

  navHandleChange(title: string): void {
    if (title === 'Logout') {
      console.log('Logout');
    }
  }

  ngOnDestroy() {
    this.routerSubscription$.unsubscribe();
  }
}
