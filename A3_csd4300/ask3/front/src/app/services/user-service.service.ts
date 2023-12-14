import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { User } from '../models/user.model';
import { LoginResp } from '../models/login.model';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  constructor(private http: HttpClient) {}

  saveOwner(params: User) {
    return this.http.post<User>(`http://127.0.0.1:3000/users/owners/`, params);
  }

  saveKeeper(params: User) {
    return this.http.post<User>(`http://127.0.0.1:3000/users/keepers/`, params);
  }

  getOwner(id: number) {
    return this.http.get<User>(`http://127.0.0.1:3000/users/owners/` + id);
  }

  getKeeper(id: number) {
    return this.http.get<User>(`http://127.0.0.1:3000/users/keepers/` + id);
  }
<<<<<<< HEAD

  updateOwner(params: User) {
    return this.http.put<User>(`http://127.0.0.1:3000/users/owners/`+ params.id, params);
  }

  updateKeeper(params: User) {
    return this.http.put<User>(`http:////127.0.0.1:3000/users/keepers/`+ params.id, params);
  }
=======
>>>>>>> main
}
