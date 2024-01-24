import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-keeper-bookings',
  templateUrl: './keeper-bookings.component.html',
  styleUrl: './keeper-bookings.component.css'
})
export class KeeperBookingsComponent {

  constructor(private authService : AuthService) {}

  ngOnInit(): void {
  }

  onLogout() {
    this.authService.logout();
  }
}
