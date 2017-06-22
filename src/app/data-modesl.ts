/**
 * interface representing meal from db
 */
export interface Meal {
  meal_id: number;
  meal_description: string;
  meal_cost?: number;
  meal_status?: string;
  order_meal_id: number;
}


/**
 * interface representing table from db
 */
export interface Table {
  table_id: number;
  table_description: string;
  active_order_id?: number;
  is_active?: boolean;
}

/**
 * interface representing join of table and meal, all rows for specyfic table
 */
export interface TableFullInfo {
  table_id: number;
  table_description: string;
  active_order_id?: number;
  table_meals: Meal[];
}

/**
 * interface representing table joined with meal, single row
 */
export class SingleRowTable {
  table_id: number;
  table_description: string;
  active_order_id?: number;
  meal_id: number;
  meal_description: string;
  meal_cost: number;

  constructor(table: TableFullInfo, meal: Meal) {
    this.table_id = table.table_id;
    this.table_description = table.table_description;
    this.active_order_id = table.active_order_id;
    this.meal_id = meal.meal_id;
    this.meal_description = meal.meal_description;
    this.meal_cost = meal.meal_cost;
  }
}


/**
 * builder of SingleRowTable basing on TableFullInfor
 * @param full - TableFullInfo
 * @return table of SingleRowTable
 */
export function buidlRowsFromFullData(full: TableFullInfo): SingleRowTable[] {
  var res: SingleRowTable[] = [];
  full.table_meals.map((m: Meal) =>
    res.push(new SingleRowTable(full, m))
  );
  return res;
}

