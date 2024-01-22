import { Routes } from '@angular/router';
import { ManageCategoryComponent } from './manage-category/manage-category.component';
import { RouteGurdService } from '../servies/route-gurd.service';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { ManageOrderComponent } from './manage-order/manage-order.component';
import { ViewBillComponent } from './view-bill/view-bill.component';
import { ManageUserComponent } from './manage-user/manage-user.component';


export const MaterialRoutes: Routes = [
{
    path : 'category',
    component : ManageCategoryComponent,
    canActivate : [RouteGurdService],
    data :{
        expectedRole : ['admin']
    }
},
{
    path : 'product',
    component : ManageProductComponent,
    canActivate : [RouteGurdService],
    data :{
        expectedRole : ['admin']
    }
},
{
    path : 'order',
    component : ManageOrderComponent,
    canActivate : [RouteGurdService],
    data :{
        expectedRole : ['admin','user']
    }
},
{
    path : 'bill',
    component : ViewBillComponent ,
    canActivate : [RouteGurdService],
    data :{
        expectedRole : ['admin','user']
    }
},
{
    path : 'user',
    component : ManageUserComponent ,
    canActivate : [RouteGurdService],
    data :{
        expectedRole : ['admin']
    }
}


];