import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddCustomerComponent } from './components/customer/add-customer/add-customer.component';
import { ManageCustomerComponent } from './components/customer/manage-customer/manage-customer.component';
import { AddAccountComponent } from './components/account/add-account/add-account.component';
import { ManageAccountComponent } from './components/account/manage-account/manage-account.component';
import { AddTransactionComponent } from './components/transaction/add-transaction/add-transaction.component';
import { ManageTransactionComponent } from './components/transaction/manage-transaction/manage-transaction.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AddCustomerComponent,
    ManageCustomerComponent,
    AddAccountComponent,
    ManageAccountComponent,
    AddTransactionComponent,
    ManageTransactionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
