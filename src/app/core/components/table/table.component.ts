import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { User } from '../../models/user.model';
import { AllowedUserService } from '../../services/allowedUser.service';
import { AllowedUser } from '../../models/allowedUser.model';
import { catchError, map, switchMap } from 'rxjs/operators';
import { merge, of } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'email'];
  dataSource: MatTableDataSource<User>;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;
  @ViewChild('filter')
  filter: ElementRef;
  isLoadingResults = true;
  resultsLength = 0;
  data = null;

  constructor(private allowedUserService: AllowedUserService) {}

  ngOnInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        switchMap(() => {
          this.isLoadingResults = true;
          return this.allowedUserService.getAll();
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.resultsLength = data.length;

          return data;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          return of([]);
        })
      )
      .subscribe(data => (this.data = data));

    this.allowedUserService.getAll().subscribe(users => {
      console.log(users);
      this.dataSource = new MatTableDataSource(users);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addUser() {
    const user = new AllowedUser(1, 'houd.youness@gmail.com');
    this.allowedUserService.add(user);
  }

  removeUser(key) {
    this.allowedUserService.remove(key);
  }
}
