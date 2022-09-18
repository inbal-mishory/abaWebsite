import { TestBed } from '@angular/core/testing';

import { AngularFirestoreService } from './angular-firestore.service';

describe('AngularFirestoreService', () => {
  let service: AngularFirestoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AngularFirestoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
