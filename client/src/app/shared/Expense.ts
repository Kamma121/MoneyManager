import {Category} from "./ExpenseCategory";

export interface Expense {
  id: number,
  date: Date,
  category: Category,
  amount: number,
  message:string,
  user_id: number
}
