import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent {

    customerForm: FormGroup;
    base64Image: string = '';
    customer: any[] = [];
  
    constructor(private fb: FormBuilder) {
      this.customerForm = this.fb.group({
        fullName: ['', Validators.required],
        email: ['', Validators.required],
        phoneNumber: ['', Validators.required],
        registrationDate: ['', Validators.required],
        customerType: ['', Validators.required],
        profilePicture: ['', Validators.required]
      });
  
      // Load existing employees from sessionStorage on component initialization
      // this.loadEmployees();
    }

    ngOnInit(): void {
      //this.base64Image = localStorage.getItem('profilePicture') || '';
    }

    
    onFileSelected(event: Event): void {
      const input = event.target as HTMLInputElement;
      
      if (input.files && input.files.length > 0) {
        const file = input.files[0];
        const reader = new FileReader();
    
        reader.onload = () => {
          this.base64Image = reader.result as string; // Convert to Base64 string
          localStorage.setItem('profilePicture', this.base64Image); // Store in localStorage
          
        };
    
        reader.readAsDataURL(file); // Read file as Base64
      
      }
    }
    
    // Retrieve stored image when component initializes


    onSubmit () {
      if (this.customerForm.valid) {
        const customerData = this.customerForm.value;
        let customer = JSON.parse(localStorage.getItem('customer') || '[]');

        customer.push(customerData);
        localStorage.setItem('customer', JSON.stringify(customer));
        console.log('Customer Data Saved:', customerData);
        alert('Customer successfully added and saved to local storage!');
        this.customerForm.reset();
      }
    }

}
