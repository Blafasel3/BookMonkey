import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { CanNavigateToAdminGuard } from './can-navigate-to-admin.guard';
import { AdminModule } from './admin/admin.module';
import { BookModule } from './book/book.module';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'books',
    loadChildren: 'app/book/book.module#BookModule' // activates preloading (lazy loading)
  },
  {
    path: 'admin',
    loadChildren: 'app/admin/admin.module#AdminModule', // activates preloading (lazy loading)
    canActivate: [CanNavigateToAdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules // loads modules part by part, but main module is loaded first
  })],
  exports: [
    RouterModule
  ],
  providers: [
    CanNavigateToAdminGuard
  ]
})
export class AppRoutingModule { }
