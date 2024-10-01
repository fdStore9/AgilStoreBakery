import { Routes } from '@angular/router';
import { OrdersComponent } from './components/orders/orders.component';
import { AuthGuard } from './services/auth.guard';
import { StoreComponent } from './components/store/store.component';
import { TodayMenuComponent } from './components/today-menu/today-menu.component';
import { TablesComponent } from './components/tables/tables.component';
import { ListProductComponent } from './components/list-product/list-product.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { LoginRegistrationComponent } from './components/login-registration/login-registration.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginRegistrationComponent,
        canActivate: [],
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
            {
                path: 'userProfile',
                component: UserProfileComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'listProducts',
                component: ListProductComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'tables',
                component: TablesComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'home',
                component: StoreComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'todayMenu',
                component: TodayMenuComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'store',
                component: StoreComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'orders',
                component: OrdersComponent,
                canActivate: [AuthGuard],
            },
        ],
        
    },
    { path: '**', pathMatch: 'full', redirectTo: '' },
];
