import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sale } from 'src/app/models/sale/sale';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  constructor(private http: HttpClient) { }

  readonly URL: string = 'http://localhost:3000';

  getSales() {
    return this.http.get<any[]>(`${this.URL}/sales`);
  }

  addSale(sale: Sale) {
    return this.http.post(`${this.URL}/newSale`, sale);
  }

  deleteSale(saleID: number){
    return this.http.put(`${this.URL}/deleteSale/${saleID}`, 'Delete');
  }
}
