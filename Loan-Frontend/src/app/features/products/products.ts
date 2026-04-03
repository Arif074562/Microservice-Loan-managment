import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../core/services/product.service';
import { LoanProductRequest, LoanProductResponse } from '../../core/models/models';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class ProductsComponent implements OnInit {
  products: LoanProductResponse[] = [];
  totalElements = 0; totalPages = 0; currentPage = 0; pageSize = 10;
  loading = false; showModal = false; editMode = false; saving = false;
  selectedId: number | null = null;
  error = ''; success = '';
  form: LoanProductRequest = this.emptyForm();

  constructor(private svc: ProductService) {}
  ngOnInit() { this.load(); }

  load() {
    this.loading = true;
    this.svc.list(this.currentPage, this.pageSize).subscribe({
      next: r => { this.products = r.data?.content ?? []; this.totalElements = r.data?.totalElements ?? 0; this.totalPages = r.data?.totalPages ?? 0; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  openCreate() { this.form = this.emptyForm(); this.editMode = false; this.selectedId = null; this.showModal = true; this.error = ''; }

  openEdit(p: LoanProductResponse) {
    this.form = { productName: p.productName, productCode: p.productCode, minAmount: p.minAmount, maxAmount: p.maxAmount, minTenureMonths: p.minTenureMonths, maxTenureMonths: p.maxTenureMonths, interestRate: p.interestRate, processingFeePercent: p.processingFeePercent, description: p.description };
    this.editMode = true; this.selectedId = p.id; this.showModal = true; this.error = '';
  }

  save() {
    this.saving = true; this.error = '';
    const obs = this.editMode ? this.svc.update(this.selectedId!, this.form) : this.svc.create(this.form);
    obs.subscribe({
      next: () => { this.showModal = false; this.saving = false; this.success = 'Product saved!'; this.load(); setTimeout(() => this.success = '', 3000); },
      error: e => { this.error = e.error?.message || 'Operation failed.'; this.saving = false; }
    });
  }

  deactivate(id: number) {
    if (!confirm('Deactivate this product?')) return;
    this.svc.deactivate(id).subscribe({ next: () => this.load(), error: () => {} });
  }

  goPage(p: number) { this.currentPage = p; this.load(); }
  get pages() { return Array.from({ length: this.totalPages }, (_, i) => i); }
  getStatusClass(s: string) { return s === 'ACTIVE' ? 'badge-success' : 'badge-danger'; }

  private emptyForm(): LoanProductRequest {
    return { productName: '', productCode: '', minAmount: 0, maxAmount: 0, minTenureMonths: 6, maxTenureMonths: 60, interestRate: 0, processingFeePercent: 0, description: '' };
  }
}
