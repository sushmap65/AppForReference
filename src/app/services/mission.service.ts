import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MissionService {
    private subject = new Subject<any>();

    public sendMessage(message: any) {
        this.subject.next(message);
    }

    public clearMessage() {
        this.subject.next();
    }

    public getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}
