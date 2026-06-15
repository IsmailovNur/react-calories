export type MealType = 'Breakfast' | 'Snack' | 'Lunch' | 'Dinner';

export interface MealData {
  type: MealType;
  description: string;
  calories: number;
}

export interface MealItem extends MealData {
  id: string;
}