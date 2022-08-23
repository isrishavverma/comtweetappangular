import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikeDialogComponentComponent } from './like-dialog-component.component';

describe('LikeDialogComponentComponent', () => {
  let component: LikeDialogComponentComponent;
  let fixture: ComponentFixture<LikeDialogComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LikeDialogComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LikeDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
