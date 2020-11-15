import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-forgot-password-dialog',
  templateUrl: './forgot-password-dialog.component.html',
  styleUrls: ['./forgot-password-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordDialogComponent implements OnInit {
  constructor(
    private readonly dialogRef: MatDialogRef<ForgotPasswordDialogComponent>
  ) {}

  ngOnInit(): void {}

  onClose(): void {
    this.dialogRef.close();
  }
}
