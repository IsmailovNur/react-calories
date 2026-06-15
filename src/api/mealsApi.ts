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
  },

  async getMealById(id: string): Promise<MealData | null> {
    const response = await mealEndpoint.get<MealData | null>(
      `/meals/${id}.json`
    );

    return response.data;
  },

  async createMeal(meal: MealData): Promise<void> {
    await mealEndpoint.post('/meals.json', meal);
  },

  async updateMeal(id: string, meal: MealData): Promise<void> {
    await mealEndpoint.put(`/meals/${id}.json`, meal);
  },

  async deleteMeal(id: string): Promise<void> {
    await mealEndpoint.delete(`/meals/${id}.json`);
  },
};