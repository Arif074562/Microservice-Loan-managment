import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CollectionsService } from '../../core/services/collections.service';
import { DelinquencyRequest, DelinquencyResponse, CollectionActionRequest, CollectionActionResponse } from '../../core/models/models';

@Component({
  selector: 'app-collections',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './collections.html',
  styleUrl: './collections.css'
})
export class CollectionsComponent implements OnInit {
  delinquencies: DelinquencyResponse[] = [];
  actions: CollectionActionResponse[] = [];
  loading = false; showDelModal = false; showActionModal = false;
  saving = false; error = ''; success = '';
  selectedDelId: number | null = null;

  delForm: DelinquencyRequest = this.emptyDel();
  actionForm: CollectionActionRequest = this.emptyAction();
  buckets = ['BUCKET_0', 'BUCKET_1', 'BUCKET_2', 'BUCKET_3', 'BUCKET_4', 'BUCKET_5_PLUS'];
  actionTypes = ['CALL', 'SMS', 'EMAIL', 'FIELD_VISIT', 'LEGAL_NOTICE', 'SETTLEMENT'];

  constructor(private svc: CollectionsService) {}
  ngOnInit() { this.load(); }

  load() {
    this.loading = true;
    this.svc.getAllDelinquencies().subscribe({
      next: r => { this.delinquencies = r.data ?? []; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  openDelModal() {
    this.delForm = this.emptyDel();
    this.showDelModal = true;
    this.error = '';
  }

  saveDel() {
    this.saving = true; this.error = '';
    this.svc.createDelinquency(this.delForm).subscribe({
      next: () => { this.showDelModal = false; this.saving = false; this.success = 'Delinquency record created!'; this.load(); setTimeout(() => this.success = '', 3000); },
      error: e => { this.error = e.error?.message || 'Failed.'; this.saving = false; }
    });
  }

  resolve(id: number) {
    if (!confirm('Resolve this delinquency?')) return;
    this.svc.resolveDelinquency(id).subscribe({ next: () => this.load(), error: () => {} });
  }

  openAction(id: number) {
    this.selectedDelId = id;
    this.actionForm = this.emptyAction();
    this.actionForm.delinquencyId = id;
    this.showActionModal = true; this.error = '';
  }

  saveAction() {
    this.saving = true; this.error = '';
    this.svc.createAction(this.actionForm).subscribe({
      next: () => { this.showActionModal = false; this.saving = false; this.success = 'Action recorded!'; setTimeout(() => this.success = '', 3000); },
      error: e => { this.error = e.error?.message || 'Failed.'; this.saving = false; }
    });
  }

  viewActions(id: number) {
    this.selectedDelId = id;
    this.svc.getActionsByDelinquency(id).subscribe({ next: r => { this.actions = r.data ?? []; }, error: () => {} });
  }

  getBucketClass(b: string) {
    const m: Record<string, string> = { BUCKET_0: 'badge-success', BUCKET_1: 'badge-info', BUCKET_2: 'badge-warning', BUCKET_3: 'badge-warning', BUCKET_4: 'badge-danger', BUCKET_5_PLUS: 'badge-danger' };
    return m[b] ?? 'badge-secondary';
  }
  getStatusClass(s: string) { return s === 'RESOLVED' ? 'badge-success' : s === 'ACTIVE' ? 'badge-danger' : 'badge-warning'; }

  emptyDel(): DelinquencyRequest { return { loanAccountId: 0, daysOverdue: 0, overdueAmount: 0, bucket: 'BUCKET_1' }; }
  emptyAction(): CollectionActionRequest { return { delinquencyId: 0, actionType: 'CALL', notes: '', actionDate: '' }; }
}
