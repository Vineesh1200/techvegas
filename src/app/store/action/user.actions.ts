import { createActionGroup, props } from '@ngrx/store';

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    'Get User': props<{ userId: number }>(),
    'Get User Success': props<{ user: any }>(),
    'Failed User Api': props<{ errorMessage: string }>(),
  }
});