import { OverviewModule } from './../../overview/overview.module';
import { Routes } from '@angular/router';
import { TestBed } from '@angular/core/testing';

import { SmartphoneGuardService } from './smartphone-guard.service';
import { RouterTestingModule } from '@angular/router/testing';
import { OverviewRootComponent } from 'src/app/overview/components/overview-root/overview-root.component';

describe('SmartphoneGuardService', () => {

  const routes: Routes = [
    { path: 'overview', component: OverviewRootComponent}
  ];

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule.withRoutes(routes),
      OverviewModule
    ],
    providers: [
      SmartphoneGuardService
    ]
  }));

  it('should be created', () => {
    const service: SmartphoneGuardService = TestBed.get(SmartphoneGuardService);
    expect(service).toBeTruthy();
  });
});
