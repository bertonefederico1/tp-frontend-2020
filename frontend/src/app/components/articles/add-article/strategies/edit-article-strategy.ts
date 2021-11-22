import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { Strategy } from "src/app/components/strategies/strategy";
import { ArticleService } from "src/app/services/article/article.service";
import { AlertService } from "src/app/services/alert-service/alert.service";

export class EditArticleStrategy implements Strategy{

    constructor(
        private articleService: ArticleService,
        private router: Router,
        private alertService: AlertService ){
    }    

    sendItem(articleForm: FormGroup, id: number){
        this.articleService.editArticle(id, articleForm.value)
        .subscribe(
        res => this.router.navigate(['/articles']),
        err => this.alertService.openSnackBar(err.name)
        );
    }
}