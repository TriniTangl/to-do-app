import { TestBed, async, inject } from '@angular/core/testing';

import { ToDoGuard } from './to-do.guard';

describe('ToDoGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToDoGuard]
    });
  });

  it('should ...', inject([ToDoGuard], (guard: ToDoGuard) => {
    expect(guard).toBeTruthy();
  }));
});
