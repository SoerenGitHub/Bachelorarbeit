import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserinformationComponent } from './userinformation.component';
import { InformationService } from '../../services/information.service';

describe('UserinformationComponent', () => {
  let component: UserinformationComponent;
  let fixture: ComponentFixture<UserinformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserinformationComponent ],
      providers: [
        InformationService
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserinformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
