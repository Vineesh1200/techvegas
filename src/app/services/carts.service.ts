import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartInterface } from '../interfaces/cart-interface';

@Injectable({
  providedIn: 'root'
})

export class CartsService {

  private http = inject(HttpClient);

  constructor() { }

  getCarts(userId:number): Observable<any[]> {
    const endPoint = `carts/${userId}`;
    return this.http.get<any[]>(endPoint);
  }

  getUpdateCarts(userId:number,cartData:CartInterface): Observable<CartInterface> {
    const endPoint = `carts/${userId}`;
    return this.http.put<CartInterface>(endPoint,cartData);
  }

}
