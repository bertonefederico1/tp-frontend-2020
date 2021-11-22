import { Component, OnInit } from '@angular/core';

import { ArticleService } from '../../../services/article/article.service';
import { Article } from '../../../models/article/article';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert-service/alert.service';


@Component({
  selector: 'app-article',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  articles: Article[];
  suppliers: any = [];
  filterString = '';

  constructor(
    private articleService: ArticleService,
    private router: Router,
    private alertService: AlertService
    ) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.articleService.getArticles()
      .subscribe(
         res => this.articles = res,
         err => this.alertService.openSnackBar(err.name)
      );
  }

  onArticleDeleted(id: number){
    if (confirm('Seguro que desea eliminar el articulo?')){
      this.articleService.deleteArticle(id)
      .subscribe(
        res => this.getAll(),
        err => this.alertService.openSnackBar(err.name)
      );
    }
  }

  navigate(route){
    this.router.navigate(route);
  }
}
