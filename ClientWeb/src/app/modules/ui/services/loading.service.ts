import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private statusSource = new BehaviorSubject<boolean>(false);
  public status = this.statusSource.asObservable();

  showHide(command: boolean) {
    this.statusSource.next(command);
  }
}
