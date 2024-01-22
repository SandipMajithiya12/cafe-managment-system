import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/servies/snackbar.service';
import { UserService } from 'src/app/servies/user.service';
import { GlobalConstants } from 'src/app/shared/global-constent';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit{
    changePasswordForm : any = FormGroup;
    responseMessage : any;
    constructor(private formBuilder : FormBuilder,
      private userservice : UserService,
      public dialogref : MatDialogRef<ChangepasswordComponent>,
      private snackbarservice : SnackbarService){

    }
    ngOnInit(): void {
        this.changePasswordForm = this.formBuilder.group({
          oldPassword : [null,[Validators.required]],
          newPassword :[null,[Validators.required]],
          confirmPassword :[null,[Validators.required]],
        })
    }
    validataSubmit(){
      if(this.changePasswordForm.controls['newPassword'].value != this.changePasswordForm.controls['confirmPassword'].value){
        return true;
      }
      else{
        return false;
      }
    }
    handleChangePasswordSubmit(){
      var formdata = this.changePasswordForm.value;
      var data={
        oldPassword :  formdata.oldPassword,
        newPassword : formdata.newPassword,
        confirmPassword : formdata.confirmPassword
      }
      this.userservice.changePassword(data).subscribe((response:any)=>{
        this.responseMessage = response?.message;
        this.dialogref.close();
        this.snackbarservice.openSnackbar(this.responseMessage,"success");

      },(error)=>{
        console.log(error);
        if(error.error?.message){
          this.responseMessage = error.error?.message;
          
        }
        else{
          this.responseMessage = GlobalConstants.genericError;
        }
        this.snackbarservice.openSnackbar(this.responseMessage,GlobalConstants.error);
      })
    }
}
