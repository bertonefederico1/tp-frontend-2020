import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: []
})
export class AlertMessageComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AlertMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public params: any
  ) { }

  message: string

  ngOnInit(): void {
    this.message = this.params.message;
  }

 

  buttonPressed(action: boolean) {
    this.dialogRef.close(action);
  }

}
