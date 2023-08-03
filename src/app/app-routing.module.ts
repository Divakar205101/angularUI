import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingupFormComponent} from '../app/singup-form/singup-form.component';
import { CustomersListComponent } from './customers-list/customers-list.component';
import { UpdateCustomerComponent } from './update-customer/update-customer.component';

const routes: Routes = [

 
  {path:'customers',component:SingupFormComponent},
  {path:'customers/:id',component:SingupFormComponent},
  {path:'all-customers',component:CustomersListComponent},
  {path:'', redirectTo:'all-customers',pathMatch:'full'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
