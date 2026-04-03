import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoanApplicationService } from '../../core/services/loan-application.service';
import { LoanApplicationRequest, LoanApplicationResponse } from '../../core/models/models';

@Component({
  selector: 'app-loan-applications',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './loan-applications.html',
  styleUrl: './loan-applications.css'
})
export class LoanApplicationsComponent implements OnInit {
  applications: LoanApplicationResponse[] = [];
  totalElements = 0; totalPages = 0; currentPage = 0; pageSize = 10;
  loading = false; showModal = false; editMode = false; saving = false;
  selectedId: number | null = null;
  error = ''; success = '';

  form: LoanApplicationRequest = this.emptyForm();
  statuses = ['PENDING', 'UNDER_REVIEW', 'APPROVED', 'REJECTED', 'DISBURSED'];

  constructor(private svc: LoanApplicationService) {}
  ngOnInit() { this.load(); }

  load() {
    this.loading = true;
    this.svc.list(this.currentPage, this.pageSize).subscribe({
      next: r => { this.applications = r.data?.content ?? []; this.totalElements = r.data?.totalElements ?? 0; this.totalPages = r.data?.totalPages ?? 0; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  openCreate() { this.form = this.emptyForm(); this.editMode = false; this.selectedId = null; this.showModal = true; this.error = ''; }

  openEdit(a: LoanApplicationResponse) {
    this.form = { customerId: a.customerId, productId: a.productId, requestedAmount: a.requestedAmount, tenureMonths: a.tenureMonths, purpose: a.purpose, monthlyIncome: a.monthlyIncome };
    this.editMode = true; this.selectedId = a.id; this.showModal = true; this.error = '';
  }

  save() {
    this.saving = true; this.error = '';
    const obs = this.editMode ? this.svc.update(this.selectedId!, this.form) : this.svc.submit(this.form);
    obs.subscribe({
      next: () => { this.showModal = false; this.saving = false; this.success = 'Application saved!'; this.load(); setTimeout(() => this.success = '', 3000); },
      error: e => { this.error = e.error?.message || 'Operation failed.'; this.saving = false; }
    });
  }

  updateStatus(id: number, status: string) {
    this.svc.updateStatus(id, status).subscribe({ next: () => this.load(), error: () => {} });
  }

  goPage(p: number) { this.currentPage = p; this.load(); }
  get pages() { return Array.from({ length: this.totalPages }, (_, i) => i); }

  getStatusClass(s: string) {
    const m: Record<string, string> = { APPROVED: 'badge-success', REJECTED: 'badge-danger', PENDING: 'badge-warning', UNDER_REVIEW: 'badge-info', DISBURSED: 'badge-secondary' };
    return m[s] ?? 'badge-secondary';
  }

  private emptyForm(): LoanApplicationRequest {
    return { customerId: 0, productId: 0, requestedAmount: 0, tenureMonths: 12, purpose: '', monthlyIncome: 0 };
  }
}
