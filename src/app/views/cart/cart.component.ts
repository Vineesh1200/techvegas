import { Component, inject, viewChild, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ProductInterface } from '../../interfaces/product-interface';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { FormsModule } from '@angular/forms';
import { CartsActions } from '../../store/action/cart.actions';
import { selectedCartProducts, selectedCartTotal } from '../../store/selector/cart.selectors';
import { CartsService } from '../../services/carts.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NzCardModule, NzFlexModule, CommonModule, AsyncPipe, NzRateModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  encapsulation: ViewEncapsulation.None
})

export class CartComponent {

  cartProducts$ !: Observable<ProductInterface[]>;
  cartsCount: number = 0;

  private store$ = inject(Store);
  private cartsService = inject(CartsService);

  ngOnInit() {
    this.cartProducts$ = this.store$.select(selectedCartProducts);
    this.store$.select(selectedCartTotal).subscribe((total: number) => {
      this.cartsCount = total
    });
  }

  removeObjectById(id: number) {
    return this.cartProducts$.pipe(
      map(array => array.filter(item => item.id !== id))
    );
  }

  removeProduct(item: ProductInterface) {
    this.removeObjectById(2).subscribe((products: ProductInterface[]) => {
      const cartData: any = {
        id: 1,
        userId: 1,
        products: products
      }
      this.store$.dispatch(CartsActions.deleteCarts({ userId: 1, updateCartData: cartData, deletedProductByCart: item }))
    });
  }

}
