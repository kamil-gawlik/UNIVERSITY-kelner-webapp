import { Component, OnInit } from '@angular/core';
import { TableFullInfo, Table } from '../data-modesl'
import { DataService } from '../data-service.service'
@Component({
  selector: 'app-table-dashboard',
  templateUrl: './table-dashboard.component.html',
  styleUrls: ['./table-dashboard.component.css']
})
export class TableDashboardComponent implements OnInit {

  tables: TableFullInfo[] = [];

  constructor(private dataService: DataService) { }

  getTables() {

    var getActive = function (table: Table) {
      return table.is_active;
    }

    this.dataService.getAllTables()
      .subscribe(data => {
        let tables = <Table[]>data;
        tables.filter(getActive).map(t => {
          this.dataService.getTable(t.table_id)
            .subscribe((tFull: TableFullInfo) => this.tables.push(tFull))
        }
        )
      });
  }
  ngOnInit(): void {
    this.getTables();
  }

}
