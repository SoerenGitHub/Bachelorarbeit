import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormGroup, FormControl, FormsModule } from '@angular/forms';
import { TextboxComponent } from './../textbox/textbox.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  let emailInput;
  let passwordInput;
  let repasswordInput;
  let nameInput;
  let forenameInput;
  let submitButton;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
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
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    component.ngOnInit();

    fixture.detectChanges();

    //Set Elements
    emailInput = fixture.debugElement.nativeElement.querySelector('#email');
    passwordInput = fixture.debugElement.nativeElement.querySelector('#password');
    repasswordInput = fixture.debugElement.nativeElement.querySelector('#repassword');
    forenameInput = fixture.debugElement.nativeElement.querySelector('#forename');
    nameInput = fixture.debugElement.nativeElement.querySelector('#name');
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
    component.authform.controls.repassword.setValue('testrepassword');
    component.authform.controls.forename.setValue('testforename');
    component.authform.controls.name.setValue('testname');

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

    repasswordInput.value = 'testrepassword';
    repasswordInput.dispatchEvent(new Event('input'));

    forenameInput.value = 'testforename';
    forenameInput.dispatchEvent(new Event('input'));

    nameInput.value = 'testname';
    nameInput.dispatchEvent(new Event('input'));

    //detect changes
    fixture.detectChanges();

    //Expectation
    expect(emailInput.value).toEqual('testmail@test.com');
    expect(passwordInput.value).toEqual('testpassword');
    expect(repasswordInput.value).toEqual('testrepassword');
    expect(forenameInput.value).toEqual('testforename');
    expect(nameInput.value).toEqual('testname');

  });
});
