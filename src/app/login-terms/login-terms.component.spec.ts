import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginTermsComponent } from './login-terms.component';

describe('LoginTermsComponent', () => {
  let component: LoginTermsComponent;
  let fixture: ComponentFixture<LoginTermsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginTermsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginTermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
