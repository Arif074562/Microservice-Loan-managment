export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

// Auth  — matches backend UserRequestDTO / LoginRequestDTO exactly
export interface LoginRequest { email: string; password: string; }
export interface LoginResponse { token: string; userId: number; name: string; role: string; expiresIn: number; }
export interface UserRequest { name: string; email: string; password: string; role: string; phone?: string; }
export interface UserResponse { userId: number; name: string; email: string; role: string; phone: string; isActive: boolean; createdAt: string; }

// Customer
export interface CustomerRequest {
  firstName: string; lastName: string; email: string; phone: string;
  dateOfBirth: string; address: string; city: string; state: string;
  pinCode: string; panNumber: string; aadharNumber: string; segment: string;
}
export interface CustomerResponse {
  id: number; firstName: string; lastName: string; email: string; phone: string;
  dateOfBirth: string; address: string; city: string; state: string;
  pinCode: string; panNumber: string; aadharNumber: string;
  segment: string; status: string; kycStatus: string; createdAt: string;
}

// Loan Application
export interface LoanApplicationRequest {
  customerId: number; productId: number; requestedAmount: number;
  tenureMonths: number; purpose: string; monthlyIncome: number;
}
export interface LoanApplicationResponse {
  id: number; customerId: number; productId: number; requestedAmount: number;
  tenureMonths: number; purpose: string; monthlyIncome: number;
  status: string; createdAt: string;
}

// Product
export interface LoanProductRequest {
  productName: string; productCode: string; minAmount: number; maxAmount: number;
  minTenureMonths: number; maxTenureMonths: number; interestRate: number;
  processingFeePercent: number; description: string;
}
export interface LoanProductResponse {
  id: number; productName: string; productCode: string; minAmount: number;
  maxAmount: number; minTenureMonths: number; maxTenureMonths: number;
  interestRate: number; processingFeePercent: number; description: string;
  status: string; createdAt: string;
}

// Underwriting
export interface UnderwritingDecisionRequest {
  applicationId: number; decisionType: string; remarks: string;
  approvedAmount: number; approvedTenure: number; approvedRate: number;
}
export interface UnderwritingDecisionResponse {
  id: number; applicationId: number; decisionType: string; remarks: string;
  approvedAmount: number; approvedTenure: number; approvedRate: number; decidedAt: string;
}
export interface CreditScoreRequest { customerId: number; score: number; bureau: string; reportDate: string; }
export interface CreditScoreResponse { id: number; customerId: number; score: number; bureau: string; reportDate: string; createdAt: string; }

// Disbursement
export interface DisbursementRequest {
  applicationId: number; amount: number; accountNumber: string;
  ifscCode: string; bankName: string; disbursementDate: string;
}
export interface DisbursementResponse {
  id: number; applicationId: number; amount: number; accountNumber: string;
  ifscCode: string; bankName: string; disbursementDate: string; status: string; createdAt: string;
}
export interface RepaymentScheduleResponse {
  id: number; disbursementId: number; installmentNumber: number;
  dueDate: string; principalAmount: number; interestAmount: number;
  totalAmount: number; status: string;
}

// Loan Account (Servicing)
export interface LoanAccountRequest {
  applicationId: number; disbursementId: number; outstandingBalance: number;
  nextDueDate: string; emiAmount: number;
}
export interface LoanAccountResponse {
  id: number; applicationId: number; disbursementId: number; outstandingBalance: number;
  nextDueDate: string; emiAmount: number; status: string; createdAt: string;
}
export interface RepaymentRequest {
  loanAccountId: number; amount: number; paymentDate: string; mode: string; referenceNumber: string;
}
export interface RepaymentResponse {
  id: number; loanAccountId: number; amount: number; paymentDate: string;
  mode: string; referenceNumber: string; status: string; createdAt: string;
}

// Collections
export interface DelinquencyRequest {
  loanAccountId: number; daysOverdue: number; overdueAmount: number; bucket: string;
}
export interface DelinquencyResponse {
  id: number; loanAccountId: number; daysOverdue: number; overdueAmount: number;
  bucket: string; status: string; createdAt: string;
}
export interface CollectionActionRequest {
  delinquencyId: number; actionType: string; notes: string; actionDate: string;
}
export interface CollectionActionResponse {
  id: number; delinquencyId: number; actionType: string; notes: string; actionDate: string; createdAt: string;
}
