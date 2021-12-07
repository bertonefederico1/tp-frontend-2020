import { ArticleSupplier } from '../article-supplier/article-supplier';

export class Supplier {
    supplierID: number;
    cuit: string;
    businessName: string;
    city: string;
    address: string;
    telephoneNumber: string;
    suppliersArticles: ArticleSupplier;
}
