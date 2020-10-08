import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

import { User } from '../../user.service';

@Component({
  selector: 'app-layout-nav',
  templateUrl: './layout-nav.component.html',
  styleUrls: ['./layout-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutNavComponent implements OnInit {
  @Input() user?: User;
  @Input() appTitle?: string;
  @Input() destinations?: { path: string; icon: string; name: string }[];
  @Input() sidenav!: MatSidenav;

  ngOnInit(): void {}

  trackByIndex(index: number): number {
    return index;
  }
}
