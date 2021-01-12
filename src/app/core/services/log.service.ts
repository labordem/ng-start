import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

enum LogSubject {
  intercept = '🎾 intercept',
  guard = '⚔️ guard',
  store = '💾 store',
}

@Injectable({
  providedIn: 'root',
})
export class LogService {
  areConsolesAllowed = !environment.production;

  info(subject: keyof typeof LogSubject, message: string): void {
    if (this.areConsolesAllowed) {
      console.info(`${LogSubject[subject]}: ${message}`);
    }
  }

  error(subject: keyof typeof LogSubject, message: string): void {
    if (this.areConsolesAllowed) {
      console.error(`${LogSubject[subject]}: ${message}`);
    }
  }
}
