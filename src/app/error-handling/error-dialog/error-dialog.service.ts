import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from './error-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorDialogService {
  public isDialogOpen: Boolean = false;
  constructor(public dialog: MatDialog) { }
  openDialog(data: object): any {
      if (this.isDialogOpen) {
          return false;
      }
      this.isDialogOpen = true;
      const dialogRef = this.dialog.open(ErrorDialogComponent, {
          width: '300px',
          data: data
      });

      dialogRef.afterClosed().subscribe(result => {
          this.isDialogOpen = false;
      });
  }

}