import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs'; // using from 'rxjs/BehaviorSubject' fails in prod build

import { distinctUntilChanged } from 'rxjs/operators';

export interface State {
  user?: [];
  [key: string]: any;
}
const state: State = {
  user: undefined,
};

export class Store {
  // it's used BehaviourSubject because its needed to deliver an initial value to subscribers)
  private subject = new BehaviorSubject<State>(state);
  // it's used asObservable() helper method, so that it cant be passed other values, but only subscribe to it like to a simple observable

  private store = this.subject.asObservable().pipe(distinctUntilChanged());

  get value() {
    return this.subject.value;
  }

  //   select<T>(name: string): Observable<T> {
  //     return this.store.pipe(map(res));
  //}

  set(name: string, state: any) {
    this.subject.next({ ...this.value, [name]: state });
  }
}
