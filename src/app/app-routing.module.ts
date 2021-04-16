import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './pages/details/details.component';
import { GroupDetailsComponent } from './pages/group-details/group-details.component';

const routes: Routes = [
  { path: 'details', component: DetailsComponent, data: { title: 'Détails' } },
  { path: 'group-details', component: GroupDetailsComponent, data: { title: 'Détails et modification simultanées' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
