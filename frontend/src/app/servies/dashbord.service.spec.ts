import { TestBed } from '@angular/core/testing';

import { DashboardService } from './dashbord.service';

describe('DashbordService', () => {
  let service: DashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
