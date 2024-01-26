import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';

import { Pet } from '../../models/pet.model';

@Component({
  selector: 'app-owner-add-pet',
  templateUrl: './owner-add-pet.component.html',
  styleUrl: './owner-add-pet.component.css'
})
export class OwnerAddPetComponent {
  addPetForm: FormGroup | any;
  petTypes: any[] | undefined; 

  owner_id: number | undefined;
  constructor(private fb: FormBuilder,private route: ActivatedRoute,private userService: UserServiceService) { }

  ngOnInit() {
    // Initialize the form
    this.route.paramMap.subscribe(params => {
      const userId = params.get('user_id') ;
      this.owner_id = parseInt(userId || '0', 10);
    });

    this.addPetForm = this.fb.group({
      pet_id : ['1234567890'],
      owner_id: [this.owner_id, Validators.required],
      name: ['', Validators.required],
      age: ['', Validators.required],
      type: ['', Validators.required], // Dropdown
      breed: ['', Validators.required],
      gender: ['', Validators.required],
      birth_year: ['', Validators.required],
      weight: ['', Validators.required],
      description: [''],
      photo: [''] // Optional
    });

  }



  onSubmit() {
    if (this.addPetForm.valid) {
      var pet = new Pet(this.addPetForm.pet_id,this.addPetForm.owner_id,this.addPetForm.name)
      console.log(pet);
      this.userService.addPet(pet).subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          console.log(error);
        }
      );
    }
    else {
      console.log('Invalid form');
    }
  }
}

