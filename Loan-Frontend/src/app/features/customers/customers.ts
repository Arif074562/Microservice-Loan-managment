import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomerService } from '../../core/services/customer.service';
import { CustomerRequest, CustomerResponse } from '../../core/models/models';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './customers.html',
  styleUrl: './customers.css'
})
export class CustomersComponent implements OnInit {
  customers: CustomerResponse[] = [];
  totalElements = 0; totalPages = 0; currentPage = 0; pageSize = 10;
  loading = false; showModal = false; editMode = false; saving = false;
  selectedId: number | null = null;
  error = ''; success = '';

  form: CustomerRequest = this.emptyForm();

  constructor(private svc: CustomerService) {}

  ngOnInit() { this.load(); }

  load() {
    this.loading = true;
    this.svc.list(this.currentPage, this.pageSize).subscribe({
      next: r => { this.customers = r.data?.content ?? []; this.totalElements = r.data?.totalElements ?? 0; this.totalPages = r.data?.totalPages ?? 0; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  openCreate() { this.form = this.emptyForm(); this.editMode = false; this.selectedId = null; this.showModal = true; this.error = ''; }

  openEdit(c: CustomerResponse) {
    this.form = { firstName: c.firstName, lastName: c.lastName, email: c.email, phone: c.phone, dateOfBirth: c.dateOfBirth, address: c.address, city: c.city, state: c.state, pinCode: c.pinCode, panNumber: c.panNumber, aadharNumber: c.aadharNumber, segment: c.segment };
    this.editMode = true; this.selectedId = c.id; this.showModal = true; this.error = '';
  }

  save() {
    this.saving = true; this.error = '';
    const obs = this.editMode ? this.svc.update(this.selectedId!, this.form) : this.svc.create(this.form);
    obs.subscribe({
      next: () => { this.showModal = false; this.saving = false; this.success = this.editMode ? 'Customer updated!' : 'Customer created!'; this.load(); setTimeout(() => this.success = '', 3000); },
      error: e => { this.error = e.error?.message || 'Operation failed.'; this.saving = false; }
    });
  }

  updateKyc(id: number, status: string) {
    this.svc.updateKycStatus(id, status).subscribe({ next: () => this.load(), error: () => {} });
  }

  goPage(p: number) { this.currentPage = p; this.load(); }

  getKycClass(s: string) { return s === 'VERIFIED' ? 'badge-success' : s === 'REJECTED' ? 'badge-danger' : 'badge-warning'; }
  getStatusClass(s: string) { return s === 'ACTIVE' ? 'badge-success' : 'badge-danger'; }
  get pages() { return Array.from({ length: this.totalPages }, (_, i) => i); }

  private emptyForm(): CustomerRequest {
    return { firstName: '', lastName: '', email: '', phone: '', dateOfBirth: '', address: '', city: '', state: '', pinCode: '', panNumber: '', aadharNumber: '', segment: 'RETAIL' };
  }
}
