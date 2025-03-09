import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UpdateUserInterface } from '../interfaces/profile-interface';

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  private http = inject(HttpClient);

  constructor() { }

  login(): Observable<any> {
    const endPoint = `auth/login`;
    return this.http.post<any>(endPoint,{
      "username": "johnd",
      "password": "m38rmF$"
    });
  }

  getSingleUser(userId: number): Observable<any> {
    const endPoint = `users/${userId}`;
    return this.http.get<any>(endPoint);
  }

  updateSingleUser(userId: number, user: UpdateUserInterface): Observable<UpdateUserInterface> {
    const endPoint = `users/${userId}`;
    return this.http.put<UpdateUserInterface>(endPoint, user);
  }

}