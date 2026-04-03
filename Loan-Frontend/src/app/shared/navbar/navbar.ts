import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent {
  @Input() sidebarCollapsed = false;
  @Output() toggleSidebar = new EventEmitter<void>();

  pageTitle = 'Dashboard';

  private routeTitles: Record<string, string> = {
    '/dashboard': 'Dashboard',
    '/customers': 'Customers',
    '/loan-applications': 'Loan Applications',
    '/products': 'Loan Products',
    '/underwriting': 'Underwriting',
    '/disbursement': 'Disbursement',
    '/servicing': 'Loan Servicing',
    '/collections': 'Collections',
    '/users': 'User Management',
  };

  constructor(public auth: AuthService, private router: Router) {
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe((e: any) => {
      const base = '/' + e.urlAfterRedirects.split('/')[1];
      this.pageTitle = this.routeTitles[base] ?? 'LoanSys360';
    });
  }
}
