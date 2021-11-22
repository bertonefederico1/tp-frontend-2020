import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Article } from 'src/app/models/article/article';
import { ArticleService } from 'src/app/services/article/article.service';
import { alertService } from 'src/app/services/alert-service/alert.service';

@Component({
  selector: 'app-show-articles',
  templateUrl: './show-articles.component.html',
  styleUrls: ['./show-articles.component.css']
})
export class ShowArticlesComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ShowArticlesComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private articleService: ArticleService,
    private alertService: alertService
  ) { }

  articles: Article[];
  filterString: string = '';

  ngOnInit(): void {
    this.getAll();
  }

  selectionArticle(article: Article) {
    this.dialogRef.close(article);
  }

  getAll() {
    this.articleService.getArticles()
      .subscribe(
        res => {
          this.articles = res.filter(article => { //Filtro los que tengan stock disponible
            return article.stock > 0;
          })
        },
        err => this.alertService.openSnackBar(err.name)
      )
  }

}
