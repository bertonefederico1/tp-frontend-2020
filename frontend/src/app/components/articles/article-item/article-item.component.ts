import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/models/article/article';

@Component({
  selector: 'app-article-item',
  templateUrl: './article-item.component.html',
  styleUrls: ['./article-item.component.css']
})
export class ArticleItemComponent {

  @Input() article: Article;

  @Output() itemDeleted = new EventEmitter<number>();

  constructor(private router: Router) { }

  deleteArticle(id: number){
    this.itemDeleted.emit(id);
  }

  navigate(route){
    this.router.navigate(route);
  }

}
