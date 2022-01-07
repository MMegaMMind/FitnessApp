import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'list-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['list-item.component.scss'],
  template: ` <div class="list-item">
    <a [routerLink]="getRoute(item)">
      <p class="list-item__name">{{ item.payload.val().name }}</p>
      <p class="list-ingredients">
        <span> {{ item.payload.val().ingredients }}</span>
      </p>
    </a>

    <div class="list-item__delete" *ngIf="toggled">
      <p>Delete item?</p>
      <button class="confirm" type="button" (click)="removeItem()">Yes</button>
      <button class="cancel " type="button" (click)="toggle()">No</button>
    </div>

    <button class="trash" type="button" (click)="toggle()">
      <img src="assets/img/remove.svg" alt="" />
    </button>
  </div>`,
})
export class ListItemComponent {
  toggled = false;

  @Input()
  item: any;

  @Output()
  remove = new EventEmitter<any>();

  constructor() {}

  toggle() {
    this.toggled = !this.toggled;
  }

  removeItem() {
    this.remove.emit(this.item);
  }

  getRoute(item: any) {
    return [
      `../${item.payload.val().ingredients ? 'meals' : 'workouts'}`,
      item.key,
    ];
  }
}
