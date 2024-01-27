import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { User } from 'src/app/models/user.model';
import { Booking } from 'src/app/models/booking.model';
import { Pet } from 'src/app/models/pet.model';


@Component({
  selector: 'app-keeper-bookings',
  templateUrl: './keeper-bookings.component.html',
  styleUrl: './keeper-bookings.component.css'
})
export class KeeperBookingsComponent {

  keeper = new User();
  owner = new User();
  pet = new Pet();

  bookings: Booking[] = [];

  constructor(private authService : AuthService, private userService : UserServiceService,private route: ActivatedRoute, private datePipe: DatePipe) {}


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const userId = params.get('user_id') ; // convert id to a number
        this.userService.getKeeper(parseInt(userId || '0', 10)).subscribe(
          data => {
            this.keeper = data; // Assign the emitted value to user
            console.log(data);
          },
          error => {
            console.error('Error fetching owner data', error);
          }
        );
        this.userService.GetBookingsByKeeperId(parseInt(userId || '0', 10)).subscribe(
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

  onAccept(booking: Booking) {
    this.userService.UpdateBooking(booking).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.error('Error accepting booking', error);
      }
    );
  }


  onLogout() {
    this.authService.logout();
  }
}
