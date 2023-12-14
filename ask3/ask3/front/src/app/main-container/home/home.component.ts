import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DatePipe } from '@angular/common';

interface Gender {
  name: string;
  code: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  editMode = false;
  genderOptions : Gender[] | undefined;
  passwordVisable = false;
  birthDate : Date | undefined;


  user = new User();

  constructor(private authService : AuthService,private userService : UserServiceService,private route: ActivatedRoute, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.genderOptions = [
      {name : "female" , code : "female"},
      {name : "male" , code : "male"},
      {name : "other" , code : "other"},
    ];

    this.route.paramMap.subscribe(params => {
      const userType = params.get('user_type'); // 'keeper' or 'owner'
      const userId = params.get('user_id') ; // convert id to a number
  
      if (userType === 'keeper') {
        this.userService.getKeeper(parseInt(userId || '0', 10)).subscribe(
          data => {
            this.user = data; // Assign the emitted value to user
            console.log(data);
          },
          error => {
            console.error('Error fetching keeper data', error);
          }
        );
      } else if (userType === 'owner') {
        this.userService.getOwner(parseInt(userId || '0', 10)).subscribe(
          data => {
            this.user = data; // Assign the emitted value to user
            console.log(data);
          },
          error => {
            console.error('Error fetching owner data', error);
          }
        );
      } else {
        console.error('Invalid userType', userType);
      }
    });
  }

  formatDate(date: Date): string {
    let formatBirthday = this.datePipe.transform(
      date,
      'yyyy-MM-ddTHH:mm:ssZZZZZ'
    );

    return formatBirthday as string;
  }

  saveChanges() {
    this.editMode = false;
    if (this.birthDate !== undefined) {
      this.user.birth_date = this.formatDate(this.birthDate);
    }
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
  }

}
