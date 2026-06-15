import { useEffect, useState } from "react";
import { App, Button, Card, Popconfirm } from 'antd';
import { mealsApi } from "../../api/mealsApi.ts";
import type { MealItem } from "../../types/meal.ts";
import {
  DeleteOutlined,
  EditOutlined,
  FireOutlined,
  PlusOutlined
} from "@ant-design/icons";
import Loader from "../../shared/Loader/Loader.tsx";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../routing/routes.ts";

import "./MealsPage.css";

const MealsPage = () => {
  const {message} = App.useApp();
  const navigate = useNavigate();

  const [meals, setMeals] = useState<MealItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchMeals = async () => {
    try {
      setIsLoading(true);
      const data = await mealsApi.getMeals();
      setMeals(data);
    } catch (error) {
      message.error(`Error connecting to database ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await mealsApi.deleteMeal(id);
      setMeals((prev) => prev.filter((meal) => meal.id !== id));
      message.success('Meal deleted from server');
    } catch (error) {
      message.error(`Could not complete deletion ${error}`);
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    void fetchMeals();
  }, []);


  const totalCalories = meals.reduce((sum, meal) => sum + Number(meal.calories), 0);

  return (
    <div className="container">
      <Card className="header-card">
        <div className="header-top">
          <div>
            <h1>Calories Tracker</h1>
            <p>Track your daily nutrition logs</p>
          </div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => navigate(AppRoutes.addPage)}
            className="add-btn"
          >
            Add new meal
          </Button>
        </div>

        <div className="calories-summary">
          <FireOutlined className="fire-icon" />
          <div>
            <span className="summary-label">Total calories:</span>
            <span className="summary-value"> {totalCalories} kcal</span>
          </div>
        </div>
      </Card>

      <Loader isLoading={isLoading} />

      {!isLoading && (
        <div className="list-layout">
          <AnimatePresence mode="popLayout">
            {meals.length === 0 ? (
              <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
              >
                No nutrition data available. Add a meal to get started.
              </motion.div>
            ) : (
              meals.map((meal) => (
                <motion.div
                  key={meal.id}
                  initial={{opacity: 0, y: 12}}
                  animate={{opacity: 1, y: 0}}
                  exit={{opacity: 0, x: -20, scale: 0.98}}
                  transition={{duration: 0.2}}
                >
                  <Card className="meal-card">
                    <div className="meal-card-body">
                      <div className="meal-details">
                        <span className="category-tag">{meal.type}</span>
                        <h3 className="description-text">{meal.description}</h3>
                        <span>{meal.calories} kcal</span>

                      </div>
                      <div className="actions-section">
                        <div className="button-group">
                          <Button
                            icon={<EditOutlined className="edit-icon" />}
                            onClick={() => navigate(`/meals/${meal.id}/edit`)}
                            disabled={deletingId !== null}
                          />
                          <Popconfirm
                            title="Delete this item?"
                            onConfirm={() => handleDelete(meal.id)}
                            okText="Yes"
                            cancelText="No"
                            placement="topRight"
                          >
                            <Button
                              danger
                              icon={<DeleteOutlined />}
                              loading={deletingId === meal.id}
                              disabled={deletingId !== null && deletingId !== meal.id}
                            />
                          </Popconfirm>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default MealsPage;