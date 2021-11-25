import { Component, OnInit } from '@angular/core';
import { Client } from '../../../models/client/client';
import { ActivatedRoute, Router } from '@angular/router';

import { ClientService } from '../../../services/client/client.service';
import { AlertService } from 'src/app/services/alert-service/alert.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html'
})
export class EditClientComponent implements OnInit {

  selectedClient: Client;
  idSupplier: number;

  constructor(
    private clientService: ClientService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
    ) {
    this.selectedClient = new Client();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => this.idSupplier = params.id);
    this.getClient();
  }

  getClient(){
    this.clientService.getById(this.idSupplier)
      .subscribe(
        res => this.selectedClient = res,
        err => this.alertService.openSnackBar(err.name)
      );
  }

  editClient(){
    delete this.selectedClient.id_cliente;
    this.clientService.editClient(this.idSupplier, this.selectedClient)
      .subscribe(
        () => this.router.navigate(['/clients']),
        err => this.alertService.openSnackBar(err.name)
      );
  }

  async cancel(){
    if (await this.alertService.confirm('Are you sure you want to cancel?')) {
      this.router.navigate(['/clients']);
    }
  }

  validate(){
    if (this.selectedClient.dni === '' || this.selectedClient.apellido === '' || this.selectedClient.nombre === ''){
      this.alertService.openSnackBar('Complete dni, name and surname');
    }
    else{
      this.editClient();
    }
  }
}
