import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductInterface } from '../interfaces/product-interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  private http = inject(HttpClient);

  constructor() { }

  getProducts(category: string): Observable<ProductInterface[]> {
    const endPoint = `products`;
    return this.http.get<ProductInterface[]>(endPoint);
  }

  getSingleProducts(productId: number): Observable<ProductInterface> {
    const endPoint = `products/${productId}`;
    return this.http.get<ProductInterface>(endPoint);
  }

  getProductsByCategory(category: string): Observable<ProductInterface[]> {
    const endPoint = `products/category/${category}`;
    return this.http.get<ProductInterface[]>(endPoint);
  }

}
