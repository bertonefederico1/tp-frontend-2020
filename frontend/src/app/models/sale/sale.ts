export class Sale {
    customerID: number;
    articles: any[];

    constructor(articles: any[], customerID: number) {
        this.customerID = customerID;
        this.articles = articles;
    }
}
