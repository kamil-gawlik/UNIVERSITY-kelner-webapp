import { Component, OnInit } from '@angular/core';
import { DataServiceService, Table, TableFullInfo, SingleRowTable, buidlRowsFromFullData } from '../data-service.service'
import {LocalDataSource} from 'ng2-smart-table';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  settings = {
    columns: {
      table_id: { title: "id" },
      table_description: { title: "opis" },
      meal_id: { title: "meal id" },
      meal_description: { title: "opis dania" },
      meal_cost: { title: "koszt" }
    }
  };

  tables: Table[];
  //data: SingleRowTable[] = [];
   data: LocalDataSource;

  constructor(private dataService: DataServiceService) { 
    this.data = new LocalDataSource();
  }

  getTableData(): void {

    var getActive = function (table: Table) {
      return table.is_active;
    }

    this.dataService.getAllTables()
      .subscribe(data => {
        this.tables = <Table[]>data;
        this.tables.filter(getActive).map(t => {
          this.dataService.getTable(t.id)
            .subscribe((tFull: TableFullInfo) =>
              //this.data = this.data.concat(buidlRowsFromFullData(tFull))
              //this.data.load(buidlRowsFromFullData(tFull))
              buidlRowsFromFullData(tFull).map(c=>this.data.append(c))
            )
        }
        )
      });
  }

  ngOnInit() {
    this.getTableData();
  }

}
