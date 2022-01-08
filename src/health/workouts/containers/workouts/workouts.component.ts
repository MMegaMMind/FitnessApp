import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import {
  Workout,
  WorkoutsService,
} from 'src/health/shared/services/workouts/workouts.service';
import { Store } from 'store';

@Component({
  selector: 'workouts',
  styleUrls: ['workouts.component.scss'],

  templateUrl: 'workouts.component.html',
})
export class WorkoutsComponent implements OnInit, OnDestroy {
  workouts$!: Observable<Workout[]>;
  subscription!: Subscription;

  constructor(private store: Store, private workoutsService: WorkoutsService) {}

  ngOnInit() {
    this.workouts$ = this.store.select<Workout[]>('workouts');
    this.subscription = this.workoutsService.workouts$.subscribe();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  removeWorkout(event: Workout) {
    this.workoutsService.removeWorkout(event);
  }
}
