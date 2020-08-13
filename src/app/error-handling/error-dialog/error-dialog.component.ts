import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface DialogData {
  message: string;
  status: number;
  errors: Array<object>;
}

@Component({
  selector: 'app-root',
  templateUrl: './error-dialog.component.html'
})
export class ErrorDialogComponent {
  title = 'Angular-Interceptor';
  constructor(
    public dialogRef: MatDialogRef<ErrorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {}

    onButtonClick(): void {
      this.dialogRef.close();
    }
  
}