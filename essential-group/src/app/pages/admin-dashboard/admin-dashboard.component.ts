import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, FontAwesomeModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  faTrash = faTrash; // Icon for delete button
  orders: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    const isAdmin = sessionStorage.getItem('isAdmin');
    if (isAdmin !== 'true') {
      this.router.navigate(['/admin-login']);
      return;
    }

    this.fetchOrders();
  }

  fetchOrders() {
  this.http.get<any[]>('http://localhost:3000/orders').subscribe({
    next: (data) => {
      this.orders = (data || []).filter(order =>
        order && order.itemName && order.user && order.user.email
      );
    },
    error: (err) => console.error('❌ Error fetching orders:', err)
  });
}



deleteOrder(orderId: string) {
  if (!confirm('Are you sure you want to delete this order?')) return;

  this.http.delete(`http://localhost:3000/orders/${orderId}`).subscribe({
    next: () => {
      setTimeout(() => this.fetchOrders(), 100); // slight delay
      alert('✅ Order deleted successfully');
    },
    error: (err) => console.error('❌ Error deleting order:', err)
  });
}


  logout() {
    sessionStorage.removeItem('isAdmin');
    this.router.navigate(['/admin-login']);
  }
}
