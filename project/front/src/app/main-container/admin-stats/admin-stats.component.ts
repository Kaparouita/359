import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../services/user-service.service';


@Component({
  selector: 'app-admin-stats',
  templateUrl: './admin-stats.component.html',
  styleUrl: './admin-stats.component.css'
})
export class AdminStatsComponent {

  constructor(private userService: UserServiceService) {}

}
  
    
