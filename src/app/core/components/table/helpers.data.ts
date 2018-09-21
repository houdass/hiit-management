import { merge as observableMerge, BehaviorSubject, Observable } from 'rxjs';

import { map } from 'rxjs/operators';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { Injectable } from '@angular/core';

import { User } from '../../models/user.model';

/** Constants used to fill up our data base. */
const COLORS = [
  'maroon',
  'red',
  'orange',
  'yellow',
  'olive',
  'green',
  'purple',
  'fuchsia',
  'lime',
  'teal',
  'aqua',
  'blue',
  'navy',
  'black',
  'gray'
];
const NAMES = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth'
];

/** An example database that the data source uses to retrieve data for the table. */
@Injectable({
  providedIn: 'root'
})
export class ExampleDatabase {
  /** Stream that emits whenever the data has been modified. */
  dataChange: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  get data(): User[] {
    return this.dataChange.value;
  }

  constructor() {
    // Fill up the database with 100 users.

    for (let i = 0; i < 100; i++) {
      this.addUser();
    }
  }

  /** Adds a new user to the database. */
  addUser() {
    const copiedData = this.data.slice();
    copiedData.push(this.createNewUser());
    this.dataChange.next(copiedData);
  }

  /** Builds and returns a new User. */
  private createNewUser() {
    const firstname = NAMES[Math.round(Math.random() * (NAMES.length - 1))];
    const lastname = NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0);

    return new User(
      (this.data.length + 1).toString(),
      firstname,
      lastname,
      Math.round(Math.random() * 100).toString(),
      COLORS[Math.round(Math.random() * (COLORS.length - 1))]
    );
  }
}

/**
 * Data source to provide what data should be rendered in the table. Note that the data source
 * can retrieve its data in any way. In this case, the data source is provided a reference
 * to a common data base, ExampleDatabase. It is not the data source's responsibility to manage
 * the underlying data. Instead, it only needs to take the data and send the table exactly what
 * should be rendered.
 */
export class ExampleDataSource extends DataSource<any> {
  _filterChange = new BehaviorSubject('');
  get filter(): string {
    return this._filterChange.value;
  }
  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: User[] = [];
  renderedData: User[] = [];

  constructor(private _exampleDatabase: ExampleDatabase, private _paginator: MatPaginator, private _sort: MatSort) {
    super();

    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => (this._paginator.pageIndex = 0));
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<User[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    return observableMerge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this._exampleDatabase.data.slice().filter((item: User) => {
          const searchStr = (item.lastname + item.id).toLowerCase();
          return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
        });

        // Sort filtered data
        const sortedData = this.sortData(this.filteredData.slice());

        // Grab the page's slice of the filtered sorted data.
        const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
        this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
        return this.renderedData;
      })
    );
  }

  disconnect() {}

  /** Returns a sorted copy of the database data. */
  sortData(data: User[]): User[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'userId':
          [propertyA, propertyB] = [a.id, b.id];
          break;
        case 'lastname':
          [propertyA, propertyB] = [a.lastname, b.lastname];
          break;
        case 'firstname':
          [propertyA, propertyB] = [a.firstname, b.firstname];
          break;
        case 'category':
          [propertyA, propertyB] = [a.category, b.category];
          break;
        case 'integrationDate':
          [propertyA, propertyB] = [a.integrationDate, b.integrationDate];
          break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction == 'asc' ? 1 : -1);
    });
  }
}
