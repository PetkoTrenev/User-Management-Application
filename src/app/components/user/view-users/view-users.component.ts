import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {UserService} from '../../../service/user.service';
import {Router} from '@angular/router';
import {AddUserComponent} from '../add-user/add-user.component';
import {UpdateUserComponent} from '../update-user/update-user.component';
import {NotificationService} from '../../../service/notification.service';
import {DialogService} from '../../../service/dialog.service';
import {User} from '../../../model/user';

@Component({
  selector: 'app-user-view',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit, AfterViewInit {

  users: User[];
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'dateOfBirth', 'actions'];

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  totalPeople: number;

  constructor(private userService: UserService,
              private router: Router,
              private notificationService: NotificationService,
              private dialog: MatDialog,
              private dialogService: DialogService) { }

  ngOnInit() {
    this.getUsers();
    this.userService.usersSubject.subscribe((users) => {
      this.users = users;
      this.dataSource.data = this.users;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      data => {
        this.dataSource.data = data.users;
        this.totalPeople = data.totalElements;
      }
    );
  }

  deleteUser(id) {
    this.dialogService.openConfirmDialog().afterClosed().subscribe(result => {
        if (result) {
          this.userService.delete(id).subscribe(() => {
            this.notificationService.success('Success');
            this.getUsers();
          });
        }
    });
  }

  updateUser(id, user) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.data = user;
    this.dialog.open(UpdateUserComponent, dialogConfig);
  }

  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(AddUserComponent, dialogConfig);
  }
}
