import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

//components
import { AuthFormComponent } from './components/auth-form/auth-form.component';

//services
import { AuthService } from './services/auth/auth.service';

export const ROUTES: Routes = [{ path: '', component: AuthFormComponent }];

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [AuthFormComponent],
  exports: [AuthFormComponent],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: SharedModule,
      providers: [AuthService],
    };
  }
}
