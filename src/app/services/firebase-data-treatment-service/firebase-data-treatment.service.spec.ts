import { TestBed } from '@angular/core/testing';

import { FirebaseDataTreatmentService } from './firebase-data-treatment.service';

describe('FirebaseDataTreatmentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FirebaseDataTreatmentService = TestBed.get(FirebaseDataTreatmentService);
    expect(service).toBeTruthy();
  });
});
