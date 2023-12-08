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




@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    MapComponent,
    CountriesComponent
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
    DataViewModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
