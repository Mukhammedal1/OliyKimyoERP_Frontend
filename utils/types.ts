export interface Category {
  name: string;
}

export interface Unit {
  name: string;
}

export interface UpdateInterface {
  id: string;
  data: any;
}

export interface Customer {
  name: string;
  phone_number: string;
  debt_amount: number;
  note: string;
}

export interface Supplier {
  name: string;
  phone_number: string;
  debt_amount: number;
}

interface IncomeExpenseProduct {
  product_id: string;
  quantity: number;
  price: number;
  total_price: number;
}

export interface Sale {
  customer: string | null;
  total_amount: number;
  paid_amount: number;
  note: string;
  customer_phone: number;
  is_new_customer: boolean;
  products: IncomeExpenseProduct[];
}

export interface Purchase {
  supplier: string | null;
  total_amount: number;
  paid_amount: number;
  note: string;
  supplier_phone: number;
  is_new_supplier: boolean;
  products: IncomeExpenseProduct[];
}

export interface Product {
  name: string;
  description: string;
  buy_price: number;
  stock_amount: number;
  category: string;
  unit: string;
}

export interface Transaction {
  incomeExpenseType: string;
  categoryType: string;
  amount: number;
  note?: string;
  saleId?: string;
  purchaseId?: string;
  customerId?: string;
  supplierId?: string;
}

export interface SignIn {
  login: string;
  password: string;
}
