import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';

import { Store } from 'store';
import { AuthService, User } from 'src/auth/shared/services/auth/auth.service';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  template: `
    <div class="wrapper">
      <router-outlet></router-outlet>
    </div>
  `,
})
export class AppComponent {
  title = 'Fitness-App';

  user$!: Observable<User>;
  subscription!: Subscription;

  constructor(private store: Store, private authService: AuthService) {}
}
