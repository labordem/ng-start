import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent implements OnInit {
  hasError = false;

  ngOnInit(): void {}

  onErrorHappens(hasError: boolean): void {
    this.hasError = hasError;
  }
}
