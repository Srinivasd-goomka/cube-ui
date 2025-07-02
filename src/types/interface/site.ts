export interface Site {
  id: number;
  customer_id: number;
  service_address: string;
  zipcode: string;
  lat: string;
  long: string;
  status: string;
  added_by: number;
  created_at: string;
  updated_at: string;
  site_docs: string | null;
  service_address_city: string;
  service_address_state: string;
  onsite_contact_name: string | null;
  onsite_contact_number: string | null;
  onsite_contact_ext: string | null;
  delivery_review_notice_sent: string | null;
  removal_review_sent: string | null;
  opt_out_line_item_processing_site: string | null;
  opt_out_cc_processing_site: string | null;
  ignore_site_pi: string | null;
  delivery_review_notice_sent_on: string | null;
  removal_review_notice_sent_on: string | null;
  email_order_summary_to: string | null;
  compology_notification_email_site: string | null;
  wf_sqft: string | null;
  county: string | null;
  tax_exempt_no: string | null;
  customer_tax_forms: string | null;
  gate_code: string | null;
  location_name: string;
  confislandhi: string | null;
  customer_specific_site_type: string | null;
  last_modified_by: string | null;
  created_by_name: string;
  created_on: string;
  updated_on: string;
  orders: Order[];
  workorders: string | null[];
  quotes: string | null[];
  declines: string | null[];
  notes: Note[];
  tasks: string | null[];
  upcoming_task: string | null[];
  completed_task: string | null[];
  documents: string | null[];
  tickets: string | null[];
  billing_preferences: BillingPreference[];
  invoice: Invoice[];
  customer_owner_user_details: CustomerOwnerUserDetails;
  customer_backup_user_details: string | null;
  css_role_user_details: string | null;
  site_contact: string | null;
  customer: Customer;
}

export interface Order {
  id: number;
  order_id: number;
  customer_id: number;
  site_id: number;
  order_type: string;
  status: string;
  added_by: number;
  last_updated_by: string | null;
  ip_added: string;
  ip_modified: string | null;
  created_at: string;
  updated_at: string | null;
  site_address: string;
  site_zipcode: string;
  line_items_count: number;
}

export interface Note {
  id: number;
  ref_id: number;
  note_type_id: number;
  module_name: string;
  description: string;
  added_by: number;
  last_updated_by: string | null;
  ip_added: string;
  ip_modified: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  note_type: NoteType;
  user: User;
}

export interface NoteType {
  id: number;
  note_type: string;
  description: string;
  use_for: number;
}

export interface User {
  id: number;
  employee_id: string;
  first_name: string;
  last_name: string;
  email: string;
  mobile: string | null;
}

export interface BillingPreference {
  id: number;
  nick_name: string;
  opt_out_processing_bp: string;
  inactive_billing_preference: string;
  inactive_reason: string | null;
  opt_out_lineitem_processing: string;
  portal_ready: string;
  customer_id: number;
  site_id: number;
  billing_email: string;
  billing_name: string;
  billing_phone_no: string;
  extension?: string;
  billing_address: string;
  zipcode: string;
  payment_type: PaymentType;
  cc_last_four_digit?: string;
  month?: string;
  year?: string;
  payment_notes: string | null;
  created_at: string;
  updated_at: string;
  created_by: number;
  last_updated_by: string | null;
  ip_added: string;
  status: number;
}

export interface PaymentType {
  id: number;
  payment_type: string;
  use_for: number;
  created_at: string;
  updated_at: string | null;
}

export interface Invoice {
  id: number;
  invoice_no: string;
  invoice_date: string;
  order_id: string | null;
  customers_id: number;
  sites_id: number;
  billing_name: string | null;
  po: string | null;
  line_item: string;
  amount: number;
  sub_total_amount: number;
  tax_percent: number;
  tax_amount: number;
  paid_amount: number;
  pending_amount: number;
  no_of_line_items: number;
  status_master_id: number;
  created_by: string | null;
  last_updated_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface CustomerOwnerUserDetails {
  user_id: number;
  first_name: string;
  last_name: string;
  role_names: string;
  role_ids: string;
}

export interface Customer {
  id: number;
  first_name: string;
  last_name: string;
  refused_last_name: number;
  title: string | null;
  primary_email: string;
  refused_email: number;
  phone_ext: string | null;
  phone: string;
  company_name: string;
  customer_type: string;
  business_category: string;
  user_id: number;
  customer_status: string;
  created_by: number;
  last_updated_by: number;
  created_at: string;
  updated_at: string;
  delete_flag: number;
  customer_status_desc: string | null;
  backup_user_id: string | null;
  css_user_id: string | null;
  record_id: string | null;
  customer_owner: string;
  lead_source: string;
  lead_source_other: string | null;
  note: string | null;
  fax: string | null;
  customer_id: string;
  credit_date_given: string | null;
  dnu: string | null;
  billing_method: string | null;
  no_sale_reason: string | null;
  no_sale_other: string | null;
  stop_service: string | null;
  override_past_due_balance_until: string | null;
  unsubscribed: string | null;
  payment_terms: string | null;
  opt_out_cc_processing: string | null;
  opt_out_line_item_processing: string | null;
  perfect_sale_paid_out: string | null;
  opt_in_rental_protection: string | null;
  opt_out_rental_protection: string | null;
  originally_created_by: string | null;
  compology_notification_email: string | null;
  po_no_required: string | null;
  online_sales_lead: string | null;
  spanish_speaker: string | null;
  online_sales_lead_zters_chat: string | null;
  "5k_over_credit_limit_approval_user": string | null;
  "5k_past_due_approval_request": string | null;
  "5k_past_due_approval_requested_by_user": string | null;
  "5k_past_due_approval_requested_on": string | null;
  re_engagement_reason_text_multiple_choice: string | null;
  mailchimp_quote_given: string | null;
  mailchimp_quote_reserved: string | null;
}
