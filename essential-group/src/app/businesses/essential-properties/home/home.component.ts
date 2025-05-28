import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserDetailsModalComponent } from '../../../shared/user-details-modal/user-details-modal.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, HttpClientModule, RouterModule, FormsModule, UserDetailsModalComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  showModal = false;
  selectedItem: any = null;
  isLoading = false;


  searchQuery = '';

constructor(private http: HttpClient, private router: Router) {}

  
 properties = [
  {
    name: 'Luxury Duplex, Banana Island',
    image: 'assets/house1.png',
    specifications: '5 Bed, 6 Bath, Swimming Pool, 6,000 sq.ft',
    location: 'Lagos, Nigeria',
    price: '₦1,200,000,000'
  },
  {
    name: 'Modern Mansion, Maitama',
    image: 'assets/house2.png',
    specifications: '6 Bed, 7 Bath, Garden, 7,500 sq.ft',
    location: 'Abuja, Nigeria',
    price: '₦950,000,000'
  },
  {
    name: 'Executive Bungalow, Lekki Phase 1',
    image: 'assets/house3.png',
    specifications: '4 Bed, 5 Bath, CCTV, 4,000 sq.ft',
    location: 'Lagos, Nigeria',
    price: '₦480,000,000'
  },
  {
    name: 'Detached Duplex, Asokoro',
    image: 'assets/house5.png',
    specifications: '5 Bed, 6 Bath, Private Gym, 5,500 sq.ft',
    location: 'Abuja, Nigeria',
    price: '₦850,000,000'
  },
  {
    name: 'Contemporary Home, Ikoyi',
    image: 'assets/house6.png',
    specifications: '4 Bed, 5 Bath, Rooftop Lounge, 4,800 sq.ft',
    location: 'Lagos, Nigeria',
    price: '₦680,000,000'
  },
  {
    name: 'Stylish Terrace, Gwarinpa',
    image: 'assets/house4.png',
    specifications: '3 Bed, 4 Bath, Modern Kitchen, 3,500 sq.ft',
    location: 'Abuja, Nigeria',
    price: '₦300,000,000'
  }
];

   filteredProperties() {
    return this.properties.filter(property =>
      property.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }


 placeOrder(item: any) {
  this.selectedItem = item;
  this.showModal = true;
}


    handleModalSubmit(userData: { name: string, email: string, nationalId: string }) {
  this.isLoading = true;
  const order = {
    category: 'properties', // adjust per component
    itemName: this.selectedItem.name,
    details: this.selectedItem,
    price: this.selectedItem.price,
    user: userData
  };

  this.http.post('http://localhost:3000/orders', order).subscribe({
    next: () => {
      alert(`Order placed for: ${this.selectedItem.name}`);
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