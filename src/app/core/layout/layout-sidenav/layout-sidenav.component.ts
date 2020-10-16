import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

import { User } from '../../user.service';

@Component({
  selector: 'app-layout-sidenav',
  templateUrl: './layout-sidenav.component.html',
  styleUrls: ['./layout-sidenav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutSidenavComponent implements OnInit {
  @Input() sidenav!: MatSidenav;
  @Input() user?: User;
  @Input() destinations?: { path: string; icon: string; name: string }[];

  ngOnInit(): void {}

  trackByIndex(index: number): number {
    return index;
  }
}
