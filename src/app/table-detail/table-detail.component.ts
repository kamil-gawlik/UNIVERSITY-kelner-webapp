import {Component, OnInit} from '@angular/core';
import {Meal, TableFullInfo} from '../data-modesl';
import {DataService} from '../data-service.service';
import {ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';
import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'app-table-detail',
  templateUrl: './table-detail.component.html',
  styleUrls: ['./table-detail.component.css']
})
export class TableDetailComponent implements OnInit {

  table: TableFullInfo;
  availableMeals: Meal[] = [];
  statuses = [
    'active',
    'finished',
    'ready to serve'
  ]

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
      });
    this.getAllMeals();
  }

  save(): void {
    this.dataService.updateTable(this.table)
      .subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

}
