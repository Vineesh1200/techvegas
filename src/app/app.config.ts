import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { PrefixApiInterceptorInterceptor } from './interceptor/prefix-api-interceptor.interceptor';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { categoriesFeatureKey, categoriesReducer } from './store/reducer/categories.reducer';
import { CategoriesEffects } from './store/effects/categories.effects';
import { productsFeatureKey, productsReducer, productsByCategoryFeatureKey, productsByCategoryReducer, singleProductFeatureKey, singleProductReducer } from './store/reducer/products.reducer';
import { ProductsEffects } from './store/effects/products.effects';
import { cartsFeatureKey, cartsReducer } from './store/reducer/cart.reducer';
import { CartsEffects } from './store/effects/cart.effects';
import { userFeatureKey, userReducer } from './store/reducer/user.reducer';
import { UserEffects } from './store/effects/user.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideClientHydration(),
    provideRouter(routes),
    importProvidersFrom(BrowserModule, BrowserAnimationsModule, FormsModule),
    provideHttpClient(withInterceptors([PrefixApiInterceptorInterceptor])),
    provideHttpClient(withInterceptorsFromDi()),
    provideStore({ [categoriesFeatureKey]: categoriesReducer, [productsFeatureKey]: productsReducer, [productsByCategoryFeatureKey]: productsByCategoryReducer, [cartsFeatureKey]: cartsReducer, [userFeatureKey]: userReducer, [singleProductFeatureKey]: singleProductReducer }),
    provideEffects([CategoriesEffects, ProductsEffects, CartsEffects, UserEffects]),
    provideStoreDevtools(),
  ]
};
