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
      this.base64Image = localStorage.getItem('profilePicture') || '';
    }



    // onFileSelected(any: { target: HTMLInputElement; }): void {
    //   const input = any.target as HTMLInputElement;
    
    //   if (input.files && input.files.length > 0) {
    //     const file = input.files[0];
    //     const reader = new FileReader();
    
    //     reader.onload = (e: any) => {
    //       const img = new Image();
    //       img.src = e.target.result;
    
    //       img.onload = () => {
    //         const canvas = document.createElement('canvas');
    //         const ctx = canvas.getContext('2d');
    
    //         // Set new dimensions (resize to 300x300)
    //         const maxWidth = 300;
    //         const maxHeight = 300;
    
    //         canvas.width = maxWidth;
    //         canvas.height = maxHeight;
    
    //         // Draw the image on the canvas
    //         ctx?.drawImage(img, 0, 0, maxWidth, maxHeight);
    
    //         // Convert canvas to Base64
    //         const resizedBase64 = canvas.toDataURL('image/jpeg', 0.7); // 0.7 = 70% quality
    
    //         // Save to localStorage
    //         localStorage.setItem('profilePicture', resizedBase64);
    
    //         console.log('Image resized and saved in localStorage');
    //       };
    //     };
    
    //     reader.readAsDataURL(file);
    //   }
    // }
    
    
  onFileSelected(event: any): void {
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


// onFileSelected(event: any, customerId: string): void {
//   const input = event.target as HTMLInputElement;

//   if (input.files && input.files.length > 0) {
//     const file = input.files[0];
//     const reader = new FileReader();

//     reader.onload = (e: any) => {
//       const img = new Image();
//       img.src = e.target.result;

//       img.onload = () => {
//         const canvas = document.createElement('canvas');
//         const ctx = canvas.getContext('2d');

//         canvas.width = img.width;
//         canvas.height = img.height;

//         ctx?.drawImage(img, 0, 0);

//         const base64Image = canvas.toDataURL('image/jpeg', 0.9);

//         // ✅ Save each customer's image with a unique key
//         localStorage.setItem(`profilePicture_${customerId}`, base64Image);

//         console.log(`Image for customer ${customerId} converted to Base64 and saved`);
//       };
//     };

//     reader.readAsDataURL(file);
//   }
// }

// const customerImage = localStorage.getItem(`profilePicture_${customerId}`);
// if (customerImage) {
//   console.log('Customer Image:', customerImage);
// }
