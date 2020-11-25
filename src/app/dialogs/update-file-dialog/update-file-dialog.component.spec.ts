import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFileDialogComponent } from './update-file-dialog.component';

describe('UpdateFileDialogComponent', () => {
  let component: UpdateFileDialogComponent;
  let fixture: ComponentFixture<UpdateFileDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateFileDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateFileDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
