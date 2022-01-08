import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map, Observable, tap } from 'rxjs';

import { AuthService } from 'src/auth/shared/services/auth/auth.service';
import { Store } from 'store';
import { filter } from 'rxjs';

import { of } from 'rxjs';

export interface Workout {
  name: string;
  type: string; //endurance | strength
  strength: any;
  endurance: any;
  timestamp: number;
  $key: string;
  $exists?: () => boolean;
}

@Injectable()
export class WorkoutsService {
  workouts$: Observable<Workout[]> | Observable<any[]> = this.db
    .list(`workouts/${this.uid}`)
    .snapshotChanges()
    .pipe(
      tap((next) => {
        this.store.set('workouts', next);
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

  getWorkout(key: string) {
    if (!key) return of({});
    return this.store
      .select<Workout[]>('workouts')
      .pipe(filter(Boolean))
      .pipe(
        map((workouts: any[]) =>
          workouts.find((workout: any) => workout.key === key)
        )
      );
  }

  addWorkout(workout: any) {
    return this.db.list(`workouts/${this.uid}`).push(workout);
  }

  updateWorkout(key: string, workout: Workout) {
    return this.db.object(`workouts/${this.uid}/${key}`).update(workout);
  }

  removeWorkout(payload: any) {
    //passed this way because we are using snapshotChanges()
    //and as meal we return the payload that has the key inside and the other info
    return this.db
      .list(`workouts/${this.uid}`)
      .remove(payload.key ? payload.key : payload);
  }
}
