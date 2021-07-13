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
  articles: any[] = [];
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

  deleteSelectedArticle(article: any) {
    
  }

  addArticle(selectedArticle: Article){
    if (Object.keys(this.selectedArticle).length === 0) {
      return;
    }
    if (!this.articleQuantity) {
      alert('You must input quantity');
      return;
    }
    this.selectedArticle.quantity = this.articleQuantity;
    console.log(this.existsArticle(this.selectedArticle))
    if (this.existsArticle(this.selectedArticle)) { //El artículo ya existe, solo tengo que actualizar la cantidad
      this.updateArticleExisting(this.selectedArticle);
    }
    this.articles.push(selectedArticle);
    this.selectedArticle = {};
    this.clearControls('addArticle');
  }

  updateArticleExisting(selectedArticle: any) {
    const position = this.getPositionArticle(selectedArticle);
    console.log(position);
    selectedArticle.quantity += this.articles[position].quantity;
    this.articles.splice(position, 1);
  }

  getPositionArticle(selectedArticle: Article): number {
    const position = this.articles.map(article => { 
      return article.id_articulo; 
    }).indexOf(selectedArticle.id_articulo);
    return position;
  }

  existsArticle(selectedArticle: Article): boolean {
    const position = this.articles.map(article => { 
      return article.id_articulo; 
    }).indexOf(selectedArticle.id_articulo);
    return position >= 0;
  }

  clearControls(method: string) {
    switch (method) {
      case 'searchCustomer': {
        this.selectedClient.id_cliente = undefined;
        this.selectedClient.nombre = '';
        this.selectedClient.apellido = '';
        break;
      }

      case 'searchArticle': {
        this.selectedArticle.id_articulo = undefined;
        this.selectedArticle.descripcion = '';
        break;
      }

      case 'addArticle': {
        this.articleQuantity = undefined;
        break;
      }

    }
  }

}
