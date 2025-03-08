import { Component, inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { CommonModule } from '@angular/common';
import { countries } from '../../helpers/countries';
import { Store } from '@ngrx/store';
import { UserActions } from '../../store/action/user.actions';

interface Country {
  dial_code: string;
  image: string;
  name: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzButtonModule,
    NzSpinModule,
    NzGridModule,
    NzAvatarModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  encapsulation: ViewEncapsulation.None
})

export class ProfileComponent {

  profileImage: string = "";
  isEdit: boolean = false;
  profileEditForm: FormGroup;
  isLoading = false;
  genderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
  ];
  countriesList: Country[] = countries;
  selectedCountry: Country = this.countriesList[0];

  private fb = inject(FormBuilder);
  private store$ = inject(Store);

  constructor() {
    this.profileEditForm = this.fb.group({
      userName: ['', [Validators.required, Validators.pattern(/\S/)]],
      email: [{ value: 'techvegas@gmail.com', disabled: true }, [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/\S/)]],
      gender: ['', [Validators.required]],
      countryCode: [this.selectedCountry.dial_code],
    });
  }

  ngOnInit() {
    this.store$.dispatch(UserActions.getUser({ userId: 1 }));
  }

  onCountryChange(country: Country): void {
    this.selectedCountry = country;
    this.profileEditForm.get('countryCode')?.setValue(country.dial_code);
  }

  onSubmit(): void {
    if (this.profileEditForm.valid) {
      this.isLoading = true;
      console.log('Form submitted:', this.profileEditForm.value);
      setTimeout(() => {
        this.isLoading = false;
      }, 2000);
    } else {
      Object.values(this.profileEditForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}