import {Component, OnInit} from '@angular/core';
import {Table, TableFullInfo, SingleRowTable, buidlRowsFromFullData} from '../data-modesl';
import {DataService} from '../data-service.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {


  tables: SingleRowTable[] = [];
  selectedTable: SingleRowTable;

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

  onSelect(t: SingleRowTable): void {
    this.selectedTable = t;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedTable.table_id],  { queryParams: { mealId: this.selectedTable.meal_id } });
  }


  /*
   add(name: string): void {
   name = name.trim();
   if (!name) { return; }
   this.heroService.create(name)
   .then(hero => {
   this.heroes.push(hero);
   this.selectedHero = null;
   });
   }

   delete(hero: Hero): void {
   this.heroService
   .delete(hero.id)
   .then(() => {
   this.heroes = this.heroes.filter(h => h !== hero);
   if (this.selectedHero === hero) { this.selectedHero = null; }
   });
   }
   */


}


