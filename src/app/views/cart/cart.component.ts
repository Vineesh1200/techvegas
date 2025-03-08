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
import { selectedCartProducts } from '../../store/selector/cart.selectors';
import { CartsService } from '../../services/carts.service';
import { CartInterface } from '../../interfaces/cart-interface';

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

  private store$ = inject(Store);
  private cartsService = inject(CartsService);

  ngOnInit() {
    this.store$.dispatch(CartsActions.getCarts({ userId: 1 }));
    this.cartProducts$ = this.store$.select(selectedCartProducts);
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
      console.log(products)
      this.store$.dispatch(CartsActions.deleteCarts({ userId: 1, updateCartData: cartData, deletedProductByCart: item }))
    });
  }

}
