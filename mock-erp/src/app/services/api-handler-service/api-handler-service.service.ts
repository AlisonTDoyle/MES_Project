import { Injectable } from '@angular/core';
import { Customer } from '../../interfaces/customer';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiHandlerService {
  apiUrl = "http://localhost:3001/api"

  constructor(private http:HttpClient) { }

  public FetchCustomers(): Observable<Customer[]> {
    return this.http.get<{ data: Customer[] }>(`${this.apiUrl}/customer`)
      .pipe(map(response => response.data));
  }

  public FetchProducts(): Observable<any[]> {
    return this.http.get<{ data: any[] }>(`${this.apiUrl}/product`)
      .pipe(map(response => response.data));
  }
}
