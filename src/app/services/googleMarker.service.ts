import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs';
@Injectable()
export class GoogleMarkerService {

  private messageSource = new BehaviorSubject<object>({});
  currentMessage = this.messageSource.asObservable();
  constructor() {}

  changeMessage(message: object) {
  	console.log('message received from marker', message);
    this.messageSource.next(message)
  }

}
// export class GoogleMarkerService {
//     private subject = new Subject<any>();

//     public sendMessage(message: any) {
//         this.subject.next(message);
//     }

//     public clearMessage() {
//         this.subject.next();
//     }

//     public getMessage(): Observable<any> {
//     	const message = this.subject.asObservable().subscribe(function(message){ return });
//     	console.log('message from marker', message);
//         return this.subject.asObservable();
//     }
// }