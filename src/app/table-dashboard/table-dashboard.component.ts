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

/**
 *  Geting data from specified service
 *  @return -  all active tables 
 */  
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

/**
 * init function of component
 * on init event initializes data and download them from serverł
 */
  ngOnInit(): void {
    this.getTables();
  }

/**
 * Selection of table
 * @param t - selected table
 */
  onSelect(t: TableFullInfo): void {
    this.selectedTable = t;
  }

/**
 * Router function letting user see table details
 * @param table - TableFullInfo of which details will be displayed
 */
  gotoDetail(table: TableFullInfo): void {
    this.router.navigate(['/detail', table.table_id ], { queryParams: {  } });
  }


}
