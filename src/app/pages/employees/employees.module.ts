import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './employees.component';
import { CoreModule } from '../../core/core.module';

export const routes: Routes = [{ path: '', component: EmployeesComponent }];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), CoreModule],
  declarations: [EmployeesComponent],
  exports: []
})
export class EmployeesModule {}
