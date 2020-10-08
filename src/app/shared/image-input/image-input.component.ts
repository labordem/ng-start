import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-image-input',
  templateUrl: './image-input.component.html',
  styleUrls: ['./image-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageInputComponent implements OnInit {
  @Input() image?: string;
  @Output() readonly newImage = new EventEmitter<string>();
  selectedNewImage$ = new Subject<string>();

  ngOnInit(): void {}

  async onImportImage($event: Event | DataTransfer): Promise<void> {
    const selectedNewImage = await this.getFileFromEvent($event);
    this.selectedNewImage$.next(selectedNewImage);
    this.newImage.emit(selectedNewImage);
  }

  private getFileFromEvent($event: Event | DataTransfer): Promise<string> {
    const event = $event as Event;
    event.preventDefault();
    const target = event.target as HTMLInputElement;
    const file = (target?.files ?? ($event as DataTransfer)?.files)[0];

    return new Promise((res, rej) => {
      const reader = new FileReader();
      reader.onload = (e) => res(e?.target?.result as string);
      reader.onerror = rej;
      reader.readAsDataURL(file);
    });
  }
}
