import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { Store } from 'store';

import { ScheduleService } from 'src/health/shared/services/schedule/schedule.service';

@Component({
  selector: 'schedule',
  styleUrls: ['schedule.component.scss'],
  templateUrl: 'schedule.component.html',
})
export class ScheduleComponent implements OnInit, OnDestroy {
  date$!: Observable<Date> | Observable<any>;
  subscriptions: Subscription[] = [];

  constructor(private store: Store, private scheduleService: ScheduleService) {}

  changeDate(date: Date) {
    this.scheduleService.updateDate(date);
  }

  ngOnInit() {
    this.date$ = this.store.select('date');

    this.subscriptions = [this.scheduleService.schedule$.subscribe()];
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
