import { TestBed } from '@angular/core/testing';

import { AutomatonService } from './automaton.service';

describe('AutomatonService', () => {
  let service: AutomatonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutomatonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
