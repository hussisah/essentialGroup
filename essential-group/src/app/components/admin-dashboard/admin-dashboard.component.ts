import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit{
  orders: any[] = [];

  constructor(private router: Router, private http: HttpClient) {}

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
      next: (data) => (this.orders = data),
      error: (err) => console.error(err)
    });
  }

  logout() {
    sessionStorage.removeItem('isAdmin');
    this.router.navigate(['/']);
  }
}
