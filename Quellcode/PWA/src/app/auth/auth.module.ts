import { AuthServiceModule } from './../auth-service/auth-service.module';
import { InformationModule } from './../information/information.module';
import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRootComponent } from './components/auth-root/auth-root.component';



@NgModule({
  declarations: [
    AuthRootComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    InformationModule,
    AuthServiceModule
  ],
  exports: [
    AuthRootComponent
  ]
})
export class AuthModule {

}
