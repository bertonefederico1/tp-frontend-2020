import { Component, OnInit, Inject } from '@angular/core';
import { SupplierService } from '../../../services/supplier/supplier.service';
import { Supplier } from '../../../models/supplier/supplier';
import { AlertService } from 'src/app/services/alert-service/alert.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './suppliers.component.html'
})
export class SupplierComponent implements OnInit {

  suppliers: Supplier[];
  filterString: string;

  constructor(
    public supplierService: SupplierService,
    private alertService: AlertService) {
    }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.supplierService.getSuppliers()
      .subscribe(
        res => this.suppliers = res,
        err => this.alertService.openSnackBar(err.name)
      );
  }

  async deleteSupplier(id: number){
    if (await this.alertService.confirm('Are you sure you want to delete the supplier?')){
      this.supplierService.deleteSupplier(id)
        .subscribe(
          () => this.getAll(),
          err => this.alertService.openSnackBar(err.name)
        );
    }
  }

  getSuppliersByParam(strParam: string){
    this.supplierService.getSuppliersByParam(strParam)
      .subscribe(
        res => this.suppliers = res,
        err => this.alertService.openSnackBar(err.name)
      )
  }

  verifySearch() {
    if (!this.filterString || !this.filterString) {
      this.getAll();
    }
  }

}
