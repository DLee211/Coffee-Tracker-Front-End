import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; // import this

import { AppComponent } from './app.component';
import { ApiService } from './api.service'; // import your service

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule // add this
  ],
  providers: [ApiService], // add your service here
  bootstrap: [AppComponent]
})
export class AppModule { }
