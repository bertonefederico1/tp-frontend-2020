import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert-service/alert.service';
import { SaleService } from 'src/app/services/sale/sale.service';
import { DataSaleComponent } from '../data-sale/data-sale.component';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

  constructor(
    private saleService: SaleService,
    private router: Router,
    private dialog: MatDialog,
    private alertService: AlertService
    ) { }

  sales: any[];

  ngOnInit(): void {
    this.getSales();
  }

  getSales() {
    this.saleService.getSales()
      .subscribe(
        res => this.sales = res,  
        err => this.alertService.openSnackBar(err.name)
      )
  }

  async deleteSale(saleID: number) {
    if (!await this.alertService.confirm('Are you sure you want to delete the sale?')) {
      return;
    }
    this.saleService.deleteSale(saleID)
      .subscribe(
        () => {
          this.getSales();
          this.router.navigate(['/sales'])
        },
        err => this.alertService.openSnackBar(err.error.message)
      );
  }

  dataSale(sale: any){

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.width = '350rem';
    dialogConfig.height = '40rem';
    dialogConfig.data = {
      sale
    };

    const dialogRef = this.dialog.open(DataSaleComponent, dialogConfig);

    dialogRef.afterClosed()
      .subscribe(
        () => this.getSales(),
        err => this.alertService.openSnackBar(err.name)
      );
  }

}
