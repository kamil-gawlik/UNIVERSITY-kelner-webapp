import {Component, OnInit} from "@angular/core";
import {Meal, TableFullInfo} from "../data-modesl";
import {DataService} from "../data-service.service";
import {ActivatedRoute, Params} from "@angular/router";
import {Location} from "@angular/common";
import "rxjs/add/operator/switchMap";


@Component({
  selector: 'app-table-detail',
  templateUrl: './table-detail.component.html',
  styleUrls: ['./table-detail.component.css']
})
export class TableDetailComponent implements OnInit {

  table: TableFullInfo;
  availableMeals: Meal[] = [];
  mealsStatuses = [];

  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private location: Location) {
  }

  getAllMeals(): void {
    this.dataService.getAllMeals().subscribe((meal: Meal) => this.availableMeals.push(meal));
  }

  filterMeals(mealId: number, meal: Meal) {
    if (isNaN(mealId)) { // if no filter allow all
      return true;
    } else {
      return meal.meal_id === mealId;
    }
  }


  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.dataService.getTable(+params['id']))
      .subscribe(table => {
        this.table = table;
        this.route.queryParams
          .subscribe((params: Params) => this.table.table_meals = this.table.table_meals.filter(this.filterMeals.bind(this, +params['mealId'])));
        this.table.table_meals.map((m: Meal) => this.mealsStatuses[m.order_meal_id.toString()] = false)
      });
    this.getAllMeals();
  }

  save(): void {
    this.table.table_meals.map(m => {
        if (this.mealsStatuses[m.order_meal_id]) {
          this.dataService.setMealDone(m.order_meal_id)
            .subscribe(() => this.goBack())
        }
      }
    )
  }


  goBack(): void {
    this.location.back();
  }

  changeState(id: number): void {
    this.mealsStatuses[id] = !this.mealsStatuses[id]
    this.mealsStatuses.map(s => console.log(s))
  }
}
