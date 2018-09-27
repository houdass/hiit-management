import { fromEvent as observableFromEvent } from 'rxjs';

import { distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { User } from '../../models/user.model';
import { AllowedUserService } from '../../services/allowedUser.service';
import { AllowedUser } from '../../models/allowedUser.model';
import { TableDialogComponent } from './table.dialog.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  displayedColumns = ['email', 'isAdmin', 'isActive'];
  dataSource: MatTableDataSource<User> | null;
  user: AllowedUser;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;
  @ViewChild('filter')
  filter: ElementRef;
  isLoadingResults = true;

  constructor(private allowedUserService: AllowedUserService, public dialog: MatDialog) {}

  ngOnInit() {
    this.allowedUserService.getAll().subscribe(users => {
      console.log(users);
      this.dataSource = new MatTableDataSource(users);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.isLoadingResults = false;
    });
    observableFromEvent(this.filter.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged()
      )
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }

  openDialog() {
    const dialogRef = this.dialog.open(TableDialogComponent, {
      width: '250px',
      data: { name: this.user }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      this.addUser(result.email);
    });
  }

  addUser(email) {
    const allowedUser = new AllowedUser(email, true, false);
    this.allowedUserService.add(allowedUser);
  }

  removeUser(key) {
    this.allowedUserService.remove(key);
  }
}
