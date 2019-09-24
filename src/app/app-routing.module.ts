import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { ChemicalsComponent } from './pages/chemicals/chemicals.component';
import { OperatorsComponent } from './pages/operators/operators.component';
import { LoginComponent } from './pages/login/login.component';

import { AuthGuard } from './services/auth.guard';
import { DragAndDropComponent } from './pages/drag-and-drop/drag-and-drop.component';
import { InfiniteScrollingComponent } from './pages/infinite-scrolling/infinite-scrolling.component';
import { UsersComponent } from './pages/users/users.component';
import { OperatorDetailComponent } from './pages/operators/operator-detail/operator-detail.component';
import { AboutComponent } from './pages/about/about.component';

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'about', component: AboutComponent},
  {path: 'chemicals', component: ChemicalsComponent, canActivate: [AuthGuard]},
  {path: 'operators/:id', component: OperatorDetailComponent, canActivate: [AuthGuard]},
  {path: 'operators', component: OperatorsComponent, canActivate: [AuthGuard]},
  {path: 'users', component: UsersComponent, canActivate: [AuthGuard]},
  {path: 'drag-and-drop', component: DragAndDropComponent, canActivate: [AuthGuard]},
  {path: 'infinite-scrolling', component: InfiniteScrollingComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: [AuthGuard]
})
export class AppRoutingModule {
}
