import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component';
import { LoginComponent } from '../login/login.component';
import { UserService } from '../servies/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private dialog : MatDialog,
    private router :Router,
    private userService : UserService) { }

  ngOnInit(): void {
   if(localStorage.getItem('token') != null){
    this.userService.checkToken().subscribe((Response:any)=>{
      this.router.navigate(['/cafe/dashboard'])
    },(error :any)=>{
      console.log(error);
    })
   }

  }
  signupAction(){
    const dialogconfig = new MatDialogConfig();
    dialogconfig.width = "550px";
    this.dialog.open(SignupComponent,dialogconfig)
  }
  loginAction(){
    const dialogconfig = new MatDialogConfig();
    dialogconfig.width = "550px";
    this.dialog.open(LoginComponent,dialogconfig);
  }
}
