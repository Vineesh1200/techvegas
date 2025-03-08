import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { SingleProductActions } from '../../store/action/products.actions';
import { Observable } from 'rxjs';
import { ProductInterface } from '../../interfaces/product-interface';
import { selectedSingleProduct } from '../../store/selector/products.selectors';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent {

  singleProduct$! : Observable<ProductInterface[]>;

  private router = inject(Router);
  private store$ = inject(Store);

  ngOnInit() {
    this.store$.dispatch(SingleProductActions.getSingleProduct({productId:1}));
    this.singleProduct$ = this.store$.select(selectedSingleProduct);
  }

}
