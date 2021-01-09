import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  getItemInStorage(key: string): unknown {
    const stringValue = localStorage.getItem(key) as string;
    const value = (JSON.parse(stringValue) as unknown) ?? undefined;
    console.info(
      value !== undefined ? `💾 get: ${key}` : `💾 get: ${key} (${value})`,
    );

    return value;
  }

  setItemInStorage(key: string, value: unknown): void {
    localStorage.setItem(key, JSON.stringify(value));
    console.info(`💾 set: ${key}`);
  }

  removeItemInStorage(key: string): void {
    localStorage.removeItem(key);
    console.info(`💾 remove: ${key}`);
  }
}
