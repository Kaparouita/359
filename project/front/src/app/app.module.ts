import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastModule } from 'primeng/toast';
import { RegisterComponent } from './register/register.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { PasswordModule } from 'primeng/password';
import { FormsModule } from '@angular/forms';
import { DataViewModule } from 'primeng/dataview';
import { MapComponent } from './register/map/map.component';
import { CountriesComponent } from './register/map/countries/countries.component';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { LoginComponent } from './main-container/login/login.component';
import { AdminLoginComponent } from './main-container/admin-login/admin-login.component';
import { AdminHomeComponent } from './main-container/admin-home/admin-home.component';
import { AdminStatsComponent } from './main-container/admin-stats/admin-stats.component';
import { KeeperBookingsComponent } from './main-container/keeper-bookings/keeper-bookings.component';
import { VisitorFindKeepersComponent } from './main-container/visitor-find-keepers/visitor-find-keepers.component';
import { KeeperHomeComponent } from './main-container/keeper-home/keeper-home.component';
import { OwnerHomeComponent } from './main-container/owner-home/owner-home.component';
import { OwnerAddPetComponent } from './main-container/owner-add-pet/owner-add-pet.component';
import { TableModule } from 'primeng/table';
import { ChartModule } from 'primeng/chart';
import { Chart } from 'chart.js';



@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    MapComponent,
    CountriesComponent,
    LoginComponent,
    AdminLoginComponent,
    AdminHomeComponent,
    AdminStatsComponent,
    KeeperBookingsComponent,
    VisitorFindKeepersComponent,
    KeeperHomeComponent,
    OwnerHomeComponent,
    OwnerAddPetComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToastModule,
    InputTextModule,
    ButtonModule, 
    DropdownModule,
    CardModule,
    PasswordModule,
    FormsModule,
    DataViewModule,
    HttpClientModule,
    TableModule,
    ChartModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
