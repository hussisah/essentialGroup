import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms'
@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {
   password = '';
  isAuthenticated = false;
  private adminPassword = 'essential123'; // Change to secure env var later

  login() {
    this.isAuthenticated = this.password === this.adminPassword;
    if (!this.isAuthenticated) alert('Incorrect password!');
  }
}
