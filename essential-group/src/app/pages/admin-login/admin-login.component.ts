import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent {
 password = '';
  correctPassword = 'password'; // 🔐 Replace with your secure admin password

  constructor(private router: Router) {}

  ngOnInit() {
  const isAdmin = sessionStorage.getItem('isAdmin');
  if (isAdmin !== 'true') {
    this.router.navigate(['/admin-login']);
    return;
  }

  this.fetchOrders(); // ⬅ fetch orders only if authenticated
}


  login() {
    if (this.password === this.correctPassword) {
      sessionStorage.setItem('isAdmin', 'true');
      this.router.navigate(['/admin']);
    } else {
      alert('Incorrect password');
    }
  }

  logout() {
    sessionStorage.removeItem('isAdmin');
    this.router.navigate(['/admin-login']);
  }

  fetchOrders() {
    // This method should be implemented to fetch orders from the server
    // For now, it can be left empty or you can add a mock implementation
  }
}
