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
  private editMeals = '/tables/editMeals';

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

  getAllMeals() {
    const url = `${this.appUrl}${this.mealsList}`;
    console.log('Get from ' + url);
    return this.http.get(url)
      .map((res: Response) => res.json());
  }

  updateTable(t: TableFullInfo) {
    const url = `${this.appUrl}${this.mealsList}`;
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    console.log('POST to ' + url);
    return this.http.post(url, { /*data here*/} , options)
      .map((res: Response) => res.json());
  }

  /*
   POST /tables/addMeal - dodawanie dań do zamówienia

   {
   "table_id": table_id
   "meals": [ id_1, id_2, ... ]
   }
   */
  addMealsToTable(tableId: number, mealsIds: Array<number>) {

  }

}
