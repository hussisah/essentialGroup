import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartItem } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:3000/orders';

  constructor(private http: HttpClient) {}

  submitOrder(order: {
    category: string;
    itemName: string;
    price: string;
    user: {
      name: string;
      email: string;
      nationalId: string;
      phoneNumber: string;
    };
  }) {
    return this.http.post(this.apiUrl, order);
  }
}
