import { Component, OnInit } from '@angular/core';
import { DataServiceService, Table } from '../data-service.service'

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  tableData : Table[];

  getTableData(): void {
    this.dataService.getTablesData().then(data => this.tableData = data);
  }

  constructor(private dataService: DataServiceService) { }

  ngOnInit() {
    this.getTableData();
  }

}
