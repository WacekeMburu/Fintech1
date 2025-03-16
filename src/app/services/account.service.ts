import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private accounts: any[] = JSON.parse(localStorage.getItem('accounts') || '[]');


  constructor() { }

  generateAccountNumber(): string {
    const prefix = 'ACC';
    const newNumber = this.accounts.length + 1; // Incremental logic
    return `${prefix}${(newNumber + 1000).toString()}`; // Ensures unique format (ACC1001, ACC1002, etc.)
  }

  // Get all accounts
  getAccounts() {
    return this.accounts;
  }

  // Get a specific account by accountNumber
  getAccountByNumber(accountNumber: string) {
    return this.accounts.find(acc => acc.accountNumber === accountNumber);
  }

  // Add a new account
  addAccount(account: any) {
    this.accounts.push(account);
    this.saveAccounts();
  }

  // Update account details (like status, account type, or balance)
  updateAccount(updatedAccount: any) {
    const index = this.accounts.findIndex(acc => acc.accountNumber === updatedAccount.accountNumber);
    if (index !== -1) {
      this.accounts[index] = updatedAccount;
      this.saveAccounts();
    }
  }
  

  // Delete an account (only if it has no balance or transactions)
  deleteAccount(accountNumber: string) {
    const account = this.getAccountByNumber(accountNumber);
    if (account && account.balance === 0) {
      this.accounts = this.accounts.filter(acc => acc.accountNumber !== accountNumber);
      this.saveAccounts();
      return true; // Successfully deleted
    }
    return false; // Cannot delete, balance must be zero
  }

   // Save accounts to localStorage
   private saveAccounts() {
    localStorage.setItem('accounts', JSON.stringify(this.accounts));
  }

  

  updateAccountBalance(accountNumber: string, amount: number, type: string) {
    const account = this.getAccountByNumber(accountNumber);
    if (!account) return false;
  
    if (type === 'Deposit') {
      account.balance += amount;
    } else if (type === 'Withdrawal' && account.balance >= amount) {
      account.balance -= amount;
    } else {
      alert('Insufficient funds or invalid transaction.');
      return false;
    }
  
    this.saveAccounts();
    return true;
  }
}
