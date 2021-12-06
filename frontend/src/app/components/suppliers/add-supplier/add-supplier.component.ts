import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Supplier } from 'src/app/models/supplier/Supplier';
import { AlertService } from 'src/app/services/alert-service/alert.service';
import { SupplierService } from 'src/app/services/supplier/supplier.service';

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html'
})
export class AddSupplierComponent {

  supplier: Supplier;

  constructor(
    private supplierService: SupplierService,
    private router: Router,
    private alertService: AlertService
  ) {
      this.supplier = new Supplier();
    }


  addSupplier(){
    this.supplierService.addSupplier(this.supplier)
    .subscribe(
      () => this.router.navigate(['/suppliers']),
      err => this.alertService.openSnackBar(err.name)
    );
  }

  cancel(){
    this.router.navigate(['/suppliers']);
  }

  validate(){
    if (!this.supplier.cuit || !this.supplier.businessName){
      this.alertService.openSnackBar('Complete cuit and business name');
    } else {
        this.addSupplier();
    }
  }

}
