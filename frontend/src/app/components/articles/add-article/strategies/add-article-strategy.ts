import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { Strategy } from "src/app/components/strategies/strategy";
import { ArticleService } from "src/app/services/article/article.service";
import { AlertService } from "src/app/services/alert-service/alert.service";

export class AddArticleStrategy extends Strategy{

    constructor(
        protected articleService: ArticleService)
    {
        super();
        this.title = 'ADD ARTICLE';
        this.route = '/articles';
    }

    sendItem(articleForm: FormGroup): Observable<any>{
        return this.articleService.addArticle(articleForm.value);
    }
}