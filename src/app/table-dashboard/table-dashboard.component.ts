import {Component, OnInit} from '@angular/core';
import {TableFullInfo, Table} from '../data-modesl';
import {DataService} from '../data-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-table-dashboard',
  templateUrl: './table-dashboard.component.html',
  styleUrls: ['./table-dashboard.component.css']
})
export class TableDashboardComponent implements OnInit {

  tables: TableFullInfo[] = [];
  selectedTable: TableFullInfo;

  constructor(private dataService: DataService, private router: Router) {
  }

  getTables() {

    const getActive = function (table: Table) {
      return table.is_active;
    }

    this.dataService.getAllTables()
      .subscribe(data => {
        const tables = <Table[]>data;
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

  onSelect(t: TableFullInfo): void {
    this.selectedTable = t;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedTable.table_id ], { queryParams: { mealId: 1 } });
  }


}
