import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';
import { TableComponent2 } from './table2/table.component';
import { DataService } from './data-service.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { TableDetailComponent } from './table-detail/table-detail.component';
import { TableDashboardComponent } from './table-dashboard/table-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    TableComponent2,
    TableDetailComponent,
    TableDashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Ng2SmartTableModule,
    AppRoutingModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
