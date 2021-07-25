import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorService } from 'src/app/services/error-service/error.service';
import { Client } from '../../../models/client/client';
import { ClientService } from '../../../services/client/client.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html'
})
export class AddClientComponent {

  client: Client;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private errorService: ErrorService
    ) {
    this.client = new Client();
  }


  addClient(){
    this.clientService.addClient(this.client)
      .subscribe(
        res => this.router.navigate(['/clients']),
        err => this.errorService.openSnackBar(err.name)
      );
  }

  cancel(){
    this.router.navigate(['/clients']);
  }

  validate(){
    if (this.client.dni === undefined || this.client.apellido === undefined || this.client.nombre === undefined){
      alert('Complete dni, nombre y apellido');
    }
    else{
      if (this.client.dni === '' || this.client.apellido === '' || this.client.nombre === ''){
        alert('Complete dni, nombre y apellido');
      }
      else{
        this.addClient();
      }
    }
  }
}
