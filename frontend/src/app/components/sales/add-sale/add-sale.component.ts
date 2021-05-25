import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Article } from 'src/app/models/article/article';
import { Client } from 'src/app/models/client/client';
import { SaleService } from 'src/app/services/sale/sale.service';
import { ShowArticlesComponent } from '../../shared/show-articles/show-articles.component';
import { ShowCustomersComponent } from '../../shared/show-customers/show-customers.component';

@Component({
  selector: 'app-add-sale',
  templateUrl: './add-sale.component.html',
  styleUrls: ['./add-sale.component.css']
})
export class AddSaleComponent {

  constructor(
    private saleService: SaleService,
    public dialog: MatDialog
    ) { }

  customerID: number;
  articleID: number;
  articles: Article[] = [];
  selectedArticle: any = {};
  selectedClient: Client = new Client();
  articleQuantity: number;
  dialogConfig: MatDialogConfig = {
    height: '80%',
    width: '90%',
  };

  save() {

  }

  cancel() {

  }

  searchArticle(event?: any) {
    if (event){
      if (event.key !== '+'){
        return;
      };
    };
    const dialogRef = this.dialog.open(ShowArticlesComponent, this.dialogConfig);
    dialogRef.afterClosed()
      .subscribe(selectedArticle => {
        if (selectedArticle) {
          this.selectedArticle = selectedArticle;
        } else {
          return;
        }
      });
  }

  searchCustomer(event?: any) {
    if (event){
      if (event.key !== '+'){
        return;
      };
    };
    const dialogRef = this.dialog.open(ShowCustomersComponent, this.dialogConfig);
    dialogRef.afterClosed()
      .subscribe(selectedClient => {
        if (selectedClient) {
          this.selectedClient = selectedClient;
        } else {
          return;
        }
      });
  }

  deleteSelectedArticle(article: any) {
    
  }

  addArticle(selectedArticle: Article){
    this.selectedArticle.quantity = this.articleQuantity
    this.articles.push(selectedArticle);
  }

}
