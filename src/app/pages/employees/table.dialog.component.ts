import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-table-dialog',
  templateUrl: 'table.dialog.component.html'
})
export class TableDialogComponent {
  constructor(public dialogRef: MatDialogRef<TableDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
