import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SnackbarService } from 'src/app/servies/snackbar.service';
import { UserService } from 'src/app/servies/user.service';
import { GlobalConstants } from 'src/app/shared/global-constent';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit {
    displayedColumns :string[]=['name','email','contactNumber','status'];
    dataSource :any;
    responseMessage :any

  constructor(private snackbarSerive : SnackbarService,
    private userService : UserService){}
  ngOnInit(): void {
    this.tableData();
  }
  tableData(){
    this.userService.getUsers().subscribe((response :any)=>{
      this.dataSource = new MatTableDataSource(response);
    },(error)=>{
      console.log(error);
      if(error.error?.message){
        this.responseMessage = error.error?.message
      }
      else{
        this.responseMessage = GlobalConstants.genericError
      }
      this.snackbarSerive.openSnackbar(this.responseMessage,GlobalConstants.error)
    })
  }
  applyFilter(event : Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    
   }
   handleChangeAction(status:any,id:any){
    var data={
      status : status.toString(),
      id :id
    }
    this.userService.update(data).subscribe((respose :any)=>{
      this.responseMessage = respose?.message;
      this.snackbarSerive.openSnackbar(this.responseMessage,"success")
    },(error)=>{
      console.log(error);
      if(error.error?.message){
        this.responseMessage = error.error?.message
      }
      else{
        this.responseMessage = GlobalConstants.genericError
      }
      this.snackbarSerive.openSnackbar(this.responseMessage,GlobalConstants.error)
    })
   }
}
