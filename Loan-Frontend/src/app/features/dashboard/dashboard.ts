import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CustomerService } from '../../core/services/customer.service';
import { LoanApplicationService } from '../../core/services/loan-application.service';
import { ProductService } from '../../core/services/product.service';
import { ServicingService } from '../../core/services/servicing.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {
  stats = { customers: 0, applications: 0, products: 0, accounts: 0 };
  recentApplications: any[] = [];
  loading = true;

  quickLinks = [
    { label: 'New Customer',     icon: 'fa-user-plus',        route: '/customers',          color: '#6366f1' },
    { label: 'Apply for Loan',   icon: 'fa-file-invoice',     route: '/loan-applications',  color: '#0ea5e9' },
    { label: 'Manage Products',  icon: 'fa-box-open',         route: '/products',           color: '#10b981' },
    { label: 'View Collections', icon: 'fa-triangle-exclamation', route: '/collections',    color: '#f59e0b' },
  ];

  constructor(
    private customerSvc: CustomerService,
    private loanAppSvc: LoanApplicationService,
    private productSvc: ProductService,
    private servicingSvc: ServicingService,
    public auth: AuthService
  ) {}

  ngOnInit() {
    this.customerSvc.list(0, 1).subscribe({ next: r => this.stats.customers = r.data?.totalElements ?? 0, error: () => {} });
    this.loanAppSvc.list(0, 5).subscribe({
      next: r => {
        this.stats.applications = r.data?.totalElements ?? 0;
        this.recentApplications = r.data?.content ?? [];
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
    this.productSvc.list(0, 1).subscribe({ next: r => this.stats.products = r.data?.totalElements ?? 0, error: () => {} });
    this.servicingSvc.listAccounts(0, 1).subscribe({ next: r => this.stats.accounts = r.data?.totalElements ?? 0, error: () => {} });
  }

  getStatusClass(status: string): string {
    const map: Record<string, string> = {
      APPROVED: 'badge-success', REJECTED: 'badge-danger',
      PENDING: 'badge-warning', UNDER_REVIEW: 'badge-info', DISBURSED: 'badge-secondary'
    };
    return map[status] ?? 'badge-secondary';
  }
}
