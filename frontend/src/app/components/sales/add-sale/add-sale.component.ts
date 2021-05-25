import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SaleService } from 'src/app/services/sale/sale.service';
import { ShowArticlesComponent } from '../../shared/show-articles/show-articles.component';
import { ShowCustomersComponent } from '../../shared/show-customers/show-customers.component';

@Component({
  selector: 'app-add-sale',
  templateUrl: './add-sale.component.html',
  styleUrls: ['./add-sale.component.css']
})
export class AddSaleComponent implements OnInit {

  constructor(
    private saleService: SaleService,
    public dialog: MatDialog
    ) { }

  customerID: number;
  articleID: number;
  articles: any[] = [];
  dialogConfig: MatDialogConfig = {
    height: '80%',
    width: '90%',
  };

  ngOnInit(): void {
  }

  save() {

  }

  searchArticle() {
    const dialogRef = this.dialog.open(ShowArticlesComponent, this.dialogConfig);
  }

  searchCustomer() {
    const dialogRef = this.dialog.open(ShowCustomersComponent, this.dialogConfig);
  }

  cancel() {

  }

}
