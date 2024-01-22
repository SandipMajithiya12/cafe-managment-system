import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ChangepasswordComponent } from 'src/app/material-component/dialog/changepassword/changepassword.component';
import { ConfimationComponent } from 'src/app/material-component/dialog/confimation/confimation.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class AppHeaderComponent {
  role: any;
  constructor(private router: Router,
    private dialog: MatDialog) {

  }
  logOut(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data={
      message : "Logout"
    }
    const dialogref = this.dialog.open(ConfimationComponent,dialogConfig);
    const sub = dialogref.componentInstance.onEmitStatusChange.subscribe((user)=>{
      dialogref.close();
      localStorage.clear();
      this.router.navigate(['/']);
    })
  }
  changePassword(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "550px";
    this.dialog.open(ChangepasswordComponent,dialogConfig);

  }

}
