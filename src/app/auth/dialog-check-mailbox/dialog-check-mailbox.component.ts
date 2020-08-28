import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-check-mailbox',
  templateUrl: './dialog-check-mailbox.component.html',
  styleUrls: ['./dialog-check-mailbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogCheckMailboxComponent implements OnInit {
  constructor(
    private readonly dialogRef: MatDialogRef<DialogCheckMailboxComponent>
  ) {}

  ngOnInit(): void {}

  onClose(): void {
    this.dialogRef.close();
  }
}
