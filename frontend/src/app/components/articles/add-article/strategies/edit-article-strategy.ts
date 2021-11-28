import { FormGroup } from "@angular/forms";
import { Strategy } from "src/app/components/strategies/strategy";
import { ArticleService } from "src/app/services/article/article.service";

export class EditArticleStrategy extends Strategy{

    constructor(
        protected articleService: ArticleService)
    {
        super();
        this.title = 'EDIT ARTICLE';
        this.route = '/articles';
    }

    sendItem(articleForm: FormGroup, id: number){
        return this.articleService.editArticle(id, articleForm);
    }
}