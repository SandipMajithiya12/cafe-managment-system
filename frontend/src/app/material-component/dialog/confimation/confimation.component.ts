import { Component, EventEmitter, Inject, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confimation',
  templateUrl: './confimation.component.html',
  styleUrls: ['./confimation.component.scss']
})
export class ConfimationComponent implements OnInit{
  onEmitStatusChange = new EventEmitter();
  detaiils :any =  {};
  details: any;
  constructor(@Inject(MAT_DIALOG_DATA) public dialofgdata :any ){}
  
  ngOnInit(): void {
      if(this.dialofgdata){
        this.details = this.dialofgdata
      }
  }
  handleChangeAction(){
    this.onEmitStatusChange.emit();
  }
}
