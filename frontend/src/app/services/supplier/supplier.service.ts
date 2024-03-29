import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Supplier } from './../../models/supplier/supplier';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(private http: HttpClient) { }

  readonly URL: string = 'http://localhost:3000';

  getSuppliers(){
    return this.http.get<Supplier[]>(`${this.URL}/suppliers`);
  }

  addSupplier(supplier: Supplier){
    return this.http.post(`${this.URL}/addSupplier`, supplier);
  }

  getById(id: number){
    return this.http.get<Supplier>(`${this.URL}/suppliers/${id}`);
  }

  editSupplier(id: number, supplierUpdated: Supplier){
    return this.http.put(`${this.URL}/suppliers/${id}`, supplierUpdated);
  }

  deleteSupplier(id: number){
    return this.http.put(`${this.URL}/suspendSupplier/${id}`, 'Delete');
  }

  lastSuplierPurchaseByArticle(idArticulo: number){
    return this.http.get<Supplier[]>(`${this.URL}/lastSupplierPurchaseByArticle/${idArticulo}`);
  }

  getSuppliersByParam(strParam: string){
    const body = {
      searchParam: strParam
    }

    return this.http.post<Supplier[]>(`${this.URL}/suppliersByParam`,body);
  }

}
