
export interface Meal {
  id: number;
  description: string;
  cost?: number;
}
export interface Meal2 {
  meal_id: number;
  meal_description: string;
  meal_cost?: number;
}

export interface Table { // second representation, dont ask my why...
  table_id: number;
  table_description: string;
  active_order_id?: number;
  is_active?: boolean;
}
export interface TableFullInfo {
  table_id: number;
  table_description: string;
  active_order_id?: number;
  table_meals: Meal2[];
}

export class SingleRowTable {
  table_id: number;
  table_description: string;
  active_order_id?: number;
  meal_id: number;
  meal_description: string;
  meal_cost: number;

  constructor(table: TableFullInfo, meal: Meal2) {
    this.table_id = table.table_id;
    this.table_description = table.table_description;
    this.active_order_id = table.active_order_id;
    this.meal_id = meal.meal_id;
    this.meal_description = meal.meal_description;
    this.meal_cost = meal.meal_cost;
  }
}

export function buidlRowsFromFullData(full: TableFullInfo): SingleRowTable[] {
  var res: SingleRowTable[] = [];
  full.table_meals.map((m: Meal2) =>
    res.push(new SingleRowTable(full, m))
  );
  return res;
}

