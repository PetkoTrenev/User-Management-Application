import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserListComponent} from './components/user-list/user-list.component';
import {CreateUserComponent} from './components/create-user/create-user.component';
import {ViewUserDetailsComponent} from './components/view-user-details/view-user-details.component';
import {EditUserComponent} from './components/edit-user/edit-user.component';


const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: 'users', component: UserListComponent },
  { path: 'addUser', component: CreateUserComponent },
  { path: 'update/:id', component: EditUserComponent },
  { path: 'details/:id', component: ViewUserDetailsComponent }
  // { path: 'update/:id', component: UpdateEmployeeComponent },
  // { path: 'details/:id', component: EmployeeDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
