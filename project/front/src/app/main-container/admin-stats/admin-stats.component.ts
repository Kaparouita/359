import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { ChartModule } from 'primeng/chart';


interface petCount{
  cats: number;
  dogs: number;
}

interface userCount{
  owners: number;
  keepers: number;
}

interface money{
  keepers: number;
  app: number;
}

@Component({
  selector: 'app-admin-stats',
  templateUrl: './admin-stats.component.html',
  styleUrl: './admin-stats.component.css'
})
export class AdminStatsComponent implements OnInit{

  constructor(private adminService: AdminService) {}

  petCount: petCount = {cats: 0, dogs: 0};
  userCount: userCount = {owners: 0, keepers: 0};
  money: money = {keepers: 0, app: 0};

  petsData: any;
  options: any;

  ngOnInit() {
    this.adminService.getPetCount().subscribe((data : petCount) => {
      this.petCount = data;
      this.updateChartData();
    });
    this.adminService.getUserCount().subscribe((data : userCount) => {
      this.userCount = data;
    });
    this.adminService.getMoney().subscribe((data : money) => {
      this.money = data;
    });

  }

  updateChartData() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');


    this.petsData = {
      labels: ['Cats', 'Dogs'],
      datasets: [
          {
              data: [this.petCount.cats, this.petCount.dogs],
              backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
              hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
          }
      ]
    };


    this.options = {
        cutout: '60%',
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        }
    };
  }

}
  
    
