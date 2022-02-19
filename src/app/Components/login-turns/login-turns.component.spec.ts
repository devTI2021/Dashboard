import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginTurnsComponent } from './login-turns.component';

describe('LoginTurnsComponent', () => {
  let component: LoginTurnsComponent;
  let fixture: ComponentFixture<LoginTurnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginTurnsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginTurnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
