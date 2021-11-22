import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { AlertMessageComponent } from 'src/app/components/shared/alert-message/alert-message.component';

@Injectable({
  providedIn: 'root'
})
export class alertService {

  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  private snackBarConfig: MatSnackBarConfig = {
    duration: 2500,
    verticalPosition: 'top'
  }

  openSnackBar(message: string, action: string = 'Close') {
    return this.snackBar.open(message, action, this.snackBarConfig);
  }

  confirm(message: string) {
    return this.dialog.open(AlertMessageComponent, {
      width: '35%',
      height: '45%',
      disableClose: true,
      data: { message }
    });
  }

}
