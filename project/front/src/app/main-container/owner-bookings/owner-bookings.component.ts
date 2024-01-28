import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Booking } from 'src/app/models/booking.model';
import { UserServiceService } from 'src/app/services/user-service.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { Message } from 'src/app/models/message.model';
import { Review } from 'src/app/models/review.model';

@Component({
  selector: 'app-owner-bookings',
  templateUrl: './owner-bookings.component.html',
  styleUrl: './owner-bookings.component.css'
})
export class OwnerBookingsComponent {

  constructor(private userService: UserServiceService,private route: ActivatedRoute, private router: Router) {}
  visible: boolean = false;
  messageVisible: boolean = false;
  message: string = '';
  reviewMessage: string = '';
  bookings: Booking [] = [];
  value1!: number;
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
    }else {
      booking.status = 'completed';
      this.userService.UpdateBooking(booking).subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.error('Error updating booking', error);
        }
      );
    }
  }

  showDialog() {
    this.visible = true;
  }

  CreateReview(keeper_id: number, owner_id: number, booking_id: number) {
    const review: Review = new Review();
    review.rating = this.value1;
    review.comment = this.reviewMessage;
    review.booking_id = booking_id;
    review.keeper_id = keeper_id;
    review.owner_id = owner_id;

    this.userService.CreateReview(review).subscribe(
      data => {
        console.log(data);
        this.reviewMessage = 'Review created successfully';
      },
      error => {
        console.error('Error creating review', error);
        this.reviewMessage = 'Error creating review';
      }
    );
  }

  SendMessage(booking : Booking) {

    this.userService.getOwner(booking.owner_id).subscribe(
      data => {
        const owner = data;
        this.userService.getKeeper(booking.keeper_id).subscribe(
          data => {
           const  keeper = data;
           var message = new Message(owner.username,keeper.username,this.message);
            message.from_id = owner.id;
            message.to_id = keeper.id;

            this.userService.sendMessage(message).subscribe(
              data => {
                console.log(data);
                this.message = 'Message sent successfully';
                this.showDialog();
              },
              error => {
                console.error('Error sending message', error);
                this.message = 'Error sending message';
                this.showDialog();
              }
            );
          },
          error => {
            console.error('Error fetching keeper data', error);
          }
        );
      },
      error => {
        console.error('Error fetching owner data', error);
      }
    );
  }

  showDialogMessage() {
    this.messageVisible = true;
  }
}
