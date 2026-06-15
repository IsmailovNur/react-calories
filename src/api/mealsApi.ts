import axios from 'axios';
import type { MealData, MealItem } from '../types/meal.ts';

const mealEndpoint = axios.create({
  baseURL: 'https://js-31-nurisma-default-rtdb.europe-west1.firebasedatabase.app/',
});

export const mealsApi = {
  async getMeals(): Promise<MealItem[]> {
    const response = await mealEndpoint.get<Record<string, MealData> | null>(
      '/meals.json'
    );

    if (!response.data) return [];

    return Object.entries(response.data).map(([id, meal]) => ({
      id,
      ...meal,
    }));
  }
};