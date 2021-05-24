import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  constructor(private http: HttpClient) { }

  readonly URL: string = 'http://localhost:3000';

  getSales() {
    return this.http.get<any[]>(`${this.URL}/sales`);
  }
}
