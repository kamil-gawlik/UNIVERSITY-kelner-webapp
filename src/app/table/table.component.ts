import {Component, OnInit} from '@angular/core';
import {Table, TableFullInfo, SingleRowTable, buidlRowsFromFullData} from '../data-modesl';
import {DataService} from '../data-service.service';
import {Router} from '@angular/router';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  tables: SingleRowTable[] = [];

  constructor(private dataService: DataService,
              private router: Router) {
  }

  getTableData(): void {

    const getActive = function (table: Table) {
      return table.is_active;
    };

    this.dataService.getAllTables()
      .subscribe(data => {
        const tables = <Table[]>data;
        tables.filter(getActive).map(t => {
            this.dataService.getTable(t.table_id)
              .subscribe((tFull: TableFullInfo) =>
                this.tables = this.tables.concat(buidlRowsFromFullData(tFull)));
          }
        );
      });
  }

  ngOnInit(): void {
    this.getTableData();
  }

  gotoDetail(t: SingleRowTable): void {
    this.router.navigate(['/detail', t.table_id], {queryParams: {mealId: t.meal_id}});
  }


}


