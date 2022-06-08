import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTurnsComponent } from './view-turns.component';

describe('ViewTurnsComponent', () => {
  let component: ViewTurnsComponent;
  let fixture: ComponentFixture<ViewTurnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTurnsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTurnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
