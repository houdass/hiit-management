import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  /* { path: '', loadChildren: './pages/content/content.module#ContentModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginModule' } */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
