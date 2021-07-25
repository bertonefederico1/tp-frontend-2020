import { Component, OnInit } from '@angular/core';
import { Supplier } from 'src/app/models/supplier/Supplier';
import { SupplierService } from '../../../services/supplier/supplier.service';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DataPurchaseComponent } from '../data-purchase/data-purchase.component';
import { Router } from '@angular/router';
import { ErrorService } from 'src/app/services/error-service/error.service';


@Component({
  selector: 'app-purchase',
  templateUrl: './purchases.component.html'
})
export class PurchasesComponent implements OnInit {

  suppliers: Supplier[];

  constructor(
    private supplierService: SupplierService,
    private dialog: MatDialog,
    private router: Router,
    private errorService: ErrorService
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.supplierService.getSuppliers()
      .subscribe(
        res => this.suppliers = res,
        err => alert(err)
      );
  }

  openDataPurchase(supplier: Supplier){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.width = '350rem';
    dialogConfig.height = '40rem';
    dialogConfig.data = {
      supplier
    };

    const dialogRef = this.dialog.open(DataPurchaseComponent, dialogConfig);

    dialogRef.afterClosed()
      .subscribe(
        res => this.getAll(),
        err => this.errorService.openSnackBar(err.name)
      );
  }

}
