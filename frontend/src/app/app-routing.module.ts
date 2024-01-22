import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FullComponent } from './layouts/full/full.component';
import { RouteGurdService } from './servies/route-gurd.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'cafe',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/cafe/dashboard',
        pathMatch: 'full',
      },
      {
        path: '',
        loadChildren:
          () => import('./material-component/material.modul').then(m => m.MaterialComponentsModule),
          canActivate:[RouteGurdService],
          data:{
            expectedRole : ['admin','user']
          
            }   
       },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.modul').then(m => m.DashboardModule),
        canActivate:[RouteGurdService],
        
        data:{
          expectedRole : ['admin','user']
        }
      }
    ]
  },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
