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
  templateUrl: 'meal.component.html',
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
      switchMap((params) => {
        return this.mealsService.getMeal(params['id']);
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  async addMeal(event: Meal) {
    await this.mealsService.addMeal(event);
    //REDIRECT
    this.backToMeals();
  }

  async updateMeal(event: Meal) {
    const key = this.activeRoute.snapshot.params['id'];
    await this.mealsService.updateMeal(key, event);
    this.backToMeals();
  }

  async removeMeal(event: Meal) {
    const key = this.activeRoute.snapshot.params['id'];
    await this.mealsService.removeMeal(key);
    this.backToMeals();
  }

  backToMeals() {
    this.router.navigate(['meals']);
  }
}
