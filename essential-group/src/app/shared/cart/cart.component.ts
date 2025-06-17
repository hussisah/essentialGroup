import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService, CartItem } from '../../services/cart.service';
import { UserDetailsModalComponent } from '../../shared/user-details-modal/user-details-modal.component';
import { OrderService } from '../../services/order.service';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, HttpClientModule, UserDetailsModalComponent, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  cartItems: CartItem[] = [];
  showModal = false;

  constructor(
    private cartService: CartService,
    private orderService: OrderService
  ) {
    this.cartService.cartItems$.subscribe(items => this.cartItems = items);
  }

  removeItem(id: string) {
    this.cartService.removeFromCart(id);
  }

  clearCart() {
    this.cartService.clearCart();
  }

  get total() {
    return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  updateQuantity(index: number, event: Event) {
    const value = +(event.target as HTMLInputElement).value;
    if (value >= 1) {
      this.cartItems[index].quantity = value;
    }
  }

  proceedToCheckout() {
    this.showModal = true;
  }

  onModalSubmit(userData: {
  name: string,
  email: string,
  nationalId: string,
  phoneNumber: string
}) {
  for (const item of this.cartItems) {
     const price = Number(item.price); 
    const order = {
      category: item.category,
      id: item.id,
      itemName: item.name,
      details: item, // Optional: send full item info if needed
      price: price.toFixed(2), // Ensure it's a string
      user: userData
    };

    this.orderService.submitOrder(order).subscribe({
      next: () => {
        console.log('✅ Order submitted:', order);
        this.cartService.clearCart();
        this.showModal = false;
        alert('🎉 Your order has been placed!');
      },
      error: (err) => {
        console.error('❌ Failed to submit order:', err);
        alert('⚠️ Failed to place your order. Please try again.');
      }
    });
  }
}
  onModalClose() {
    this.showModal = false;
  }
  
}
