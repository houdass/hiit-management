import { fromEvent as observableFromEvent } from 'rxjs';

import { distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  showNavListCode;
  displayedColumns = ['id', 'lastname', 'firstname', 'category', 'integrationDate', 'actions'];
  selection = new SelectionModel<string>(true, []);
  dataSource: MatTableDataSource<User> | null;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;
  @ViewChild('filter')
  filter: ElementRef;
  isLoadingResults = true;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getAll().subscribe(users => {
      console.log(users);
      this.dataSource = new MatTableDataSource(users);
      this.dataSource.sort = this.sort;
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

  isAllSelected(): boolean {
    if (!this.dataSource) {
      return false;
    }
    if (this.selection.isEmpty()) {
      return false;
    }

    if (this.filter.nativeElement.value) {
      return this.selection.selected.length === this.dataSource.data.length;
    } else {
      return this.selection.selected.length === this.exampleDatabase.data.length;
    }
  }

  addUser() {
    const user = new User('Youness', 'hou', 'barca', new Date().toString(), '1');
    this.userService.add(user);
  }

  removeUser(key) {
    this.userService.remove(key);
  }
}
