import { fromEvent as observableFromEvent } from 'rxjs';

import { distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { User } from '../../core/models/user.model';
import { AllowedUserService } from '../../core/services/allowedUser.service';
import { AllowedUser } from '../../core/models/allowedUser.model';
import { TableDialogComponent } from './table.dialog.component';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  displayedColumns = ['email', 'isActive'];
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
      data: {}
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data && data.email) {
        const user = new AllowedUser(data.email, false);
        this.addUser(user);
      }
    });
  }

  addUser(user: AllowedUser) {
    this.allowedUserService.add(user);
  }
}
