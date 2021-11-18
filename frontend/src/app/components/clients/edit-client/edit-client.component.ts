import { Component, OnInit } from '@angular/core';
import { Client } from '../../../models/client/client';
import { ActivatedRoute, Router } from '@angular/router';

import { ClientService } from '../../../services/client/client.service';
import { ErrorService } from 'src/app/services/error-service/error.service';

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
    private errorService: ErrorService
    ) {
    this.selectedClient = new Client();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( (params) => {this.idSupplier = params.id; });
    this.getClient();
  }

  getClient(){
    this.clientService.getById(this.idSupplier)
      .subscribe(
        res => this.selectedClient = res,
        err => this.errorService.openSnackBar(err.name)
      );
  }

  editClient(){
    delete this.selectedClient.id_cliente;
    this.clientService.editClient(this.idSupplier, this.selectedClient)
      .subscribe(
        res => this.router.navigate(['/clients']),
        err => this.errorService.openSnackBar(err.name)
      );
  }

  cancel(){
    this.errorService.confirm('Are you sure you want to cancel?').afterClosed()
      .subscribe(
        action => action ? this.router.navigate(['/clients']) : null
      );
  }

  validate(){
    if (this.selectedClient.dni === '' || this.selectedClient.apellido === '' || this.selectedClient.nombre === ''){
      this.errorService.openSnackBar('Complete dni, nombre y apellido');
    }
    else{
      this.editClient();
    }
  }
}
