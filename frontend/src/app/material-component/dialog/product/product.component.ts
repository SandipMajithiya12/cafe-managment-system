import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/servies/snackbar.service';
import { ProductService } from 'src/app/servies/product.service';
import { GlobalConstants } from 'src/app/shared/global-constent';
import { CategoryService } from 'src/app/servies/category.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  onAddProduct = new EventEmitter();
  onEditProduct = new EventEmitter();
  productForm :any = FormGroup;
  dialogAction :any = "Add";
  action :any = "Add";
  responseMessage : any;
  category :any;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData :any,
    private formBuilder : FormBuilder,
    private productService : ProductService,
    public dialogRef : MatDialogRef<ProductComponent>,
    private snackbarService : SnackbarService,
    private categoryService : CategoryService)
    {}
ngOnInit(){
    this.productForm = this.formBuilder.group({
      name : [null,[Validators.required,Validators.pattern(GlobalConstants.nameRegex)]],
      categoryId : [null,Validators.required],
      price : [null,Validators.required],
      description : [null,Validators.required]
    })
    if(this.dialogData.action === 'Edit'){
      this.dialogAction = 'Edit',
      this.action = 'Update'
      this.productForm.patchValue(this.dialogData.data);
    }
    this.getCategorys();
}
getCategorys(){
  this.categoryService.getCategorys().subscribe((respone :any)=>{
    this.category = respone;
  },(error)=>{
    if(error.error?.message){
      this.responseMessage = error.error?.message
    }
    else{
      this.responseMessage = GlobalConstants.genericError
    }
    this.snackbarService.openSnackbar(this.responseMessage,GlobalConstants.error);
  })

}
handleSubmit(){
  if(this.dialogAction === "Edit"){
    this.edit();
  }
  else
  {
    this.add();
  }
}
edit(){
  var formData = this.productForm.value;
  var data = {
    id : this.dialogData.data.id,
    name : formData.name,
    categoryId : formData.categoryId,
    price : formData.price,
    description : formData.description
  }
 
  this.productService.update(data).subscribe((respones : any)=>{
    this.dialogRef.close();
    this.onEditProduct.emit();
    this.responseMessage = respones.message;
    this.snackbarService.openSnackbar(this.responseMessage,"success")
  },(error)=>{
    if(error.error?.message){
      this.responseMessage = error.error?.message
    }
    else{
      this.responseMessage = GlobalConstants.genericError
    }
    this.snackbarService.openSnackbar(this.responseMessage,GlobalConstants.error);
  })
}


add(){
  var formData = this.productForm.value;
  var data = {
    name : formData.name,
    categoryId : formData.categoryId,
    price : formData.price,
    description : formData.description
  }
  this.productService.add(data).subscribe((respones : any)=>{
    this.dialogRef.close();
    this.onAddProduct.emit();
    this.responseMessage = respones.message;
    this.snackbarService.openSnackbar(this.responseMessage,"success")
  },(error)=>{
    if(error.error?.message){
      this.responseMessage = error.error?.message
    }
    else{
      this.responseMessage = GlobalConstants.genericError
    }
    this.snackbarService.openSnackbar(this.responseMessage,GlobalConstants.error);
  })
}
}
