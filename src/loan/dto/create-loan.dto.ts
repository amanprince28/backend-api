export class CreateLoanDto {
    customer_id?: any;
    loan_package?: string;
    repayment_date?: string;
    principal_amount?: string;
    deposit_amount?: string;
    application_fee?: string;
    payment_upfront?: string;
    interest?: string;
    remark: string;
    created_by: string;
    supervisor: string;
}
