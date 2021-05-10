import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedLibsModule } from './shared/shared-libs.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedLibsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
