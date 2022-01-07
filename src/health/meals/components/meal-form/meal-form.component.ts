import {
  ChangeDetectionStrategy,
  Component,
  Output,
  EventEmitter,
} from '@angular/core';

import {
  FormArray,
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  Form,
} from '@angular/forms';

import { Meal } from 'src/health/shared/services/meals/meals.service';

@Component({
  selector: 'meal-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['meal-form.component.scss'],
  templateUrl: 'meal-form.component.html',
})
export class MealFormComponent {
  @Output()
  create = new EventEmitter<Meal>();

  form = this.fb.group({
    name: ['', Validators.required],
    ingredients: this.fb.array(['']),
  });

  constructor(private fb: FormBuilder) {}

  get required() {
    return (
      this.form.get('name')?.hasError('required') &&
      this.form.get('name')?.touched
    );
  }

  get ingredients() {
    return this.form.get('ingredients') as FormArray;
  }

  addIngredient() {
    this.ingredients.push(new FormControl(''));
  }

  removeIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  createMeal() {
    if (this.form.valid) {
      this.create.emit(this.form.value);
    }
  }
}