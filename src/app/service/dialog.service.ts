import {MatDialog, MatDialogConfig} from '@angular/material';
import {MatConfirmDialogComponent} from '../components/mat-confirm-dialog/mat-confirm-dialog.component';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  openConfirmDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.panelClass = 'confirm-dialog-container';
    dialogConfig.width = '60%';
    return this.dialog.open(MatConfirmDialogComponent, dialogConfig);
  }
}
