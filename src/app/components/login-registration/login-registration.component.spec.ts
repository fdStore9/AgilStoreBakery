import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRegistrationComponent } from './login-registration.component';

describe('LoginRegistrationComponent', () => {
  let component: LoginRegistrationComponent;
  let fixture: ComponentFixture<LoginRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginRegistrationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
