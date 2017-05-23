import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DataServiceService {

  constructor(private http: Http) { }

  private appUrl = 'kelnerapi.azurewebsites.net';
  private tablesList = '/tables/list';

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  getTablesData(): Promise<Table[]> {
    const url = `${this.appUrl}${this.tablesList}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Table[])
      .catch(this.handleError);
  }
}

export interface Table { 
  id:number;
  description:string;
  is_active:boolean;
}

