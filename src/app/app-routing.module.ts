import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JwtGuard } from './guard/jwt.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DetailsComponent } from './pages/details/details.component';
import { GroupDetailsComponent } from './pages/group-details/group-details.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent, 
    data: { title: 'Dashboard' },
  },

  { 
    path: 'details', 
    component: DetailsComponent, 
    data: { title: 'Détails' },
    canActivate: [
      JwtGuard
    ],
  },
 
  { 
    path: 'group-details', 
    component: GroupDetailsComponent, 
    data: { title: 'Détails et modification simultanées' },
    canActivate: [
      JwtGuard
    ],
  },

  { 
    path: 'dashboard', 
    component: DashboardComponent, 
    data: { title: 'Dashboard' },
    canActivate: [
      JwtGuard
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
