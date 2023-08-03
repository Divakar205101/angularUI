import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../customer.service';
import { Customer } from '../customer';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.scss']
})
export class UpdateCustomerComponent implements OnInit {

  public regForm!: FormGroup;  
  isUSASelected: boolean = false;
  totalAmount: number = 0;
  submitted = false;
  formBuilder: any;
  constructor(private router:Router, private fb: FormBuilder, private customerService : CustomerService,private acroute:ActivatedRoute) { }
  id!:number;
  customer : Customer = new Customer() ;

  
  ngOnInit() {
    this.regForm =this.fb.group({
       firstName:['',[Validators.required]],
       LastName:['',[Validators.required]],
       email:['',[Validators.required,Validators.email]],
       country:['',[Validators.required]],
       password:['',[Validators.required]],
       cpassword:['',[Validators.required]],
       itemRows: this.fb.array([this.initItemRows()])
    });
    this.id=this.acroute.snapshot.params['id'];
    this.customerService.getCustomerById(this.id).subscribe(data =>{
      this.regForm.patchValue({
        firstName: data.firstName,
        LastName: data.lastName,
        email: data.email,
        password: data.password,
        country: data.country,
        // Assign the 'products' data array to the form array 'itemRows'
         //itemRows: this.formBuilder.array(data.products.map((product: any) => this.createProductFormGroup(product))),
      });
    },
    (error) => {
      console.log(error);
    }
    
    );
  }
  createProductFormGroup(product: any) {
    return this.fb.group({
      productname:[''],
      price:[''],
      gst:[''],
      amount:[''],
      date:['']
    });
  }

  get registerFormControl() {
    return this.regForm.controls;
  }

  get formArr(){
    return this.regForm.get('itemRows') as FormArray;
  }

  initItemRows(){
    return this.fb.group({
      productname:[''],
      price:[''],
      gst:[''],
      amount:[''],
      date:['']
    });
  }

  submit() {
    console.log(this.regForm.value);
  }
 
  addBank() {
   this.formArr.push(this.initItemRows());
  }

  removeBank(index: number) {
    this.formArr.removeAt(index);
  }

  show(){
    console.log(this.regForm.valid)
  }

  goToPage(pageName:String):void{
    this.router.navigate([`${pageName}`]);
  }
  pageRedirect(){
    this.router.navigate(['customer']);
  }

  countries: any[] = [
    { countryId: 'USA', countryName: 'USA' },
    { countryId: 'CAN', countryName: 'Canada' },
    { countryId: 'UK', countryName: 'UK' },
    { countryId: 'IND', countryName: 'INDIA' },
    { countryId: 'GER', countryName: 'Germany' }
  ];
  
  selectedCountry!: string;

  onCountrySelection(event: any) {
    let selectedValue = (event.target as HTMLSelectElement).value;
    console.log('Selected Country:', selectedValue);
    // Perform further actions with the selected value
    if (selectedValue === 'IND') {
      document.body.style.backgroundColor = 'blue';
    } else {
      document.body.style.backgroundColor = 'silver';
    }
  }
 
  
  
  calculateAmount(rowIndex: number) {
  
    const row = this.formArr.at(rowIndex);
  if (row) {
    const price = row.get('price')?.value;
    const  gst = row.get('gst')?.value;
    console.log(price); // Use the price value as needed
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
    if (this.regForm.valid) {
      console.table(this.regForm.value);
      this.customerService.updateCustomer(this.id, this.regForm.value).subscribe(data =>{
        alert('Form Submitted succesfully!!!\n Check the values in browser console.');
      },
      error=>console.log(error));
      
    }
  }

  goToCustomersList(){
    this.router.navigate(['/all-customers']);
  }


}
