import { Component, OnInit } from '@angular/core';
import { SaleService } from 'src/app/services/sale/sale.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

  constructor(private saleService: SaleService) { }

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
    console.log("elimina una venta")
  }

  dataSale(sale: any){
    console.log("muestra los datos de la venta")
  }

}
