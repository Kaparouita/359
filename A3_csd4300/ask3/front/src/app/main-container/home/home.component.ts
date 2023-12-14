import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';
import { ActivatedRoute } from '@angular/router';
<<<<<<< HEAD
import { AuthService } from 'src/app/services/auth.service';

interface Gender {
  name: string;
  code: string;
}
=======
import { Observable } from 'rxjs';

>>>>>>> main

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
<<<<<<< HEAD
  editMode = false;
  genderOptions : Gender[] | undefined;
  passwordVisable = false;


  user = new User();

  constructor(private authService : AuthService,private userService : UserServiceService,private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.genderOptions = [
      {name : "female" , code : "female"},
      {name : "male" , code : "male"},
      {name : "other" , code : "other"},
    ];

    this.route.paramMap.subscribe(params => {
      const userType = params.get('user_type'); // 'keeper' or 'owner'
      const userId = params.get('user_id') ; // convert id to a number
=======
  
  user = new User();

  constructor(private router : Router,private userService : UserServiceService,private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const userType = params.get('userType'); // 'keeper' or 'owner'
      const userId = params.get('id') ; // convert id to a number
>>>>>>> main
  
      if (userType === 'keeper') {
        this.userService.getKeeper(parseInt(userId || '0', 10)).subscribe(
          data => {
            this.user = data; // Assign the emitted value to user
<<<<<<< HEAD
            console.log(data);
=======
>>>>>>> main
          },
          error => {
            console.error('Error fetching keeper data', error);
          }
        );
      } else if (userType === 'owner') {
        this.userService.getOwner(parseInt(userId || '0', 10)).subscribe(
          data => {
            this.user = data; // Assign the emitted value to user
<<<<<<< HEAD
            console.log(data);
=======
>>>>>>> main
          },
          error => {
            console.error('Error fetching owner data', error);
          }
        );
<<<<<<< HEAD
      } else {
        console.error('Invalid userType', userType);
=======
>>>>>>> main
      }
    });
  }

<<<<<<< HEAD
  saveChanges() {
    this.editMode = false;
    if (this.user.user_type === 'keeper') {
      this.userService.updateKeeper(this.user).subscribe(
        data => {
          console.log("Updated Keeper successfully : ",data);
        },
        error => {
          console.error('Error saving keeper data', error);
        }
      );
    } else if (this.user.user_type === 'owner') {
      this.userService.updateOwner(this.user).subscribe(
        data => {
          console.log("Updated Owner successfully : ",data);
        },
        error => {
          console.error('Error saving owner data', error);
        }
      );
    } else{
      console.error('Invalid userType', this.user.user_type);
    }
  }
  
  togglePasswordVisibility() {
    this.passwordVisable = !this.passwordVisable;
  }

  onLogout() {
    this.authService.logout();
=======
  
  
  onLogout() {
    this.router.navigate(['/login']);
>>>>>>> main
  }

}
