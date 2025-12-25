import { Routes } from '@angular/router';
import { OffersComponent } from './pages/offers/offers.component';
import { HistoyComponent } from './pages/histoy/histoy.component';
import { StaffsComponent } from './pages/staffs/staffs.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AvailabilityComponent } from './pages/availability/availability.component';

export const routes: Routes = [
    {path:'',component:DashboardComponent},
    {path:'offers',component:OffersComponent},
    {path:'history',component:HistoyComponent},
    {path:'staffs',component:StaffsComponent},
    {path:'dashboard',component:DashboardComponent},
    {path:'availability',component:AvailabilityComponent}
];