import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UnderwritingService } from '../../core/services/underwriting.service';
import { UnderwritingDecisionRequest, UnderwritingDecisionResponse, CreditScoreRequest, CreditScoreResponse } from '../../core/models/models';

@Component({
  selector: 'app-underwriting',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './underwriting.html',
  styleUrl: './underwriting.css'
})
export class UnderwritingComponent implements OnInit {
  decisions: UnderwritingDecisionResponse[] = [];
  creditScores: CreditScoreResponse[] = [];
  activeTab = 'decisions';
  showDecisionModal = false; showScoreModal = false;
  saving = false; error = ''; success = '';
  searchAppId = '';

  decisionForm: UnderwritingDecisionRequest = this.emptyDecision();
  scoreForm: CreditScoreRequest = this.emptyScore();

  decisionTypes = ['APPROVED', 'REJECTED', 'CONDITIONAL_APPROVAL', 'REFERRED'];

  constructor(private svc: UnderwritingService) {}
  ngOnInit() {}

  searchDecisions() {
    if (!this.searchAppId) return;
    this.svc.getDecisionsByApplication(+this.searchAppId).subscribe({
      next: r => { this.decisions = r.data ?? []; },
      error: () => { this.decisions = []; }
    });
  }

  searchScores() {
    if (!this.searchAppId) return;
    this.svc.getCreditScoreByCustomer(+this.searchAppId).subscribe({
      next: r => { this.creditScores = r.data ?? []; },
      error: () => { this.creditScores = []; }
    });
  }

  saveDecision() {
    this.saving = true; this.error = '';
    this.svc.recordDecision(this.decisionForm).subscribe({
      next: () => { this.showDecisionModal = false; this.saving = false; this.success = 'Decision recorded!'; setTimeout(() => this.success = '', 3000); },
      error: e => { this.error = e.error?.message || 'Failed.'; this.saving = false; }
    });
  }

  saveScore() {
    this.saving = true; this.error = '';
    this.svc.createCreditScore(this.scoreForm).subscribe({
      next: () => { this.showScoreModal = false; this.saving = false; this.success = 'Credit score saved!'; setTimeout(() => this.success = '', 3000); },
      error: e => { this.error = e.error?.message || 'Failed.'; this.saving = false; }
    });
  }

  getDecisionClass(t: string) {
    const m: Record<string, string> = { APPROVED: 'badge-success', REJECTED: 'badge-danger', CONDITIONAL_APPROVAL: 'badge-warning', REFERRED: 'badge-info' };
    return m[t] ?? 'badge-secondary';
  }

  emptyDecision(): UnderwritingDecisionRequest {
    return { applicationId: 0, decisionType: 'APPROVED', remarks: '', approvedAmount: 0, approvedTenure: 0, approvedRate: 0 };
  }
  emptyScore(): CreditScoreRequest {
    return { customerId: 0, score: 0, bureau: '', reportDate: '' };
  }
}
