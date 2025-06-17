import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: 'motors' | 'tech' | 'property';
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
getItems(): CartItem[] {
  return this.cartItems;
}

  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  get cartItems(): CartItem[] {
    return this.cartItemsSubject.value;
  }

  addToCart(item: CartItem) {
    const items = [...this.cartItems];
    const index = items.findIndex(i => i.id === item.id);
    if (index > -1) {
      items[index].quantity += item.quantity;
    } else {
      items.push(item);
    }
    this.cartItemsSubject.next(items);
  }

  removeFromCart(id: string) {
    const updated = this.cartItems.filter(item => item.id !== id);
    this.cartItemsSubject.next(updated);
  }

  clearCart() {
    this.cartItemsSubject.next([]);
  }
}
