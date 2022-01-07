import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { switchMap } from 'rxjs/operators';

import {
  Meal,
  MealsService,
} from 'src/health/shared/services/meals/meals.service';

@Component({
  selector: 'meal',
  providers: [MealsService],
  styleUrls: ['meal.component.scss'],
  template: `<div class="meal">
    <div class="meal__title">
      <h1>
        <img src="assets/img/food.svg" />
        <span>Create meal</span>
      </h1>
    </div>
    <div>
      <meal-form (create)="addMeal($event)"></meal-form>
    </div>
  </div> `,
})
export class MealComponent implements OnInit, OnDestroy {
  meal$?: Observable<Meal> | Observable<any>;
  subscription!: Subscription;

  constructor(
    private mealsService: MealsService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.subscription = this.mealsService.meals$.subscribe();
    this.meal$ = this.activeRoute.params.pipe(
      switchMap((param) => {
        return this.mealsService.getMeal(param.id);
      })
    );
  }

  ngOnDestroy() {}

  async addMeal(event: Meal) {
    await this.mealsService.addMeal(event);
    console.log('event', event);
    //REDIRECT
    this.backToMeals();
  }

  backToMeals() {
    this.router.navigate(['meals']);
  }
}
{
}
