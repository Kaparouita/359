import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { UserServiceService } from '../../services/user-service.service';
import { User } from '../../models/user.model';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent {

  constructor(private userService : UserServiceService) {}
  keepers: User[] = []; 

  ngOnInit(): void {
    this.userService.getKeepers().subscribe(
      (data) => {
        console.log(data);
        this.keepers = data;
        
      },
      (error) => {
        console.log(error);
      }
    );

    
  }

  deleteKeeper(keeperId: number): void {
    this.userService.DeleteKeeper(keeperId).subscribe(
      () => {
        this.keepers = this.keepers.filter(keeper => keeper.id !== keeperId);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
