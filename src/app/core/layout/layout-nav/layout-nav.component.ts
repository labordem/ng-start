import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

import { User } from '../../user.service';
import { Destination } from '../layout.component';

@Component({
  selector: 'app-layout-nav',
  templateUrl: './layout-nav.component.html',
  styleUrls: ['./layout-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutNavComponent implements OnInit {
  @Input() sidenav?: MatSidenav;
  @Input() appTitle?: string;
  @Input() user?: User;
  @Input() destinations?: { path: string; icon: string; name: string }[];

  ngOnInit(): void {}

  trackByIndex(index: number): number {
    return index;
  }
}
