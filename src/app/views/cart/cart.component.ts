import { Component, inject, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ProductInterface } from '../../interfaces/product-interface';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { CommonModule } from '@angular/common';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { FormsModule } from '@angular/forms';
import { CartsActions } from '../../store/action/cart.actions';
import { selectedCartLoading, selectedCartProducts, selectedCartTotal } from '../../store/selector/cart.selectors';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NzCardModule, NzFlexModule, CommonModule, AsyncPipe, NzRateModule, FormsModule,NzSpinModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  encapsulation: ViewEncapsulation.None
})

export class CartComponent {

  cartProducts$ !: Observable<ProductInterface[]>;
  cartsCount: number = 0;
  loading$!: Observable<boolean>;
  removedItem!:ProductInterface;

  private store$ = inject(Store);

  ngOnInit() {
    this.cartProducts$ = this.store$.select(selectedCartProducts);
    this.store$.select(selectedCartTotal).subscribe((total: number) => {
      this.cartsCount = total
    });
    this.loading$ = this.store$.select(selectedCartLoading);
  }

  removeObjectById(id: number) {
    return this.cartProducts$.pipe(
      map(array => array.filter(item => item.id !== id))
    );
  }

  removeProduct(item: ProductInterface) {
    this.removedItem = item;
    const cartData: any = {
      id: 1,
      userId: 1,
      products: [item]
    }
    this.store$.dispatch(CartsActions.deleteCarts({ userId: 1, deletedProductByCart: cartData }))
  }

}
