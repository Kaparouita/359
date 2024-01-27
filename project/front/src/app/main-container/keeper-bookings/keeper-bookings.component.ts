import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { User } from 'src/app/models/user.model';
import { Booking } from 'src/app/models/booking.model';
import { Pet } from 'src/app/models/pet.model';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-keeper-bookings',
  templateUrl: './keeper-bookings.component.html',
  styleUrl: './keeper-bookings.component.css'
})
export class KeeperBookingsComponent {

  keeper = new User();
  owner = new User();
  owners : User[] = [];
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

    this.userService.getOwners().subscribe(
      data => {
        this.owners = data; // Assign the emitted value to user
        console.log(data);
      },
      error => {
        console.error('Error fetching owner data', error);
      }
    );
    
  }

  onAccept(booking: Booking) {
    if (booking.status !== 'requested') {
      alert('You can only reject a requested booking');
      return;
    }
    booking.status = 'accepted';
    this.userService.UpdateBooking(booking).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.error('Error accepting booking', error);
      }
    );
  }

  onReject(booking: Booking) {
    if (booking.status !== 'requested') {
      alert('You can only reject a requested booking');
      return;
    }
    booking.status = 'rejected';

    this.userService.UpdateBooking(booking).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.error('Error rejecting booking', error);
      }
    );
  }
  

  getOwnerName(id: number) {
    return this.owners.find(o => o.id === id)?.first_name;
  }

  getPetType(id: number) {
    const owner = this.owners.find(o => o.id === id);
    console.log(owner?.pets);
    for (const pet of owner?.pets|| []) {
      if (pet.id === id) {
        return pet.type;
      }
    }
    return '';
  }


  onLogout() {
    this.authService.logout();
  }
}
