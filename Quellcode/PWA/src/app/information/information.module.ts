import { InformationService } from './services/information.service';
import { UserinformationComponent } from './components/userinformation/userinformation.component';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    UserinformationComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    InformationService
  ],
  exports: [
    UserinformationComponent
  ]
})
export class InformationModule {
  /*static forRoot(): ModuleWithProviders {
    return {
      ngModule: InformationModule,
      providers: [ InformationService ]
    };
  }*/
}
