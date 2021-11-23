import { Component, OnInit } from '@angular/core';

import { ClientService } from '../../../services/client/client.service';

import { Client } from '../../../models/client/client';
import { AlertService } from 'src/app/services/alert-service/alert.service';

@Component({
  selector: 'app-client',
  templateUrl: './clients.component.html'
})
export class ClientsComponent implements OnInit {

  clients: Client[];

  constructor(
    public clientService: ClientService,
    private alertService: AlertService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.clientService.getClients()
      .subscribe(
        res => this.clients = res,
        err => this.alertService.openSnackBar(err.name)
      );
  }

  deleteClient(id: number){
    this.alertService.confirm('Seguro que desea eliminar el cliente?').afterClosed()
      .subscribe(action => {
        if (action) {
          this.clientService.deleteClient(id)
          .subscribe(
            res => this.getAll(),
            err => this.alertService.openSnackBar(err.name)
          );
        }
      });
    }
    

}
