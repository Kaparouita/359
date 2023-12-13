import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  
  user = new User();

  constructor(private router : Router,private userService : UserServiceService,private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const userType = params.get('userType'); // 'keeper' or 'owner'
      const userId = params.get('id') ; // convert id to a number
  
      if (userType === 'keeper') {
        this.userService.getKeeper(parseInt(userId || '0', 10)).subscribe(
          data => {
            this.user = data; // Assign the emitted value to user
          },
          error => {
            console.error('Error fetching keeper data', error);
          }
        );
      } else if (userType === 'owner') {
        this.userService.getOwner(parseInt(userId || '0', 10)).subscribe(
          data => {
            this.user = data; // Assign the emitted value to user
          },
          error => {
            console.error('Error fetching owner data', error);
          }
        );
      }
    });
  }

  
  
  onLogout() {
    this.router.navigate(['/login']);
  }

}
