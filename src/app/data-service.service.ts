import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {TableFullInfo} from './data-modesl';

@Injectable()
export class DataService {

  constructor(private http: Http) {
  }

  private appUrl = 'https://kelnerapi.azurewebsites.net';
  private tablesList = '/tables/list';
  private singleTable = '/tables/';
  private mealsList = '/meals/list';
  private mealDone = '/order_meal/set_done/';

  /**
   * Get all tabbles with their meals
   */
  getAllTables() {
    const url = `${this.appUrl}${this.tablesList}`;
    console.log('GET from ' + url);
    return this.http.get(url)
      .map((res: Response) => res.json());
  }

/**
 * Get specyfic table
 * @param id - table id
 * @return TabbleFullInfo
 */
  getTable(id: number) {
    const url = `${this.appUrl}${this.singleTable}${id}`;
    console.log('Get from ' + url);
    return this.http.get(url)
      .map((res: Response) => res.json());

  }

/**
 * Get all meals registered on server
 */
  getAllMeals() {
    const url = `${this.appUrl}${this.mealsList}`;
    console.log('Get from ' + url);
    return this.http.get(url)
      .map((res: Response) => res.json());
  }

/**
 * Mark specyfic meal as done using its order_meal id
 * @param id - order_meal id
 */
  setMealDone(id: number) {
    const url = `${this.appUrl}${this.mealDone}${id}`;
      console.log('GET from ' + url);
    return this.http.get(url)
      .map((res: Response) => res.status);
  }

  addMealsToTable(tableId: number, mealsIds: Array<number>) {

  }

}
