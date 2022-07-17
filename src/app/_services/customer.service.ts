import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { DataTablePaging } from '../shared/interfaces/data-table-paging';
import { CustomerAdd } from '../interfaces/customer/customer-add';
import { CustomerEdit } from '../interfaces/customer/customer-edit';
import { CustomerList } from '../interfaces/customer/customer-list';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private readonly baseURL: string = environment.baseUrl + '/api/contacts';

  constructor(private httpClient: HttpClient) {}

  list(paging: DataTablePaging): Observable<CustomerList[]> {
    return this.httpClient.post<CustomerList[]>(this.baseURL + '/list', paging);
  }

  get(id: number): Observable<CustomerList> {
    return this.httpClient.get<CustomerList>(this.baseURL + '/get/' + id);
  }

  count(): Observable<number> {
    return this.httpClient.get<number>(this.baseURL + '/count');
  }

  add(info: CustomerAdd) {
    return this.httpClient.post(this.baseURL + '/add', info);
  }

  edit(info: CustomerEdit) {
    return this.httpClient.put(this.baseURL + '/edit', info);
  }

  delete(id: number) {
    return this.httpClient.delete(this.baseURL + '/delete/' + id);
  }
}
