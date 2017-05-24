import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DataServiceService {

  constructor(private http: Http) { }

//  private appUrl = 'http://kelnerapi.azurewebsites.net';
  private appUrl = 'http://localhost:3000';
  private tablesList = '/tables/list';

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  getTablesData(): Promise<Table[]> {
    const url = `${this.appUrl}${this.tablesList}`;
    console.log('GET from '+url);
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Table[])
      .catch(this.handleError);
  }
}

export interface Table {
  id: number;
  description: string;
  is_active: boolean;
}

/*
// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
}); 
*/