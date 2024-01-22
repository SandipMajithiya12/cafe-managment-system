import { AfterViewInit, Component } from '@angular/core';
import { DashboardService } from '../servies/dashbord.service';
import { SnackbarService } from '../servies/snackbar.service';
import { GlobalConstants } from '../shared/global-constent';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {
  responsemessage :any;
  data :any;
  ngAfterViewInit() { }

	constructor(private dashboardservice : DashboardService,
    private snackbarService :SnackbarService,
    ) {
      
      this.dashbordData();
	}
  dashbordData() {
   
    this.dashboardservice.getDetails().subscribe((response:any)=>{
     
      this.data = response;
      
      
    },
    (error:any)=>{
   
      console.log(error)
      if(error.error?.message){
        this.responsemessage = error.error?.message;
      }
      else{
        this.responsemessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackbar(this.responsemessage,GlobalConstants.error);
    })
  }
}

