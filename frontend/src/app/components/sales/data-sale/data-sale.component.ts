import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-data-sale',
  templateUrl: './data-sale.component.html',
  styleUrls: ['./data-sale.component.css']
})
export class DataSaleComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<DataSaleComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  public sale: any;

  ngOnInit(): void {
    this.sale = this.data.sale;
  }

}
