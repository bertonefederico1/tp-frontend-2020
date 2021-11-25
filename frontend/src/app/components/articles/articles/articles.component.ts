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

  async onArticleDeleted(id: number){
    if (await this.alertService.confirm('Are you sure you want to delete the article?')){
      this.articleService.deleteArticle(id)
      .subscribe(
        () => this.getAll(),
        err => this.alertService.openSnackBar(err.name)
      );
    }
  }

  navigate(route){
    this.router.navigate(route);
  }
}
