import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-singup-form',
  templateUrl: './singup-form.component.html',
  styleUrls: ['./singup-form.component.scss']
})
export class SingupFormComponent implements OnInit {
  public regForm!: FormGroup;  
  isUSASelected: boolean = false;
  totalAmount: number = 0;
  submitted = false;
  constructor(private router:Router,private activateRoute: ActivatedRoute, private fb: FormBuilder, private customerService : CustomerService) { }
  
   

  
  ngOnInit() {
    this.regForm =this.fb.group({
      id:[''],
       firstName:['',[Validators.required]],
       lastName:['',[Validators.required]],
       email:['',[Validators.required,Validators.email]],
       password:['',[Validators.required]],
       cpassword:['',[Validators.required]],
       country:['',[Validators.required]],
       products: this.fb.array([this.initItemRows()])
    });
   
    const id = this.activateRoute.snapshot.params['id'];

    if (id === undefined) {
      console.table(this.regForm.value);
     // this.saveCustomer();
      alert('Form open');
    } else {
      this.customerService.getCustomerById(id).subscribe(data => {
     console.log(data);
    
    const productsFormArray = this.regForm.get('products') as FormArray;
    productsFormArray.clear();
  
    const productsLength = data.products.length;
    for (let i = 0; i < productsLength; i++) {
      productsFormArray.push(this.initItemRows());
    }
        this.regForm.patchValue({
          id:data.id,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
          country: data.country,
          products:data.products,
          
        });
        
        // this.customerService.updateCustomer(id, this.regForm.value).subscribe((_data: any) => {
          
        // });
      }, error => {
        console.log(error);
      });
    }
  }

  get registerFormControl() {
    return this.regForm.controls;
  }

  get formArr(){
    return this.regForm.get('products') as FormArray;
  }

  initItemRows(){
    return this.fb.group({
      id:[''],
      productName:[''],
      price:[''],
      gst:[''],
      amount:[''],
      date:['']
    });
  }

 
 
  addBank() {
   this.formArr.push(this.initItemRows());
  }

  removeBank(index: number) {
    this.formArr.removeAt(index);
  }

  
  pageRedirect(){
    this.router.navigate(['customer']);
  }

  countries: any[] = [
    { countryId: 'USA', country: 'USA' },
    { countryId: 'CAN', country: 'Canada' },
    { countryId: 'UK', country: 'UK' },
    { countryId: 'IND', country: 'INDIA' },
    { countryId: 'GER', country: 'Germany' }
  ];
  
  selectedCountry!: string;

  onCountrySelection(event: any) {
    let selectedValue = (event.target as HTMLSelectElement).value;
    console.log('Selected Country:', selectedValue);
    // Perform further actions with the selected value
    if (selectedValue === 'IND') {
      document.body.style.backgroundColor = '#F0F8FF';
    } else {
      document.body.style.backgroundColor = 'silver';
    }
  }
 
  
  
  calculateAmount(rowIndex: number) {
  
    const row = this.formArr.at(rowIndex);
  if (row) {
    const price = row.get('price')?.value;
    const  gst = row.get('gst')?.value;
    console.log(price); 
    console.log(gst);

    if (price && gst) {
      const amount = price * gst;
      row.patchValue({ amount: amount });
    }
  }
  }
  
  getTotalAmount(): number {
    let total = 0;
    for (let i = 0; i < this.formArr.length; i++) {
      const row = this.formArr.at(i);
      const amount = row.get('amount')?.value;
      if (amount) {
        total += amount;
      }
    }
    return total;
  }


  
  onSubmit() {
    this.submitted = true;
     const id = this.activateRoute.snapshot.params['id'];
     if(this.regForm.valid){
      this.saveCustomer();
      this.goToCustomersList();
     }
    // if (id==undefined) {
    //   console.table(this.regForm.value);
    //   this.saveCustomer();
    //   alert('Form Submitted succesfully!!!\n Check the values in browser console.');
    //   this.goToCustomersList();
    // }else{
    //   this.customerService.updateCustomer(id, this.regForm.value).subscribe((_data: any) => {
          
    //      });
    //      this.goToCustomersList();
    // }
    
  }
  
  saveCustomer() {
    this.customerService.saveCustomer(this.regForm.value).subscribe(data => {
      console.log(data);
      this.goToCustomersList();
    }, error => console.log(error));
  }
  
  goToCustomersList() {
    this.router.navigate(['/all-customers']);
  }
  
  

}

