import { Component } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-manage-account',
  templateUrl: './manage-account.component.html',
  styleUrls: ['./manage-account.component.css']
})
export class ManageAccountComponent {
  account: any[] = [];
  editingAccount: any;
  editableAccount: any;

  constructor(private accountService: AccountService, private customerService: CustomerService) {
  }
  ngOnInit() {
    this.loadAccounts();
  }

 loadAccounts() {
  this.account = this.accountService.getAccounts();
 }

 toggleEdit(account: any) {
  if (this.editingAccount === account.accountNumber) {
    // Save changes
    this.saveEdit(account);
  } else {
    // Enter edit mode
    this.editingAccount = account.accountNumber;
    this.editableAccount = { ...account }; // Copy account details
  }
}

saveEdit(account: any) {
  account.accountType = this.editableAccount.accountType;
  account.status = this.editableAccount.status;
  this.accountService.updateAccount(account);
  this.editingAccount = null;
}

cancelEdit() {
  this.editingAccount = null;
}
  // getCustomerName(customerId: number) {
  //   const customer = this.customerService.getCustomers().find(c => c.id === customerId);
  //   return customer ? customer.fullName : 'Unknown';
  // }
  deleteAccount(accountNumber: string) {
    this.accountService.deleteAccount(accountNumber);
    this.loadAccounts();
  }

}
