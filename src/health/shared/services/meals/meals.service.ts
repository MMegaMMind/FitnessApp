import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, tap } from 'rxjs';

import { AuthService } from 'src/auth/shared/services/auth/auth.service';
import { Store } from 'store';

export interface Meal {
  name: string;
  ingredients: string[];
  timestamp: number;
  $key: string;
  $exists?: () => boolean;
}

@Injectable()
export class MealsService {
  meals$: Observable<Meal[]> | Observable<any[]> = this.db
    .list(`meals/${this.uid}`)
    .snapshotChanges()
    .pipe(
      tap((next) => {
        console.log('next', next);
        this.store.set('meals', next);
      })
    );

  constructor(
    private store: Store,
    private db: AngularFireDatabase,
    private authService: AuthService
  ) {}

  get uid() {
    return this.authService.user?.uid;
  }

  addMeal(meal: Meal) {
    return this.db.list(`meals/${this.uid}`).push(meal);
  }
}
