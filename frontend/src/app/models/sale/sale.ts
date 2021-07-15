export class Sale {
    customerID: number;
    articles: any[];
    total: number;

    constructor(articles: any[], customerID: number, total: number) {
        this.customerID = customerID;
        this.articles = articles;
        this.total = total;
    }
}
