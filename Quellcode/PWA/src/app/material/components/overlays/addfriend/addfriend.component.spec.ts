import { NewUserComponent } from './../../templates/new-user/new-user.component';
import { OverlayComponent } from './../overlay/overlay.component';
import { TextboxComponent } from './../../elements/textbox/textbox.component';
import { ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddfriendComponent } from './addfriend.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AddfriendComponent', () => {
  let component: AddfriendComponent;
  let fixture: ComponentFixture<AddfriendComponent>;

  let nameInput;
  let forenameInput;
  let submitButton;
  let mockUser;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AddfriendComponent,
        TextboxComponent,
        OverlayComponent,
        NewUserComponent
       ],
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddfriendComponent);
    component = fixture.componentInstance;
    component.ngOnInit();

    fixture.detectChanges();

    spyOn(component.onSearch, 'emit');
    spyOn(component.onAddNewFriend, 'emit');
    spyOn(component.isVisibleCallback, 'next');

    fixture.detectChanges();

    //show overlay
    component.isVisible = true;
    fixture.detectChanges();

    //get elements
    forenameInput = fixture.debugElement.nativeElement.querySelector('#forename');
    nameInput = fixture.debugElement.nativeElement.querySelector('#name');
    submitButton = fixture.debugElement.nativeElement.querySelector('#continue');

    //create a mock-user
    mockUser = {
      id: 'testid',
      name: 'testname',
      forename: 'testforename'
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not be visible after close', () => {
    //hide overlay
    component.close();

    //detect changes
    fixture.detectChanges();

    //Expectation
    expect(component.isVisibleCallback.next).toHaveBeenCalledWith(false);
  });

  it('should show overlay-components', () => {

    //Expectation
    expect(forenameInput).toBeDefined();
    expect(nameInput).toBeDefined();
    expect(submitButton).toBeDefined();
  });

  it('should emit on submit-button click', () => {

    //click submit-button
    submitButton.click();

    //Expectation
    expect(component.onSearch.emit).toHaveBeenCalled();
  });

  it('should output the values on submit', () => {

    //set Form-Values
    component.searchform.controls.forename.setValue('testforename');
    component.searchform.controls.name.setValue('testname');

    //detect changes
    fixture.detectChanges();

    //click submit-button
    submitButton.click();

    //detect changes
    fixture.detectChanges();

    //expectation
    expect(component.onSearch.emit).toHaveBeenCalledWith(component.searchform);
  });


  it('should update Input on Event', () => {

    //set Form-Values

    forenameInput.value = 'testforename';
    forenameInput.dispatchEvent(new Event('input'));

    nameInput.value = 'testname';
    nameInput.dispatchEvent(new Event('input'));

    //detect changes
    fixture.detectChanges();

    //Expectation
    expect(forenameInput.value).toEqual('testforename');
    expect(nameInput.value).toEqual('testname');

  });

  it('should show users to add', () => {

    //set mock-user
    component.userInfos = [
      mockUser
    ];

    //detect changes
    fixture.detectChanges();

    //get users
    const user = fixture.debugElement.nativeElement.querySelector('.newuser:first-child');

    //Expectation
    expect(user).toBeDefined();
  });

  it('should add user', () => {

    //set mock-user
    component.userInfos = [
      mockUser
    ];

    //detect changes
    fixture.detectChanges();

    //get users add-button
    const addbtn = fixture.debugElement.nativeElement.querySelector('.newuser:first-child .add');

    //click add-button
    addbtn.click();

    //Expectation
    expect(component.onAddNewFriend.emit).toHaveBeenCalledWith(mockUser);

  });
});
