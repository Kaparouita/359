import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { User } from '../models/user.model';
import { LoginResp } from '../models/login.model';
import { Pet } from '../models/pet.model';
import { Booking } from '../models/booking.model';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  constructor(private http: HttpClient) {}

  saveOwner(params: User) {
    return this.http.post<User>(`http://127.0.0.1:3000/users/owners/`, params);
  }

  addPet(params: Pet){
    return this.http.post<Pet>(`http://127.0.0.1:3000/pets/`, params);
  }

  saveKeeper(params: User) {
    return this.http.post<User>(`http://127.0.0.1:3000/users/keepers/`, params);
  }

  getOwner(id: number) {
    return this.http.get<User>(`http://127.0.0.1:3000/users/owners/` + id);
  }

  getAvailableKeepers(id : number) {
    return this.http.get<User[]>(`http://127.0.0.1:3000/users/owners/` + id + `/findKeepers`);
  }

  getOrderedKeepers(id : number, orderBy : string) {
    return this.http.get<User[]>(`http://127.0.0.1:3000/users/owners/` + id + `/orderKeepers?orderBy=` + orderBy);
  }

  getKeeper(id: number) {
    return this.http.get<User>(`http://127.0.0.1:3000/users/keepers/` + id);
  }

  updateOwner(params: User) {
    return this.http.put<User>(`http://127.0.0.1:3000/users/owners/`+ params.id, params);
  }

  updateKeeper(params: User) {
    return this.http.put<User>(`http:////127.0.0.1:3000/users/keepers/`+ params.id, params);
  }

  getAdmin(id: number) {
    return this.http.get<User>(`http:////127.0.0.1:3000/users/admins/` + id);
  }

  getKeepers() {
    return this.http.get<User[]>(`http:////127.0.0.1:3000/users/keepers/`);
  }

  DeleteKeeper(id: number) {
    return this.http.delete(`http:////127.0.0.1:3000/users/keepers/` + id);
  }

  GetNumberOfCats() {
    return this.http.get<number>(`http:////127.0.0.1:3000/admin/stats`);
  }

  GetNumberOfDogs() {
    return this.http.get<number>(`http:////127.0.0.1:3000/admin/stats`);
  }

  GetBookings(id: number) {
    return this.http.get<number>(`http:////127.0.0.1:3000/keeper/` + id + `/bookings`);
  }

  createBooking(book : Booking) {
    return this.http.post<Booking>(`http:////127.0.0.1:3000/bookings/`, book);
  }
}
