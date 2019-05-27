import { TestBed, async, inject } from '@angular/core/testing';

import { ToDoGuardGuard } from './to-do-guard.guard';

describe('ToDoGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToDoGuardGuard]
    });
  });

  it('should ...', inject([ToDoGuardGuard], (guard: ToDoGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
