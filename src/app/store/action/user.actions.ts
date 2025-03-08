import { createActionGroup, props } from '@ngrx/store';
import { ProfileInterface, UpdateUserInterface } from '../../interfaces/profile-interface';
import { Update } from '@ngrx/entity';

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    'Get User': props<{ userId: number }>(),
    'Get User Success': props<{ user: any }>(),
    'Update User': props<{ userId: number, user: UpdateUserInterface }>(),
    'Update User Success': props<{ user: Update<ProfileInterface> }>(),
    'Failed User Api': props<{ errorMessage: string }>(),
  }
});