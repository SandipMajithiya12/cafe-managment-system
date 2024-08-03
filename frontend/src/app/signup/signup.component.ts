import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../servies/user.service';
import { SnackbarService } from '../servies/snackbar.service';
import { MatDialogRef } from '@angular/material/dialog';
import { GlobalConstants } from '../shared/global-constent';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm:any = FormGroup;
  responseMessage:any;
  ngxService: any;
  showPassword: boolean = false;

  constructor(private formBuilder : FormBuilder,
    private router : Router,
    private userService : UserService,
    private snackbarService : SnackbarService,
    private dialogRef : MatDialogRef<SignupComponent>,
    ) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name :[null,[Validators.required,Validators.pattern(GlobalConstants.nameRegex)]],
      email :[null,[Validators.required,Validators.pattern(GlobalConstants.emailRegex)]],
      contactNumber :[null,[Validators.required,Validators.pattern(GlobalConstants.contactNumberRegex)]],
      password :[null,Validators.required]
      
    })
  }
  handleSubmit(){
    
    var formdata = this.signupForm.value;
    var data ={
      name : formdata.name,
      email : formdata.email,
      contactNumber : formdata.contactNumber,
      password : formdata.password


    }
    this.userService.singnup(data).subscribe((response :any)=>{

      this.dialogRef.close();
      this.responseMessage = response?.message;
      this.snackbarService.openSnackbar(this.responseMessage,"");
      this.router.navigate(['/']);

    },(error)=>{
  
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }
      else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackbar(this.responseMessage,GlobalConstants.error);
    })
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
