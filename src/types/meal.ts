export const MEAL_TYPES = ['Breakfast', 'Snack', 'Lunch', 'Dinner'] as const;

export type MealType = typeof MEAL_TYPES[number];

export interface MealData {
  type: MealType;
  description: string;
  calories: number;
}

export interface MealItem extends MealData {
  id: string;
}