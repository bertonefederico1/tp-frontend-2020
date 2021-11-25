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

  async deleteClient(id: number){
    if (await this.alertService.confirm("Are you sure you want to delete the customer?")) {
      this.clientService.deleteClient(id)
        .subscribe(
          () => this.getAll(),
          err => this.alertService.openSnackBar(err.name)
        );
    }
  }
    

}
