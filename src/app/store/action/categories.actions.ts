import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const CategoriesActions = createActionGroup({
  source: 'Categories',
  events: {
    'Get Categories': emptyProps(),
    'Get Categories Success': props<{ categories: string[] }>(),
    'Failed Categories Api': props<{ errorMessage: string }>(),
  }
});