import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ArticleService } from '../../../services/article/article.service';
import { SupplierService } from '../../../services/supplier/supplier.service';
import { PurchaseService } from '../../../services/purchase/purchase.service';

import { Supplier } from '../../../models/supplier/Supplier';
import { Article } from '../../../models/article/article';
import { ArticleSupplier } from '../../../models/article-supplier/article-supplier';
import { ThrowStmt } from '@angular/compiler';
import { ErrorService } from 'src/app/services/error-service/error.service';



@Component({
  selector: 'app-add-purchase',
  templateUrl: './add-purchase.component.html',
  styleUrls: ['./add-purchase.component.css']
})
export class AddPurchaseComponent implements OnInit {

  purchase: ArticleSupplier = new ArticleSupplier();
  date: Date = new Date();
  fecha: string;
  suppliers: Supplier[] = [];
  articles: Article[] = [];
  status = true;

  constructor(
    private articleService: ArticleService,
    private supplierService: SupplierService,
    private purchaseService: PurchaseService,
    private router: Router,
    private errorService: ErrorService
  ) { }

  ngOnInit(): void {
    this.fecha = this.date.getDate() + '/' + (this.date.getMonth() + 1) + '/' + this.date.getFullYear();
    this.getArticles();
    this.getSuppliers();
  }

  getArticles(){
    this.articleService.getArticles()
      .subscribe(
        res => this.articles = res,
        err => this.errorService.openSnackBar(err.name)
      );
  }

  getSuppliers(){
    this.supplierService.getSuppliers()
        .subscribe(
          res => this.suppliers = res,
          err => this.errorService.openSnackBar(err.name)
        );
  }


  addPurchase(){
    this.articleService.loadStock(this.purchase)
      .subscribe(
        res => this.router.navigate(['/purchases']),
        err => this.status = false
      );

    this.purchaseService.addPurchase(this.purchase)
        .subscribe(
          err => this.status = false
        );

    if (this.status) {
      this.router.navigate(['/purchases']);
    } else {
      console.log('Error');
    }
  }

  cancel(){
    this.router.navigate(['/purchases']);
  }

  validate(){
    if (this.purchase.cantidad === undefined || this.purchase.id_articulo === undefined
      || this.purchase.id_proveedor === undefined || this.purchase.precio_unitario === undefined){
      alert('Complete todos los campos');
    }
    else{
      this.addPurchase();
    }
  }
}
