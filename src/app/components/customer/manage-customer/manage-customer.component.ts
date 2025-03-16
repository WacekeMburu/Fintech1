import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';


@Component({
  selector: 'app-manage-customer',
  templateUrl: './manage-customer.component.html',
  styleUrls: ['./manage-customer.component.css']
})
export class ManageCustomerComponent {

  customer: any [] = [];
  customerForm: FormGroup;
  editIndex: number | null = null;
  base64Image: string = '';
  // selectedCustomer: any = null;
  // showDetailsModal: boolean = false;
  viewedCustomer : any = null;
  

 

constructor(private fb: FormBuilder, private router: Router) {
  // , private customerService.CustomerService
  this.customerForm = this.fb.group({
    fullName: ['', Validators.required],
    email: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    // tenure: ['', [Validators.required, Validators.min(1)]],
    // loanType: ['', Validators.required],
    registrationDate: ['', Validators.required],
    customerType: ['', Validators.required],
    profilePicture: ['']
  }
  );
}

ngOnInit() {
  // const storedEmployees = localStorage.getItem('employees');
  // this.employees = storedEmployees ? JSON.parse(storedEmployees) : [];
  this.loadCustomer();
  this.base64Image = localStorage.getItem('profilePicture') || ''; //load from storage
}

loadCustomer() {
  const storedData = localStorage.getItem('customer');
  console.log('Stored Customer:', storedData); // Debugging line

  this.customer = storedData ? JSON.parse(storedData) : [];
  console.log('Loaded Customer:', this.customer); 
  // this.customer =JSON.parse(localStorage.getItem('employees') || '[]');
// //   const storedEmployees = localStorage.getItem('Employees');
// //   this.employees = storedEmployees ? JSON.parse(storeds) : [];
 }


viewCustomer(index: number) {
  this.viewCustomer = this.customer[index];


  
}

  // View customer details
  // viewCustomer(customerId: string) {
  //   this.selectedCustomer = this.customerService.getCustomerById(customerId);
  //   this.showDetailsModal = true;
  // }

  // // Close the details view
  // closeModal() {
  //   this.showDetailsModal = false;
  //   this.selectedCustomer = null;
  // }

onFileSelected(event: any): void {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      this.customerForm.patchValue ({profilePicture: reader.result as string}); // Store it in form
    };
    reader.readAsDataURL(file);
  }
}

  editCustomer(index: number) {
    this.editIndex = index;
    this.customerForm.setValue(this.customer[index]);
    
  }

  updateCustomer() {
    if (this.customerForm.valid && this.editIndex !== null) {
      this.customer[this.editIndex] = this.customerForm.value;
      localStorage.setItem('customer', JSON.stringify(this.customer));
      this.editIndex = null;
      this.customerForm.reset();
    }
  }

  deleteCustomer(index: number) {
    if (confirm('Are you sure you want to delete this customer?')) {
      this.customer.splice(index, 1);
      localStorage.setItem('employee', JSON.stringify(this.customer));
    }
  }


}
