import { Component } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { TransactionService } from 'src/app/services/transaction.service';


@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.css']
})
export class AddTransactionComponent {

    transaction: any = { accountNumber: '', type: '', amount: 0, date: new Date(), status: '' };
  
    constructor(
      private transactionService: TransactionService,
      private accountService: AccountService
    ) {}
  
    addTransaction() {
      if (!this.transaction.accountNumber || this.transaction.amount <= 0) {
        alert('Invalid transaction details');
        return;
      }
  
      const success = this.transactionService.addTransaction(this.transaction);
      if (success) {
        this.transaction = { accountNumber: '', type: '', amount: 0, date: new Date(), status: '' };
        alert('Transaction added successfully!');
      }
    }
  

}
