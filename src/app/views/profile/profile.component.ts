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
import { Store } from '@ngrx/store';
import { UserActions } from '../../store/action/user.actions';
import { selectedUser, selectedUserUpdateLoading } from '../../store/selector/user.selectors';
import { Observable } from 'rxjs';


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
    NzAvatarModule,
    NzSpinModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  encapsulation: ViewEncapsulation.None
})

export class ProfileComponent {

  profileImage: string = "assets/emptyAvator.png";
  profileEditForm: FormGroup;
  loading$!: Observable<boolean>;

  private fb = inject(FormBuilder);
  private store$ = inject(Store);

  constructor() {
    this.profileEditForm = this.fb.group({
      id: ['', [Validators.required, Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      name: this.fb.group({
        firstname: ['', [Validators.required]],
        lastname: ['', [Validators.required]],
      }),
      address: this.fb.group({
        street: ['', [Validators.required]],
        city: ['', [Validators.required]],
        number: ['', [Validators.required]],
        zipcode: ['', [Validators.required]],
      }),
    });
  }

  ngOnInit() {
    this.store$.select(selectedUser).subscribe((user: any) => {
      if (user.length > 0) {
        this.profileEditForm.patchValue(user[0]);
      }
    })
    this.loading$ = this.store$.select(selectedUserUpdateLoading);
  }

  onSubmit() {
    if (this.profileEditForm.valid) {
      const userId = this.profileEditForm.value.id;
      const user = this.profileEditForm.value;
      this.store$.dispatch(UserActions.updateUser({ userId, user }));
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