import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedLibsModule } from './shared/shared-libs.module';
import { AppComponent } from './app.component';
import { VendingMachineModule } from './modules/vending-machine/vending-machine.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedLibsModule,
    HttpClientModule,
    VendingMachineModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
