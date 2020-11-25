import { Component, Input, Output, EventEmitter } from '@angular/core';
import { EventManager } from '@angular/platform-browser';
import { Article } from 'src/app/models/article/article';

@Component({
  selector: 'app-article-item',
  templateUrl: './article-item.component.html',
  styleUrls: ['./article-item.component.css']
})
export class ArticleItemComponent {

  @Input() article: Article;

  @Output() itemDeleted = new EventEmitter<number>();

  constructor() { }

  deleteArticle(id: number){
    this.itemDeleted.emit(id);
  }
}
