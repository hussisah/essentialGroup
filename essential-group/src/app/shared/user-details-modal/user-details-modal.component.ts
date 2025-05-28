import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-details-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './user-details-modal.component.html',
  styleUrl: './user-details-modal.component.scss'
})
export class UserDetailsModalComponent {
  @Input() visible = false;
  @Output() submitted = new EventEmitter<{ name: string, email: string, nationalId: string }>();
  @Output() closed = new EventEmitter<void>();

  name = '';
  email = '';
  nationalId = '';

  submitForm() {
    this.submitted.emit({ name: this.name, email: this.email, nationalId: this.nationalId });
  }

  cancel() {
    this.closed.emit();
  }
}
