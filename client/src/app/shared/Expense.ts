import {Category} from "./ExpenseCategory";

export interface Expense {
  id: number | null,
  date: Date | null,
  category: Category | null,
  amount: number | null,
  message:string | null,
}
