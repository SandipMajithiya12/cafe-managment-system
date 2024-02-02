import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BillService } from 'src/app/servies/bill.service';
import { SnackbarService } from 'src/app/servies/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constent';
import { ViewBillProductsComponent } from '../dialog/view-bill-products/view-bill-products.component';
import {MatPaginator} from '@angular/material/paginator';
import { ConfimationComponent } from '../dialog/confimation/confimation.component';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-view-bill',
  templateUrl: './view-bill.component.html',
  styleUrls: ['./view-bill.component.scss'],

})
export class ViewBillComponent implements OnInit {
  displayedColumns : string[] = ['name','email','contactNumber','paymentMethod','total','view'];
  dataSource :any;
  responseMessage : any;
  constructor(private billService : BillService,
    private dialog : MatDialog,
    private snackbarService : SnackbarService,
    private router : Router,
    ) 
   {}
   

    ngOnInit(): void {
        this.tableData(); 
        
    }
    tableData(){
      this.billService.getBills().subscribe((response :any)=>{
        this.dataSource = new MatTableDataSource(response);
        
      },(error :any)=>{
        console.log(error);
      if(error.error?.message){
        this.responseMessage = error.error?.message
      }
      else{
        this.responseMessage = GlobalConstants.genericError
      }
      this.snackbarService.openSnackbar(this.responseMessage,GlobalConstants.error)
      })
    }
    applyFilter(event : Event){
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase()
    }
    handleViewAction(values :any){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data={
        data:values
      }
      dialogConfig.width = "100%";
      const dialogRef = this.dialog.open(ViewBillProductsComponent,dialogConfig)
      this.router.events.subscribe(()=>{
        dialogRef.close();
      })
    }
    downloadRepotAction(values :any){
      var data ={
        name : values.name,
        email:values.email,
        uuid :values.uuid,
        contactNumber : values.contactNumber,
        paymetMethod : values.paymentMethod,
        totalAmount : values.total,
        productDetail :values.productDetail
      }
      this.billService.getPdf(data).subscribe((response)=>
      {
        saveAs(response ,values.uuid+'.pdf')
      })

    }

    handleDeleteAction(values:any){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data ={
          message : 'delete'+values.name+'bill'
      }
      const dialogref  = this.dialog.open(ConfimationComponent,dialogConfig);
      const sub =dialogref.componentInstance.onEmitStatusChange.subscribe((response)=>{
        this.deleteProduct(values.id);
        dialogref.close()
      })
    }
    deleteProduct(id:any){
      this.billService.delete(id).subscribe((response :any)=>{
        this.tableData();
        this.responseMessage = response?.message;
        this.snackbarService.openSnackbar(this.responseMessage,"Success")
      },(error :any)=>{
        console.log(error);
      if(error.error?.message){
        this.responseMessage = error.error?.message
      }
      else{
        this.responseMessage = GlobalConstants.genericError
      }
      this.snackbarService.openSnackbar(this.responseMessage,GlobalConstants.error)
      })
    }
}

