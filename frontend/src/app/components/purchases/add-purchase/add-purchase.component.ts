import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ArticleService } from '../../../services/article/article.service';
import { SupplierService } from '../../../services/supplier/supplier.service';
import { PurchaseService } from '../../../services/purchase/purchase.service';

import { Supplier } from '../../../models/supplier/Supplier';
import { Article } from '../../../models/article/article';
import { ArticleSupplier } from '../../../models/article-supplier/article-supplier';
import { AlertService } from 'src/app/services/alert-service/alert.service';



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
    private alertService: AlertService
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
        err => this.alertService.openSnackBar(err.name)
      );
  }

  getSuppliers(){
    this.supplierService.getSuppliers()
        .subscribe(
          res => this.suppliers = res,
          err => this.alertService.openSnackBar(err.name)
        );
  }


  addPurchase(){
    if (this.validate()) {
      this.articleService.loadStock(this.purchase)
      .subscribe(
        res => this.router.navigate(['/purchases']),
        err => this.status = false
      );

    this.purchaseService.addPurchase(this.purchase)
        .subscribe(err => {
          this.status = false;
          this.router.navigate(['/purchases']);
        });
    }
  }

  cancel(){
    this.router.navigate(['/purchases']);
  }

  validate(){
    if (!this.purchase.cantidad || !this.purchase.id_articulo
      || !this.purchase.id_proveedor || !this.purchase.precio_unitario){
      this.alertService.openSnackBar('Complete all fields');
      return false;
    }
    return true;
  }
}
