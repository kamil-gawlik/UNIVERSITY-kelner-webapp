import { Component, OnInit } from '@angular/core';
import { DataService } from '../data-service.service'
import { Table, Meal, TableFullInfo, SingleRowTable, buidlRowsFromFullData } from '../data-modesl';
import { LocalDataSource } from 'ng2-smart-table';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-table2',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent2 implements OnInit {
  tables: Table[];
  data: LocalDataSource;
  meals: Observable<Meal[]>;

  settings = {
    noDataMessage: "--- Loading data ---",
    columns: {
      table_id: { title: "id" },
      table_description: { title: "opis" },
      //meal_id: { title: "meal id" },
      meal_description: {
        title: "opis dania",
        editor: {
          type: 'list',
          config: {
            list: []//this.meals.subscribe((meal: Meal[]) => meal.map(m => { return { value: m.id, title: m.description } })), //[{ value: 'Antonette', title: 'Antonette' }, { value: 'Bret', title: 'Bret' }],
          },
        }
      },
      meal_cost: { title: "koszt", editable: false }
    }
  };



  constructor(private dataService: DataService) {
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
          this.dataService.getTable(t.table_id)
            .subscribe((tFull: TableFullInfo) =>
              //this.data = this.data.concat(buidlRowsFromFullData(tFull))
              //this.data.load(buidlRowsFromFullData(tFull))
              buidlRowsFromFullData(tFull).map(c => this.data.append(c))
            )
        }
        )
      });
  }

  getAllMeals(): void {
     this.meals = this.dataService.getAllMeals();
  }

  ngOnInit() {
    this.getTableData();
   // this.getAllMeals();
  }

}
