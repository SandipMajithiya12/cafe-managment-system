import { BooleanInput } from '@angular/cdk/coercion';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, AfterViewInit } from '@angular/core';


/** @title Responsive sidenav */
@Component({
  selector: 'app-full-layout',
  templateUrl: 'full.component.html',
  styleUrls: ['./full.component.scss']
})
export class FullComponent implements  AfterViewInit {
 opened = true;
 mobileQuery: MediaQueryList;

 private _mobileQueryListener: () => void;

 constructor(
   changeDetectorRef: ChangeDetectorRef,
   media: MediaMatcher
 ) {
   this.mobileQuery = media.matchMedia('(min-width: 768px)');
   this._mobileQueryListener = () => changeDetectorRef.detectChanges();
   this.mobileQuery.addListener(this._mobileQueryListener);
 }

 ngOnDestroy(): void {
   this.mobileQuery.removeListener(this._mobileQueryListener);
 }
  ngAfterViewInit() { }
}
