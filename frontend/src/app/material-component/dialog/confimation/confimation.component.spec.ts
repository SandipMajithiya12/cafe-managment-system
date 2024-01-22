import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfimationComponent } from './confimation.component';

describe('ConfimationComponent', () => {
  let component: ConfimationComponent;
  let fixture: ComponentFixture<ConfimationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfimationComponent]
    });
    fixture = TestBed.createComponent(ConfimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
