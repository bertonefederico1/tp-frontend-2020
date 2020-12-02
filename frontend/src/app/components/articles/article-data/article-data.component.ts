import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { Article } from 'src/app/models/article/article';

import { ArticleService } from "../../../services/article/article.service";
import { SupplierService } from 'src/app/services/supplier/supplier.service';

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
    private supplierService: SupplierService 
    ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( (params) => {this.idArticle = params.id;});
    this.getArticle();
    this.getLastSupplierPurchaseByArticle(this.idArticle);
  }
  

  getArticle(){
    this.articleService.getArticle(this.idArticle)
      .subscribe(
        res => {
          this.article = res;
        },
        err => console.log(err)
      );
  }

  
  getLastSupplierPurchaseByArticle(idArticle: number){
    this.supplierService.lastSuplierPurchaseByArticle(idArticle) 
      .subscribe(
        res => this.supplierPurchase = res,
        err => console.log(err)
      );
  }


}

  
