import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserDetailsModalComponent } from '../../../shared/user-details-modal/user-details-modal.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule,RouterModule, FormsModule,UserDetailsModalComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  showModal = false;
  selectedItem: any = null;
  isLoading = false;


  searchQuery = '';

constructor(private http: HttpClient, private router: Router) {}


 cars = [
  {
    name: '2020 LAMBORGHINI URUS',
    image: 'assets/urus.jpeg',
    specifications: '4.0L V8 twin-turbocharged engine, 650 hp, 8-speed automatic, AWD',
    mileage: '15,000 km',
    condition: 'Used',
    price: '₦450M'
  },
  {
    name: '2015 Range Rover',
    image: 'assets/rangerover.jpg',
    specifications: '5.0L V8 Supercharged engine, 510 hp, 8-speed automatic, 4WD',
    mileage: '22,000 km',
    condition: 'Used',
    price: '₦42M'
  },
  {
    name: '2019 Mercedes-Benz G63 AMG',
    image: 'assets/gwagon.jpg',
    specifications: '4.0L V8 biturbo engine, 577 hp, 9-speed automatic, AWD',
    mileage: '5,000 km',
    condition: 'Used',
    price: '₦320M'
  },
  {
    name: '2022 Camry',
    image: 'assets/camry.jpg',
    specifications: '2.5L 4-cylinder or 3.5L V6, 8-speed automatic, FWD/AWD, Toyota Safety Sense',
    mileage: '5,000 km',
    condition: 'Used',
    price: '₦38M'
  },
  {
    name: '2021 Toyota Highlander',
    image: 'assets/highlander.jpg',
    specifications: '3.5L V6 engine, 295 hp, 8-speed automatic, AWD, 7-seater SUV',
    mileage: '18,000 km',
    condition: 'Used',
    price: '₦41M'
  },
  {
    name: '2023 Tesla Model Y',
    image: 'assets/tesla-modely.jpg',
    specifications: 'Dual Motor AWD, 330-mile range, 0–60 mph in 4.8s, Full Self-Driving option',
    mileage: '2,000 km',
    condition: 'Used',
    price: '₦85M'
  },
  {
    name: '2020 Lexus RX 350',
    image: 'assets/lexusrx350.avif',
    specifications: '3.5L V6 engine, 295 hp, 8-speed automatic, FWD/AWD, Lexus Safety System+',
    mileage: '12,000 km',
    condition: 'Used',
    price: '₦48M'
  },
  {
    name: '2021 BMW X5 xDrive40i',
    image: 'assets/bmwx5.jpg',
    specifications: '3.0L I6 turbocharged engine, 335 hp, 8-speed automatic, AWD',
    mileage: '10,000 km',
    condition: 'Used',
    price: '₦62M'
  },
  {
    name: '2018 Honda Accord Sport',
    image: 'assets/honda-accord.avif',
    specifications: '1.5L turbocharged I4 engine, 192 hp, CVT, FWD',
    mileage: '25,000 km',
    condition: 'Used',
    price: '₦18M'
  }
];

   filteredCars() {
    return this.cars.filter(car =>
      car.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }


  placeOrder(item: any) {
  this.selectedItem = item;
  this.showModal = true;
}

handleModalSubmit(userData: { name: string, email: string, nationalId: string }) {
  this.isLoading = true;
  const order = {
    category: 'motors', // adjust per component
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