import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './employees.component';
import { CoreModule } from '../../core/core.module';
import { RoleGuard } from '../../core/guards/role.guard';
import { TableDialogComponent } from './table.dialog.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatFormFieldModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatSlideToggleModule,
  MatSortModule,
  MatTableModule,
  MatToolbarModule,
  MatInputModule,
  MatButtonModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';

export const routes: Routes = [{ path: '', component: EmployeesComponent, canActivate: [RoleGuard] }];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MatTableModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatButtonModule,
    RouterModule.forChild(routes),
    CoreModule
  ],
  declarations: [EmployeesComponent, TableDialogComponent],
  entryComponents: [TableDialogComponent]
})
export class EmployeesModule {}
