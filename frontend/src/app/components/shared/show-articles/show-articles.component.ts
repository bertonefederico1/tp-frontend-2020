import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Article } from 'src/app/models/article/article';
import { ArticleService } from 'src/app/services/article/article.service';

@Component({
  selector: 'app-show-articles',
  templateUrl: './show-articles.component.html',
  styleUrls: ['./show-articles.component.css']
})
export class ShowArticlesComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ShowArticlesComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private articleService: ArticleService
  ) { }

  articles: Article[];

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.articleService.getArticles()
      .subscribe(
        res => {
          this.articles = res.filter(article => {
            return article.stock > 0;
          })
        },
        err => console.log(err)
      )
  }

  select() {

  }

  cancel() {
    this.dialogRef.close();
  }

}
