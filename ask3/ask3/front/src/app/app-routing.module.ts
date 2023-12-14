 import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './main-container/login/login.component';
import { HomeComponent } from './main-container/home/home.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  // Existing routes...

  // New route
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home/:user_type/:user_id', component: HomeComponent ,canActivate: [AuthGuard]},
  { path: 'home', component: HomeComponent ,canActivate: [AuthGuard]},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
