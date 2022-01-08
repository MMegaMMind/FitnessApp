import {
  Component,
  EventEmitter,
  Input,
  Output,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'schedule-controls',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['schedule-controls.component.scss'],
  template: `<div class="controls">
    <button type="button" (click)="moveDate(offset - 1)">
      <img src="assets/img/chevron-left.svg" alt="" />
    </button>
    <p>{{ selected | date: 'y MMMM d' }}</p>
    <button type="button" (click)="moveDate(offset + 1)">
      <img src="assets/img/chevron-right.svg" alt="" />
    </button>
  </div>`,
})
export class ScheduleControlsComponent {
  offset = 0;

  @Input()
  selected!: Date;

  @Output()
  move = new EventEmitter<number>();

  moveDate(offset: number) {
    this.offset = offset;
    this.move.emit(offset);
  }
}
