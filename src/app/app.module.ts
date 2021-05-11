import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedLibsModule } from './shared/shared-libs.module';
import { AppComponent } from './app.component';
import { VendingMachineModule } from './modules/vending-machine/vending-machine.module';
import { HttpClientModule } from '@angular/common/http';
import { AutomatonModule } from './modules/automaton/automaton.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedLibsModule,
    HttpClientModule,
    VendingMachineModule,
    AutomatonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
