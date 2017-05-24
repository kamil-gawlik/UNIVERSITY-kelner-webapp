import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataServiceService {

  constructor(private http: Http) { }

  //  private appUrl = 'http://kelnerapi.azurewebsites.net';
  private appUrl = 'https://kelnerapi.azurewebsites.net';
  private tablesList = '/tables/list';
  private singleTable = '/tables/'

  getAllTables() {
    const url = `${this.appUrl}${this.tablesList}`;
    console.log('GET from ' + url);
    return this.http.get(url)
      .map((res: Response) => res.json());
  }

  getTable(id: number) {
    const url = `${this.appUrl}${this.singleTable}${id}`;
    console.log('Get from ' + url);
    return this.http.get(url)
      .map((res: Response) => res.json());

  }

}

export interface Meal {
  meal_id: number;
  meal_description: string;
  meal_cost?: number;
}

export interface Table {
  id: number;
  description: string;
  is_active: boolean;
}
export interface Table2 { // second representation, dont ask my why...
  table_id: number;
  table_description: string;
  active_order_id?: number;
}
export interface TableFullInfo {
  table_info: Table2;
  table_meals: Meal[];
}

export class SingleRowTable {
  table_id: number;
  table_description: string;
  meal_id: number;
  meal_description: string;
  meal_cost: number;

  constructor(table: Table2, meal: Meal) {
    this.table_id = table.table_id;
    this.table_description = table.table_description;
    this.meal_id = meal.meal_id;
    this.meal_description = meal.meal_description;
    this.meal_cost = meal.meal_cost;
  }
}

export function buidlRowsFromFullData(full: TableFullInfo): SingleRowTable[] {
  var res: SingleRowTable[] = [];
  full.table_meals.map((m: Meal) =>
    res.push(new SingleRowTable(full.table_info, m))
  );
  return res;
}

