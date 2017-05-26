import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TableComponent} from './table/table.component';
import {DataService} from './data-service.service';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {TableDetailComponent} from './table-detail/table-detail.component';
import {TableDashboardComponent} from './table-dashboard/table-dashboard.component';
import {MdSelectModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    TableDetailComponent,
    TableDashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Ng2SmartTableModule,
    AppRoutingModule,
    MdSelectModule,
    BrowserAnimationsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
