import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import {
  Meal,
  MealsService,
} from 'src/health/shared/services/meals/meals.service';
import { Store } from 'store';

@Component({
  selector: 'meals',
  styleUrls: ['meals.component.scss'],
  providers: [MealsService],
  templateUrl: 'meals.component.html',
})
export class MealsComponent implements OnInit, OnDestroy {
  meals$!: Observable<Meal[]>;
  subscription!: Subscription;

  constructor(private store: Store, private mealsService: MealsService) {}

  ngOnInit() {
    this.meals$ = this.store.select<Meal[]>('meals');
    this.subscription = this.mealsService.meals$.subscribe();
    console.log(this.meals$);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  removeMeal(event: Meal) {
    this.mealsService.removeMeal(event);
  }
}
