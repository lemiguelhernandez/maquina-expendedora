import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {OverlayPanelModule} from 'primeng/overlaypanel';

@NgModule({
  exports: [
    BrowserModule,
    BrowserAnimationsModule,
    OverlayPanelModule
  ]
})
export class SharedLibsModule { }
