import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {TableDashboardComponent} from './table-dashboard/table-dashboard.component';
import {TableComponent} from './table/table.component';
import {TableDetailComponent} from './table-detail/table-detail.component';

/**
 * Routes avaliable in application
 */
const routes: Routes = [
  {path: '', redirectTo: '/table', pathMatch: 'full'},
  {path: 'dashboard', component: TableDashboardComponent},
  {path: 'detail/:id', component: TableDetailComponent},
  {path: 'table', component: TableComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
