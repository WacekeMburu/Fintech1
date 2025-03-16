import { Injectable } from '@angular/core';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private transactions: any[] = JSON.parse(localStorage.getItem('transactions') || '[]');


  constructor(private accountService: AccountService) { }

  
  // Get all transactions
  getTransactions() {
    return this.transactions;
  }

  // Get transactions for a specific account
  getTransactionsByAccount(accountNumber: string) {
    return this.transactions.filter(t => t.accountNumber === accountNumber);
  }

  // Add a new transaction
  addTransaction(transaction: any) {
    this.transactions.push(transaction);
    localStorage.setItem('transactions', JSON.stringify(this.transactions));

    // Update the account balance
    this.accountService.updateAccountBalance(transaction.accountNumber, transaction.amount, transaction.type);

    // Check if the account exists
    const account = this.accountService.getAccountByNumber(transaction.accountNumber);
    if (!account) {
      alert('Account not found.');
      return false;
    }

    // Ensure sufficient balance for withdrawals
    if (transaction.type === 'Withdrawal' && account.balance < transaction.amount) {
      alert('Insufficient funds.');
      return false;
    }

    // Process transaction and update account balance
    const success = this.accountService.updateAccountBalance(transaction.accountNumber, transaction.amount, transaction.type);
    if (success) {
      this.transactions.push(transaction);
      this.saveTransactions();
      return true;
    }
    return false;
  }

  
  // Delete a transaction (reverse the balance impact)
  deleteTransaction(id: number) {
    const transaction = this.transactions.find(t => t.id === id);
    if (transaction) {
      // Reverse balance update
      this.accountService.updateAccountBalance(transaction.accountNumber, transaction.amount, 
        transaction.type === 'Deposit' ? 'Withdrawal' : 'Deposit');

      // Remove transaction
      this.transactions = this.transactions.filter(t => t.id !== id);
      this.saveTransactions();
      return true;
    }
    return false;
  }

  // Save transactions to localStorage
  private saveTransactions() {
    localStorage.setItem('transactions', JSON.stringify(this.transactions));
  }

  updateTransaction(updatedTransaction: any) {
    const index = this.transactions.findIndex(t => t.id === updatedTransaction.id);
    if (index !== -1) {
      const oldTransaction = this.transactions[index];
  
      // Reverse old transaction effect if it was approved
      if (oldTransaction.status === 'Approved') {
        this.accountService.updateAccountBalance(
          oldTransaction.accountNumber,
          oldTransaction.amount,
          oldTransaction.type === 'Deposit' ? 'Withdrawal' : 'Deposit'
        );
      }
  
      // Apply new transaction effect if newly approved
      if (updatedTransaction.status === 'Approved') {
        this.accountService.updateAccountBalance(
          updatedTransaction.accountNumber,
          updatedTransaction.amount,
          updatedTransaction.type
        );
      }
  
      this.transactions[index] = updatedTransaction;
      this.saveTransactions();
      return true;
    }
    return false;
  }
}
