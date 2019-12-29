import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/// Notify users about errors and other helpful stuff
export interface Msg {
  content: string;
  style: string;
  urlImage?: string;
  title?: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  private msgSource = new BehaviorSubject<Msg | null>(null);

  msg = this.msgSource.asObservable();

  update(content: string, style: 'error' | 'info' | 'success' | 'warning' | 'welcome' | 'message', urlImage?: string, title?: string) {
    const msg: Msg = { content, style, urlImage, title };
    this.msgSource.next(msg);
  }

  clear() {
    this.msgSource.next(null);
  }
}
