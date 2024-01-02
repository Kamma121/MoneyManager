import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Expense} from "../shared/Expense";

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(private http: HttpClient) {
  }

  getAllExpenses() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    };
    return this.http.get<Expense[]>('http://localhost:8080/api/expenses', httpOptions);
  }

  addExpenses(expenses: Expense[]) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    };
    return this.http.post('http://localhost:8080/api/expense/add', expenses, httpOptions);
  }

  deleteExpense(id: number | null) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    };
    if (id === null) {
      console.log('Id not found');
      return null;
    } else {
      return this.http.delete(`http://localhost:8080/api/expense/${id}`, {
        ...httpOptions,
        responseType: 'text'
      });
    }
  }

  updateExpense(expense: Expense) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    };
    const currExpense: Expense = {
      id: expense.id,
      date: expense.date,
      category: expense.category,
      amount: expense.amount,
      message: expense.message
    }
    return this.http.put(`http://localhost:8080/api/expense/${expense.id}`, currExpense, httpOptions)
  }
}
