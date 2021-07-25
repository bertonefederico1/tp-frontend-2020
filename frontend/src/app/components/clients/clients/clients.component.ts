import { Component, OnInit } from '@angular/core';

import { ClientService } from '../../../services/client/client.service';

import { Client } from '../../../models/client/client';
import { ErrorService } from 'src/app/services/error-service/error.service';

@Component({
  selector: 'app-client',
  templateUrl: './clients.component.html'
})
export class ClientsComponent implements OnInit {

  clients: Client[];

  constructor(
    public clientService: ClientService,
    private errorService: ErrorService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.clientService.getClients()
      .subscribe(
        res => this.clients = res,
        err => this.errorService.openSnackBar(err.name)
      );
  }

  deleteClient(id: number){
    if (confirm('Seguro que desea eliminar el cliente?')){
      this.clientService.deleteClient(id)
        .subscribe(
          res => this.getAll(),
          err => this.errorService.openSnackBar(err.name)
        );
    }
  }

}
