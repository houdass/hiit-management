import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardCrmComponent } from './dashboard-crm.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { DashboardWidgetModule } from '../dashboard-widget/dashboard-widget.module';
import { AuthGuard } from '../../core/guards/auth.guard';

export const appRoutes: Routes = [{ path: '', component: DashboardCrmComponent, canActivate: [AuthGuard] }];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(appRoutes), FlexLayoutModule, MatCardModule, DashboardWidgetModule],
  declarations: [DashboardCrmComponent]
})
export class DashboardCrmModule {}
