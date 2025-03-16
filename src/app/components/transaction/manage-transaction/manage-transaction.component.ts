import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { TransactionService } from 'src/app/services/transaction.service';


@Component({
  selector: 'app-manage-transaction',
  templateUrl: './manage-transaction.component.html',
  styleUrls: ['./manage-transaction.component.css']
})
export class ManageTransactionComponent implements OnInit{
  transactions: any[] = [];
  editingTransaction: any = null;
  newTransaction: any = { accountNumber: '', type: '', amount: 0, date: new Date(), status: ''};

  constructor(private transactionService: TransactionService,
    private accountService: AccountService
  ) {}

  ngOnInit() {
    this.loadTransactions();
  }

  // loadTransactions() {
  //   this.transactions = this.transactionService.getTransactions();
  // }

  loadTransactions() {
    const allTransactions = this.transactionService.getTransactions();
    this.transactions = Array.from(new Set(allTransactions.map(t => JSON.stringify(t)))).map(t => JSON.parse(t));
  }
  

  addTransaction () {

  }

  editTransaction(transaction: any) {
    this.editingTransaction = { ...transaction }; // Create a copy to edit
  }
  




  saveTransaction() {
    if (!this.editingTransaction) return;

    const oldTransaction = this.transactions.find(t => t.id === this.editingTransaction.id);

    if (oldTransaction) {
      // If the transaction status is "Approved," update account balance
      if (this.editingTransaction.status === 'Approved' && oldTransaction.status !== 'Approved') {
        this.accountService.updateAccountBalance(
          this.editingTransaction.accountNumber,
          this.editingTransaction.amount,
          this.editingTransaction.type
        );
      }

      this.transactionService.updateTransaction(this.editingTransaction);
      this.loadTransactions();
      this.editingTransaction = null;
    }
  }

  cancelEdit() {
    this.editingTransaction = null;
  }

  trackById(index: number, transaction: any) {
    return transaction.id;
  }
  
}

