import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServicingService } from '../../core/services/servicing.service';
import { LoanAccountRequest, LoanAccountResponse, RepaymentRequest, RepaymentResponse } from '../../core/models/models';

@Component({
  selector: 'app-servicing',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './servicing.html',
  styleUrl: './servicing.css'
})
export class ServicingComponent implements OnInit {
  accounts: LoanAccountResponse[] = [];
  repayments: RepaymentResponse[] = [];
  totalElements = 0; totalPages = 0; currentPage = 0; pageSize = 10;
  loading = false; showAccountModal = false; showRepaymentModal = false;
  saving = false; error = ''; success = '';
  selectedAccountId: number | null = null;

  accountForm: LoanAccountRequest = this.emptyAccount();
  repaymentForm: RepaymentRequest = this.emptyRepayment();
  accountStatuses = ['ACTIVE', 'CLOSED', 'WRITTEN_OFF', 'NPA'];
  repaymentModes = ['ONLINE', 'CHEQUE', 'CASH', 'NEFT', 'RTGS'];

  constructor(private svc: ServicingService) {}
  ngOnInit() { this.load(); }

  load() {
    this.loading = true;
    this.svc.listAccounts(this.currentPage, this.pageSize).subscribe({
      next: r => { this.accounts = r.data?.content ?? []; this.totalElements = r.data?.totalElements ?? 0; this.totalPages = r.data?.totalPages ?? 0; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  openAccountModal() {
    this.accountForm = this.emptyAccount();
    this.showAccountModal = true;
    this.error = '';
  }

  saveAccount() {
    this.saving = true; this.error = '';
    this.svc.createAccount(this.accountForm).subscribe({
      next: () => { this.showAccountModal = false; this.saving = false; this.success = 'Account created!'; this.load(); setTimeout(() => this.success = '', 3000); },
      error: e => { this.error = e.error?.message || 'Failed.'; this.saving = false; }
    });
  }

  updateStatus(id: number, status: string) {
    this.svc.updateAccountStatus(id, status).subscribe({ next: () => this.load(), error: () => {} });
  }

  openRepayment(id: number) {
    this.selectedAccountId = id;
    this.repaymentForm = this.emptyRepayment();
    this.repaymentForm.loanAccountId = id;
    this.showRepaymentModal = true; this.error = '';
  }

  saveRepayment() {
    this.saving = true; this.error = '';
    this.svc.recordRepayment(this.repaymentForm).subscribe({
      next: () => { this.showRepaymentModal = false; this.saving = false; this.success = 'Repayment recorded!'; this.load(); setTimeout(() => this.success = '', 3000); },
      error: e => { this.error = e.error?.message || 'Failed.'; this.saving = false; }
    });
  }

  viewRepayments(id: number) {
    this.selectedAccountId = id;
    this.svc.getRepaymentsByAccount(id).subscribe({ next: r => { this.repayments = r.data ?? []; }, error: () => {} });
  }

  goPage(p: number) { this.currentPage = p; this.load(); }
  get pages() { return Array.from({ length: this.totalPages }, (_, i) => i); }
  getStatusClass(s: string) {
    const m: Record<string, string> = { ACTIVE: 'badge-success', CLOSED: 'badge-secondary', WRITTEN_OFF: 'badge-danger', NPA: 'badge-danger' };
    return m[s] ?? 'badge-secondary';
  }
  getRepaymentClass(s: string) { return s === 'SUCCESS' ? 'badge-success' : s === 'FAILED' ? 'badge-danger' : 'badge-warning'; }

  emptyAccount(): LoanAccountRequest { return { applicationId: 0, disbursementId: 0, outstandingBalance: 0, nextDueDate: '', emiAmount: 0 }; }
  emptyRepayment(): RepaymentRequest { return { loanAccountId: 0, amount: 0, paymentDate: '', mode: 'ONLINE', referenceNumber: '' }; }
}
