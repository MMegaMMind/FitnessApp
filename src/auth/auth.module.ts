import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from './shared/shared.module';

//Importing FireBase Modules
//third-party modules
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

export const ROUTES: Routes = [
  {
    path: 'auth',
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'login' },
      //   { path: 'login', loadChildren: './login/login.module#LoginModule' }
      {
        path: 'login',
        loadChildren: () =>
          import('./login/login.module').then((m) => m.LoginModule),
      },
      //   { path: 'register', loadChildren: './register/register.module#RegisterModule',},
      {
        path: 'register',
        loadChildren: () =>
          import('./register/register.module').then((m) => m.RegisterModule),
      },
    ],
  },
];

export const firebaseConfig = {
  apiKey: 'AIzaSyAhLwywmgFRmYYgP2REku4jDuQHPU2NfkY',
  authDomain: 'fitness-app-af70a.firebaseapp.com',
  databaseURL:
    'https://fitness-app-af70a-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'fitness-app-af70a',
  storageBucket: 'fitness-app-af70a.appspot.com',
  messagingSenderId: '727376412882',
  appId: '1:727376412882:web:d981e14a01916555bc2d0b',
  measurementId: 'G-WTM4VHY164',
};

@NgModule({
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    SharedModule.forRoot(),
    RouterModule.forChild(ROUTES),
  ],
})
export class AuthModule {}
