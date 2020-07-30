import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { TextboxComponent } from '../textbox/textbox.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let emailInput;
  let passwordInput;
  let submitButton;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoginComponent,
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
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

     //Set Elements
     emailInput = fixture.debugElement.nativeElement.querySelector('#email');
     passwordInput = fixture.debugElement.nativeElement.querySelector('#password');
     submitButton = fixture.debugElement.nativeElement.querySelector('#continue');

    fixture.detectChanges();

    spyOn(component.onSubmit, 'emit');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit on submit-button click', () => {

    //click submit-button
    submitButton.click();

    //Expectation
    expect(component.onSubmit.emit).toHaveBeenCalled();
  });

  it('should output the values on submit', () => {

    //set Form-Values
    component.authform.controls.email.setValue('testmail@test.com');
    component.authform.controls.password.setValue('testpassword');

    //detect changes
    fixture.detectChanges();

    //click submit-button
    submitButton.click();

    //detect changes
    fixture.detectChanges();

    //expectation
    expect(component.onSubmit.emit).toHaveBeenCalledWith(component.authform);
  });


  it('should update Input on Event', () => {

    //set Form-Values
    emailInput.value = 'testmail@test.com';
    emailInput.dispatchEvent(new Event('input'));

    passwordInput.value = 'testpassword';
    passwordInput.dispatchEvent(new Event('input'));


    //detect changes
    fixture.detectChanges();

    //Expectation
    expect(emailInput.value).toEqual('testmail@test.com');
    expect(passwordInput.value).toEqual('testpassword');

  });
});
