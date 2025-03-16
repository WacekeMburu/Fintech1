import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/services/account.service';
import { TransactionService } from 'src/app/services/transaction.service';


@Component({
  selector: 'app-manage-transaction',
  templateUrl: './manage-transaction.component.html',
  styleUrls: ['./manage-transaction.component.css']
})
export class ManageTransactionComponent {
  transaction: any[] = [];
  transactionForm: FormGroup;
  editIndex: number | null = null;
  selectedTransaction: any = null;

updateTransaction() {
  if (this.transactionForm.valid && this.editIndex !== null) {
    this.transaction[this.editIndex] = this.transactionForm.value;
    localStorage.setItem('transaction', JSON.stringify(this.transaction));
    this.editIndex = null;
    this.transactionForm.reset();
  }

}

deleteTransaction(index: number) {
  if (confirm('Are you sure you want to delete this transaction?')) {
    this.transaction.splice(index, 1);
    localStorage.setItem('employee', JSON.stringify(this.transaction));
  }

}

viewTransaction(index: number) {
  // this.router.navigate(['/employee-details', index]);

}


  editingTransaction: any = null;
  newTransaction: any = { accountNumber: '', type: '', amount: 0, date: new Date(), status: ''};


  constructor(private fb: FormBuilder, private transactionService: TransactionService,
    private accountService: AccountService
  ) {
    this.transactionForm = this.fb.group({
      accountNumber: ['', Validators.required],
      type: ['', Validators.required],
      amount: ['', Validators.required],
      date: ['', Validators.required],
      status: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.loadTransactions();
  }

  // loadTransactions() {
  //   this.transactions = this.transactionService.getTransactions();
  // }

  loadTransactions() {
    const allTransactions = this.transactionService.getTransactions();
    this.transaction = Array.from(new Set(allTransactions.map(t => JSON.stringify(t)))).map(t => JSON.parse(t));
  }
  

  // addTransaction () {

  // }

  editTransaction(index: number) {
    // this.editingTransaction = { ...transaction }; // Create a copy to edit
   
      this.editIndex = index;
      this.transactionForm.setValue(this.transaction[index]);
  }
  

  trackById(index: number, transaction: any) {
    return transaction.id;
  }
  
}

