import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingFilesSharedComponent } from './pending-files-shared.component';

describe('PendingFilesSharedComponent', () => {
  let component: PendingFilesSharedComponent;
  let fixture: ComponentFixture<PendingFilesSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingFilesSharedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingFilesSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
