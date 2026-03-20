import { Injectable } from '@angular/core';
import { Customer } from '../../interfaces/customer';
import { OrderItem } from '../../interfaces/order-item';
import { Order } from '../../interfaces/order';
import { HttpClient } from '@angular/common/http';
import { Client, Message } from "paho-mqtt"
import { environment } from '../../../environments/environment.development';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JsonExporterService {

  constructor(private http: HttpClient) { }

  public CreateOrder(customer: Customer | null, orderItems: OrderItem[] | null): any {
    if (customer != null && orderItems != null) {
      // compile order variables into one object
      let order: Order = {
        orderHeader: {
          orderNumber: Math.floor(Math.random() * 100000000),
          // xml cant handle data as its an object to needs to be a string
          orderDate: new Date().toLocaleDateString(),
          customer: customer
        },
        orderItems: {
          item: orderItems
        }
      };

      console.log(order)
      this.SendOrderToServer(order).subscribe()
    }
    else {
      console.error("Check values. Either no customer selected or no products added.");
    }
  }

  private SendOrderToServer(order: Order) {
    return this.http.post(`${environment.API_URL}/mqtt/publish`, order)
    .pipe(tap(() => console.log("submitted")))
  }
}
