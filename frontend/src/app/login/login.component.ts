import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../servies/user.service';
import { MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from '../servies/snackbar.service';
import { GlobalConstants } from '../shared/global-constent';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm:any = FormGroup;
  responseMessage:any
  constructor(private formBuilder : FormBuilder,
    private router : Router,
    private userService : UserService,
    public dialogref : MatDialogRef<LoginComponent>,
    private snackbarService : SnackbarService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email :[null,[Validators.required,Validators.pattern(GlobalConstants.emailRegex)]],
      password : [null,Validators.required]
    })
  }
  handleSubmit(){
    var formdata = this.loginForm.value;
    var data ={
      email : formdata.email,
      password : formdata.password
    }
 
    this.userService.login(data).subscribe((response:any)=>{
      this.dialogref.close();
      localStorage.setItem('token',response.token);
      this.router.navigate(['/cafe/dashboard'])
    },(error)=>{
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }
      else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackbar(this.responseMessage,GlobalConstants.error)
    })
  }

}
