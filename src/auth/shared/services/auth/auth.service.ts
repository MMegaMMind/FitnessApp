import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { Store } from 'store';

import { tap } from 'rxjs/operators';

export interface User {
  email?: string | null;
  uid?: string;
  authenticated?: boolean;
}

@Injectable()
export class AuthService {
  auth$ = this.af.authState.pipe(
    tap((next) => {
      if (!next) {
        this.store.set('user', null);
      }
      const user: User = {
        email: next?.email,
        uid: next?.uid,
        authenticated: true,
      };
      this.store.set('user', user);
    })
  );

  constructor(private af: AngularFireAuth, private store: Store) {}

  createUser(email: string, password: string) {
    return this.af.createUserWithEmailAndPassword(email, password);
  }

  loginUser(email: string, password: string) {
    return this.af.signInWithEmailAndPassword(email, password);
  }
}
