import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { App, Button, Card, Form, Input, InputNumber, Select } from 'antd';
import { ArrowLeftOutlined, SaveOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { mealsApi } from '../../api/mealsApi.ts';
import './MealForm.css';
import { MEAL_TYPES, type MealData } from "../../types/meal.ts";
import Loader from "../../shared/Loader/Loader.tsx";

const MealForm = () => {

  const [form] = Form.useForm();
  const navigate = useNavigate();
  const {id} = useParams<{ id: string }>();
  const {message} = App.useApp();

  const isEditMode = !!id;
  const [isLoadingData, setIsLoadingData] = useState<boolean>(isEditMode);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const mealOptions = MEAL_TYPES.map(type => ({value: type, label: type}));

  useEffect(() => {
    if (!isEditMode) {
      form.setFieldsValue({type: 'Breakfast'});
      return;
    }

    const loadOriginalEating = async () => {
      try {
        const data = await mealsApi.getMealById(id!);
        if (data) {
          form.setFieldsValue(data);
        } else {
          message.error('Item not found');
          navigate('/');
        }
      } catch (error) {
        message.error(`Error downloading document info ${error}`);
      } finally {
        setIsLoadingData(false);
      }
    };

    void loadOriginalEating();
  }, [id, isEditMode, form]);

  const handleSubmit = async (values: MealData) => {
    setIsSubmitting(true);
    const payload: MealData = {
      type: values.type,
      description: values.description.trim(),
      calories: Number(values.calories),
    };

    try {
      if (isEditMode && id) {
        await mealsApi.updateMeal(id, payload);
        message.success('Item updated successfully');
      } else {
        await mealsApi.createMeal(payload);
        message.success('New meal added');
        navigate('/');
      }
    } catch (error) {
      message.error(`Failed to submit data ${error}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      <Button
        type="text"
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate('/')}
        className="back-btn"
      >
        Back to Meals
      </Button>

      <motion.div
        initial={{opacity: 0, scale: 0.99}}
        animate={{opacity: 1, scale: 1}}
        transition={{duration: 0.2}}
      >
        <Card className="form-card">
          <h2>{isEditMode ? 'Edit Meal Log' : 'Add New Meal Log'}</h2>

          <Loader isLoading={isLoadingData} />

          {!isLoadingData && (
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
              <Form.Item
                name="type"
                label="Meal Time Category"
                rules={[{required: true, message: 'Please select a period'}]}
              >
                <Select options={mealOptions} />
              </Form.Item>

              <Form.Item
                name="description"
                label="Meal Description"
                rules={[{
                  required: true,
                  message: 'Please write a description'
                }]}
              >
                <Input.TextArea rows={3} placeholder="your rating of the food" />
              </Form.Item>

              <Form.Item
                name="calories"
                label="Calories (kcal)"
                rules={[
                  {required: true, message: 'Please enter calorie count'},
                  {type: 'number', min: 1, message: 'Must be greater than 0'}
                ]}
              >
                <InputNumber style={{width: '100%'}} placeholder="350 kcal" />
              </Form.Item>

              <Form.Item className="for-bottom">
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<SaveOutlined />}
                  loading={isSubmitting}
                  block
                  className="submit-btn"
                >
                  {isEditMode ? 'Save Changes' : 'Create Meal'}
                </Button>
              </Form.Item>
            </Form>
          )}
        </Card>
      </motion.div>
    </div>
  );
};

export default MealForm;