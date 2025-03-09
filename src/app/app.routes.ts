import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '',
        pathMatch: 'full'
    },
    {
        path: '',
        loadComponent: () => import('./views/views.component').then(m => m.ViewsComponent),
        children: [
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full'
            },
            {
                path: 'home',
                loadComponent: () => import('./views/home/home.component').then(m => m.HomeComponent)
            },
            {
                path: 'cart',
                loadComponent: () => import('./views/cart/cart.component').then(m => m.CartComponent)
            },
            {
                path: 'product-detail/:id',
                loadComponent: () => import('./views/product-detail/product-detail.component').then(m => m.ProductDetailComponent)
            },
            {
                path: 'profile',
                loadComponent: () => import('./views/profile/profile.component').then(m => m.ProfileComponent)
            },
        ]
    },
    {
        path: '**',
        loadComponent: () => import('./views/not-found/not-found.component').then(m => m.NotFoundComponent)
    }
];
