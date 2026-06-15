import { useEffect } from "react";
import { mealsApi } from "../../api/mealsApi.ts";

const MealsPage = () => {


  const fetchMeals = async () => {
    try {
      const data = await mealsApi.getMeals();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    void fetchMeals();
  }, []);

  return (
    <div>
      <h1>Meals Page</h1>
    </div>
  );
};

export default MealsPage;