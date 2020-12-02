import { Component, OnInit } from '@angular/core';

import { ArticleService } from './../../../services/article/article.service';
import { Article } from './../../../models/article/article';
import { Router } from '@angular/router';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  articles: Article[];
  suppliers: any = [];
  filterString: string = '';

  constructor(
    private articleService: ArticleService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.articleService.getArticles()
      .subscribe(
         res => this.articles = res,
         err => console.log(err)
      );
  }

  onArticleDeleted(id: number){
    if (confirm('Seguro que desea eliminar el articulo?')){
      this.articleService.deleteArticle(id)
      .subscribe(
        res => this.getAll(),
        err => console.log(err)
      );
    }
  }

  navigate(route){
    setTimeout(() => this.router.navigate(route),500);
  }
}
