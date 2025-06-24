import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserDetailsModalComponent } from '../../../shared/user-details-modal/user-details-modal.component';
import { CartService } from '../../../services/cart.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule, FormsModule, UserDetailsModalComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  showModal = false;
  selectedItem: any = null;
  isLoading = false;


  searchQuery = '';

constructor(private http: HttpClient, private router: Router, private cartService: CartService) {}
addToCart(item: any) {
  const numericPrice = this.extractNumericPrice(item.price);
  const formattedItem = {
    ...item,
    price: numericPrice,
    quantity: 1,
    category: 'gadgets' // Adjust category as needed
  };
  this.cartService.addToCart(formattedItem);
}
 extractNumericPrice(priceString: string): number {
  // Remove non-numeric characters and convert ₦450M to 450000000
  let cleaned = priceString.replace(/[₦,]/g, '').toUpperCase().trim();
  if (cleaned.endsWith('M')) {
    return Number(cleaned.replace('M', '')) * 1_000_000;
  } else if (cleaned.endsWith('K')) {
    return Number(cleaned.replace('K', '')) * 1_000;
  }
  return Number(cleaned); // fallback
}


gadgets = [
  {
    id: 1,
    name: 'Apple MacBook Pro 14" M2 Pro',
    image: 'assets/macbook.jpeg',
    specifications: 'Apple M2 Pro chip, 10-core CPU, 16-core GPU, 16GB unified memory, 512GB SSD',
    condition: 'Brand New',
    price: '₦3,000,000'
  },
  {
    id: 2,
    name: 'iPhone 16 Pro Max',
    image: 'assets/16promax.jpeg',
    specifications: 'Apple A18 Pro chip, 8GB RAM, 256GB storage, 6.9-inch OLED display',
    condition: 'Sealed open box',
    price: '₦1,800,000'
  },
  {
    id: 3,
    name: 'iPhone 15 Pro Max',
    image: 'assets/15promax.jpeg',
    specifications: 'Apple A17 Pro chip, 8GB RAM, 256GB storage, Titanium frame, 6.7-inch OLED display',
    condition: 'Sealed open box',
    price: '₦1,600,000'
  },
  {
    id: 4,
    name: 'iPhone 14',
    image: 'assets/14.jpeg',
    specifications: 'Apple A15 Bionic chip, 6GB RAM, 256GB storage, 6.1-inch Super Retina XDR display',
    condition: 'Sealed open box',
    price: '₦1,300,000'
  },
  {
    id: 5,
    name: 'iPhone 11',
    image: 'assets/11.jpeg',
    specifications: 'Apple A13 Bionic chip, 4GB RAM, 256GB storage, Dual 12MP cameras',
    condition: 'Sealed open box',
    price: '₦850,000'
  },
  {
    id: 6,
    name: 'iPhone 15 Pro',
    image: 'assets/15pro.jpeg',
    specifications: 'Apple A17 Pro chip, 8GB RAM, 256GB storage, 6.1-inch OLED display, Titanium frame',
    condition: 'Sealed open box',
    price: '₦1,500,000'
  },
  {
    id: 7,
    name: 'AirPods 4 with Active Noise Cancellation',
    image: 'assets/airpods4.jpeg',
    specifications: 'Bluetooth 5.3, Active Noise Cancellation, 6hr listening time, MagSafe charging case',
    condition: 'Brand New',
    price: '₦180,000'
  },
  {
    id: 8,
    name: 'AirPods 4 (No Noise Cancellation)',
    image: 'assets/airpods4.jpeg',
    specifications: 'Bluetooth 5.3, Adaptive EQ, 6hr listening time, Lightning charging case',
    condition: 'Brand New',
    price: '₦120,000'
  }
];

  filteredGadgets() {
    return this.gadgets.filter(gadget =>
      gadget.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

 placeOrder(item: any) {
  this.selectedItem = item;
  this.showModal = true;
}


     handleModalSubmit(userData: { name: string, email: string, nationalId: string }) {
  this.isLoading = true;
  const order = {
    category: 'tech', // adjust per component
    itemName: this.selectedItem.name,
    details: this.selectedItem,
    price: this.selectedItem.price,
    user: userData
  };

  this.http.post('http://localhost:3000/orders', order).subscribe({
    next: () => {
      alert(`Order placed for: ${this.selectedItem.name} Check Spam folder for confirmation`);
      this.showModal = false;
      this.isLoading = false;
    },
    error: err => {
      alert('Failed to place order: ' + err.message);
      this.isLoading = false;
    }
  });
}

handleModalClose() {
  this.showModal = false;
}
}
