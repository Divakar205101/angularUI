import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer';
import { CustomerService } from '../customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss']
})
export class CustomersListComponent implements OnInit {
  [x: string]: any;
 
  customers!: Customer[];

  constructor(private router:Router, private costomerservice : CustomerService){}

  ngOnInit(): void {
  this.getCostumers();
  }

  private getCostumers() {
    this.costomerservice.getCustomersList().subscribe(
      data => {
        console.log('Customers:', data);
        this.customers = data;

        // this.customers.forEach(customer => {
        //   customer.products.forEach((product: { productName: any; price: any; gst: any; amount: any; date: any; formGroup: any; }) => {
        //     const productFormGroup = this['initItemRows']();
        //     productFormGroup.get('productName').setValue(product.productName);
        //     productFormGroup.get('price').setValue(product.price);
        //     productFormGroup.get('gst').setValue(product.gst);
        //     productFormGroup.get('amount').setValue(product.amount);
        //     productFormGroup.get('date').setValue(product.date);
        //     // Assign the form group to the customer for further manipulation if needed
        //     product.formGroup = productFormGroup;
        //   });
        // });
      },
      error => {
        console.error('Error retrieving customers:', error);
        // Handle the error and provide appropriate feedback to the user
      }
    );
  }
  
  updateCustomer(custId:number) {
     this.router.navigate(['customers', custId]);
  }
 
 deleteCustomer(id:number){
   this.costomerservice.deleteCustomer(id).subscribe( data =>{
    console.log(data);
    this.getCostumers();
   }

   )
 }

}
