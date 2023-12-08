import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { CountriesComponent } from './map/countries/countries.component';
import { MapComponent } from './map/map.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor(private router: Router) {}

  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  firstname: string = '';
  lastname: string = '';
  birthdate: Date = new Date();
  spaceType: string = '';
  gender: string = '';
  type: string = ''; // keeper or owner
  country: string = '';
  city: string = '';
  address: string = '';
  personalpage: string = '';
  job: string = '';
  phone: string = '';
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  passwordValidationMessage: string = '';
  passwordInvalid: boolean = false;
  confirmPasswordValidationMessage: string = '';

  hasCat: boolean = false;
  hasDog: boolean = false;
  catPrice: number = 8;
  dogPrice: number = 8;
  spaceDescription: string = '';

  showMap: boolean = false;

  //----------------------VALIDATION----------------------//

  onCountrySelected(country: string) {
    this.country = country;
  }

  // !TODO: Change this to the lat/lon coordinates
  onMap(address: string) {
    this.address = address;
  }

  //   var form = document.getElementById("registerForm");
  //   form.addEventListener("submit", function(event){
  //     if (!validateForm()) {
  //       console.log("fail");
  //       alert("Incorrect password");
  //       event.preventDefault();
  //       return false; // Prevent form submission
  //     }
  //     console.log("success")
  //     alert("Form submitted");
  //     return true; // Allow form submission
  //   });

  dogCheckboxChange() {
    // Do something
  }

  catCheckboxChange() {
    // Do something
  }

  //   //----------------------KEEPER----------------------//
  //   toggleKeeperVisibility(false); // initially hide keeper elements

  //   type.addEventListener("change", function() {
  //     if (type.value === "keeper") {
  //       toggleKeeperVisibility(true);
  //     } else {
  //       toggleKeeperVisibility(false);
  //     }
  //   });

  //   const catLabel = document.getElementById("catLabel");
  //   const spaceType = document.getElementById("space-type");
  //   spaceType.addEventListener("change", function() {
  //     if (!checkSpaceType(spaceType.value)) {
  //       catPrice.style.display = "none";
  //       catCheckbox.style.display = "none";
  //       catLabel.style.display = "none";
  //     }
  //     else {
  //       catCheckbox.style.display = "block";
  //       catLabel.style.display = "block";
  //     }
  //   });
  // });

  checkPassword() {
    const { message, valid } = this.validatePassword(
      this.password,
      this.confirmPassword
    );
    this.passwordValidationMessage = message;
    this.passwordInvalid = valid === 'danger';
    return valid;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  contains50PercentNumbers(password: string) {
    const numbers = password.match(/\d/g);
    if (!numbers) {
      return false;
    }
    return numbers.length / password.length >= 0.5;
  }

  containsKeyWord(password: string) {
    const keyWords = ['dog', 'cat', 'gata', 'skylos'];
    for (var i = 0; i < keyWords.length; i++) {
      if (password.includes(keyWords[i])) {
        return true;
      }
    }
    return false;
  }

  validateForm() {
    let resp = this.validatePassword(this.password, this.confirmPassword);
    if (resp.valid === 'danger') {
      return false;
    }
    return true;
  }

  containsCapLetterSymbolNumber(password: string) {
    const regex = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*\d).+$/;
    return regex.test(password);
  }

  validatePassword(password: string, confirmPassword: string) {
    var pattern = /^(?=.*[!@#$%^&*])(?=.*[a-zA-Z])(?=.*\d).*$/;

    if (password !== confirmPassword) {
      return { message: 'Passwords do not match', valid: 'danger' };
    } else if (password.length < 8) {
      return { message: 'Password is too short', valid: 'danger' };
    } else if (password.length > 15) {
      return { message: 'Password is too long', valid: 'danger' };
    } else if (!pattern.test(password)) {
      return {
        message:
          'Password contains invalid characters(at least one special symbol,letter,number)',
        valid: 'danger',
      };
    } else if (this.contains50PercentNumbers(password)) {
      return { message: 'Password contains 50% numbers', valid: 'danger' };
    } else if (this.containsKeyWord(password)) {
      return { message: 'Password contains a keyword', valid: 'danger' };
    } else if (this.containsCapLetterSymbolNumber(password)) {
      return { message: 'Password is strong', valid: 'success' };
    }
    return { message: 'Password is medium', valid: 'warning' };
  }

  toggleKeeperVisibility(condition: boolean) {
    var keeperElements = document.getElementsByClassName('keeper');

    // Loop through all elements with class 'keeper'
    // for (var i = 0; i < keeperElements.length; i++) {
    //   if (condition) {
    //     keeperElements[i].style.display = "block"; // Make visible
    //   } else {
    //     keeperElements[i].style.display = "none"; // Hide
    //   }
    // }
  }

  checkSpaceType(space: string) {
    if (space === 'outdoor') {
      return false;
    }
    return true;
  }

  ngOnInit(): void {}

  onSubmit() {
    console.log('register form submitted');

    //this.router.navigate(['/login']);
  }
}
