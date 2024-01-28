import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-keepers-review',
  templateUrl: './keepers-review.component.html',
  styleUrl: './keepers-review.component.css'
})
export class KeepersReviewComponent {

  user = new User();
  owners : User[] = [];
  reviews : any;
  constructor( private authService : AuthService,private userService : UserServiceService,private route: ActivatedRoute, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const userId = params.get('user_id') ; // convert id to a number

      this.userService.GetReviewsByKeeper(parseInt(userId || '0', 10)).subscribe(
        data => {
          this.reviews = data; // Assign the emitted value to user
          console.log(data);
        },
        error => {
          console.error('Error fetching keeper data', error);
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


  getOwnerName(id: number) {
    var mama = this.owners.find(o => o.id === id)?.first_name;
    console.log(mama);
    return mama;
  }
}
