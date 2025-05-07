import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Table } from '../interfaces/table.interface';


@Injectable({
  providedIn: 'root'
})
export class TablesService {
private baseUrl: string = 'http://localhost:3000/api/tables';
  private httpClient = inject(HttpClient);

  getAll() {
    return lastValueFrom(this.httpClient.get<Table[]>(this.baseUrl));
  }

  getTableById(id: number) {
    const url = `${this.baseUrl}/${id}`;
    return lastValueFrom(this.httpClient.get<Table>(url));
  }


  createTable(body: Table) {
        return lastValueFrom(this.httpClient.post<Table>(this.baseUrl, body))
  }

  deleteTable(id: number) {
    return lastValueFrom(this.httpClient.delete<Table>(`${this.baseUrl}/${id}`))
  }

  editTable(table: Table) {
    return lastValueFrom(this.httpClient.put<Table>(`${this.baseUrl}/${table.id}`, table))
  }

}
