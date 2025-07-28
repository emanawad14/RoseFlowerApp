import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private emailSignal = signal<string>('');

  setEmail(email: string) {
    this.emailSignal.set(email);
  }

  getEmail() {
    return this.emailSignal();
  }

  clearEmail() {
    this.emailSignal.set('');
  }
}
