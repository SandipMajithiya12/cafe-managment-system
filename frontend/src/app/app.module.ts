import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material-module';
import { BestSellerComponent } from './best-seller/best-seller.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { FullComponent } from './layouts/full/full.component';
import { AppHeaderComponent } from './layouts/full/header/header.component';
import { AppSidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TokenInterceptorInterceptor } from './servies/token-interceptor.interceptor';
import { ConfimationComponent } from './material-component/dialog/confimation/confimation.component';
import { ChangepasswordComponent } from './material-component/dialog/changepassword/changepassword.component';
import { ManageCategoryComponent } from './material-component/manage-category/manage-category.component';
import { CategoryComponent } from './material-component/dialog/category/category.component';
import { ManageProductComponent } from './material-component/manage-product/manage-product.component';
import { ProductComponent } from './material-component/dialog/product/product.component';
import { ManageOrderComponent } from './material-component/manage-order/manage-order.component';
import { ViewBillComponent } from './material-component/view-bill/view-bill.component';
import { ViewBillProductsComponent } from './material-component/dialog/view-bill-products/view-bill-products.component';
import { ManageUserComponent } from './material-component/manage-user/manage-user.component';

@NgModule({
  declarations: [	
    AppComponent,
    HomeComponent,
    BestSellerComponent,
    FullComponent,
    AppHeaderComponent,
    AppSidebarComponent,
    SignupComponent,
    LoginComponent,
    ConfimationComponent,
    ChangepasswordComponent,
    ManageCategoryComponent,
    CategoryComponent,
    ManageProductComponent,
    ProductComponent,
    ManageOrderComponent,
    ViewBillComponent,
    ViewBillProductsComponent,
    ManageUserComponent
  ],
   
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    SharedModule,
    HttpClientModule,
  ],

  providers: [HttpClientModule,{provide : HTTP_INTERCEPTORS ,useClass :TokenInterceptorInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
