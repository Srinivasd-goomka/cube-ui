import { FieldConfig } from "./form";

export type CubeProductFormProps = {
  onClose: () => void;
  fields: FieldConfig[];
  defaultCategoryOverrides?: Record<string, string[]>;
  defaultBaseValues?: Record<string, unknown>;
  isEdit?: boolean;
};

// export type PRODUCT_TYPE = {
//   id: number;
//   standard_charge_abbreviation?: string;
//   product_type?: string;
//   parent_product_category?: string;
//   product_name?: string;
// };

// export interface Product {
//   product_name: string;
//   [key: string]: unknown;
// }

export interface ProductRoot {
  id: number;
  product_id: number;
  product_type: string;
  product_type_code: string | null;
  product_category: string;
  parent_product_category: string;
  status: string | null;
  created_at: string;
  updated_at: string;
  standard_charge_abbreviation: string;
  product_type_abbriveation: string | null;
  winter_service_fee: string;
  rental_protection: string;
  product: Product;
}

export interface Product {
  id: number;
  product_name: string;
  product_abbreviation: string;
  product_id: string | null;
  product_line: string;
  status: number;
  created_at: string;
  updated_at: string;
  product_description: string | null;
  blanket_product_id: string;
  call_script_que: string | null;
}

export interface ProductCodes {
  id: number;
  product_id: number;
  product_parent_code: string;
  product_code: string;
  ticket_code: string;
  tax_code: string;
  additional_rental: string;
  status: string;
  created_at: string;
  updated_at: string;
  core_product: string;
  ticket_id: number;
  product: Product;
  ticket: Ticket;
}

export interface Ticket {
  id: number;
  ticket_code: string;
  product_type: string;
  product_id: number;
  created_at: string | null;
  updated_at: string | null;
  contamination: string | null;
  cycle_start_equals_cycle_end: string | null;
  damage: string | null;
  decals: string | null;
  delivery: string | null;
  dig_out: string | null;
  dispatch_log_required: string | null;
  dry_run: string | null;
  equipment_vendor: string | null;
  exchange: string | null;
  extra_pickup: string | null;
  extra_service: string | null;
  haul: string | null;
  installation_vendor: string | null;
  junk_removal: string | null;
  maintenance: string | null;
  maintenance_vendor: string | null;
  miscellaneous: string | null;
  monitor_vendor: string | null;
  monthly_rental: string | null;
  monthly_service: string | null;
  non_recurring_charge: string | null;
  onsite_check_required: string | null;
  onsite_or_dispatch: string | null;
  other_vendor: string | null;
  overage: string | null;
  power_wash: string | null;
  product_type_blanket_product_id: string | null;
  product_type_product_line: string | null;
  relocation: string | null;
  removal: string | null;
  rental: string | null;
  repair: string | null;
  replacement: string | null;
  tonnage_required: string | null;
  vendor_payment_required: string | null;
}

export interface TicketCodes {
  record_id: number
  product_id: number
  ticket_code: string
  product_type: string
  created_at: string | null
  updated_at: string | null
  product: Product
}

export interface ProductType {
  id: number
  product_id: number
  psp_type: string
  psp: number
  product_type: string
  quantity: number
  standard_rate: number
  delivery_rate: number
  removal_rate: number
  extra_pickup_rate: number
  dry_run_rate: number
  overage_rate: number
  contamination_rate: number
  relocation_rate: number
  exchange_rate: number
}

export interface CallScript {
  sl: number
  level: string
  field_type: string
  field_option: string | null
  answer: string
}

export interface RootProductList {
  id: number
  product_name: string
  product_abbreviation: string
  product_line: string
  status: number
  product_description: string
  call_script: CallScript[]
  script_tips: string
  wizard_field: string[]
  product_image: string
  product_type: ProductType[]
}