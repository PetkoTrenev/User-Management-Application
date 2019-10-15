import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {UserListComponent} from './components/user-list/user-list.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {CreateUserComponent} from './components/create-user/create-user.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BsDatepickerModule} from 'ngx-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ViewUserDetailsComponent} from './components/view-user-details/view-user-details.component';
import {EditUserComponent} from './components/edit-user/edit-user.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [AppComponent, UserListComponent, CreateUserComponent, ViewUserDetailsComponent, EditUserComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, NgxPaginationModule, NgbModule,
    ReactiveFormsModule, FormsModule, BsDatepickerModule.forRoot(), BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
