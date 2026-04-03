import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DisbursementService } from '../../core/services/disbursement.service';
import { DisbursementRequest, DisbursementResponse, RepaymentScheduleResponse } from '../../core/models/models';

@Component({
  selector: 'app-disbursement',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './disbursement.html',
  styleUrl: './disbursement.css'
})
export class DisbursementComponent {
  disbursement: DisbursementResponse | null = null;
  schedule: RepaymentScheduleResponse[] = [];
  searchAppId = '';
  showCreateModal = false; showScheduleModal = false;
  saving = false; error = ''; success = '';
  scheduleStartDate = '';

  statuses = ['PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'REVERSED'];

  form: DisbursementRequest = this.emptyForm();

  constructor(private svc: DisbursementService) {}

  search() {
    if (!this.searchAppId) return;
    this.svc.getByApplicationId(+this.searchAppId).subscribe({
      next: r => { this.disbursement = r.data; this.schedule = []; },
      error: () => { this.disbursement = null; }
    });
  }

  create() {
    this.saving = true; this.error = '';
    this.svc.create(this.form).subscribe({
      next: r => { this.disbursement = r.data; this.showCreateModal = false; this.saving = false; this.success = 'Disbursement created!'; setTimeout(() => this.success = '', 3000); },
      error: e => { this.error = e.error?.message || 'Failed.'; this.saving = false; }
    });
  }

  updateStatus(status: string) {
    if (!this.disbursement) return;
    this.svc.updateStatus(this.disbursement.id, status).subscribe({
      next: r => { this.disbursement = r.data; this.success = 'Status updated!'; setTimeout(() => this.success = '', 3000); },
      error: () => {}
    });
  }

  generateSchedule() {
    if (!this.disbursement || !this.scheduleStartDate) return;
    this.saving = true;
    this.svc.generateSchedule(this.disbursement.id, { startDate: this.scheduleStartDate }).subscribe({
      next: r => { this.schedule = r.data ?? []; this.showScheduleModal = false; this.saving = false; this.success = 'Schedule generated!'; setTimeout(() => this.success = '', 3000); },
      error: e => { this.error = e.error?.message || 'Failed.'; this.saving = false; }
    });
  }

  openCreate() {
    this.form = this.emptyForm();
    this.showCreateModal = true;
    this.error = '';
  }

  getStatusClass(s: string) {
    const m: Record<string, string> = { COMPLETED: 'badge-success', FAILED: 'badge-danger', PENDING: 'badge-warning', PROCESSING: 'badge-info', REVERSED: 'badge-secondary' };
    return m[s] ?? 'badge-secondary';
  }
  getInstallmentClass(s: string) { return s === 'PAID' ? 'badge-success' : s === 'OVERDUE' ? 'badge-danger' : 'badge-warning'; }

  emptyForm(): DisbursementRequest {
    return { applicationId: 0, amount: 0, accountNumber: '', ifscCode: '', bankName: '', disbursementDate: '' };
  }
}
