import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAccountComponent } from './components/account/add-account/add-account.component';
import { ManageAccountComponent } from './components/account/manage-account/manage-account.component';
import { AddCustomerComponent } from './components/customer/add-customer/add-customer.component';
import { ManageCustomerComponent } from './components/customer/manage-customer/manage-customer.component';
import { AddTransactionComponent } from './components/transaction/add-transaction/add-transaction.component';
import { ManageTransactionComponent } from './components/transaction/manage-transaction/manage-transaction.component';

const routes: Routes = [
  {path: 'add-account', component: AddAccountComponent},
  {path: 'manage-account', component: ManageAccountComponent},
  {path: 'add-customer', component: AddCustomerComponent},
  {path: 'manage-customer', component: ManageCustomerComponent},
  {path: 'add-transaction', component: AddTransactionComponent},
  {path: 'manage-transaction', component: ManageTransactionComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
