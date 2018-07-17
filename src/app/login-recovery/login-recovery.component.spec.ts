import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRecoveryComponent } from './login-recovery.component';

describe('LoginRecoveryComponent', () => {
  let component: LoginRecoveryComponent;
  let fixture: ComponentFixture<LoginRecoveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginRecoveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginRecoveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
