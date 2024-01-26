import { Component } from '@angular/core';

@Component({
  selector: 'app-keeper-bookings',
  templateUrl: './keeper-bookings.component.html',
  styleUrl: './keeper-bookings.component.css'
})
export class KeeperBookingsComponent {

  constructor() { }

  onLogout() {
    localStorage.removeItem('token');
  }
}
