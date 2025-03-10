import { Component, inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { SingleProductActions } from '../../store/action/products.actions';
import { map, Observable } from 'rxjs';
import { ProductInterface } from '../../interfaces/product-interface';
import { selectedSingleProduct } from '../../store/selector/products.selectors';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { CartsActions } from '../../store/action/cart.actions';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { selectedCartLoading } from '../../store/selector/cart.selectors';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, AsyncPipe, NzSkeletonModule, NzIconModule, NzGridModule, NzRateModule, NzSpinModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent {

  productId: string = "";
  singleProduct$!: Observable<ProductInterface[]>;
  loading$!: Observable<boolean>;

  private activatedRoute = inject(ActivatedRoute);
  private store$ = inject(Store);

  constructor() { }

  ngOnInit() {
    this.activatedRoute.params.pipe(
      map((response: Params) => {
        this.productId = response['id'];
        if (this.productId) {
          this.store$.dispatch(SingleProductActions.getSingleProduct({ productId: Number(this.productId) }));
          this.singleProduct$ = this.store$.select(selectedSingleProduct);
        }
      })
    ).subscribe();
    this.loading$ = this.store$.select(selectedCartLoading);
  }

  addCart(detail: ProductInterface) {
    const cartData: any = {
      id: 1,
      userId: 1,
      products: [detail]
    }
    if (detail.isAddedCart) {
      this.store$.dispatch(CartsActions.deleteCarts({ userId: 1, deletedProductByCart: cartData }))
      this.store$.dispatch(SingleProductActions.updateSingleProductCart({id:detail.id,changes:{isAddedCart:false}}));
    } else {
      this.store$.dispatch(CartsActions.addCarts({ userId: 1, addCartData: cartData }));
      this.store$.dispatch(SingleProductActions.updateSingleProductCart({id:detail.id,changes:{isAddedCart:true}}));
    }
  }

}
