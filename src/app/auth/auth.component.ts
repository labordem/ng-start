import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent implements OnInit {
  errorMessage = '';

  constructor(private readonly changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {}

  onErrorHappens(errorMessage: string): void {
    this.errorMessage = errorMessage;
    this.changeDetectorRef.detectChanges();
    setTimeout(() => {
      this.errorMessage = '';
    }, 500);
  }
}
