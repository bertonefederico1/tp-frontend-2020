import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Client } from 'src/app/models/client/client';
import { ClientService } from 'src/app/services/client/client.service';
import { AlertService } from 'src/app/services/alert-service/alert.service';

@Component({
  selector: 'app-show-customers',
  templateUrl: './show-customers.component.html',
  styleUrls: ['./show-customers.component.css']
})
export class ShowCustomersComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ShowCustomersComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private clientService: ClientService,
    private alertService: AlertService
  ) { }

  clients: Client[];
  filterString: string = '';

  ngOnInit(): void {
    this.getAll();
  }

  selectionCustomer(client: Client) {
    this.dialogRef.close(client);
  }

  getAll() {
    this.clientService.getClients()
      .subscribe(
        res => this.clients = res,
        err => this.alertService.openSnackBar(err.name)
      )
  }

}
