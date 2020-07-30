import { InformationModule } from './../information/information.module';
import { HostConnectiontService } from './services/host-connection.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InformationModule
  ],
  providers: [
    HostConnectiontService
  ]
})
export class ConnectionModule { }
