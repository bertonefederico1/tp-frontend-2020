import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Supplier } from 'src/app/models/supplier/Supplier';
import { ErrorService } from 'src/app/services/error-service/error.service';
import { SupplierService } from 'src/app/services/supplier/supplier.service';

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.css']
})
export class AddSupplierComponent {

  supplier: Supplier;

  constructor(
    private supplierService: SupplierService,
    private router: Router,
    private errorService: ErrorService
  ) {
      this.supplier = new Supplier();
    }


  addSupplier(){
    this.supplierService.addSupplier(this.supplier)
    .subscribe(
      res => this.router.navigate(['/suppliers']),
      err => this.errorService.openSnackBar(err.name)
    );
  }

  cancel(){
    this.router.navigate(['/suppliers']);
  }

  validate(){
    if (this.supplier.cuit === undefined || this.supplier.razon_social === undefined){
      alert('Complete el cuit y la razón social');
    }
    else{
      if (this.supplier.cuit.toString() === '' || this.supplier.razon_social === ''){
        alert('Complete el cuit y la razón social');
      }
      else{
        this.addSupplier();
      }
    }
  }
}
