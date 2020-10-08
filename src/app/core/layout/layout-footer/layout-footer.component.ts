import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-layout-footer',
  templateUrl: './layout-footer.component.html',
  styleUrls: ['./layout-footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutFooterComponent implements OnInit {
  @Input() appDescription?: string;
  @Input() appVersion?: string;

  ngOnInit(): void {}
}
