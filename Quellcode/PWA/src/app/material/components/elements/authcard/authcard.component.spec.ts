import { RouterTestingModule } from '@angular/router/testing';
import { TextboxComponent } from './../textbox/textbox.component';
import { RegisterComponent } from './../register/register.component';
import { LoginComponent } from './../login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthCardComponent } from './authcard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AuthCardComponent', () => {
  let component: AuthCardComponent;
  let fixture: ComponentFixture<AuthCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AuthCardComponent,
        LoginComponent,
        RegisterComponent,
        TextboxComponent
      ],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
