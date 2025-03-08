import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  private http = inject(HttpClient);

  constructor() { }

  getSingleUser(userId: number): Observable<any> {
    const endPoint = `user/${userId}`;
    return this.http.get<any>(endPoint);
  }

}