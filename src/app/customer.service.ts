import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { Customer } from './customer';

@Injectable({
  providedIn: 'root'    
})
export class CustomerService {

  private baseURL = "http://localhost:8080/api/v1/customers";

  constructor(private httpClient: HttpClient) {}

  

  getCustomersList(): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>(`${this.baseURL}`).pipe(
      catchError((error: any) => {
        console.error('Error retrieving customers:', error);
       
        return of([]);
      })
    );
  }

  saveCustomer(customerData: any): Observable<any> {
    return this.httpClient.post(`${this.baseURL}`, customerData);
  }
  
  getCustomerById(id:number):Observable<Customer>{
    return this.httpClient.get<Customer>(`${this.baseURL}/${id}`);
  }

  updateCustomer(id:number,customer:Customer):Observable<object>{
    return this.httpClient.put<Customer>(`${this.baseURL}/${id}`,customer);
  }
  
  deleteCustomer(id:number):Observable<object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }

}
