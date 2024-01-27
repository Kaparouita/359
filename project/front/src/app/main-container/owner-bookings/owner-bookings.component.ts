import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Booking } from 'src/app/models/booking.model';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-owner-bookings',
  templateUrl: './owner-bookings.component.html',
  styleUrl: './owner-bookings.component.css'
})
export class OwnerBookingsComponent {

  constructor(private userService: UserServiceService,private route: ActivatedRoute) {}

  bookings: Booking [] = [];

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      const userId = params.get('user_id') ; // convert id to a number
      this.userService.getOwnerBookings(parseInt(userId || '0', 10)).subscribe(
        data => {
          this.bookings = data; // Assign the emitted value to user
          console.log(data);
        },
        error => {
          console.error('Error fetching owner data', error);
        }
      );
    });
  }

  changeStatus(booking: Booking) {
    if (booking.status !== 'accepted') {
      alert('You can only change the status of accepted bookings');
      return;
    }
  }
}
