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
  correctPassword = 'admin123'; // 🔐 Replace with your secure admin password

  constructor(private router: Router) {}

  login() {
    if (this.password === this.correctPassword) {
      sessionStorage.setItem('isAdmin', 'true');
      this.router.navigate(['/admin-dashboard']);
    } else {
      alert('Incorrect password');
    }
  }
}
