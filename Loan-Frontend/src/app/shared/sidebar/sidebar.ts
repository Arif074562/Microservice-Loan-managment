import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

interface NavItem { label: string; icon: string; route: string; adminOnly?: boolean; }

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class SidebarComponent {
  @Input() collapsed = false;
  @Output() toggleSidebar = new EventEmitter<void>();

  navItems: NavItem[] = [
    { label: 'Dashboard',       icon: 'fa-gauge-high',       route: '/dashboard' },
    { label: 'Customers',       icon: 'fa-users',            route: '/customers' },
    { label: 'Loan Applications', icon: 'fa-file-invoice',  route: '/loan-applications' },
    { label: 'Products',        icon: 'fa-box-open',         route: '/products' },
    { label: 'Underwriting',    icon: 'fa-shield-halved',    route: '/underwriting' },
    { label: 'Disbursement',    icon: 'fa-money-bill-transfer', route: '/disbursement' },
    { label: 'Servicing',       icon: 'fa-rotate',           route: '/servicing' },
    { label: 'Collections',     icon: 'fa-triangle-exclamation', route: '/collections' },
    { label: 'Users',           icon: 'fa-user-gear',        route: '/users', adminOnly: true },
  ];

  constructor(public auth: AuthService, private router: Router) {}

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  get visibleItems() {
    return this.navItems.filter(i => !i.adminOnly || this.auth.isAdmin());
  }
}
