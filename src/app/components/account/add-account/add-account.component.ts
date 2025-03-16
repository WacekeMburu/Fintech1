import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { CustomerService } from 'src/app/services/customer.service';


@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.css']
})
export class AddAccountComponent {

  customer: any[] = [];

  account = {
    accountNumber: '',
    customerName: 'null',
    accountType: 'Savings',
    balance: 0,
    status: 'Active'
  };

  constructor(private accountService: AccountService, private customerService: CustomerService, private router: Router) {}

  ngOnInit() {
    this.customer = this.customerService.getCustomers(); // Load customers when component initializes
    this.account.accountNumber = this.accountService.generateAccountNumber(); // Auto-generate account number on load

  }

  onSubmit() {
    if (!this.account.accountNumber || !this.account.customerName) {
      alert('Please select a customer and fill all required fields.');
      return;
    }
    this.accountService.addAccount(this.account);
    alert('Account created successfully!');
    this.router.navigate(['/account']); // Redirect to account list page
  }

}
