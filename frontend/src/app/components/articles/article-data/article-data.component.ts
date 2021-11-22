import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Article } from 'src/app/models/article/article';

import { ArticleService } from '../../../services/article/article.service';
import { SupplierService } from 'src/app/services/supplier/supplier.service';
import { alertService } from 'src/app/services/alert-service/alert.service';

@Component({
  selector: 'app-article-data',
  templateUrl: './article-data.component.html',
  styleUrls: ['./article-data.component.css']
})
export class ArticleDataComponent implements OnInit {

  article: Article = new Article();
  supplierPurchase: any[] = [];
  idArticle: number;


  constructor(
    private activatedRoute: ActivatedRoute,
    private articleService: ArticleService,
    private supplierService: SupplierService,
    private router: Router,
    private alertService: alertService
    ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( (params) => {this.idArticle = params.id; });
    this.getArticle();
    this.getLastSupplierPurchaseByArticle(this.idArticle);
  }


  getArticle(){
    this.articleService.getArticle(this.idArticle)
      .subscribe(
        res => {
          this.article = res;
        },
        err => this.alertService.openSnackBar(err.name)
      );
  }


  getLastSupplierPurchaseByArticle(idArticle: number){
    this.supplierService.lastSuplierPurchaseByArticle(idArticle)
      .subscribe(
        res => this.supplierPurchase = res,
        err => this.alertService.openSnackBar(err.name)
      );
  }

  navigate(route){
    this.router.navigate(route);
  }
}


