import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { UserListComponent } from './components/user-list/user-list.component';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [AppComponent, NavigationComponent, UserListComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, NgxPaginationModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
