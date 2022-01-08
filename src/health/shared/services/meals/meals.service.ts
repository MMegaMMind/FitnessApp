import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map, Observable, tap } from 'rxjs';

import { AuthService } from 'src/auth/shared/services/auth/auth.service';
import { Store } from 'store';
import { filter } from 'rxjs';

import { of } from 'rxjs';

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

  getMeal(key: string) {
    if (!key) return of({});
    return this.store
      .select<Meal[]>('meals')
      .pipe(filter(Boolean))
      .pipe(map((meals: any[]) => meals.find((meal: any) => meal.key === key)));
  }

  addMeal(meal: any) {
    return this.db.list(`meals/${this.uid}`).push(meal);
  }

  updateMeal(key: string, meal: Meal) {
    return this.db.object(`meals/${this.uid}/${key}`).update(meal);
  }

  removeMeal(payload: any) {
    console.log('Payload', payload);
    console.log(this.uid);

    //passed this way because we are using snapshotChanges()
    //and as meal we return the payload that has the key inside and the other info
    return this.db
      .list(`meals/${this.uid}`)
      .remove(payload.key ? payload.key : payload);
  }
}
