import { Component, OnInit, Inject } from '@angular/core';
import { SupplierService } from '../../../services/supplier/supplier.service';
import { Supplier } from '../../../models/supplier/supplier';
import { ErrorService } from 'src/app/services/error-service/error.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css']
})
export class SupplierComponent implements OnInit {

  suppliers: Supplier[];
  testInput: any;

  constructor(
    public supplierService: SupplierService,
    private errorService: ErrorService) {
    }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.supplierService.getSuppliers()
      .subscribe(
        res => this.suppliers = res,
        err => this.errorService.openSnackBar(err.name)
      );
  }

  deleteSupplier(id: number){
    if (confirm('Seguro que desea eliminar el proveedor?')){
      this.supplierService.deleteSupplier(id)
        .subscribe(
          res => this.getAll(),
          err => this.errorService.openSnackBar(err.name)
        );
    }
  }

}