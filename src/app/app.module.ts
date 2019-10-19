import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {
  MatButtonModule,
  MatDatepickerModule, MatDialogRef,
  MatFormFieldModule,
  MatGridListModule, MatIconModule,
  MatInputModule,
  MatNativeDateModule, MatPaginatorModule, MatSnackBarModule, MatSortModule, MatTableModule,
  MatToolbarModule
} from '@angular/material';
import {UserService} from './service/user.service';
import {UserComponent} from './components/user/user.component';
import { UpdateUserComponent } from './components/user/update-user/update-user.component';
import {ViewUserComponent} from './components/user/view-user/view-user.component';
import {AddUserComponent} from './components/user/add-user/add-user.component';

// @ts-ignore
@NgModule({
  declarations: [AppComponent,
    UserComponent,
    AddUserComponent,
    UpdateUserComponent,
    ViewUserComponent
    ],
  imports: [BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    NgbModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,

    MatInputModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatSnackBarModule, MatTableModule, MatIconModule, MatSortModule, MatPaginatorModule,
    MatIconModule, FormsModule,
  ],
  providers: [UserService, {provide: MatDialogRef, useValue: {}}],
  bootstrap: [AppComponent],
  entryComponents: [AddUserComponent, UpdateUserComponent]
})
export class AppModule {
}
