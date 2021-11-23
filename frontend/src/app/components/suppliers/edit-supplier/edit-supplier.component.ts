import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SupplierService } from 'src/app/services/supplier/supplier.service';
import { Supplier } from 'src/app/models/supplier/Supplier';
import { AlertService } from 'src/app/services/alert-service/alert.service';

@Component({
  selector: 'app-edit-supplier',
  templateUrl: './edit-supplier.component.html'
})
export class EditSupplierComponent implements OnInit {

  selectedSupplier: Supplier;
  idSupplier: number;

  constructor(
    private supplierService: SupplierService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
  ) {
    this.selectedSupplier = new Supplier();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( (params) => {this.idSupplier = params.id; });
    this.getSupplier();
  }

  getSupplier(){
    this.supplierService.getById(this.idSupplier)
      .subscribe(
        res => this.selectedSupplier = res,
        err => this.alertService.openSnackBar(err.name)
      );
  }

  editSupplier(){
    delete this.selectedSupplier.id_proveedor;
    this.supplierService.editSupplier(this.idSupplier, this.selectedSupplier)
      .subscribe(
        res => this.router.navigate(['/suppliers']),
        err => this.alertService.openSnackBar(err.name)
      );
  }

  async cancel(){
    if (await this.alertService.confirm('Are you sure you want to cancel?')){
      this.router.navigate(['/suppliers']);
    }
  }

  validate(){
    if (!this.selectedSupplier.cuit || !this.selectedSupplier.razon_social){
      this.alertService.openSnackBar('Complete cuit and business name');
    }
    else{
      this.editSupplier();
    }
  }
}
