import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private customer: any[] = JSON.parse(localStorage.getItem('customer') || '[]');

  constructor() { }

  getCustomers() {
    return this.customer;
  }

  // getCustomerById(customerId: string): any | null {
  //   const customers = this.getCustomersFromStorage();
  //   return customers.find(customer => customer.id === customerId) || null;
  // }

  addCustomer(customer: any) {
    this.customer.push(customer);
    localStorage.setItem('customer', JSON.stringify(this.customer));
  }

  updateCustomer(updatedCustomer: any) {
    const index = this.customer.findIndex(c => c.id === updatedCustomer.id);
    if (index !== -1) {
      this.customer[index] = updatedCustomer;
      localStorage.setItem('customer', JSON.stringify(this.customer));
    }
  }

  deleteCustomer(id: number) {
    this.customer = this.customer.filter(c => c.id !== id);
    localStorage.setItem('customer', JSON.stringify(this.customer));
  }
}
