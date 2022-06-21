import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { AuthGuard } from './shared/auth-guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: SignInComponent,
    pathMatch: 'full',
  },
  {
    path: '',
    redirectTo: 'uploader',
    pathMatch: 'full',
  },
   {
    path: '',
    component: AdminLayoutComponent, canActivate: [AuthGuard],
    children: [{
      path: '',
      loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
    }]
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
       useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
