import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-email-dialog',
  templateUrl: './confirm-email-dialog.component.html',
  styleUrls: ['./confirm-email-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmEmailDialogComponent implements OnInit {
  constructor(
    private readonly dialogRef: MatDialogRef<ConfirmEmailDialogComponent>,
  ) {}

  ngOnInit(): void {}

  onClose(): void {
    this.dialogRef.close();
  }
}
