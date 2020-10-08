import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

import { User } from '../../user.service';

@Component({
  selector: 'app-layout-user-button',
  templateUrl: './layout-user-button.component.html',
  styleUrls: ['./layout-user-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutUserButtonComponent implements OnInit {
  @Input() user?: User;

  ngOnInit(): void {}
}
