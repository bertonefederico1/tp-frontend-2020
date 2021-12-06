import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AlertService } from 'src/app/services/alert-service/alert.service';
import { PurchaseService } from './../../../services/purchase/purchase.service';

@Component({
  selector: 'app-data-purchase',
  templateUrl: './data-purchase.component.html',
  styleUrls: ['./data-purchase.component.css']
})
export class DataPurchaseComponent implements OnInit {

  supplier: any;
  purchases: any[] = [];

  constructor(
    private dialogRef: MatDialogRef<DataPurchaseComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    public purchaseService: PurchaseService,
    private alertService: AlertService
  ) {
    this.supplier = data;
  }


  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
     this.purchaseService.getSupplierPurchases(this.supplier.supplier.supplierID)
      .subscribe(
        res => this.purchases = res,
        err => this.alertService.openSnackBar(err.name)
      );
  }

  async deletePurchase(purchase: any){
     if (await this.alertService.confirm('Are you sure you want to delete the purchase?')){
       this.purchaseService.deletePurchase(purchase.articleID, purchase.supplierID, purchase.purchaseDate)
       .subscribe(
          () => this.close(),
          err => this.alertService.openSnackBar(err.name)
        );
     }
  }

   close(){
    this.dialogRef.close();
  }

}
