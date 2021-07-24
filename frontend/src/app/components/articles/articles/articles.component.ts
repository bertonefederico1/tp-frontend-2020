import { Component, OnInit } from '@angular/core';

import { ArticleService } from '../../../services/article/article.service';
import { Article } from '../../../models/article/article';
import { Router } from '@angular/router';
import { ErrorService } from 'src/app/services/error-service/error.service';


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
    private errorService: ErrorService
    ) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.articleService.getArticles()
      .subscribe(
         res => this.articles = res,
         err => this.errorService.openSnackBar(err.name)
      );
  }

  onArticleDeleted(id: number){
    if (confirm('Seguro que desea eliminar el articulo?')){
      this.articleService.deleteArticle(id)
      .subscribe(
        res => this.getAll(),
        err => this.errorService.openSnackBar(err.name)
      );
    }
  }

  navigate(route){
    this.router.navigate(route);
  }
}
