import {BrowserModule} from '@angular/platform-browser';
import {NgModule, Injector} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {DashboardComponentComponent} from './dashboard-component/dashboard-component.component';
import { ButtonComponent } from './button/button.component';
import { FieldComponent } from './field/field.component';
import { createCustomElement } from '@angular/elements';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponentComponent,
    ButtonComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  entryComponents: [ButtonComponent],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {
}