import { Component, EventEmitter, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from 'src/app/servies/category.service';
import { SnackbarService } from 'src/app/servies/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constent';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  onAddCategory = new EventEmitter();
  onEditCategory = new EventEmitter();
  categoryForm :any = FormGroup;
  dialogAction :any = "Add";
  action :any = "Add";
  responseMessage : any;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData :any,
    private formBuilder : FormBuilder,
    private categoryService : CategoryService,
    public dialogRef : MatDialogRef<CategoryComponent>,
    private snackbarService : SnackbarService)
    {}

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      name : [null,[Validators.required]]
    });

      if(this.dialogData.action === 'Edit'){

        this.dialogAction = "Edit",
        this.action = "Update",
        this.categoryForm.patchValue(this.dialogData.data); 
      }
  }
    
  handleSubmit(){
  

    if(this.dialogAction === "Edit"){
      this.edit();
      console.log("yes");
   
    }
    else
    {
      this.add();
      console.log("no");
 
    }
  }
  edit(){
    var formdata = this.categoryForm.value;
    var data ={
      name: formdata.name,
      id :this.dialogData.data.id
   }
   
   
   this.categoryService.update(data).subscribe((respone :any)=>{
    this.dialogRef.close();
    this.onEditCategory.emit();
    this.responseMessage = respone.message;
    this.snackbarService.openSnackbar(this.responseMessage,"success")
   },(error:any)=>{
      this.dialogRef.close();
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }
      else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackbar(this.responseMessage,GlobalConstants.error)
   })

  }
  add(){
   var formdata = this.categoryForm.value;
   var data ={
      name: formdata.name
   }
   this.categoryService.add(data).subscribe((respone :any)=>{
    this.dialogRef.close();
    this.onAddCategory.emit();
    this.responseMessage = respone.message;
    this.snackbarService.openSnackbar(this.responseMessage,"success")
   },(error:any)=>{
      this.dialogRef.close();
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


