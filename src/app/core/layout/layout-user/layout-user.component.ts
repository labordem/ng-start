import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { User, UserService } from '../../user.service';

@Component({
  selector: 'app-layout-user',
  templateUrl: './layout-user.component.html',
  styleUrls: ['./layout-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutUserComponent implements OnInit {
  @Input() user?: User;

  constructor(
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  onSignout(): void {
    this.userService.delete();
    this.router.navigate(['/auth/signin']);
  }

  onOpenDialog(templateRef: TemplateRef<Component>): void {
    this.dialog.open(templateRef);
  }

  onCloseDialog(): void {
    this.dialog.closeAll();
  }

  onNewImage(newImage: string): void {
    if (this.user !== undefined) {
      this.userService.update({ ...this.user, avatar: newImage });
    }
  }
}
