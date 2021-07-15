import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
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
    private dialog: MatDialog
    ) { }

  sales: any[];

  ngOnInit(): void {
    this.getSales();
  }

  getSales() {
    this.saleService.getSales()
      .subscribe(
        res => this.sales = res,  
        err => console.log(err)
      )
  }

  deleteSale(saleID: number) {
    if (!confirm('¿Seguro que desea eliminar la venta?')) {
      return;
    }
    this.saleService.deleteSale(saleID)
      .subscribe(
        res => {
          this.getSales();
          this.router.navigate(['/sales'])
        },
        err => alert(err.error.message)
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
        res => this.getSales(),
        err => console.log(err)
      );
  }

}
