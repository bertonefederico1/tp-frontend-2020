import { Component, OnInit } from '@angular/core';
import { Client } from '../../../models/client/client';
import { ActivatedRoute, Router } from '@angular/router';

import { ClientService } from '../../../services/client/client.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

  selectedClient: Client;
  idSupplier: number;

  constructor(
    private clientService: ClientService,
    private activatedRoute: ActivatedRoute,
    private router: Router
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
        err => console.log(err)
      );
  }

  editClient(){
    delete this.selectedClient.id_cliente;
    this.clientService.editClient(this.idSupplier, this.selectedClient)
      .subscribe(
        res => this.router.navigate(['/clients']),
        err => console.log(err)
      );
  }

  cancel(){
    if (confirm('Desea cancelar?')){
      this.router.navigate(['/clients']);
    }
  }

  validate(){
    if (this.selectedClient.dni === '' || this.selectedClient.apellido === '' || this.selectedClient.nombre === ''){
      alert('Complete dni, nombre y apellido');
    }
    else{
      this.editClient();
    }
  }
}
