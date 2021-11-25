import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { Strategy } from "src/app/components/strategies/strategy";
import { ArticleService } from "src/app/services/article/article.service";
import { AlertService } from "src/app/services/alert-service/alert.service";

export class EditArticleStrategy extends Strategy{

    constructor(
        protected articleService: ArticleService)
    {
        super();
        this.title = 'EDIT ARTICLE';
        this.route = '/articles';
    }

    sendItem(articleForm: FormGroup, id: number){
        return this.articleService.editArticle(id, articleForm.value);
    }
}