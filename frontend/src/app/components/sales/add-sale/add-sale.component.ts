import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Article } from 'src/app/models/article/article';
import { Client } from 'src/app/models/client/client';
import { Sale } from 'src/app/models/sale/sale';
import { AlertService } from 'src/app/services/alert-service/alert.service';
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
    private alertService: AlertService,
    public dialog: MatDialog,
    private router: Router
    ) { }

  sale: Sale;
  customerID: number;
  articleID: number;
  total: number;
  articles: any[] = [];
  selectedArticle: any = {};
  selectedClient: Client = new Client();
  articleQuantity: number;
  dialogConfig: MatDialogConfig = {
    height: '80%',
    width: '90%',
  };

  save() {
    if (this.validate()) {
      this.sale = new Sale(this.articles, this.selectedClient.clientID, this.total);
      this.saleService.addSale(this.sale)
      .subscribe(
        () => this.router.navigate(['/sales']),
        err => this.alertService.openSnackBar(err.name)
      );
    }
  }

  cancel() {
    this.router.navigate(['/sales']);
  }

  searchArticle(event?: any) {
    if (event){
      if (event.key !== '+') {
        return;
      }
    }
    const dialogRef = this.dialog.open(ShowArticlesComponent, this.dialogConfig);
    dialogRef.afterClosed()
      .subscribe(selectedArticle => {
        if (selectedArticle) {
          this.selectedArticle = selectedArticle;
        } else {
          return;
        }
      });
      this.clearControls('searchArticle');
  }

  searchCustomer(event?: any) {
    if (event){
      if (event.key !== '+'){
        return;
      }
    }
    const dialogRef = this.dialog.open(ShowCustomersComponent, this.dialogConfig);
    dialogRef.afterClosed()
      .subscribe(selectedClient => {
        if (selectedClient) {
          this.selectedClient = selectedClient;
        } else {
          return;
        }
      });
      this.clearControls('searchCustomer');
  }

  deleteSelectedArticle(article: Article) {
    const position = this.articles.map(article => { 
      return article.articleId; 
    }).indexOf(article.articleID);
    this.articles.splice(position, 1);
    this.calculateTotal();
  }

  addArticle(selectedArticle: Article){
    if (Object.keys(this.selectedArticle).length === 0) {
      return;
    }
    if (!this.articleQuantity) {
      this.alertService.openSnackBar('Complete quantity');
      return;
    }
    if (this.articleQuantity > this.selectedArticle.stock) {
      this.alertService.openSnackBar('Insufficient stock');
      return;
    }
    this.selectedArticle.quantity = this.articleQuantity;
    if (this.existsArticle(this.selectedArticle)) { //El artículo ya existe. Solo actualizo la cantidad
      this.updateArticleExisting(this.selectedArticle);
    }
    this.articles.push(selectedArticle);
    this.selectedArticle = {};
    this.clearControls('addArticle');
    this.calculateTotal();
  }

  calculateTotal() { //Calcula el monto total de la venta
    this.total = 0;
    this.articles.forEach(article => {  
      this.total = this.total + (article.price * article.quantity)
    });
  }

  updateArticleExisting(selectedArticle: any) {
    const position = this.getPositionArticle(selectedArticle);
    selectedArticle.quantity += this.articles[position].quantity;
    this.articles.splice(position, 1);
  }

  getPositionArticle(selectedArticle: Article): number {
    const position = this.articles.map(article => { 
      return article.articleID; 
    }).indexOf(selectedArticle.articleID);
    return position;
  }

  existsArticle(selectedArticle: Article): boolean {
    const position = this.articles.map(article => { 
      return article.articleID; 
    }).indexOf(selectedArticle.articleID);
    return position >= 0;
  }

  clearControls(method: string) {
    switch (method) {
      case 'searchCustomer': {
        this.selectedClient.clientID = undefined;
        this.selectedClient.name = '';
        this.selectedClient.surname = '';
        break;
      }

      case 'searchArticle': {
        this.selectedArticle.articleID = undefined;
        this.selectedArticle.description = '';
        break;
      }

      case 'addArticle': {
        this.articleQuantity = undefined;
        break;
      }

    }
  }

  validate() { 
    if (this.articles.length === 0 || !this.selectedClient) {
      this.alertService.openSnackBar('Complete all fields');
      return false;
    }
    return true;
  }

}
