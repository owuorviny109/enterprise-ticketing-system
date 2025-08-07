import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  showSuccess(title: string, message: string): void {
    this.showToast('success', title, message);
  }

  showError(title: string, message: string): void {
    this.showToast('error', title, message);
  }

  showInfo(title: string, message: string): void {
    this.showToast('info', title, message);
  }

  showWarning(title: string, message: string): void {
    this.showToast('warning', title, message);
  }

  private showToast(type: 'success' | 'error' | 'info' | 'warning', title: string, message: string): void {
    const toastEvent = new CustomEvent('app-toast', {
      detail: { type, title, message }
    });
    window.dispatchEvent(toastEvent);
  }
}
