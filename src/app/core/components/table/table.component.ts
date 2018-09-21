import { fromEvent as observableFromEvent, Observable } from 'rxjs';

import { distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ExampleDatabase } from './helpers.data';
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
  exampleDatabase = new ExampleDatabase();
  selection = new SelectionModel<string>(true, []);
  dataSource: MatTableDataSource<User> | null;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;
  @ViewChild('filter')
  filter: ElementRef;

  constructor(private userService: UserService) {}

  ngOnInit() {
    // this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);

    this.userService.getAll().subscribe(users => {
      console.log(users);
      this.dataSource = new MatTableDataSource(users);
      this.dataSource.sort = this.sort;
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

  masterToggle() {
    if (!this.dataSource) {
      return;
    }

    if (this.isAllSelected()) {
      this.selection.clear();
    } else if (this.filter.nativeElement.value) {
      this.dataSource.data.forEach(data => this.selection.select(data.id));
    } else {
      this.exampleDatabase.data.forEach(data => this.selection.select(data.id));
    }
  }

  addUser() {
    const user = new User('Youness', 'hou', 'barca', new Date().toString(), '1');
    this.userService.addUser(user);
  }

  removeUser(key) {
    this.userService.removeUser(key);
  }
}
