import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-details-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-details-modal.component.html',
  styleUrls: ['./user-details-modal.component.scss']
})
export class UserDetailsModalComponent {
  @Input() visible = false;
  @Output() submitted = new EventEmitter<{ name: string, email: string, nationalId: string, phoneNumber: string }>();
  @Output() closed = new EventEmitter<void>();

  name = '';
  email = '';
  nationalId = '';
  phoneNumber = '';

  submitForm() {
    this.submitted.emit({ name: this.name, email: this.email, nationalId: this.nationalId, phoneNumber: this.phoneNumber });
  }

  cancel() {
    this.closed.emit();
  }
}
