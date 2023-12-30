import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Saving} from "../shared/Saving";

@Injectable({
  providedIn: 'root'
})
export class SavingService {

  constructor(private http: HttpClient) {
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })
  };

  getAllSavings() {
    return this.http.get<Saving[]>('http://localhost:8080/api/savings', this.httpOptions);
  }

  addSavings(savings: Saving[]) {
    return this.http.post('http://localhost:8080/api/saving/add', savings, this.httpOptions);
  }

  deleteSaving(id: number | null) {
    if (id === null) {
      console.log('Id not found');
      return null;
    } else {
      return this.http.delete(`http://localhost:8080/api/saving/${id}`, {
        ...this.httpOptions,
        responseType: 'text'
      });
    }
  }

  updateSaving(saving: Saving) {
    const currSaving: Saving = {
      id: saving.id,
      name: saving.name,
      currentAmount: saving.currentAmount,
      targetAmount: saving.targetAmount
    }
    return this.http.put(`http://localhost:8080/api/saving/${saving.id}`, currSaving, this.httpOptions)
  }
}