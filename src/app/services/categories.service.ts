import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CategoriesService {

  private http = inject(HttpClient);

  constructor() { }

  getCategories(): Observable<string[]> {
    const endPoint = `products/categories`;
    return this.http.get<string[]>(endPoint);
  }

}
