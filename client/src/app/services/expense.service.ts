import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Expense} from "../shared/Expense";

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(private http:HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })
  };

  getAllExpenses(){
    return this.http.get<Expense[]>('http://localhost:8080/api/expenses',this.httpOptions);
  }
  addExpenses(expenses:Expense[]){
    return this.http.post('http://localhost:8080/api/expense/add',expenses,this.httpOptions);
  }

  deleteExpense(id: number | null) {
    if(id === null){
      console.log('Id not found');
      return null;
    }else{
      return this.http.delete(`http://localhost:8080/api/expense/${id}`, {
        ...this.httpOptions,
        responseType: 'text'
      });
    }
  }
  updateExpense(expense:Expense){
    const currExpense:Expense = {
      id:expense.id,
      date:expense.date,
      message:expense.message,
      category:expense.category,
      amount:expense.amount,
    }
    return this.http.put(`http://localhost:8080/api/expense/${expense.id}`,currExpense,this.httpOptions)
  }
}
