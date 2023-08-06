import { TestBed } from '@angular/core/testing';

import { GoogleReviewService } from './google-review.service';

describe('GoogleReviewService', () => {
  let service: GoogleReviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogleReviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
